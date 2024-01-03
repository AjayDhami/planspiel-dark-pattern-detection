# Description

This is backend service of Dark Pattern Detection Project. It involves creating backend APIs for UI Dashboard.

# Installation

```bash
$ npm install
```

## Configuration Steps

- Create `.env.<ENV_NAME>` file in root directory of your `backend-api` project.
- Refer to `sample.env` file and replace with actual values.
- Once the project is running, open your web browser and navigate to the Swagger UI: [http://localhost:8080/api-docs](http://localhost:8080/api-docs) (This local URL can vary depending upon 
  the URL your server is using.)


## Running the app
- `NODE_ENV` refers to the name of the environment *(ENV_NAME)* that you set up in your local machine in configuration steps.

```bash
# navigate to project directory
$ cd backend-api

# development mode
$ NODE_ENV=ENV_NAME npm run start

# watch mode
$ NODE_ENV=ENV_NAME npm run start:dev

# debug mode
$ NODE_ENV=ENV_NAME npm run start:debug
```

## Stay in touch

- Website - [V-Tenet](https://v-tenet.vercel.app/)
- LinkedIn - [LinkedIn](https://www.linkedin.com/in/v-tenet/)
