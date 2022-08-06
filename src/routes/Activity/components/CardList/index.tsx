import React from "react";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Card from '../../../../components/Card';
import EmptyState from '../../../../components/EmptyState';
import { activityReq } from '../../../../core/api';

declare interface CardListProps {
  data: {
    cy: {
      cardTitle: string;
      cardCreatedDate: string;
      cardDeleteBtn: string;
      ilustrationEmpty: string,
    },
    ilustrationEmpty: string;
  };
  listData: IListData;
  deleteAction: (id: number) => void;
}

function CardList(props: CardListProps) {
  const { data: { cy, ilustrationEmpty }, listData, deleteAction } = props;
  const { data } = listData;
  const navigate = useNavigate();

  function handleDelete(id: number) {
    deleteAction(id);
  }

  const ContentList = data.map((record: any) =>
    <Grid item lg={3} key={record.id} className="mx-2 mb-4">
      <Card sx={{ width: "230px", height: "234px" }} onClick={() => {
        navigate(`/${record.id}`)
      }}>

        <CardContent className="d-flex flex-column justify-content-between h-100 p-0">

          <Tooltip title={record.title}>
            <Typography gutterBottom variant="h5" noWrap className="py-3 px-3 text-center" data-cy={cy.cardTitle}>
              {record.title}
            </Typography>
          </Tooltip>

          <div className="d-flex justify-content-between align-items-baseline py-3 pr-4 pl-5">
            <div>
              <Typography variant="body1" color="text.secondary" data-cy={cy.cardCreatedDate}>
                {dayjs(record.created_at).format("D MMMM YYYY")}
              </Typography>
            </div>
            <div>
              <IconButton aria-label="delete" data-cy={cy.cardDeleteBtn} onClick={() => handleDelete(record.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>

        </CardContent>

      </Card>
    </Grid>
  );

  return (
    data.length > 0 ?
      <Grid className="d-flex flex-wrap justify-content-center loader" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {ContentList}
      </Grid>
      :
      <EmptyState url={ilustrationEmpty} dataCY={cy.ilustrationEmpty} />
  );
}

export default CardList;
