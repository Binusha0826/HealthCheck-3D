# HealthCheck 3D 🩺

HealthCheck 3D is an educational wellness web application designed to help users understand basic health indicators and develop healthier lifestyle habits.

## 🌿 About the Project

HealthCheck 3D provides a simple and interactive way to explore health, nutrition, exercise, and wellness information.

Users can complete a health assessment by entering basic information such as age, gender, height, weight, blood sugar, blood pressure, cholesterol, and selected health conditions.

The system calculates BMI and provides a personalized wellness overview based on the information provided.

> **Disclaimer:** HealthCheck 3D provides educational information only and is not a medical diagnosis or a replacement for professional medical advice.

## ✨ Features

- 🩺 Personal health assessment
- 📊 BMI calculation
- 💡 Personalized wellness recommendations
- ❤️ Basic health awareness information
- 🥗 Nutrition guidance
- 🏃 Exercise and activity guidance
- 💧 Hydration and lifestyle information
- 🤖 HealthCheck AI wellness chatbot
- 📱 Responsive user interface
- 🎨 Interactive 3D-inspired landing page

## 🤖 HealthCheck AI

HealthCheck AI is an integrated AI wellness assistant that allows users to ask general questions about:

- Healthy eating
- Exercise
- Sleep
- Hydration
- BMI
- Healthy lifestyle habits

The chatbot uses an AI API through the Spring Boot backend.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Java
- Spring Boot
- Maven

### AI
- Gemini API

### Development Tools
- Git
- GitHub
- VS Code

## 📁 Project Structure

```text
Health_Check/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── healthcheck/
│   │   │   │           ├── controller/
│   │   │   │           ├── service/
│   │   │   │           └── model/
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── static/
│   │   │       │   ├── index.html
│   │   │       │   ├── health.html
│   │   │       │   ├── result.html
│   │   │       │   ├── style.css
│   │   │       │   ├── script.js
│   │   │       │   └── chatbot.js
│   │   │       │
│   │   │       └── application.properties
│   │   │
│   │   └── ...
│   │
│   └── pom.xml
│
└── README.md