import express from "express";
import bodyParser from "body-parser";
import ivm from "isolated-vm";

const app = express();
app.use(bodyParser.json());

app.get("/nodejs/hi", function (req, res) {
  res.status(200).send({ ok: true });
});

app.post("/nodejs/run", async function (req, res) {
  const { code } = req.body;
  let consoleOutput: string[] = [];

  try {
    const isolate = new ivm.Isolate({ memoryLimit: 128 });
    const context = isolate.createContextSync();

    const jail = context.global;
    jail.setSync("global", jail.derefInto());
    jail.setSync("log", function (...args: any) {
      consoleOutput.push(args.join(" "));
    });

    const script = `
      (function() {
        ${code}
      })();
    `;

    const compiledScript = await isolate.compileScript(script);
    await compiledScript.run(context);

    const stats = await isolate.getHeapStatistics();

    res.status(200).send({
      console: consoleOutput,
      stats,
    });
  } catch (error) {
    res.status(500).send({ error: (error as Error).message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
