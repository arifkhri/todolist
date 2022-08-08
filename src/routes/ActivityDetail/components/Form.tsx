import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useForm, Controller } from "react-hook-form";
import Brightness1Icon from '@mui/icons-material/Brightness1';

import Select from "../../../components/Select";
import { priorityOptions } from '../data';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "../../../components/Button";
import { data } from '../data';

declare interface FormProps {
  defaultValues?: any;
  submitAction: (formValue: any) => Promise<any>;
  cancelAction: () => void;
}

export default function Form(props: FormProps) {
  const { defaultValues, cancelAction, submitAction } = props;
  const { handleSubmit, control, reset, getValues, watch, setValue } = useForm({ defaultValues });
  const [formValid, setFormValid] = useState(false);
  
  function afterSubmitAction(formValues: any) {
    // console.log()
    // reset()
    submitAction(formValues).then(() => {
      setValue('title', '');
      setValue('priority', 'very-high');
    });
  }

  useEffect(() => {
    setFormValid(getValues('title'));
  }, [watch('title')])

  return (
    <div className="d-flex flex-column">
      <form onSubmit={handleSubmit(afterSubmitAction)}>
        <div className="d-flex flex-column">
          <Controller
            name="title"
            control={control}

            render={({ field }) =>
              <TextField
                data-cy="modal-add-name-input"
                className="mb-2"
                id="outlined-number"
                label={<span data-cy="modal-add-name-title">Title</span>}
                type="text"
                {...field} />

            }
          />
          <Controller
            name="priority"
            control={control}
            render={({ field }) => {
              return (
                <FormControl variant="outlined" className="mt-4 mb-3">
                  <InputLabel id="demo-simple-select-standard-label" data-cy="modal-add-priority-title">Priority</InputLabel>
                  <Select
                    data-cy="modal-add-priority-dropdown"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...field}
                    label="Priority"
                  >
                    {
                      priorityOptions.map((opt) => (
                        <MenuItem value={opt.value} data-cy="modal-add-priority-item">
                          <ListItemIcon><Brightness1Icon style={{ color: opt.clr }} /></ListItemIcon>
                          <ListItemText>{opt.label}</ListItemText>
                        </MenuItem>
                      )
                      )
                    }
                  </Select>
                </FormControl>
              )
            }} />
        </div>

        <div className="d-flex justify-content-end mt-3">
          <Button variant="text" className="mr-2" data-cy="modal-add-close-button" onClick={cancelAction}>Batal</Button>
          <Button disabled={!formValid} type="submit" variant="contained" data-cy="modal-add-save-button">Simpan</Button>
        </div>
      </form>
    </div >

  )
}