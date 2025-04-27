"use client";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ files, setFiles, isLoading }) => {
  // Drag-and-drop setup with react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: setFiles,
    accept: {
      "audio/mpeg": [".mp3"],
    },
    multiple: true,
  });

  const handleReset = () => {
    setFiles([]);
  };

  return (
    <article>
      <div
        className="border-2 border-dashed rounded-md flex flex-col items-center justify-center px-5 py-10 mb-4 cursor-pointer hover:border-blue-300"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            className="w-6 h-6"
          >
            <g id="Attach 01">
              <path
                id="Vector"
                d="M13.5756 7.08335L7.97765 13.0209C7.4895 13.5386 6.69804 13.5386 6.20988 13.0209C5.72173 12.5031 5.72173 11.6636 6.20988 11.1459L11.8078 5.20835M11.2202 5.83335L12.3987 4.58335C13.375 3.54782 14.9579 3.54782 15.9342 4.58335C16.9105 5.61889 16.9105 7.29782 15.9342 8.33336L14.7557 9.58336M15.3433 8.95835L9.7454 14.8959C8.28093 16.4492 5.90657 16.4492 4.4421 14.8959C2.97763 13.3426 2.97763 10.8242 4.4421 9.27085L10.04 3.33334"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <h2 className="text-xl font-semibold ">Upload MP3 Files</h2>
        </div>
      </div>
      <div>
        {files.length > 0 && (
          <button
            onClick={handleReset}
            className="mt-2 px-4 py-2 font-semibold text-dark rounded-sm hover:opacity-75 transition w-full uppercase bg-red-300"
          >
            Reset
          </button>
        )}
      </div>
    </article>
  );
};

export default FileUpload;
