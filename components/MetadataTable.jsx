import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
// Import your new component
import GlobalSearchInput from "@/components/GlobalSearchInput";

const MetadataTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "artist",
        header: "Artist",
      },
      {
        accessorKey: "album",
        header: "Album",
      },
      {
        accessorKey: "genre",
        header: "Genre",
      },
      {
        accessorKey: "year",
        header: "Year",
      },
      {
        accessorKey: "durationSeconds",
        header: "Duration",
        cell: (info) => {
          const value = info.getValue();
          if (typeof value === "number") {
            let minutes = Math.floor(value / 60);
            let extraSeconds = value % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            extraSeconds =
              extraSeconds < 10
                ? "0" + parseInt(extraSeconds)
                : parseInt(extraSeconds);
            return `${minutes}:${extraSeconds}`;
          }
          return "Unknown";
        },
        sortingFn: "basic", // true numeric sorting
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <article className="mt-8 overflow-x-auto">
      {/* Global Search Input */}
      <div className="mb-4">
        <GlobalSearchInput
          value={globalFilter}
          onChange={setGlobalFilter}
          numberOfSongs={data.length}
        />
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse border border-dark dark:border-light">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="border border-dark dark:border-light px-4 py-2 text-left cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: "🔼",
                      desc: "🔽",
                    }[header.column.getIsSorted()] ?? ""}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-700 px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        {/* Page size selector */}
        <div>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="px-2 py-1 rounded-md"
          >
            {[10, 20, 50].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}
                className="text-dark bg-light dark:text-light dark:bg-dark"
              >
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 rounded-md bg-dark text-light dark:bg-light dark:text-dark disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 rounded-md bg-dark text-light dark:bg-light dark:text-dark disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </article>
  );
};

export default MetadataTable;
