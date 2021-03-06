import React, { Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { StyleRoot } from 'radium'

import './App.css'
// Redux
import { Provider } from 'react-redux'
import store from './store'

// My Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
// import { useTracking } from './components/useTracking'
import ScrollToTop from './components/ScrollToTop'

// My Screens
import LoginScreen from './screens/LoginScreen'

import HomeScreen from './screens/HomeScreen'
import AdminScreen from './screens/AdminScreen'
import EditCourseScreen from './screens/EditCourseScreen'
import EditLessonScreen from './screens/EditLessonScreen'
import CoursePostScreen from './screens/CoursePostScreen'
import CoursesScreen from './screens/CoursesScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import LessonPostScreen from './screens/LessonPostScreen'

export const App = () => {
  // useTracking('')
  // input tracking key (G-########)
  // to track analytics
  return (
    <Fragment>
      <Navbar bgColor='grey' />
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/admin' component={AdminScreen} />
        <Route exact path='/course' component={CoursesScreen} />
        <Route exact path='/course/:id' component={CoursePostScreen} />
        <Route exact path='/lesson/:id' component={LessonPostScreen} />
        <Route
          exact
          path='/admin/course/:id/edit'
          component={EditCourseScreen}
        />
        <Route
          exact
          path='/admin/lesson/:id/edit'
          component={EditLessonScreen}
        />
        <Route component={NotFoundScreen} />
      </Switch>
      <Footer bgColor='black' fontColor='white' />
    </Fragment>
  )
}

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <StyleRoot>
        <App />
      </StyleRoot>
    </BrowserRouter>
  </Provider>
)
