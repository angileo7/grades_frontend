import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Users from './components/Users'
import Courses from './components/Courses'
import UserCreate from './components/UserCreate'
import UserUpdate from './components/UserUpdate'
import './App.css';
import CourseCreate from "./components/CourseCreate";
import GradeCreate from "./components/GradeCreate";
import CourseUpdate from "./components/CourseUpdate";
import Login from "./components/Login";
import useToken from './components/useToken';
import CourseStudentList from "./components/CoursesStudent";
import GradeUpdate from "./components/GradeUpdate";

function App() {
    const { token, setToken } = useToken();
    if(!token) {
        return <Login setToken={setToken} />
    }
  return (
      <Router>
          <div>
              <Navbar />
              <Switch>
                  <Route exact path='/courses' component={Courses} />
                  <Route exact path='/' component={Users} />
                  <Route path='/create' exact ><UserCreate /></Route>
                  <Route path='/create-course' exact ><CourseCreate /></Route>
                  <Route path='/create-grade/:id' exact ><GradeCreate /></Route>
                  <Route exact path='/update/:id' component={UserUpdate} />
                  <Route exact path='/courses-update/:id' component={CourseUpdate} />
                  <Route exact path='/update-grade/:id' component={GradeUpdate} />
                  <Route exact path='/my-courses/:id' component={CourseStudentList} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;
