import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import FormSignIn from './components/auth/sign-in/FormSignIn';
import Home from './components/home/Home';
import { Courses } from './components/courses/index';
import { CoursePython } from './components/courses/python/index';
import { Blog } from './components/blog/index';
import { Message } from './components/message/index';
import Trello from './components/trello/Trello';
import FormSignUp from './components/auth/sign-up/FormSignUp';
import { CourseJS } from './components/courses/javascript';
import { routes } from './constants/routes';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="simleLineApp" />
      <Sidebar />
      <div className="content">
        <Switch>
          <Route path={routes.home} exact component={Home} />
          <Route path={routes.signIn} component={FormSignIn} />
          <Route path={routes.signUp} component={FormSignUp} />
          <Route path={routes.course} component={Courses} />
          <Route path={routes.python} component={CoursePython} />
          <Route path={routes.javascript} component={CourseJS} />
          <Route path={routes.blog} component={Blog} />
          <Route path={routes.message} component={Message} />
          <Route path={routes.trello} component={Trello} />
          {/* <PrivateRoute path="/todos">
          <Todos />
        </PrivateRoute> */}
          <Redirect to={routes.signIn} />
        </Switch>
      </div>
    </div>
  );
}
export default App;
