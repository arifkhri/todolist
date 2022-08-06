import * as React from 'react';
import { default as DialogBase, DialogProps as DialogBaseProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


import Button from '../Button';
import './styles.scss';

export declare interface DialogProps extends DialogBaseProps {
  title?: string;
  open: boolean;
  content?: string | React.ReactNode;
  button?: {
    cancelTitle?: string;
    cancelAction: () => void;
    submitTitle?: string;
    submitAction: () => void;
  }
}

export default function Dialog(props: DialogProps) {
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { button, open, content, title } = props;

  const handleSubmit = () => {
    if (button) button.submitAction();
  }

  const handleClose = () => {
    if (button) button.cancelAction();
  }

  return (
    <DialogBase
      className="dialog"
      // fullScreen={fullScreen}
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogContent style={{maxWidth: "500px"}}>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleClose}>{button?.cancelTitle || 'Batal'}</Button>
        <Button variant="contained" onClick={handleSubmit} autoFocus>{button?.submitTitle}</Button>
      </DialogActions>
    </DialogBase>
  );
}