import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { setTitle } from "../../core/utils";
// import { Creators as TodoActions } from "../redux/TodoRedux";
import Toolbar from '../../components/Toolbar';
import CardList from './components/CardList';
import { activityReq } from "../../core/api";
import data from './data';

import './styles.scss';

function Activity() {
  const [listData, setListData] = useState<IListData>({
    data: []
  });

  function loadData() {
    const qParam = {
      email: "test@getnada.com"
    }
    activityReq.getList(qParam).then(setListData);
  }

  function handleCreate() {
    const payloads = {
      title: 'new_title',
      email: 'test@getnada.com',
      _comment: 'for dummy'
    }

    activityReq.create(payloads).then((res) => {
      if (res) {
        loadData();
      }
    });
  }

  function handleDelete(id: number) {
    activityReq.delete(id).then((res) => {
      if (res) {
        loadData();
      }
    });
  }

  useEffect(() => {
    setTitle("Dashboard");
    loadData();
  }, []);

  return (
    <>
      <Toolbar title="Activity" createAction={handleCreate} data={data} />
      <CardList listData={listData} data={data} deleteAction={handleDelete} />
    </>
  );
}

export default Activity;
