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

import "./styles.scss"
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
      <Grid className="d-flex flex-wrap justify-content-center loader container-table">
        {/* <TableContainer component={Paper}> */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="table">
          <TableBody>
            {data.map((record) => (
              <TableRow
                data-cy="todo-item"
                key={record.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell scope="row" className="p-0">
                  <div className="card">
                    <div className="pl-4 d-flex align-items-center">
                      <Checkbox className="mr-5" {...label} data-cy={cy.tableCheckAction} onChange={() => statusAction(record)} />
                      <ListItemIcon data-cy="todo-item-priority-indicator"><Brightness1Icon style={{ color: priorityOptions.find((option) => option.value === record.priority)?.clr }} /></ListItemIcon>
                      <Typography variant="h5" data-cy={cy.tableEditLabel} className="mr-2"> {record.title} </Typography>
                      <IconButton aria-label="edit" data-cy={cy.tableEditBtn} onClick={() => handleEditAction(record)}>
                        <img src={"/edit.svg"} alt="del" />
                      </IconButton>
                    </div>
                    <div>
                      <div className="d-flex">

                        <IconButton aria-label="delete" className="pl-2" data-cy={cy.tableDeleteBtn} onClick={() => handleDelete(record)}>
                          <img src={"/trash.svg"} alt="del" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* </TableContainer> */}
      </Grid>
      :
      <EmptyState url={ilustrationEmpty} dataCY={cy.ilustrationEmpty} />
  );
}

export default TableList;
