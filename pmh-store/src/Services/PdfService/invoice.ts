import { jsPDF } from 'jspdf';

export const generateInvoicePdf = (data:any) => {
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Shop Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("PMH STORE", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(60);
    doc.setFont("helvetica", "normal");
    doc.text("Vazhakkili , Neelancheri(PO),Malappuram", pageWidth / 2, 28, { align: "center" });
    doc.text("Phone: 8156892929", pageWidth / 2, 34, { align: "center" });

    // Divider line
    doc.setDrawColor(180);
    doc.line(10, 42, pageWidth - 10, 42);

    // Invoice Details
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Number: ${data.invoiceNumber}`, 10, 50);
    doc.text(`Date: ${new Date(data.date).toLocaleDateString()}`, 10, 58);
    doc.text(`Customer Name: ${data.customerName}`, 10, 66);
    doc.text(`Customer Mobile: ${data.customerMobile}`, 10, 75);

    // Items Table Header
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text("Items", 10, 80);

    // Header Background and Column Titles
    doc.setFillColor(230);
    doc.rect(10, 85, pageWidth - 20, 10, 'F');
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text("Item Name", 12, 92);
    doc.text("Quantity", 90, 92, { align: 'right' });
    doc.text("Unit", 120, 92, { align: 'right' });
    doc.text("Price", 140, 92, { align: 'right' });
    doc.text("Total", 180, 92, { align: 'right' });

    // Table Rows
    let yPosition = 102;
    data.items.forEach((item) => {
        doc.setDrawColor(220);
        doc.rect(10, yPosition - 8, pageWidth - 20, 10);
        doc.text(item.itemName, 12, yPosition);
        doc.text(String(item.quantity), 90, yPosition, { align: 'right' });
        doc.text(String(item.unit), 120, yPosition, { align: 'right' });
        doc.text(String(parseFloat(item.price).toFixed(2)), 140, yPosition, { align: 'right' });
        doc.text(String(parseFloat(item.total).toFixed(2)), 180, yPosition, { align: 'right' });
        yPosition += 10;
    });

    // Summary Section
    doc.setFillColor(245);
    doc.rect(10, yPosition, pageWidth - 20, 30, 'F');

    yPosition += 10;
    doc.text("Invoice Amount:", 12, yPosition);
    doc.text(String(parseFloat(data.invoiceAmount).toFixed(2)), pageWidth - 20, yPosition, { align: 'right' });

    yPosition += 10;
    doc.text("Discount:", 12, yPosition);
    doc.text(String(parseFloat(data.discount).toFixed(2)), pageWidth - 20, yPosition, { align: 'right' });

    yPosition += 10;
    doc.text("Payable Amount:", 12, yPosition);
    doc.setFont("helvetica", "bold");
    doc.text(String(parseFloat(data.payableAmount).toFixed(2)), pageWidth - 20, yPosition, { align: 'right' });

    // Footer
    yPosition += 20;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for shopping with us!", pageWidth / 2, yPosition, { align: "center" });

    // Save PDF
    doc.save(`invoice_${data.invoiceNumber}.pdf`);
};
