import boto3


SOURCE_PROFILE = "cloud-security-project"
ROLE_ARN = "arn:aws:iam::666823181910:role/CloudShieldMonitoringRole"
SESSION_NAME = "CloudShieldBackendSession"


def assume_cloudshield_role():
    session = boto3.Session(
        profile_name=SOURCE_PROFILE
    )

    sts = session.client("sts")

    response = sts.assume_role(
        RoleArn=ROLE_ARN,
        RoleSessionName=SESSION_NAME
    )

    credentials = response["Credentials"]

    return {
        "access_key_id": credentials["AccessKeyId"],
        "secret_access_key": credentials["SecretAccessKey"],
        "session_token": credentials["SessionToken"],
        "expiration": credentials["Expiration"],
    }


def get_cloudtrail_client():
    credentials = assume_cloudshield_role()

    return boto3.client(
        "cloudtrail",
        region_name="eu-north-1",
        aws_access_key_id=credentials["access_key_id"],
        aws_secret_access_key=credentials["secret_access_key"],
        aws_session_token=credentials["session_token"],
    )