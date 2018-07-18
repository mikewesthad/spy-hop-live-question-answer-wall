import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./index.module.scss";

export default class Nav extends Component {
  render() {
    return (
      <nav className={style.nav}>
        <NavLink className={style.navLink} to="/ask" activeClassName={style.navLinkActive}>
          Ask a Question
        </NavLink>
        <NavLink className={style.navLink} to="/wall" activeClassName={style.navLinkActive}>
          See All Questions
        </NavLink>
        <NavLink className={style.navLink} to="/answer" activeClassName={style.navLinkActive}>
          Answer a Question
        </NavLink>
      </nav>
    );
  }
}
