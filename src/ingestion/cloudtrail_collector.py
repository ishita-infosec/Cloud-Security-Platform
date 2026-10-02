import boto3
import json

from src.normalization.cloudtrail_normalizer import normalize_event

from src.detection.cloudtrail_detector import detect_event

session = boto3.Session(profile_name="cloud-security-project")

cloudtrail = session.client("cloudtrail", region_name="eu-north-1")

response = cloudtrail.lookup_events(MaxResults=10)

events = response["Events"]

print(f"Total events collected: {len(events)}")

for event in events:
    normalized = normalize_event(event)
    detection = detect_event(normalized)

    print(json.dumps({
        "event": normalized,
        "detection": detection
    }, indent=2))