import React from "react";
import { useQuery } from "@tanstack/react-query";

import "./App.css";

function App() {
  const { isPending, isError, error } = useQuery({
    queryKey: ["hi"],
    queryFn: () =>
      fetch("/api/hi").then(async (res) => {
        return "good";
      }),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="App">
      <header className="App-header">hi</header>
    </div>
  );
}

export default App;
