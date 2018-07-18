import React from "react";
import style from "./index.module.scss";

export default function Container({ children, ...props }) {
  return (
    <div className={style.container} {...props}>
      {children}
    </div>
  );
}
