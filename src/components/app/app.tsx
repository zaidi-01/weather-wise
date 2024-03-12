import { Search, Weather } from "components";
import React from "react";
import "./app.css";

function App() {
  const [query, setQuery] = React.useState("");

  return (
    <div className="App">
      <Search onSearch={setQuery} />
      {!!query && <Weather city={query} />}
    </div>
  );
}

export default App;
