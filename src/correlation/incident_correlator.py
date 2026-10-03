from datetime import datetime, timedelta


def correlate_events(events):
    suspicious_events = [
        event for event in events
        if event.get("detection", {}).get("is_suspicious") is True
    ]

    incidents = []

    for event in suspicious_events:
        event_time = datetime.fromisoformat(
            event["event"]["event_time"].replace("Z", "+00:00")
        )

        related_events = []

        for other_event in suspicious_events:
            other_time = datetime.fromisoformat(
                other_event["event"]["event_time"].replace("Z", "+00:00")
            )

            if abs(event_time - other_time) <= timedelta(minutes=5):
                related_events.append(other_event)

        if len(related_events) >= 2:
            incidents.append({
                "incident_type": "Multiple security-sensitive actions",
                "event_count": len(related_events),
                "events": related_events
            })

    return incidents