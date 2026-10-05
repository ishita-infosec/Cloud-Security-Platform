class SecurityEvent:
    def __init__(
        self,
        event_time=None,
        event_name=None,
        event_source=None,
        username=None,
        aws_region=None,
        resource_name=None,
        is_suspicious=False,
        detection_reason=None,
        risk_score=0,
        severity="Low"
    ):
        self.event_time = event_time
        self.event_name = event_name
        self.event_source = event_source
        self.username = username
        self.aws_region = aws_region
        self.resource_name = resource_name
        self.is_suspicious = is_suspicious
        self.detection_reason = detection_reason
        self.risk_score = risk_score
        self.severity = severity