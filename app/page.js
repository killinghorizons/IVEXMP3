"use client";
import { useState } from "react";
import { useExtractMetadata } from "@/hooks/useExtractMetadata";

// Components
import FileUpload from "@/components/FileUpload";
import Hero from "@/components/Hero";
import ExportButtons from "@/components/ExportButtons";
import MetadataTable from "@/components/MetadataTable";

export default function Home() {
  const [files, setFiles] = useState([]);
  const { metadataList, isLoading, progress } = useExtractMetadata(files);

  return (
    <>
      <main className="min-h-screen pt-16 px-5">
        <Hero />
        <section className="py-5">
          {/* File Upload */}
          <FileUpload files={files} setFiles={setFiles} isLoading={isLoading} />
          {/* Export */}
          {metadataList.length > 0 && <ExportButtons data={metadataList} />}
          {/* Datatable */}
          {isLoading && (
            <p className="flex flex-col items-center py-4 gap-2 w-full">
              Loading metadata... {progress.completed} of {progress.total} files
            </p>
          )}
          {metadataList.length > 0 && !isLoading && (
            <>
              <MetadataTable data={metadataList} />
            </>
          )}
        </section>
      </main>
    </>
  );
}
