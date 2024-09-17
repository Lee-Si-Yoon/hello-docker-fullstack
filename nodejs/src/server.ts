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

  const logCallback = function (...args: any[]) {
    consoleOutput.push(args.join(" "));
  };

  try {
    const isolate = new ivm.Isolate({ memoryLimit: 128 });
    const context = isolate.createContextSync();
    const jail = context.global;

    jail.setSync("global", jail.derefInto());
    jail.setSync("log", function (...args: any) {
      console.log(...args);
    });

    const script = await isolate.compileScriptSync(`
      (function() {
        ${code}
      })();
    `);

    await script.run(context);

    res.status(200).send({
      console: consoleOutput,
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: (error as Error).message, console: consoleOutput });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
