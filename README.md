# CloudShield - Cloud Security Monitoring Platform

CloudShield is an AWS-based cloud security monitoring platform developed as a final-year cybersecurity project.

The platform collects AWS CloudTrail activity, normalizes events, detects security-sensitive activities, calculates risk scores, stores security events, and presents the results through a web-based security dashboard.

---

## Project Overview

Cloud environments generate a large number of audit and activity events. Manually analyzing these events can make it difficult to identify security-sensitive activities quickly.

CloudShield provides a centralized monitoring pipeline:

AWS CloudTrail
        ↓
CloudTrail Collector
        ↓
Event Normalization
        ↓
Threat Detection
        ↓
Risk Scoring
        ↓
Event Correlation
        ↓
SQLite Database
        ↓
FastAPI
        ↓
React Dashboard

---

## Key Features

### AWS CloudTrail Monitoring

- Collects AWS CloudTrail events using Boto3
- Supports AWS region-based monitoring
- Processes recent CloudTrail activity
- Stores processed security events

### Event Normalization

CloudTrail events are converted into a common internal format containing:

- Event time
- Event name
- Event source
- Username
- AWS region
- Resource name

### Threat Detection

The detection engine currently identifies security-sensitive AWS activities including:

- ConsoleLogin
- CreateAccessKey
- CreateUser
- AttachUserPolicy
- AttachRolePolicy
- PutUserPolicy
- PutRolePolicy
- DeleteTrail
- StopLogging

### Risk Scoring

Detected activities are assigned risk scores and severity levels.

| Risk Score | Severity |
|------------|----------|
| 0-30 | Low |
| 31-60 | Medium |
| 61-80 | High |
| 81-100 | Critical |

### Event Correlation

Related suspicious events occurring within a defined time window can be grouped into security incidents.

### Security Dashboard

The React dashboard provides:

- Security Overview
- Alerts
- Incidents
- Events Explorer
- Risk Analysis
- AWS Assets
- Threat Detection
- System Health
- Settings
- Dark/Light mode

### REST API

FastAPI provides endpoints for dashboard integration:

- `/`
- `/events`
- `/summary`

---

## Technology Stack

### Cloud

- Amazon Web Services (AWS)
- AWS CloudTrail
- AWS IAM
- AWS CLI

### Backend

- Python
- Boto3
- FastAPI
- Uvicorn

### Database

- SQLite

### Frontend

- React
- Vite
- JavaScript
- Lucide React

### Development

- Git
- GitHub
- Visual Studio Code

---

## Project Structure

```text
Cloud-Security-Platform/
│
├── dashboard/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── overview/
│   │   │   ├── alerts/
│   │   │   ├── incidents/
│   │   │   ├── events/
│   │   │   ├── risk/
│   │   │   ├── assets/
│   │   │   ├── detection/
│   │   │   ├── system/
│   │   │   └── settings/
│   │   └── services/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── src/
│   ├── aws/
│   ├── ingestion/
│   │   └── cloudtrail_collector.py
│   ├── normalization/
│   │   └── cloudtrail_normalizer.py
│   ├── detection/
│   │   └── cloudtrail_detector.py
│   ├── correlation/
│   │   └── incident_correlator.py
│   ├── risk/
│   │   └── risk_scorer.py
│   ├── database/
│   │   ├── database.py
│   │   ├── event_repository.py
│   │   └── models.py
│   └── api.py
│
├── tests/
├── docs/
├── reports/
├── requirements.txt
├── .gitignore
└── README.md
