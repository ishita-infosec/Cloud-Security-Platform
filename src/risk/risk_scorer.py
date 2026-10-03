def calculate_risk_score(event):
    event_name = event.get("event", {}).get("event_name")

    risk_scores = {
        "ConsoleLogin": 20,
        "CreateAccessKey": 50,
        "CreateUser": 60,
        "AttachUserPolicy": 70,
        "AttachRolePolicy": 70,
        "PutUserPolicy": 70,
        "PutRolePolicy": 70,
        "DeleteTrail": 90,
        "StopLogging": 90,
    }

    score = risk_scores.get(event_name, 0)

    if score >= 81:
        severity = "Critical"
    elif score >= 61:
        severity = "High"
    elif score >= 31:
        severity = "Medium"
    else:
        severity = "Low"

    return {
        "risk_score": score,
        "severity": severity
    }


def calculate_incident_risk(incident):
    events = incident.get("events", [])

    if not events:
        return {
            "risk_score": 0,
            "severity": "Low"
        }

    scores = [
        event.get("risk", {}).get("risk_score", 0)
        for event in events
    ]

    total_score = sum(scores)

    risk_score = min(total_score, 100)

    if risk_score >= 81:
        severity = "Critical"
    elif risk_score >= 61:
        severity = "High"
    elif risk_score >= 31:
        severity = "Medium"
    else:
        severity = "Low"

    return {
        "risk_score": risk_score,
        "severity": severity
    }