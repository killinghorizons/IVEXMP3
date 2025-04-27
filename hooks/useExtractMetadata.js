import { useState, useEffect } from "react";
import { parseBlob } from "music-metadata";

export function useExtractMetadata(files) {
  const [metadataList, setMetadataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const extractAllMetadata = async () => {
      if (files.length > 0) {
        setIsLoading(true);
        try {
          const metadataPromises = files.map(async (file) => {
            try {
              const metadata = await parseBlob(file);
              const durationSeconds = metadata.format.duration || 0;

              const {
                common: { title, artist, album, genre, year },
              } = metadata;

              return {
                title: title || "Unknown",
                artist: artist || "Unknown",
                album: album || "Unknown",
                genre: genre || "Unknown",
                year: year || "Unknown",
                durationSeconds,
              };
            } catch (error) {
              console.error(`Error parsing metadata for ${file.name}:`, error);
              return null;
            }
          });

          const metadataResults = await Promise.all(metadataPromises);
          const cleanedMetadata = metadataResults.filter(Boolean);
          setMetadataList(cleanedMetadata);
        } catch (err) {
          console.error("Error extracting metadata:", err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setMetadataList([]);
      }
    };

    extractAllMetadata();
  }, [files]);

  return { metadataList, isLoading };
}
