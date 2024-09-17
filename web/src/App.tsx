import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

function App() {
  const [nodeJsCode, setNodeJsCode] = React.useState(
    `const a = "hello";\nlog(a + " world");`
  );
  const [pythonCode, setPythonCode] = React.useState(`print("hello")`);

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

  const {
    mutate: runNodeJsCode,
    data: nodeJsRunReturns,
    isPending: nodeJsRunPending,
  } = useMutation({
    mutationFn: (code: string) => {
      return fetch("/nodejs/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      }).then(async (res) => {
        return res.json();
      });
    },
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

  return (
    <main style={{ display: "flex", columnGap: 8 }}>
      <section style={{ flex: 1 }}>
        <form
          id="nodejs"
          onSubmit={(e) => {
            e.preventDefault();
            runNodeJsCode(nodeJsCode);
          }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="nodejs-code">nodejs code</label>
          <textarea
            form="nodejs"
            id="nodejs-code"
            name="nodejs-code"
            value={nodeJsCode}
            onChange={(e) => setNodeJsCode(e.target.value)}
            wrap="hard"
            rows={5}
          />
          <button type="submit" disabled={nodeJsRunPending}>
            run
          </button>
        </form>
        <i>{`log(arg:any): { console: string[], stats: ivm.HeapStatistics }`}</i>
        <div>{JSON.stringify(nodeJsRunReturns, null, 2)}</div>
      </section>

      <section style={{ flex: 1 }}>
        <form
          id="python"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="python-code">python code</label>
          <textarea
            form="python"
            id="python-code"
            name="python-code"
            value={pythonCode}
            onChange={(e) => setPythonCode(e.target.value)}
            wrap="hard"
            rows={5}
          />
          <button type="submit">run</button>
        </form>
      </section>
    </main>
  );
}

export default App;
