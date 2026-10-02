def detect_event(event):
    suspicious_events = {
        "ConsoleLogin",
        "CreateAccessKey",
        "CreateUser",
        "AttachUserPolicy",
        "AttachRolePolicy",
        "PutUserPolicy",
        "PutRolePolicy",
        "DeleteTrail",
        "StopLogging",
    }

    event_name = event.get("event_name")

    if event_name in suspicious_events:
        return {
            "is_suspicious": True,
            "reason": f"Security-sensitive action detected: {event_name}"
        }

    return {
        "is_suspicious": False,
        "reason": None
    }