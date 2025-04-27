// GlobalSearchInput.jsx
const GlobalSearchInput = ({ value, onChange, numberOfSongs }) => {
  return (
    <input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="px-2 py-4 rounded-md w-full border border-dark dark:border-light rounded-md outline-none focus:border-blue-300"
      placeholder={`Search ${numberOfSongs} songs`}
    />
  );
};

export default GlobalSearchInput;
