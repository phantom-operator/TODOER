from fastapi import FastAPI

# Assuming the app package is structured correctly
from app.api import todos

app = FastAPI()

# Include the routers from the api module
app.include_router(todos.router, prefix="/api/v1", tags=["todos"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the TODOER Backend!"}

# Optional: If you run this file directly
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
