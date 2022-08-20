import React from "react";
import {default as ButtonBase, ButtonProps as ButtonBaseProps} from "@mui/material/Button";

import './styles.scss';

export declare interface ButtonProps extends ButtonBaseProps {
  children: any;
}

function Button(props: ButtonProps) {
  const { children, className, ...restProps } = props;
  return (
    <ButtonBase {...restProps} className={`button ${className}`}>{children}</ButtonBase>
  );
}

export default Button;
