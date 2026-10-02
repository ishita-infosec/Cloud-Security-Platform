def normalize_event(event):
    normalized = {
        "event_time": str(event.get("EventTime")),
        "event_name": event.get("EventName"),
        "event_source": event.get("EventSource"),
        "username": event.get("Username"),
        "aws_region": event.get("AwsRegion"),
        "resource_name": event.get("Resources", [{}])[0].get("ResourceName")
        if event.get("Resources") else None
    }

    return normalized