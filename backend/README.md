# 🩺 HealthCheck 3D

### Your Personal Wellness Guide — Understand your health. Improve your life.

HealthCheck 3D is a modern wellness web application that helps users explore basic health information, assess personal health indicators, and receive general wellness recommendations through an interactive interface.

The platform combines a health assessment system, BMI analysis, lifestyle guidance, and an AI-powered wellness chatbot into one experience.

> ⚠️ **Disclaimer:** HealthCheck 3D is designed for educational and informational purposes only. It does not provide medical diagnosis, treatment, or professional medical advice.

---

## ✨ Features

### 🩺 Personal Health Assessment
Users can enter basic health information including:

- Age and gender
- Height and weight
- Blood sugar level
- Blood pressure
- Cholesterol level
- Existing health conditions

### 📊 BMI Analysis
The application calculates Body Mass Index (BMI) and provides a clear health overview.

### 💡 Personalized Wellness Insights
Based on the information provided, the system generates general wellness recommendations.

### 🏃 Exercise & Lifestyle Guidance
Explore information about:

- Walking
- Cycling
- Stretching
- Strength training
- Sleep
- Hydration
- Healthy daily habits

### 🥗 Nutrition Guidance
Learn about balanced nutrition including:

- Vegetables
- Fruits
- Protein
- Whole grains
- Hydration

### 🤖 HealthCheck AI
An integrated AI wellness assistant that can answer general questions about:

- Healthy eating
- Exercise
- Sleep
- Hydration
- BMI
- Healthy lifestyle habits

### 🎨 Modern Interactive UI
A clean, responsive, and visually engaging wellness experience with a modern 3D-inspired interface.

---

## 🛠️ Built With

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Java 17
- Spring Boot
- Maven

### AI Integration

- Google Gemini API

### Tools

- Git
- GitHub
- VS Code

---

## 📁 Project Structure

```text
HealthCheck-3D/
│
├── backend/
│   │
│   ├── src/main/java/com/healthcheck/
│   │   ├── controller/
│   │   │   ├── HealthController.java
│   │   │   └── ChatController.java
│   │   │
│   │   ├── service/
│   │   │   ├── BmiCalculator.java
│   │   │   ├── HealthAnalyzer.java
│   │   │   ├── RecommendationService.java
│   │   │   └── ChatService.java
│   │   │
│   │   ├── model/
│   │   │   └── HealthData.java
│   │   │
│   │   └── HealthApplication.java
│   │
│   └── src/main/resources/
│       ├── static/
│       │   ├── index.html
│       │   ├── health.html
│       │   ├── result.html
│       │   ├── style.css
│       │   ├── script.js
│       │   └── chatbot.js
│       │
│       └── application.properties
│
├── README.md
└── pom.xml
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Binusha0826/HealthCheck-3D.git
```

### 2. Navigate to the backend directory

```bash
cd HealthCheck-3D/backend
```

### 3. Configure your environment

Add your Gemini API key securely using environment variables or your local configuration.

> 🔐 Never commit API keys or sensitive credentials to a public repository.

### 4. Run the application

```bash
mvn spring-boot:run
```

### 5. Open in your browser

```text
http://localhost:8080/
```

---

## 🧠 How It Works

```text
User Input
    ↓
Health Assessment
    ↓
Spring Boot Backend
    ↓
BMI & Health Analysis
    ↓
Wellness Recommendations
    ↓
Personalized Health Overview
```

For AI questions:

```text
User Question
    ↓
HealthCheck AI
    ↓
Spring Boot Backend
    ↓
Gemini API
    ↓
AI Wellness Response
```

---

## 🔐 Security

Sensitive values such as API keys should be kept outside the public repository.

Use environment variables or secure hosting platform configuration when deploying the application.

Example:

```properties
GEMINI_API_KEY=your_api_key_here
```

---

## 🌿 Project Vision

HealthCheck 3D aims to make basic wellness information more interactive, accessible, and engaging.

The project brings together:

**Health Awareness · Technology · AI · Interactive Design**

---

## ⚠️ Medical Disclaimer

HealthCheck 3D does not replace professional healthcare services.

The information and recommendations provided by the application are general educational estimates and should not be used for medical diagnosis or treatment.

Always consult a qualified healthcare professional for medical concerns.

---

<div align="center">

### 🩺 HealthCheck 3D

**Understand your health. Improve your life.**

⭐ If you like this project, consider giving it a star!

</div>