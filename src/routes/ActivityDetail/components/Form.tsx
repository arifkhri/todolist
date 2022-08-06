import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Brightness1Icon from '@mui/icons-material/Brightness1';

import Select from "../../../components/Select";
import useLocalData from '../../../hooks/useLocalData';
import { priorityOptions } from '../data';

declare interface FormProps {
  initialValues?: any;
}

export default function Form(props: FormProps) {
  const { dispatch } = useLocalData();
  const { initialValues } = props;
  const [formValue, setFormValue] = useState<any>();

  useEffect(() => {
    const priorityValue = priorityOptions.find((opt) => opt.value === initialValues.priority);
    if(initialValues) {
      setFormValue({...initialValues, priority: priorityValue});
    }
  }, [initialValues])

  useEffect(() => {
    dispatch(({
      type: 'update',
      name: 'formValue',
      value: formValue
    }));
  }, [formValue])

  return (
    <div className="d-flex flex-column">
      <TextField
        className="mb-2"
        id="outlined-number"
        label="Title"
        type="text"
        value={formValue?.title}
        onChange={(e) => setFormValue({ ...formValue, title: e.target.value })}
      />
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-standard-label">Priority</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValue?.priority}
          label="Priority"
          onChange={(e) => {
            setFormValue({ ...formValue, priority: e.target.value })
          }}
        >
          {
            priorityOptions.map((opt) => (
              <MenuItem value={opt.value}>
                <ListItemIcon><Brightness1Icon style={{ color: opt.clr }} /></ListItemIcon>
                <ListItemText>{opt.label}</ListItemText>
              </MenuItem>
            )
            )
          }
        </Select>
      </FormControl>
    </div >

  )
}