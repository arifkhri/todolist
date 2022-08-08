import React from "react";
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import ListItemIcon from '@mui/material/ListItemIcon';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import EmptyState from '../../../../components/EmptyState';
import { priorityOptions } from '../../data';

declare interface TableListProps {
  data: {
    cy: {
      confirmDelTitle: string;
      confirmDelIcon: string;
      tableDeleteBtn: string;
      tableEditBtn: string;
      tableEditLabel: string;
      tableCheckAction: string;
      tableIndicator: string;
      ilustrationEmpty: string;
    };
    ilustrationEmpty: string;
  };
  listData: IListData;
  statusAction: (todo: ITodo) => void;
  deleteAction: (todo: ITodo) => void;
  editAction: (todo: ITodo) => void;
}

function TableList(props: TableListProps) {

  const { data: { cy, ilustrationEmpty }, listData, deleteAction, editAction, statusAction } = props;
  const { data } = listData;

  function handleDelete(record: ITodo) {
    deleteAction(record);
  }

  function handleEditAction(record: ITodo) {
    editAction(record);
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    data.length > 0 ?
      <Grid className="d-flex flex-wrap justify-content-center loader">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {data.map((record) => (
                <TableRow
                  data-cy="todo-item"
                  key={record.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="row">
                    <Checkbox {...label} data-cy={cy.tableCheckAction} onChange={() => statusAction(record)}/>
                  </TableCell>

                  <TableCell align="left">
                    <Grid item xs={6} className="d-flex align-items-center">
                      <ListItemIcon data-cy="todo-item-priority-indicator"><Brightness1Icon style={{ color: priorityOptions.find((option) => option.value === record.priority)?.clr }} /></ListItemIcon>
                      <Typography variant="h5" data-cy={cy.tableEditLabel} className="mr-2"> {record.title} </Typography>
                    </Grid>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton aria-label="delete" data-cy={cy.tableDeleteBtn} onClick={() => handleDelete(record)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" data-cy={cy.tableEditBtn} onClick={() => handleEditAction(record)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      :
      <EmptyState url={ilustrationEmpty} dataCY={cy.ilustrationEmpty} />
  );
}

export default TableList;
