// Author: Tran Cong Thuan | Date: 29/10/2026 | Assignment: Assignment 1

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        placeholder={placeholder || "Search..."}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button type="button" className="btn-clear" onClick={() => onChange("")}>
          Clear
        </button>
      )}
    </div>
  );
}
