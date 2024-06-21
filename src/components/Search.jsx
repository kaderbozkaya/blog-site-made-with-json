import React from "react";

export default function Search({ handleSearch, searchValue, onInputChange }) {
  return (
    <div className="m-auto p-4 max-w-[600px] content-center">
      <form
        className="flex items-center justify-center"
        onSubmit={handleSearch}
      >
        <input
          type="search"
          placeholder="Search Blog..."
          value={searchValue}
          onChange={onInputChange}
          className="outline-none border-2 border-[#FF4F1F] rounded p-2 m-3 sm:w-96"
        />
        <button
          type="submit"
          className="bg-[#FF4F1F] sm:w-[80px] h-[45px] text-white rounded p-2"
        >
          Search
        </button>
      </form>
    </div>
  );
}
