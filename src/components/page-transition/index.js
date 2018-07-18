import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import style from "./index.module.scss";

const classNameMap = {
  appear: style.appear,
  appearActive: style.appearActive,
  enter: style.enter,
  enterActive: style.enterActive,
  enterDone: style.enterDone,
  exit: style.exit,
  exitActive: style.exitActive,
  exitDone: style.exitDone
};

const timeout = {
  enter: parseFloat(style.enterDurationMs),
  exit: parseFloat(style.exitDurationMs)
};

// Scroll in-between page transitions
const scrollToTop = () => window.scrollTo(0, 0);

export default function PageTransition({ pageKey, children }) {
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={pageKey}
        timeout={timeout}
        classNames={classNameMap}
        onExited={scrollToTop}
      >
        <div style={{ width: "100%" }}>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
}
