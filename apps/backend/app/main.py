from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from .models import user, document
from .routes import document_routes, auth_routes
from .services import auth_service

# Create database tables
Base.metadata.create_all(bind=engine)

# Seed users
db = SessionLocal()
auth_service.seed_users(db)
db.close()

app = FastAPI(title="DocFlow API", description="Lightweight Collaborative Document Editor API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_routes.router)
app.include_router(document_routes.router)

@app.get("/")
def root():
    return {"message": "Welcome to DocFlow API"}
