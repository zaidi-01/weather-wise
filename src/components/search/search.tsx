import React from "react";

function Search({ onSearch }: { onSearch: (search: string) => void }) {
  const [query, setQuery] = React.useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;
