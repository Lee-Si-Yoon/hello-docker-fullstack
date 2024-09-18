import time
import subprocess
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class CodeRequest(BaseModel):
    code: str

@app.get("/python/hi")
def read_root():
    return {"ok": True}

@app.post("/python/run")
def run_code(request: CodeRequest):
    code = request.code
    start_time = time.time()

    try:
        result = subprocess.run(
            [
                "docker", "run", "--rm",
                "--network", "none",
                "--memory", "128m",
                 "--cpus", "0.5",
                "python:3.9", "python3", "-c", code
            ],
            capture_output=True,
            text=True,
            timeout=5
        )

        end_time = time.time()
        execution_time = end_time - start_time

        if result.returncode != 0:
            raise HTTPException(status_code=400, detail=f"Error: {result.stderr}")
        
        return {"ok": True, "output": result.stdout, "execution_time": execution_time}
    
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=400, detail="Error: Execution timed out")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")