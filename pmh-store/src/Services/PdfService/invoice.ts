import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePdf = (data: any) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Shop Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0);
    doc.text("PMH STORE", pageWidth / 2, 20, { align: "center" });

    // Store Details
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Vazhakkili, Neelancheri(PO), Malappuram", pageWidth / 2, 28, { align: "center" });
    doc.text("Phone: 8156892929", pageWidth / 2, 34, { align: "center" });

    // Divider Line
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.line(10, 38, pageWidth - 10, 38);

    // Invoice Details Section
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE DETAILS", 10, 48);
    
    // Invoice Details Grid
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    
    // Left Column
    doc.text("Invoice No:", 10, 56);
    doc.text(data.invoiceNumber, 50, 56);
    doc.text("Customer:", 10, 64);
    doc.text(data.customerName, 50, 64);
    
    // Right Column
    doc.text("Date:", pageWidth - 90, 56);
    doc.text(new Date(data.date).toLocaleDateString(), pageWidth - 50, 56);
    doc.text("Mobile:", pageWidth - 90, 64);
    doc.text(data.customerMobile, pageWidth - 50, 64);

    // Items Table
    doc.autoTable({
        startY: 75,
        head: [['Item Name', 'Quantity', 'Unit', 'Price', 'Total']],
        body: data.items.map((item: any) => [
            item.itemName,
            item.quantity,
            item.unit,
            `Rs. ${Number(item.price).toFixed(2)}`,
            `Rs. ${Number(item.total).toFixed(2)}`
        ]),
        headStyles: {
            fillColor: [128, 128, 128],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'left'
        },
        styles: {
            fontSize: 10,
            cellPadding: 5,
            lineColor: [200, 200, 200],
            lineWidth: 0.1,
        },
        columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 25, halign: 'center' },
            2: { cellWidth: 20, halign: 'center' },
            3: { cellWidth: 35, halign: 'right' },
            4: { cellWidth: 35, halign: 'right' }
        },
        margin: { left: 10 },
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    // Summary Box
    const summaryX = pageWidth - 90;
    doc.setFillColor(245, 245, 245);
    doc.rect(summaryX, finalY, 80, 35, 'F');

    // Summary Content
    doc.setFont("helvetica", "normal");
    
    // Invoice Amount
    doc.text("Invoice Amount:", summaryX + 5, finalY + 10);
    doc.text(`Rs. ${Number(data.invoiceAmount).toFixed(2)}`, 
             pageWidth - 15, finalY + 10, { align: 'right' });

    // Discount
    doc.text("Discount:", summaryX + 5, finalY + 20);
    doc.text(`Rs. ${Number(data.discount).toFixed(2)}`, 
             pageWidth - 15, finalY + 20, { align: 'right' });

    // Payable Amount
    doc.setFont("helvetica", "bold");
    doc.text("Payable Amount:", summaryX + 5, finalY + 30);
    doc.text(`Rs. ${Number(data.payableAmount).toFixed(2)}`, 
             pageWidth - 15, finalY + 30, { align: 'right' });

    // Footer
    const footerY = finalY + 50;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Thank you for shopping with us!", pageWidth / 2, footerY, { align: "center" });

    // Terms and Conditions
    doc.setFontSize(8);
    const termsY = footerY + 10;
    doc.text("Terms & Conditions:", 10, termsY);
    doc.text("1. All disputes are subject to local jurisdiction", 10, termsY + 5);
    doc.text("2. This is a computer generated invoice", 10, termsY + 10);

    // Save PDF
    doc.save(`invoice_${data.invoiceNumber}.pdf`);
};