import json

from src.aws.role_session import get_cloudtrail_client
from src.normalization.cloudtrail_normalizer import normalize_event
from src.detection.cloudtrail_detector import detect_event
from src.correlation.incident_correlator import correlate_events
from src.risk.risk_scorer import calculate_risk_score, calculate_incident_risk
from src.database.event_repository import save_event


cloudtrail = get_cloudtrail_client()


response = cloudtrail.lookup_events(
    MaxResults=10
)

events = response.get("Events", [])

print(f"Total events collected: {len(events)}")


processed_events = []


for event in events:

    normalized = normalize_event(event)

    detection = detect_event(normalized)

    processed_event = {
        "event": normalized,
        "detection": detection
    }


    if detection["is_suspicious"]:

        risk = calculate_risk_score(
            processed_event
        )

    else:

        risk = {
            "risk_score": 0,
            "severity": "Low"
        }


    processed_event["risk"] = risk

    save_event(processed_event)

    processed_events.append(
        processed_event
    )


print("\nProcessed Events:")

print(
    json.dumps(
        processed_events,
        indent=2,
        default=str
    )
)


incidents = correlate_events(
    processed_events
)


for incident in incidents:

    incident["risk"] = calculate_incident_risk(
        incident
    )


print("\nIncidents:")

print(
    json.dumps(
        incidents,
        indent=2,
        default=str
    )
)