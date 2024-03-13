import { TextField } from "@mui/material";
import React from "react";
import "./search.scss";

function Search({ onSearch }: { onSearch: (search: string) => void }) {
  const [query, setQuery] = React.useState("");

  return (
    <div className="search">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
        }}
      >
        <TextField
          type="search"
          value={query}
          label="Search for a city"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Search;
