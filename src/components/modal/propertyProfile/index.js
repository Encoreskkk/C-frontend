import React, { useEffect, useState } from "react";
import { Modal, Select, message } from "antd";
import { editPropertyProfile, addPropertyProfile, getPropertyRoomList, getUserList } from "@/api";
import MyForm from "@/components/form";
const { Option } = Select;

const initFormItems = [
  {
    itemType: "select",
    itemProps: {
      name: "uid",
      rules: [{ required: true, message: "请选择业主" }],
      label: "业主姓名",
    },
    childProps: {
      placeholder: "业主姓名",
    },
  },
  {
    itemType: "select",
    itemProps: {
      name: "roomId",
      rules: [{ required: true, message: "请选择房间" }],
      label: "业主户号",
    },
    childProps: {
      placeholder: "业主户号",
    },
  },
  {
    itemType: "select",
    itemProps: {
      name: "ifIn",
      rules: [{ required: true, message: "请选择业主门禁" }],
      label: "门禁状态",
    },
    childProps: {
      placeholder: "门禁状态",
    },
  },
];
export default function PropertyProfileModal({ editId, isShow, editData, onCancel, onOk }) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);
  const [allRoom, setAllRoom] = useState([]);

  // 初始化表格
  useEffect(() => {
    if (isShow) {

      getUserList().then((res) => {
        const { data, code } = res;
        if (code === 200) {
          let items = initFormItems.map((i) => ({ ...i }));
          items.forEach((i) => {
            if (i.itemProps.name === "uid") {
              i.childProps.children = data.map((power) => (
                <Option value={power.id} key={power.id}>
                  {power.name}
                </Option>
              ));
            }
          });
          setItems(items);
        }
      })

      getPropertyRoomList().then((res) => {
        const { data, code } = res;
        if (code === 200) {
          setAllRoom(data)
          let items = initFormItems.map((i) => ({ ...i }));
          items.forEach((i) => {
            if (i.itemProps.name === "roomId") {
              i.childProps.children = data.map((power) => (
                <Option value={power.id} key={power.id}>
                  {power.floorBm}
                </Option>
              ));
            }
          });
          setItems(items);
        }
      })

      let items = initFormItems.map((i) => ({ ...i }));

      let data = [{
        'label': '未录入',
        'val': 0
      }, {
        'label': '已录入',
        'val': 1
      }]

      items.forEach((i) => {
        if (i.itemProps.name === "ifIn") {
          i.childProps.children = data.map((power) => (
            <Option value={power.val} key={power.label}>
              {power.label}
            </Option>
          ));
        }
      });
      setItems(items);
    }
  }, [isShow]);

  // 初始化表格
  useEffect(() => {
    if (editId && form) {
      form.setFieldsValue(editData);
      let items = initFormItems.map((i) => ({ ...i }));
      setItems(items);
    } else if (!editId) {
      // set formItem
      let items = initFormItems.map((i) => ({ ...i }));
      setItems(items);
    }
  }, [editId, editData, form]);

  // 添加或者编辑入库
  const submit = () => {
    form.validateFields().then((values) => {

      console.log('editData: ', editData)
     

      // {
      //   "id": 1,
      //   "floorBm": "A1001",
      //   "floorDis": "东北角",
      //   "area": 120,
      //   "buildId": 1,
      //   "state": 0,
      //   "buildName": "C栋",
      //   "buildAddress": "南试试试水水水水水水水京"
      // }
  
      // area: 120
      // buildAddress: "44"
      // buildId: 5
      // buildName: "F栋"
      // floorBm: "A1001"
      // floorDis: "东北角222222"
      // id: 1
      // state: 0

      // {
      //   "area": 0,
      //   "email": "string",
      //   "floorBm": "string",
      //   "floorDis": "string",
      //   "id": 0,
      //   "idCard": "string",
      //   "ifIn": 0,
      //   "name": "string",
      //   "phone": "string",
      //   "photo": "string",
      //   "roomId": 0,
      //   "uid": 0
      // }

      // area: 120
      // buildAddress: ""
      // buildId: 1
      // buildName: ""
      // floorBm: "A1002"
      // floorDis: "东北角"
      // id: 2
      // state: 1


      // area: 123
      // email: "shineshinee_zzang@163.com"
      // floorBm: "A3001"
      // floorDis: "112"
      // id: 4
      // idCard: "222222"
      // ifIn: 1
      // key: undefined
      // name: "zzy"
      // phone: "18994078186"
      // photo: ""
      // roomId: 5
      // uid: 7

      let modify = Boolean(editId);
      let fn = modify ? editPropertyProfile : addPropertyProfile;
      if (modify) {
        console.log('values: ', values)
        for (const k in allRoom) {
          if (allRoom[k].id === values.roomId) {
            console.log( allRoom[k])
            values.area = allRoom[k].area
            values.email = editData.email
            values.floorBm = allRoom[k].floorBm
            values.floorDis = allRoom[k].floorDis
            values.id = editData.id
            values.idCard = editData.idCard
            values.name = editData.name
            values.phone = editData.phone
            values.photo = editData.photo
          }
        }
      }
      console.log('values2: ', values)
      fn(values).then((res) => {
        if (res.code === 200) {
          message.success(res.msg);
          close();
          onOk();
        } else {
          message.error(res.msg);
          close();
          onOk();
        }
      });
    });
  };
  const close = () => {
    form.resetFields();
    onCancel(null, false);
  };
  return (
    <Modal
      maskClosable={false}
      title={editId ? "修改信息" : "添加信息"}
      visible={isShow}
      okText="确认"
      cancelText="取消"
      onCancel={close}
      onOk={submit}
    >
      <MyForm handleInstance={setForm} items={formItems} />
    </Modal>
  );
}
