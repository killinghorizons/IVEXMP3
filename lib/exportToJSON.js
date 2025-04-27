const exportToJSON = (data, fileName) => {
  const json = JSON.stringify(data, null, 2); // Beautifies the JSON
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.json`;
  link.click();

  URL.revokeObjectURL(url);
};

export default exportToJSON;
