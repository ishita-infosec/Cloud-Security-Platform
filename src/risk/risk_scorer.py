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