import React from "react";
import {default as ButtonBase, ButtonProps as ButtonBaseProps} from "@mui/material/Button";

import './styles.scss';

declare interface ButtonProps extends ButtonBaseProps {
  children: any;
}

function Button(props: ButtonProps) {
  const { children, ...restProps } = props;
  return (
    <ButtonBase {...restProps} className="button">{children}</ButtonBase>
  );
}

export default Button;
