import React from "react";
import {default as SelectBase, SelectProps as SelectBaseProps} from "@mui/material/Select";

import './styles.scss';

declare interface SelectProps extends SelectBaseProps {
  children: any;
}

function Select(props: SelectProps) {
  const { children, ...restProps } = props;
  return (
    <SelectBase {...restProps} className="select">{children}</SelectBase>
  );
}

export default Select;
