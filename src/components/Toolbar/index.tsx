import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';

import TextField from "../TextField";
import Button from '../Button';

declare interface ToolbarProps {
  data: {
    cy: {
      toolbarTitle: string;
      toolbarEditBtn?: string;
      toolbarCancelEditBtn?: string;
      toolbarSubmitEditBtn?: string;
      toolbarCreateBtn: string;
      toolbarSortBtn?: string,
      toolbarSortOptBtn?: string,
      toolbarBackBtn?: string;
    }
  };
  showEditAction?: boolean;
  title: string;
  backBtn?: string;
  editAction?: (title: string) => void;
  createAction: () => void;
}

function Toolbar(props: ToolbarProps) {
  const { title, editAction, createAction, backBtn, data: { cy } } = props;
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(title);

  function handleBackAction() {
    if (backBtn) navigate(backBtn);
  }

  function handleEditAction() {
    setIsEdit(true);
  }


  function handleSubmitEditAction() {
    if (editAction) editAction(editValue);
    setIsEdit(false);
  }

  useEffect(() => {
    setEditValue(title)
  }, [title])

  return (
    <Grid container className="mt-5 mb-5">
      <Grid item xs={6} className="d-flex">
        {
          backBtn && (
            <div>
              <IconButton className="mr-1" aria-label="back" data-cy={cy.toolbarBackBtn} onClick={() => handleBackAction()}>
                <ArrowBackIosIcon />
              </IconButton>
            </div>
          )
        }
        {
          isEdit ? <>
            <TextField className="mr-2" id="outlined-basic" label="Activity" variant="standard" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
            <IconButton aria-label="submit-edit" data-cy={cy.toolbarEditBtn} onClick={() => handleSubmitEditAction()}>
              <EditIcon />
            </IconButton>
          </>
            : <Typography variant="h4" data-cy={cy.toolbarTitle} className="mr-2"> {title} </Typography>
        }

        {
          editAction && !isEdit && (
            <div>
              <IconButton aria-label="edit" data-cy={cy.toolbarEditBtn} onClick={() => handleEditAction()}>
                <EditIcon />
              </IconButton>
            </div>
          )
        }
      </Grid>

      <Grid item xs={6} className="d-flex justify-content-end" >
        <Button variant="contained" data-cy={cy.toolbarCreateBtn} onClick={createAction}> + Tambah </Button>
      </Grid>
    </Grid>
  )
}

export default Toolbar;
