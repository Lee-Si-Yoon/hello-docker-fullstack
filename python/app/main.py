from fastapi import FastAPI

app = FastAPI()

@app.get("/python/hi")
def read_root():
    return {"ok": True}

@app.post("/python/run")
def run_code(code: str):
    exec(code)
    return {"ok": True}