import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Suspense } from 'react';

export default function TransitionApp({ location, children }: any) {

  return (
    <TransitionGroup appear enter exit>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={{ enter: 300, exit: 300 }}
      >
        <div>
          <Suspense fallback={<p>Loading...</p>}>
            {children}
          </Suspense>
        </div>
      </CSSTransition>
    </TransitionGroup>

  );
}
