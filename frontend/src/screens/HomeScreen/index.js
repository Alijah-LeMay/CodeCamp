import React from 'react';
import classes from './HomeScreen.module.css';

// My Components
import CenterContainer from '../../components/utils/CenterContainer';

// Assets

const HomeScreen = () => {
  return (
    <div className={classes.homeScreen_Container}>
      <CenterContainer bgColor='#f2f2f2' bgPadding='25px 0'></CenterContainer>
    </div>
  );
};

export default HomeScreen;
