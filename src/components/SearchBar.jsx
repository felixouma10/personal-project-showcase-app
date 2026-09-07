import { useRef } from "react";

function SearchBar({ searchTerm, onSearch }) {
  const inputRef = useRef(null);

  function handleFocus() {
    inputRef.current.focus();
  }

  return (
    <div className="mb-8 flex gap-3">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Search projects..."
        className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-3 shadow-sm outline-none focus:border-blue-500"
      />

      <button
        type="button"
        onClick={handleFocus}
        className="rounded-xl bg-gray-800 px-5 py-3 font-medium text-white hover:bg-gray-700"
      >
        Focus Search
      </button>
    </div>
  );
}

export default SearchBar;