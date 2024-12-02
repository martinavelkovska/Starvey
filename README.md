Employee Survey Management Web Application

Overview 
This web application allows HR managers to create, manage, and analyze employee surveys using modern JavaScript technologies. It is built with Next.js, React, and Prisma (for PostgreSQL database interaction), and integrates Hugging Face's API for sentiment analysis of survey responses. The app provides real-time feedback and automatically sends survey links and reports to the survey owner's email using Mailtrap.

Features
Create and manage surveys: HR managers can design and distribute surveys to employees.
Real-time survey feedback: Instant analysis and updates based on survey responses.
Sentiment analysis: Analyze employee responses to gauge sentiment using the Hugging Face API.
Email notifications: Survey links and reports are sent to the survey owner’s email (via Mailtrap) for sharing with employees.
Responsive design: Built with Next.js and React for a dynamic, interactive user experience.
Technologies Used
Next.js: A React framework for building dynamic web applications.
React: A JavaScript library for building user interfaces.
Prisma: An ORM (Object-Relational Mapping) for PostgreSQL database management.
Hugging Face API: For sentiment analysis of survey responses.
Mailtrap: For email testing and ensuring reliable email delivery.
Installation
To set up the project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/employee-survey-app.git
Navigate into the project directory:

bash
Copy code
cd employee-survey-app
Install the required dependencies:

bash
Copy code
npm install
Set up your environment variables. Copy the .env.example file to .env and add your credentials for the PostgreSQL database and Mailtrap:

bash
Copy code
cp .env.example .env
Run the application:

bash
Copy code
npm run dev
Open the app in your browser at http://localhost:3000.

Usage
HR managers can  create new surveys, and define survey questions.
After the survey is published, employees will receive the link to complete the survey.
Once responses are collected, HR managers can review the feedback, including sentiment analysis results.

License
This project is licensed under the MIT License - see the LICENSE file for details.
