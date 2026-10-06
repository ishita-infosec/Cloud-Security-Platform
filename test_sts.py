from src.aws.role_session import get_cloudtrail_client


cloudtrail = get_cloudtrail_client()

response = cloudtrail.lookup_events(
    MaxResults=5
)

events = response.get("Events", [])

print(f"CloudTrail events received: {len(events)}")

for event in events:
    print(
        event.get("EventName"),
        "|",
        event.get("EventSource")
    )