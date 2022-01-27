# Interview Scheduler

## Project Description

Interview Scheduler is a SPA (Single Page Application) for tracking students interviews built with the latest tools and techniques for optimized user experience. The App utilizes React and allows users to add, edit and delete appointments in real time.

## Project Features

* Appointment days (Monday to Friday) are displayed and colour-coordinated depending on availability
* The days show the number of slots available as a snapshot of the week
* A user can switch between days and see detailed information
* Booked and available slots are clearly differentiated
* A user can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
* A user can change the details of an existing interview by pressing the edit icon
* A user can cancel an existing interview, a pop-up message will ask to confirm the action before permanently deleting an interview
* Days display currently remaining spots and capture updates after each modification

## Screenshots

!["Main page - List of days"](https://github.com/hyperamir/Scheduler/blob/master/docs/Main-page.png?raw=true)

!["Appointment form - Create"](https://github.com/hyperamir/Scheduler/blob/master/docs/Appointment-form.png?raw=true)

!["Cancel an appointment"](https://github.com/hyperamir/Scheduler/blob/master/docs/Cancel-appointment.png?raw=true)



## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Project Stack

* Front-End: React, Axios, JSX, HTML, SASS, JavaScript
* Back-End: Express, Node.js, PostgreSQL
* Testing: Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

## Dependencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
- Babel/core
- Storybook/addon-actions
- Storybook/addon-backgrounds
- Storybook/addon-links
- Storybook/addons
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks
- Babel-loader
- Node-sass
- Prop-types
- React-test-renderer
