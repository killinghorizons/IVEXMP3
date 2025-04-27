"use client";
import { useState, useEffect } from "react";
import { parseBlob } from "music-metadata";

export function useExtractMetadata(files) {
  const [metadataList, setMetadataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    const extractAllMetadata = async () => {
      if (files.length > 0) {
        setIsLoading(true);
        setProgress({ completed: 0, total: files.length });

        try {
          const metadataResults = [];

          for (const file of files) {
            try {
              const metadata = await parseBlob(file);
              const durationSeconds = metadata.format.duration || 0;
              const {
                common: { title, artist, album, genre, year },
              } = metadata;

              metadataResults.push({
                title: title || "Unknown",
                artist: artist || "Unknown",
                album: album || "Unknown",
                genre: genre || "Unknown",
                year: year || "Unknown",
                durationSeconds,
              });
            } catch (error) {
              console.error(`Error parsing metadata for ${file.name}:`, error);
            }

            // Increment progress after each file
            setProgress((prev) => ({
              ...prev,
              completed: prev.completed + 1,
            }));
          }

          setMetadataList(metadataResults);
        } catch (err) {
          console.error("Error extracting metadata:", err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setMetadataList([]);
        setProgress({ completed: 0, total: 0 });
      }
    };

    extractAllMetadata();
  }, [files]);

  return { metadataList, isLoading, progress };
}
