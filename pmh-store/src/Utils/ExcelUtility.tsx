export const convertArrayBufferExcel = (data: any, name: string) => {
  const bufferArray = new Uint8Array(data.file.data);
  const blob = new Blob([bufferArray], { type: "application/vnd.ms-excel" });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${name}.xlsx`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
