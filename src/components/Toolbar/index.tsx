import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import ImportExport from '@mui/icons-material/ImportExport';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Check from '@mui/icons-material/Check';


import Button from '../Button';

import "./styles.scss";

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
  sortAction?: (value: string) => void;
}

function Toolbar(props: ToolbarProps) {
  const inputRef: any = useRef();
  
  const { title, editAction, createAction, sortAction, backBtn, data: { cy } } = props;
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(title);
  const [sortValue, setSortValue] = useState<string>('');

  const sortOptions = [{
    icon: <ImportExport />,
    label: 'Terbaru',
    value: 'newest',
  }, {
    icon: <ImportExport />,
    label: 'Terlama',
    value: 'oldest',
  }, {
    icon: <ImportExport />,
    label: 'A-Z',
    value: 'a-z',
  }, {
    icon: <ImportExport />,
    label: 'Z-A',
    value: 'z-a',
  }, {
    icon: <ImportExport />,
    label: 'Belum Selesai',
    value: 'not',
  }]

  function handleBackAction() {
    if (backBtn) navigate(backBtn);
  }

  function handleEditAction() {
    setIsEdit(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
    console.log(inputRef)
  }


  function handleSubmitEditAction() {
    if (editAction) editAction(editValue);
    setIsEdit(false);
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenSort = Boolean(anchorEl);

  function showSort(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  };

  function handleSortAction(value: string) {
    if (sortAction) {
      sortAction(value);
      setSortValue(value);
      // hideSort();
    };
  }

  const hideSort = () => {
    setAnchorEl(null);
  };

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
          <input ref={inputRef} data-cy={cy.toolbarTitle} className={`mr-2 input ${!isEdit && "d-none input-deactive"}`} id="outlined-basic"  value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={() => handleSubmitEditAction()} onFocus={() => handleEditAction()}  />
          <IconButton aria-label="submit-edit" data-cy="todo-title-edit-button" onClick={() => handleSubmitEditAction()} className={`${!isEdit && "d-none"}`}>
            <EditIcon />
          </IconButton>

          <Typography variant="h4" data-cy={cy.toolbarTitle} onClick={() => handleEditAction()} className={`mr-2 ${isEdit && "d-none"}`}> {title} </Typography>
        {/* {
          isEdit ? <>
          </>
        } */}

        {/* {
          editAction && !isEdit && (
            <div>
              <IconButton aria-label="edit" data-cy={cy.toolbarTitle} >
                <EditIcon />
              </IconButton>
            </div>
          )
        } */}
      </Grid>

      <Grid item xs={6} className="d-flex justify-content-end" >
        {
          sortAction && (
            <>
              <IconButton data-cy="todo-sort-button" className="icon-button outlined mr-3" id="basic-button"
                aria-controls={isOpenSort ? 'basic-menu' : undefined}
                aria-haspopup="true"

                aria-expanded={isOpenSort ? 'true' : undefined}
                onClick={(e) => showSort(e)}
              >
                <ImportExport />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={isOpenSort}
                onClose={hideSort}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {sortOptions.map((opt) => (
                  <MenuItem onClick={() => handleSortAction(opt.value)} {...sortValue === opt.value ? { "data-cy": "sort-selection-selected sort-selection" } : { "data-cy": "sort-selection" }}>
                    <ListItemIcon data-cy="sort-selection-icon">{opt.icon}</ListItemIcon>
                    <ListItemText data-cy="sort-selection-title">{opt.label}</ListItemText>
                    {sortValue === opt.value && <ListItemText><Check /></ListItemText>}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )
        }

        <Button variant="contained" data-cy={cy.toolbarCreateBtn} onClick={createAction}> + Tambah </Button>
      </Grid>
    </Grid>
  )
}

export default Toolbar;
