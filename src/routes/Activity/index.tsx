import React, { useEffect, useState } from "react";
import WarningAmberRounded from "@mui/icons-material/WarningAmberRounded";
import Check from "@mui/icons-material/Check";

import { setTitle } from "../../core/utils";
import Toolbar from '../../components/Toolbar';
import Dialog, { DialogProps } from '../../components/Dialog';
import CardList from './components/CardList';
import { activityReq } from "../../core/api";
import { data } from './data';

import './styles.scss';

function Activity() {
  const [listData, setListData] = useState<IListData>({
    data: []
  });
  const [dialogData, setDialogOpt] = useState<DialogProps>({ open: false });

  function loadData() {
    const qParam = {
      email: "ivan@skyshi.com"
    }
    activityReq.getList(qParam).then(setListData);
  }

  function handleCreate() {
    const payloads = {
      title: 'new_title',
      email: 'ivan@skyshi.com',
      _comment: 'for dummy'
    }

    activityReq.create(payloads).then((res) => {
      if (res) {
        loadData();
      }
    });
  }

  function handleDelete(record: IActivityDetail) {
    setDialogOpt({
      open: true,
      onClose: () => setDialogOpt({ open: false }),
      "data-cy": "modal-delete",
      content:
        <div className="d-flex justify-content-center flex-column px-3 mb-4">
          <img src={"/del-confirm.svg"} alt="del" data-cy={data.cy.confirmDelIcon} style={{ fontSize: "60px", margin: 'auto' }} />
          <p data-cy={data.cy.confirmDelTitle} style={{ display: "none" }}><strong>Konfirmasi</strong></p>
          <p>Apakah anda yakin menghapus item <strong>"{record.title}"</strong>?
          </p>
        </div>
      ,
      button: {
        cancel: {
          "data-cy": data.cy.dialogCancel,
          onClick: () => setDialogOpt({ open: false })
        },
        submit: {
          "data-cy": data.cy.dialogSubmit,
          color: "error",
          title: "Hapus",
          onClick: () => { deleteReq(record.id) }
        }
      }
    });
  }

  function deleteReq(id: number) {
    activityReq.delete(id).then((res) => {
      if (res) {
        setDialogOpt({
          open: true,
          onClose: () => setDialogOpt({ open: false }),
          "data-cy": "modal-information",
          content:
            <div className="d-flex justify-content-center px-3 mb-4">
              <Check color="success" data-cy="modal-information-icon" style={{ fontSize: "60px", margin: 'auto' }} />
              <p data-cy="modal-information-title">Berhasil menghapus activity </p>
            </div>
        });
        loadData();
      } else {
        setDialogOpt({
          open: true,
          onClose: () => setDialogOpt({ open: false }),
          "data-cy": "modal-information",
          content:
            <div className="d-flex justify-content-center px-3 mb-4">
              <WarningAmberRounded color="error" data-cy="modal-information-icon" style={{ fontSize: "60px", margin: 'auto' }} />
              <p data-cy="modal-information-title">Gagal menghapus activity </p>
            </div>
        });
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
      <Dialog {...dialogData} />
    </>
  );
}

export default Activity;
