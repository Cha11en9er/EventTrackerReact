from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from pydantic import BaseModel # Import BaseModel

app = FastAPI()

DB_NAME = "EventTrackerDB"
DB_USER = "postgres"
DB_PASS = "OORCra23ppo)"
DB_HOST = "localhost"
DB_PORT = "5432"

def get_db_connection():
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        host=DB_HOST,
        port=DB_PORT
    )
    return conn

# Pydantic model to define the shape of the login request JSON
class UserLogin(BaseModel):
    username: str

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- NEW LOGIN ENDPOINT ---
@app.post("/api/login")
async def login(user_login: UserLogin):
    """
    Validates a user's existence in the database.
    This acts as our simple 'session' creation.
    """
    conn = get_db_connection()
    cur = conn.cursor()
    # Check if the username exists in the 'users' table
    cur.execute("SELECT username FROM evt.user WHERE username = %s;", (user_login.username,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    
    if user:
        # If user is found, return their username as confirmation
        return {"username": user[0]}
    else:
        # If user is not found, raise an HTTP 401 Unauthorized error
        raise HTTPException(status_code=401, detail="Invalid username")


@app.get("/api/data")
async def get_data():
    """
    This endpoint connects to the PostgreSQL database,
    queries the 'events' table, and returns the data.
    """
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT name FROM evt.events;")
    query_results = cur.fetchall()
    cur.close()
    conn.close()

    items = [item[0] for item in query_results]
    print(items)
    data = {
        "title": "Information from PostgreSQL",
        "items": items
    }
    return data