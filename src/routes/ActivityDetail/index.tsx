import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import { setTitle } from "../../core/utils";
import { activityReq, todoReq } from "../../core/api";
import Toolbar from '../../components/Toolbar';
import Dialog, { DialogProps } from '../../components/Dialog';
import TableList from './components/TableList';
import Form from './components/Form';
import { data } from './data';

import './styles.scss';
import useLocalData from "../../hooks/useLocalData";

function ActivityDetail() {
  const { activityId = "" } = useParams()
  const { store } = useLocalData()
  const [detailData, setDetailData] = useState<IActivityDetail>({
    title: '',
    email: '',
    created_at: '',
    id: 0,
    todo_items: [],
  });

  const [listData, setListData] = useState<IListData>({
    data: []
  });

  const [dialogData, setDialogData] = useState<DialogProps>({ open: false });

  function loadDetail() {
    activityReq.getDetail(activityId).then((res) => {
      if (res) {
        setDetailData(res);
        setListData({ data: res.todo_items });
      }
    });
  }

  function handleUpdateTitle(title: string) {
    activityReq.update(activityId, { title }).then((res) => {
      if (res) {
        loadDetail();
      }
    });
  }

  function handleCreate() {
    showModal({
      title: "Tambah List Item",
      content: <Form />,
      button: {
        submitAction: () => {
          const payloads = store?.formValue;
          todoReq.create(payloads).then((res) => {
            if (res) {
              loadDetail();
            }
          });
        },
      }
    });
  }

  function handleUpdate(record: ITodo) {
    showModal({
      title: "Ubah Item",
      content: <Form initialValues={record}/>,
      button: {
        submitAction: () => {
          const payloads = store?.formValue;
          todoReq.update(record.id.toString(), payloads).then((res) => {
            if (res) {
              loadDetail();
            }
          });
        },
      }
    });
  }

  function showModal(options: any) {
    const modalOptions = {
      ...options,
      title: "Ubah Item",
      open: true,
      button: {
        ...options.button,
        cancelAction: () => setDialogData({ open: false }),
        submitTitle: 'Simpan',
      }
    }

    setDialogData(modalOptions);
  }

  function handleDelete(id: number) {
    todoReq.delete(id).then((res) => {
      if (res) {
        loadDetail();
      }
    });
  }

  useEffect(() => {
    setTitle("Dashboard");
    loadDetail();
  }, []);

  return (
    <>
      <Toolbar title={detailData?.title} backBtn="/" editAction={handleUpdateTitle} createAction={handleCreate} data={data} />
      <TableList listData={listData} data={data} deleteAction={handleDelete} editAction={handleUpdate} />
      <Dialog {...dialogData} />
    </>
  );
}

export default ActivityDetail;
