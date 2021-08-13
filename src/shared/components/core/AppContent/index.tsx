import {
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import TransitionApp from 'navigation/Transition';
import React from 'react';

export default function AppContent({ routes }) {
  const location = useLocation();

  return (
    /* <Scrollbar
      className={classes.scroll}
      ref={ScrollRootRef}
      id='scrollbarRoot'> */
    <React.Suspense fallback={<>Loading...</>}>
      <TransitionApp location={location}>

        <Switch location={location}>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path} component={Component}/>
          ))}
        </Switch>

      </TransitionApp>
    </React.Suspense>
    /* </Scrollbar> */


  );
}
