import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import TransitionApp from 'navigation/Transition';
import React from 'react';
import { RoutesApp } from 'navigation';

export default function AppContent() {
  const location = useLocation();

  return (
    /* <Scrollbar
      className={classes.scroll}
      ref={ScrollRootRef}
      id='scrollbarRoot'> */


    <React.Suspense fallback={<>Loading...</>}>
      <TransitionApp location={location}>

        <Switch location={location}>
          {RoutesApp.map(({ path, Component }) => (
            <Route key={path} exact path={path} component={Component}/>
          ))}
        </Switch>

      </TransitionApp>
    </React.Suspense>
    /* </Scrollbar> */


  );
}
