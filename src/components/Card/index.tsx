import React from "react";
import {default as CardBase, CardProps as CardBaseProps} from "@mui/material/Card";

import './styles.scss';

declare interface CardProps extends CardBaseProps {
  children: any;
}

function Card(props: CardProps) {
  const { children, ...restProps } = props;
  return (
    <CardBase {...restProps} className="card">{children}</CardBase>
  );
}

export default Card;
