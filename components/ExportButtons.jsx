import exportToJSON from "@/lib/exportToJSON";
import exportToCSV from "@/lib/exportToCSV";

const ExportButtons = ({ data }) => {
  return (
    <article>
      <button
        className="mt-2 px-4 py-2 font-semibold text-dark bg-light rounded-sm hover:opacity-75 transition w-full uppercase bg-teal-300"
        onClick={() => exportToJSON(data, "data")}
      >
        Export to JSON
      </button>
      <button
        className="mt-2 px-4 py-2 font-semibold text-dark bg-light rounded-sm hover:opacity-75 transition w-full uppercase bg-teal-300"
        onClick={() => exportToCSV(data, "data")}
      >
        Export to CSV
      </button>
    </article>
  );
};

export default ExportButtons;
