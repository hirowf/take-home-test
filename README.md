# ScootTodo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.2.

## Prerequisites

Node.js, versions supported: 14.20.x, 16.13.x or 18.10.x and npm installed on your local machine.

## Clone the Repository

To run the project locally, first, you need to clone the repository to your local machine.

## Install Dependencies

Navigate to the project directory and install all the required dependencies using the command below:

```bash
npm install
```

## Run the Application

Once all dependencies are installed, you can run the application using the following command:

```bash
npm run start
```

or

```bash
ng serve
```

This will start the development server and open the application in your default web browser.

## Running the Server

To interact with the application, a server needs to be running. Open another terminal window and navigate to the project directory, then run the following command:

```bash
npx json-server --watch db.json
```

This command will start the JSON server and watch the db.json file for any changes, allowing you to interact with the application while it's running on your local machine.
