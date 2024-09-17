import React from "react";
import { useQuery } from "@tanstack/react-query";

function App() {
  const {
    isPending: nodejsPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["hi"],
    queryFn: () =>
      fetch("/nodejs/hi").then(async (res) => {
        return "good";
      }),
  });

  const { isPending: pythonPending } = useQuery({
    queryKey: ["python"],
    queryFn: () =>
      fetch("/python/hi").then(async (res) => {
        return "python good";
      }),
  });

  if (nodejsPending || pythonPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return <header>hello world</header>;
}

export default App;
