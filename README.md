# HealthCheck 3D 🩺

A modern health and wellness assessment website designed as a Java internship portfolio project.

## Current version

This starter version is a **front-end prototype** using:
- HTML5
- CSS3
- Vanilla JavaScript
- Session Storage

It includes:
- Animated 3D-inspired landing page
- Health education sections
- Step-by-step health assessment
- BMI calculation
- Basic wellness recommendations
- Medical disclaimer
- Responsive mobile design

## Pages

- `index.html` – Home / landing page
- `health.html` – Assessment form
- `result.html` – Personalized educational overview

## Run locally

Open `index.html` in a browser. No installation is required for the front-end prototype.

## Next Java internship upgrade

Connect this frontend to a Java Spring Boot REST API.

Suggested backend structure:

```text
src/main/java/com/healthcheck/
├── HealthApplication.java
├── controller/
│   └── HealthController.java
├── model/
│   └── HealthData.java
└── service/
    ├── BmiCalculator.java
    ├── HealthAnalyzer.java
    └── RecommendationService.java
```

Suggested API:

`POST /api/health/analyze`

The frontend can send the assessment JSON to the Java API and display the returned analysis.

## Important

This is an educational wellness project. It must not be presented as a medical diagnosis system. Values and recommendations are simplified examples and should not replace professional medical advice.
