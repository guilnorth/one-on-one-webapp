import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route } from 'react-router-dom';

export default function TransitionApp({ location, children }: any) {

  return (
    <TransitionGroup>

      <CSSTransition
        key={ location.key }
        classNames="fade"
        timeout={ 300 }
      >
        { children }
      </CSSTransition>
    </TransitionGroup>

  );
}
