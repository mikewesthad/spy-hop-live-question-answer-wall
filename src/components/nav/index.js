import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./index.module.scss";

export default class Nav extends Component {
  render() {
    return (
      <nav className={style.nav}>
        <NavLink className={style.navLink} to="/ask" activeClassName={style.navLinkActive}>
          Ask
        </NavLink>
        <NavLink className={style.navLink} to="/wall" activeClassName={style.navLinkActive}>
          See All
        </NavLink>
        <NavLink className={style.navLink} to="/answer" activeClassName={style.navLinkActive}>
          Answer
        </NavLink>
      </nav>
    );
  }
}
