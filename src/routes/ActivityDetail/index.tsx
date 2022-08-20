import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';
import Check from '@mui/icons-material/Check';

import { setTitle } from "../../core/utils";
import { activityReq, todoReq } from "../../core/api";
import Toolbar from '../../components/Toolbar';
import Dialog, { DialogProps } from '../../components/Dialog';
import TableList from './components/TableList';
import Form from './components/Form';
import Modal from '../../components/Modal';
import { data } from './data';

import './styles.scss';

function ActivityDetail() {
  // const dialogRef = useRef();
  const { activityId = "" } = useParams()
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

  const [dialogOpt, setDialogOpt] = useState<DialogProps>({ open: false });
  const [snackbarOpt, setSnackbarOpt] = useState<SnackbarProps & { type?: 'success' | 'error' }>({ open: false });

  function loadData() {
    activityReq.getDetail(activityId).then((res) => {
      if (res) {
        setDetailData(res);
        setListData({ data: res.todo_items });
      }
    });
  }

  function handleUpdateTitle(title: string) {
    setDetailData({ ...detailData, title })
    activityReq.update(activityId, { title }).then((res) => {
      if (res) {
        loadData();
      }
    }).catch((e) => {
      console.log(e.message)
    });
  }

  function handleCreate() {
    showModal({
      "data-cy": "modal-add",
      onClose: () => hideModal(),
      title: <h4 className="m-0" data-cy="modal-add-title">Tambah List Item</h4>,
      content: <Form defaultValues={{
        priority: "very-high",
        activity_group_id: activityId,
        _comment: "list of priority is : very-high, high, normal, low, very-low | defalut value is very-high"
      }} cancelAction={() => hideModal()} submitAction={(formValues) => handleSubmit('create', formValues)} />,
    });
  }

  function handleUpdate(record: ITodo) {
    showModal({
      "data-cy": "modal-add",
      onClose: () => hideModal(),
      title: "Ubah Item",
      content: <Form defaultValues={record} cancelAction={() => hideModal()} submitAction={(formValues) => handleSubmit('update', formValues)} />,
    });
  }

  function handleSubmit(type: 'update' | 'create', formValues: ITodo) {
    let req: Promise<any>;
    if (type === 'update') {
      req = todoReq.update(formValues.id.toString(), formValues)
    } else {
      req = todoReq.create(formValues);
    }

    return req.then((res) => {
      console.log("🚀 ~ file: index.tsx ~ line 85 ~ returnreq.then ~ res", res)
      if (res.code !== 500) {
        hideModal();
      }
      loadData();
    })
    // .catch((e) => {
    //   setDialogOpt({
    //     open: true,
    //     onClose: () => setDialogOpt({ open: false }),
    //     "data-cy": data.cy.confirmDel,
    //     content:
    //       <div className="d-flex justify-content-center px-3 mb-4">
    //         <WarningAmberRounded color="error" data-cy="modal-information-icon" style={{ fontSize: "60px", margin: 'auto' }} />
    //         <p data-cy="modal-information-title">Gagal mengedit activity </p>
    //       </div>
    //   });
    // })
  }

  function handleDelete(record: ITodo) {

    setDialogOpt({
      onClose: () => hideModal(),
      open: true,
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
          onClick: () => hideModal()
        },
        submit: {
          "data-cy": data.cy.dialogSubmit,
          color: "error",
          title: "Hapus",
          onClick: () => {
            todoReq.delete(record.id).then((res) => {
              if (res) {
                setDialogOpt({
                  open: true,
                  onClose: () => setDialogOpt({ open: false }),
                  "data-cy": "modal-information",
                  content:
                    <div className="d-flex justify-content-center px-3 mb-4">
                      <Check color="success" data-cy="modal-information-icon" style={{ fontSize: "60px", margin: 'auto' }} />
                      <p data-cy="modal-information-title">Berhasil menghapus Item </p>
                    </div>
                });
                loadData();
              }
            });
            hideModal();
          }
        }
      }
    })
  }

  function handleStatus(value: ITodo) {
    todoReq.update(value.id.toString(), { ...value, is_active: !value.is_active ? 1 : 0 }).then((res) => {
      loadData();
    })
  }

  function handleSort(value: string) {
    let newListData = listData.data;

    switch (true) {
      case value === 'newest':

        newListData = listData.data.sort(function (a, b) {
          return (a.id + b.id)
        });
        setListData({ ...listData, data: newListData });
        break;

      case value === 'oldest':

        newListData = listData.data.sort(function (a, b) {
          return (a.id - b.id)
        });
        setListData({ ...listData, data: newListData });

        break;

      case value === 'a-z':
        newListData = listData.data.sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        setListData({ ...listData, data: newListData });

        break;

      case value === 'z-a':
        newListData = listData.data.sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
        setListData({ ...listData, data: newListData });

        break;


      default:
        setListData({ ...listData, data: newListData });
        break;
    }

  }

  function hideModal() {
    setDialogOpt({ open: false });
  }

  function showModal(options: any) {
    const modalOptions = {
      ...options,
      open: true,
      button: options.button,
      // onBackdropClick: () => {
      //   alert("hi")
      //   hideModal();
      // }
    }

    setDialogOpt(modalOptions);
  }

  useEffect(() => {
    setTitle("Dashboard");
    loadData();
  }, []);

  useEffect(() => {
    document.addEventListener('click', function (event: any) {
      // console.log("🚀 ~ file: index.tsx ~ line 225 ~ event", )
      if (event.target.id === "body" && event.target.className.includes("modal")) {
        // console.log("masuk sini")
        // setDialogOpt({ open: false });
        // dialogRef.current.remove();
        // $(".dialog").remove()
      }
    });
  }, [dialogOpt.open]);

  return (
    <>
      <Toolbar sortAction={handleSort} title={detailData?.title} backBtn="/" editAction={handleUpdateTitle} createAction={handleCreate} data={data} />
      <TableList listData={listData} data={data} deleteAction={handleDelete} editAction={handleUpdate} statusAction={handleStatus} />
      {/* {dialogOpt.open && 
      } */}
      <Dialog  {...dialogOpt} /> 
      {/* <Modal button={dialogOpt.button}  data-cy={dialogOpt["data-cy"]} title={dialogOpt.title} open={dialogOpt.open}>
        {dialogOpt.content}
      </Modal> */}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        {...snackbarOpt}
        onClose={() => setSnackbarOpt({ open: false })}
        key="snackbar"
      >
        <Alert onClose={() => setSnackbarOpt({ open: false })} severity={snackbarOpt.type} sx={{ width: '100%' }}>
          {snackbarOpt.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ActivityDetail;
