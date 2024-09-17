from fastapi import FastAPI

app = FastAPI()

@app.get("/python/hi")
def read_root():
    return {"ok": True}
