const exportToCSV = (data, fileName) => {
  const csvRows = [];

  // Extract headers
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(",")); // Convert headers to a CSV row

  // Convert data rows
  data.forEach((row) => {
    const values = headers.map((header) => `"${row[header] || ""}"`);
    csvRows.push(values.join(","));
  });

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${fileName}.csv`;
  link.click();

  URL.revokeObjectURL(url);
};

export default exportToCSV;
