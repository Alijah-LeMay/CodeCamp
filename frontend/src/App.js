import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StyleRoot } from 'radium';

import classes from './App.module.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';

// My Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useTracking } from './components/utils/useTracking';
import ScrollToTop from './components/utils/ScrollToTop';

// My Screens
import LoginScreen from './screens/LoginScreen';

import HomeScreen from './screens/HomeScreen';

export const App = () => {
  useTracking('');
  // input tracking key (G-########)
  // to track analytics
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/login' component={LoginScreen} />
      </Switch>
      <Footer bgColor='black' fontColor='white' />
    </Fragment>
  );
};

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <StyleRoot>
        <App />
      </StyleRoot>
    </BrowserRouter>
  </Provider>
);
