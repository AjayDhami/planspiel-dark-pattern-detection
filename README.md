# V-Tenet Dark Pattern Detection Project

Welcome to the V-Tenet Dark Pattern Detection Project. This is a Research Project created by V-Tenet team for the **Plasnpiel Web Engineering** at [Technische Universität Chemnitz](https://www.tu-chemnitz.de/index.html).

## Introduction

The V-Tenet Dark Pattern Detection Application is designed to analyze websites for the presence of dark patterns and certify them if they are deemed free of such manipulative practices.

You can check out the code for the project using [this link](https://gitlab.hrz.tu-chemnitz.de/vsr/edu/planspiel/WS2324/v-tenet).

This project consist of three modules:

- Frontend `frontend`
- Backend `backend-api`
- ML Service `ml-model-service`

Each component is containerized using [Docker](https://www.docker.com/) to ensure easy deployment and scalability.

### [Frontend](https://gitlab.hrz.tu-chemnitz.de/vsr/edu/planspiel/WS2324/v-tenet/-/tree/main/frontend)

The frontend section is responsible for the user interface of the application. Users interact with this component to input the websites they want to analyze for dark patterns. The frontend communicates with the backend to submit requests and receive certification results. It is developed with UI logic to enhance user experience.

### [ML Service](https://gitlab.hrz.tu-chemnitz.de/vsr/edu/planspiel/WS2324/v-tenet/-/tree/main/ml-model-service)

The ML Service is the core of the dark pattern detection process. It employs web scraping techniques to analyze the provided websites for any signs of dark patterns. Machine learning models are utilized to identify patterns and make informed decisions. The ML Service communicates with the backend to send analysis results.

### [Backend](https://gitlab.hrz.tu-chemnitz.de/vsr/edu/planspiel/WS2324/v-tenet/-/tree/main/backend-api)

The backend serves as the central hub of the application. It handles the business logic, manages communication between the **Frontend** and **ML Service**, and stores relevant data in a [MongoDB](https://www.mongodb.com/) database. The backend orchestrates the entire workflow, ensuring seamless integration between the user interface and the dark pattern detection process.

## Getting Started

Follow these steps to set up the V-Tenet Dark Pattern Detection Application on your system:

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- npm (Node Package Manager): npm is included with Node.js installation.
- Python [Download and Install Python](https://www.python.org/downloads/)
- Docker [Download and Install Docker](https://www.docker.com/get-started/)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://gitlab.hrz.tu-chemnitz.de/vsr/edu/planspiel/WS2324/v-tenet.git
   cd v-tenet-dark-pattern-detection
   ```

2. Build the Docker containers for each section:

   ```bash
   docker-compose build
   ```

3. Start the Docker containers:

   ```bash
   docker-compose up
   ```

   The application will be accessible at http://localhost:3000.

4. To stop the application, run the command:

   ```bash
   docker-compose down
   ```

## Contributors

Ajay Dhami: [Github](https://github.com/AjayDhami) | [Linkedin](https://www.linkedin.com/in/ajay-dhami/) <br/>
Amay Rajvaidya: [Github](https://github.com/AMAY27) | [Linkedin](https://www.linkedin.com/in/amay-rajvaidya-886291188/) <br/>
Drashti Patel: [Github](https://github.com/pdrashti8) | [Linkedin](https://www.linkedin.com/in/drashtipatel89) <br/>
Kashfa Sezuti: [Github](https://github.com/kashfasehejatsezuti) | [Linkedin](https://www.linkedin.com/in/kashfa-sehejat-sezuti/) <br/>
Prabudh Mishra: [Github](https://github.com/prabudh-mishra) | [Linkedin](https://www.linkedin.com/in/prabudhmishra)

## Stay in Touch

Feel free to reach out to the developers for any questions or feedback. Here are some ways to stay in touch:

- Website: [V-Tenet](https://v-tenet.vercel.app/)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/v-tenet/)
