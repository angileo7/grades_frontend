# Frontend grades system made in React with MUI

### Angel's pairing Session Challenge

We want to create a grades’ system where only some registered admin users can access it and handle the CRUD of students, courses, and regarding a specific student, the CRUD of its grades as well.

A student should have at least 2 fields for identifying it, and a course at least one.

A student can take more than one course at a time

We only want to authorize access to the system to some registered users.


## commands to make it works


### `npm install --legacy-peer-deps`

### `npm start`

Runs the app in [http://localhost:3001](http://localhost:3001).

## How to login

### email: 'example@example.com', password: 'supersecretpassword'

## Features
* List of all students
    * List of a student’ grades, per quarter. Indicate whether it’s passed or failed.
* List of all courses
    * List of a course’ students
* Forms to create students, courses and grades
* Login/sign in form to access system
* Ability to sign out

## Nice to have done

* Complete CRUD of students, CRUD of courses, CRUD of grades, and authorization
* Add list of a student’ courses and an indication whether the average of the year-long course grades has been passed or failed
* Error handling
* Unit tests

## To run unit test components

### `npm test`

Launches the test runner 