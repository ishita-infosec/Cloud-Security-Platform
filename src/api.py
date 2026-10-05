from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.database import get_connection


app = FastAPI(
    title="Cloud Security Monitoring API",
    description="API for AWS Cloud Security Monitoring Platform",
    version="1.0.0"
)


# ==================================================
# CORS CONFIGURATION
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================================================
# ROOT
# ==================================================

@app.get("/")
def root():
    return {
        "message": "Cloud Security Monitoring API is running"
    }


# ==================================================
# GET ALL SECURITY EVENTS
# ==================================================

@app.get("/events")
def get_events():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            event_time,
            event_name,
            event_source,
            username,
            aws_region,
            resource_name,
            is_suspicious,
            detection_reason,
            risk_score,
            severity
        FROM security_events
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    connection.close()

    events = []

    for row in rows:

        events.append({
            "id": row[0],
            "event_time": row[1],
            "event_name": row[2],
            "event_source": row[3],
            "username": row[4],
            "aws_region": row[5],
            "resource_name": row[6],
            "is_suspicious": bool(row[7]),
            "detection_reason": row[8],
            "risk_score": row[9],
            "severity": row[10]
        })

    return events


# ==================================================
# SECURITY SUMMARY
# ==================================================

@app.get("/summary")
def get_summary():

    connection = get_connection()
    cursor = connection.cursor()


    # ----------------------------------------------
    # TOTAL EVENTS
    # ----------------------------------------------

    cursor.execute("""
        SELECT COUNT(*)
        FROM security_events
    """)

    total_events = cursor.fetchone()[0]


    # ----------------------------------------------
    # SUSPICIOUS EVENTS
    # ----------------------------------------------

    cursor.execute("""
        SELECT COUNT(*)
        FROM security_events
        WHERE is_suspicious = 1
    """)

    suspicious_events = cursor.fetchone()[0]


    # ----------------------------------------------
    # HIGH RISK EVENTS
    # ----------------------------------------------

    cursor.execute("""
        SELECT COUNT(*)
        FROM security_events
        WHERE severity = 'High'
    """)

    high_risk_events = cursor.fetchone()[0]


    # ----------------------------------------------
    # CRITICAL RISK EVENTS
    # ----------------------------------------------

    cursor.execute("""
        SELECT COUNT(*)
        FROM security_events
        WHERE severity = 'Critical'
    """)

    critical_risk_events = cursor.fetchone()[0]


    connection.close()


    return {
        "total_events": total_events,
        "suspicious_events": suspicious_events,
        "high_risk_events": high_risk_events,
        "critical_risk_events": critical_risk_events
    }