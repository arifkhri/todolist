import React from "react";
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from "@mui/icons-material/CheckBox";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';

import EmptyState from '../../../../components/EmptyState';
import { todoReq } from '../../../../core/api';

declare interface TableListProps {
  data: {
    cy: {
      tableDeleteBtn: string;
      tableEditBtn: string;
      tableEditLabel: string;
      tableEditField: string;
      tableCheckAction: string;
      tableIndicator: string;
      ilustrationEmpty: string;
    };
    ilustrationEmpty: string;
  };
  listData: IListData;
  deleteAction: (id: number) => void;
  editAction: (id: ITodo) => void;
}

function TableList(props: TableListProps) {

  const { data: { cy, ilustrationEmpty }, listData, deleteAction, editAction } = props;
  const { data } = listData;

  function handleDelete(id: number) {
    deleteAction(id);
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
                  key={record.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="row">
                    <CheckBox {...label} data-cy={cy.tableCheckAction} />
                  </TableCell>

                  <TableCell align="left">
                    <Grid item xs={6} className="d-flex align-items-center">
                      <Typography variant="h5" data-cy={cy.tableEditLabel} className="mr-2"> {record.title} </Typography>
                        <div>
                          <IconButton aria-label="edit" data-cy={cy.tableEditBtn} onClick={() => handleEditAction(record)}>
                            <EditIcon />
                          </IconButton>
                        </div>
                      </Grid>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton aria-label="delete" data-cy={cy.tableDeleteBtn} onClick={() => handleDelete(record.id)}>
                      <DeleteIcon />
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
