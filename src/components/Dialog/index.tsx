import * as React from 'react';
import { default as DialogBase, DialogProps as DialogBaseProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import Button, { ButtonProps } from '../Button';
import './styles.scss';

export declare interface DialogProps extends DialogBaseProps {
  title?: string;
  // ref?: any;
  open: boolean;
  content?: any;
  "data-cy"?: string;
  button?: {
    cancel: {
      "data-cy": string;
      title?: string;
    } & Omit<ButtonProps, "children">;
    submit: {
      "data-cy": string;
      title?: string;
    } & Omit<ButtonProps, "children">;
  }
}

export default function Dialog(props: DialogProps) {

  const { button, open, content, title, onClose, ...restProps } = props;

  return (
    <DialogBase
      {...restProps}
      className="dialog"
      onClose={onClose}
      open={open}
      data-cy={props['data-cy']}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" >{title}</DialogTitle>

      <DialogContent style={{ maxWidth: "500px" }}>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>

      {
        button && (
          <DialogActions className="d-flex- justify-content-center">
            <Button className="bg-gray  py-2 px-4" variant="text" {...(button?.cancel || {})}>{button?.cancel?.title || "Batal"}</Button>
            <Button type="submit" variant="contained" className="ml-4 py-2 px-4" {...(button?.submit || {})}>{button?.submit?.title || "Simpan"}</Button>
          </DialogActions>
        )
      }
    </DialogBase>
  );
}