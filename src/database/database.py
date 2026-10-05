import sqlite3

DATABASE_PATH = "cloud_security.db"


def get_connection():
    return sqlite3.connect(DATABASE_PATH)


def create_database():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS security_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_time TEXT,
            event_name TEXT,
            event_source TEXT,
            username TEXT,
            aws_region TEXT,
            resource_name TEXT,
            is_suspicious INTEGER DEFAULT 0,
            detection_reason TEXT,
            risk_score INTEGER DEFAULT 0,
            severity TEXT DEFAULT 'Low'
        )
    """)

    connection.commit()
    connection.close()

    print("Database and tables created successfully.")