from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import document_routes

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="DocFlow API", description="Lightweight Collaborative Document Editor API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(document_routes.router)

@app.get("/")
def root():
    return {"message": "Welcome to DocFlow API"}
