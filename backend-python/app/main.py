from fastapi import FastAPI

app = FastAPI()

@app.get("/api-python/hi")
def read_root():
    return {"good": True}
