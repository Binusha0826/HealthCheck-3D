# HealthCheck 3D 🩺

HealthCheck 3D is an interactive health and wellness web application designed to help users understand basic health indicators and develop healthier lifestyle habits.

The application combines a modern 3D-inspired frontend with a Java Spring Boot backend and an AI-powered wellness chatbot.

## 🌐 Live Demo

🚀 **Live Application:**  
https://healthcheck3d.velixir.run/

---

## 🌿 About the Project

HealthCheck 3D provides a simple and interactive platform for exploring health, nutrition, exercise, and wellness information.

Users can complete a health assessment by entering basic information such as:

- Age
- Gender
- Height
- Weight
- Blood sugar level
- Blood pressure level
- Cholesterol level
- Selected health conditions

The system calculates the user's BMI and generates a personalized wellness overview based on the provided information.

The application also includes **HealthCheck AI**, an AI-powered wellness chatbot that can answer general questions about healthy lifestyle habits.

> ⚠️ **Disclaimer:** HealthCheck 3D provides educational and general wellness information only. It is not a medical diagnosis and should not replace professional medical advice.

---

## ✨ Features

### 🩺 Health Assessment
- Enter basic personal health information
- Record selected health indicators
- Identify basic wellness concerns

### 📊 BMI Calculator
- Calculates BMI using height and weight
- Provides a simple BMI-based wellness overview

### 💡 Personalized Recommendations
- Generates wellness recommendations based on submitted information
- Provides general lifestyle guidance

### ❤️ Health Awareness
- Basic information about common health topics
- Educational wellness content

### 🥗 Nutrition Guidance
- Healthy eating information
- General nutrition and lifestyle tips

### 🏃 Exercise Guidance
- Exercise and physical activity information
- Beginner-friendly wellness guidance

### 💧 Lifestyle & Hydration
- Hydration awareness
- Healthy lifestyle information

### 🤖 HealthCheck AI
- AI-powered wellness chatbot
- Answers general health and lifestyle questions
- Provides information about nutrition, exercise, sleep, hydration, BMI, and healthy habits

### 📱 Responsive Design
- Responsive user interface
- Designed for desktop and mobile screens

### 🎨 Interactive UI
- Modern 3D-inspired landing page
- Animated interface elements
- Interactive sections and cards

---

## 🤖 HealthCheck AI

HealthCheck AI is an integrated AI wellness assistant built into the application.

Users can ask questions such as:

- What is a healthy breakfast?
- How can I improve my sleep?
- What exercises are good for beginners?
- How much water should I drink?
- How can I maintain a healthy lifestyle?

### 🔄 How It Works

```text
User
  │
  ▼
Chatbot Interface
  │
  ▼
JavaScript Fetch API
  │
  ▼
Spring Boot REST API
  │
  ▼
Gemini API
  │
  ▼
AI Response
  │
  ▼
Chatbot Interface
```

The Gemini API key is not hard-coded into the application. It is provided through an environment variable.

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Java
- Spring Boot
- REST API
- Maven

### AI Integration

- Gemini API

### Development Tools

- Visual Studio Code
- Git
- GitHub

### Deployment

- Velixir

---

## 🏗️ Application Architecture

HealthCheck 3D follows a simple frontend-backend architecture.

```text
Frontend
HTML + CSS + JavaScript
        │
        │ REST API
        ▼
Spring Boot Backend
        │
        ├── Health Assessment
        ├── BMI Calculation
        └── AI Chat Service
                │
                ▼
           Gemini API
```

---

## 📁 Project Structure

```text
HealthCheck-3D/
│
├── backend/
│   ├── pom.xml
│   │
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/
│           │       └── healthcheck/
│           │           ├── HealthApplication.java
│           │           │
│           │           ├── controller/
│           │           │   ├── ChatController.java
│           │           │   └── HealthController.java
│           │           │
│           │           ├── model/
│           │           │   └── HealthData.java
│           │           │
│           │           └── service/
│           │               ├── BmiCalculator.java
│           │               └── ChatService.java
│           │
│           └── resources/
│               ├── application.properties
│               │
│               └── static/
│                   ├── index.html
│                   ├── health.html
│                   ├── result.html
│                   ├── result.js
│                   ├── script.js
│                   ├── style.css
│                   └── chatbot.js
│
└── README.md
```

---

## ⚙️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Binusha0826/HealthCheck-3D.git
```

### 2. Navigate to the Backend

```bash
cd HealthCheck-3D/backend
```

### 3. Configure the Gemini API Key

The application reads the Gemini API key from an environment variable.

Set:

```text
GEMINI_API_KEY=your_api_key
```

The application configuration uses:

```properties
gemini.api.key=${GEMINI_API_KEY}
```

> Never commit your real API key to GitHub.

### 4. Run the Application

Using Maven:

```bash
mvn spring-boot:run
```

### 5. Open the Application

Open:

```text
http://localhost:8080/
```

---

## 🔐 Security

The Gemini API key is stored outside the source code using an environment variable.

This prevents the actual API key from being exposed in the GitHub repository.

```text
GEMINI_API_KEY
```

---

## 🧪 Testing

The application was tested for:

- Health assessment form submission
- BMI calculation
- Wellness recommendations
- AI chatbot interaction
- REST API communication
- API response handling
- Responsive interface
- Production deployment

The AI chatbot successfully communicates with the backend REST endpoint and receives AI responses from the Gemini API.

---

## 🚀 Deployment

The application is deployed as a Spring Boot application.

### Production Environment

- Platform: Velixir
- Backend: Spring Boot
- Java Runtime: Java 21
- Build Tool: Maven
- AI Integration: Gemini API

### Live Application

https://healthcheck3d.velixir.run/

---

## 🔮 Future Improvements

Possible future improvements include:

- User accounts and authentication
- Health history tracking
- Database integration
- Health progress dashboards
- More advanced health analytics
- Additional AI-powered wellness features
- Improved accessibility
- More personalized wellness recommendations

---

## 👨‍💻 Developer

**Binusha**

GitHub:  
https://github.com/Binusha0826

---

## 📄 License

This project was developed for educational and portfolio purposes.
