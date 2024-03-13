import { Search, Weather } from "components";
import React from "react";
import "./app.scss";

function App() {
  const [query, setQuery] = React.useState("");

  return (
    <div className={`app ${query ? "has-query" : ""}`}>
      <Search onSearch={setQuery} />
      {!!query && <Weather city={query} />}
    </div>
  );
}

export default App;
