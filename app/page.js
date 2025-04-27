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
  const { metadataList, isLoading } = useExtractMetadata(files);

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
            <div className="text-center py-4">
              Extracting metadata, please don't runaway...
            </div>
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
