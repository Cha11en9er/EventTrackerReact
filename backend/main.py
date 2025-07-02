from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from pydantic import BaseModel # Import BaseModel

app = FastAPI()

DB_NAME = ""
DB_USER = "postgres"
DB_PASS = ""
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

class UserRegister(BaseModel):
    username: str
    password: str

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

@app.post("/api/register")
async def register(user_register: UserRegister):

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO evt.user (user_id, fullname, username, password, email, telegram_id) VALUES (default, 'ReactUser', %s, %s, 'reactuser@gmail.com', 1234567890);", (user_register.username, user_register.password))
    conn.commit()
    cur.close()
    conn.close()

    return {"username": user_register.username}

@app.get("/api/schedule_data")
async def get_schedule_data():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM evt.event;")
    query_results = cur.fetchall()
    cur.close()
    conn.close()

    return query_results