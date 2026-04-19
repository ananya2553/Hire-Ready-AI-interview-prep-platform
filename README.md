# Hire Ready - AI-Powered Interview Preparation Platform

![Dashboard Mockup](https://via.placeholder.com/800x400?text=Hire+Ready+SaaS+Platform)

Hire Ready is a futuristic, high-end monochromatic SaaS application designed to help candidates prepare for their technical interviews. The platform incorporates a premium dark-themed, glassmorphism-based UI, providing a seamless and highly interactive user experience. Features include role-based access control, interactive quizzes, automated assessments via Radar Charts, and dynamic animations.

## 🚀 Key Features

*   **SaaS-Grade UX/UI:** Uses a futuristic monochromatic dark theme with advanced CSS glassmorphism, Framer Motion micro-interactions (e.g., shake animations for incorrect inputs, smooth fade-outs), and subtle typography background effects.
*   **Secure Authentication:** End-to-end security using Spring Security and JWT. Protects private routes (`/quiz`, `/dsa`, `/dashboard`) using a `ProtectedRoute` wrapper in React and matching JWT filters on the backend.
*   **Granular Access Control:** Public views present locked quiz cards with a blur effect and a "Login to Unlock" prompt.
*   **Form Validation:** Implements Zod and React Hook Form for robust input validation on Login and Signup with immediate, animated feedback.
*   **Interactive Assessments:** Interactive quizzes and data-driven Radar Charts built with Chart.js to visually display candidate strengths and weaknesses.
*   **Resilient App Architecture:** Employs Error Boundaries to provide user-friendly fallback UIs directly on the frontend if the backend takes too long or fails.
*   **Mobile Responsiveness:** Perfected typography background and Radar Charts that scale gracefully across all screen sizes.

## 🛠️ Technology Stack

### Frontend (User Interface)
*   React 19 with Vite for ultra-fast HMR and building
*   Tailwind CSS for streamlined utility-first styling
*   Framer Motion for high-fidelity animations
*   Zod & React Hook Form for schema-based form validation
*   React Router DOM for seamless client-side routing
*   Chart.js / react-chartjs-2 for data visualization (Radar Charts)
*   html2canvas & jsPDF for exporting reports

### Backend (Core Server)
*   Java 17
*   Spring Boot 3.2.3
*   Spring Security & JJWT for Auth/Authorization
*   Spring Data JPA (Hibernate) & MySQL for persistent relational data storage

## 📦 Local Installation & Setup

### Prerequisites
*   Node.js (v18+)
*   Java 17 (JDK)
*   MySQL Server
*   Maven

### 1. Database Configuration
Ensure MySQL is running and create a database schema named `hire_ready`.
Update the database connection properties in `src/main/resources/application.properties` (or `application.yml`):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hire_ready
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Backend Setup
Navigate to the root directory and run the Spring Boot application using Maven:
```bash
# Clean and install dependencies
mvn clean install

# Run the backend application (typically runs on port 8080)
mvn spring-boot:run
```

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd hire-ready-frontend

# Install node dependencies
npm install

# Start the Vite development server
npm run dev
```
The frontend should now be running on `http://localhost:5173`.

## 🧪 Testing
The backend utilizes JUnit 5 with MockMvc to verify API security. Test cases specifically validate unauthorized access (401) and authorized access (200) to protected endpoints such as `/api/quiz/**` and `/api/dsa/**`.
To run tests locally:
```bash
mvn test
```

## 🔒 Security Posture
*   Requests are filtered through a custom `JwtRequestFilter`.
*   Unauthenticated users can only access endpoints explicitly marked as public (like `/api/auth/**`).
*   Passwords are securely encoded before storage.

## 📄 License
This project is proprietary and intended for restricted use as part of the Hire Ready platform. All rights reserved.
