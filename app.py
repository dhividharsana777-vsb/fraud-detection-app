from flask import Flask, render_template, request, redirect, session
import sqlite3
import numpy as np
from sklearn.linear_model import LogisticRegression
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = "secret123"

# ------------------ DATABASE ------------------
def init_db():
    conn = sqlite3.connect("app.db")
    
    conn.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
    """)

    conn.execute("""
    CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        fraud REAL
    )
    """)

    conn.commit()
    conn.close()

init_db()

# ------------------ ML MODEL ------------------
X = np.array([
    [0,0,20,1],
    [1,1,80,5],
    [1,0,90,6],
    [0,1,10,1]
])
y = np.array([0,1,1,0])

model = LogisticRegression()
model.fit(X, y)

# ------------------ ROUTES ------------------

# LOGIN PAGE
@app.route('/')
def home():
    return render_template("login.html")

# SIGNUP PAGE
@app.route('/signup')
def signup():
    return render_template("signup.html")

# CREATE ACCOUNT
@app.route('/create', methods=['POST'])
def create():
    u = request.form['username'].strip()
    p = generate_password_hash(request.form['password'].strip())

    conn = sqlite3.connect("app.db")

    existing = conn.execute(
        "SELECT * FROM users WHERE username=?",
        (u,)
    ).fetchone()

    if existing:
        conn.close()
        return "⚠️ Username already exists!"

    conn.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (u, p)
    )
    conn.commit()
    conn.close()

    return redirect('/')

# LOGIN CHECK
@app.route('/login', methods=['POST'])
def login():
    u = request.form['username'].strip()
    p = request.form['password'].strip()

    conn = sqlite3.connect("app.db")
    user = conn.execute(
        "SELECT username, password FROM users WHERE username=?",
        (u,)
    ).fetchone()
    conn.close()

    if user and check_password_hash(user[1], p):
        session['user'] = u
        return redirect('/dashboard')

    return "❌ Invalid Login"

# DASHBOARD
@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect('/')
    return render_template("dashboard.html", user=session['user'])

# PREDICT
@app.route('/predict', methods=['POST'])
def predict():
    if 'user' not in session:
        return redirect('/')

    loc = int(request.form['location'])
    dev = int(request.form['device'])
    score = float(request.form['score'])
    vel = float(request.form['velocity'])

    data = [[loc, dev, score, vel]]
    prob = model.predict_proba(data)[0][1]
    percent = round(prob * 100, 2)

    conn = sqlite3.connect("app.db")
    conn.execute(
        "INSERT INTO history (username, fraud) VALUES (?, ?)",
        (session['user'], percent)
    )
    conn.commit()
    conn.close()

    return render_template("result.html", result=percent)

# HISTORY
@app.route('/history')
def history():
    if 'user' not in session:
        return redirect('/')

    conn = sqlite3.connect("app.db")
    data = conn.execute(
        "SELECT fraud FROM history WHERE username=?",
        (session['user'],)
    ).fetchall()
    conn.close()

    values = [i[0] for i in data]

    return render_template("history.html", values=values)

# LOGOUT
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

# RUN
if __name__ == "__main__":
    app.run(debug=True)