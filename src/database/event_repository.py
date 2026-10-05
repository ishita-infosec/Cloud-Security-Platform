from src.database.database import get_connection


def save_event(processed_event):
    event = processed_event.get("event", {})
    detection = processed_event.get("detection", {})
    risk = processed_event.get("risk", {})

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO security_events (
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
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        event.get("event_time"),
        event.get("event_name"),
        event.get("event_source"),
        event.get("username"),
        event.get("aws_region"),
        event.get("resource_name"),
        int(detection.get("is_suspicious", False)),
        detection.get("reason"),
        risk.get("risk_score", 0),
        risk.get("severity", "Low")
    ))

    connection.commit()
    connection.close()