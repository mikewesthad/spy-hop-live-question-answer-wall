import React from "react";
import style from "./index.module.scss";

export default function PageWrapper({ children, ...props }) {
  return (
    <div className={style.wrap} {...props}>
      {children}
    </div>
  );
}
