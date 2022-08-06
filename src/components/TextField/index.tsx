import React from "react";
import {default as TextFieldBase, TextFieldProps as TextFieldBaseProps} from "@mui/material/TextField";

import './styles.scss';

function TextField(props: TextFieldBaseProps) {
  const { children, ...restProps } = props;
  
  return (
    <TextFieldBase {...restProps} className="text-field" />
  );
}

export default TextField;
