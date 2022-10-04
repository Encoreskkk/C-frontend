import React, { useEffect, useState } from "react";
import { getKey } from "@/utils";
import { Modal, Select, message } from "antd";
import { editPersonCar, addPersonCar, getPropertyParkList } from "@/api";
import MyForm from "@/components/form";
const { Option } = Select;

const initFormItems = [
  {
    itemType: "select",
    itemProps: {
      name: "parkId",
      rules: [{ required: true, message: "请选择申请类目" }],
      label: "车位编号",
    },
    childProps: {
      placeholder: "车位编号",
    },
  },
  // {
  //   itemType: "inputText",
  //   itemProps: {
  //     name: "memo",
  //     rules: [{ required: true, message: "请输入申请描述" }],
  //     label: "申请描述",
  //   },
  //   childProps: {
  //     placeholder: "申请描述"
  //   },
  // },
];
export default function PersonCarModal({ editId, isShow, editData, onCancel, onOk }) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);

  // 初始化表格
  useEffect(() => {
    if (isShow) {
      let items = initFormItems.map((i) => ({ ...i }));

      getPropertyParkList().then((res) => {
        const { data, code } = res;
        if (code === 200) {
          let items = initFormItems.map((i) => ({ ...i }));
          items.forEach((i) => {
            if (i.itemProps.name === "parkId") {
              i.childProps.children = data.map((power) => (
                <Option value={power.id} key={power.id}>
                  {power.parkBm} - {power.parkAddress} - { power.state ? '已出售' : '空闲' }
                </Option>
              ));
            }
          });
          setItems(items);
        }
      })
      
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
      let modify = Boolean(editId);
      let fn = modify ? editPersonCar : addPersonCar;
      if (modify) {
        values.id = editId;
      }

      let userInfo = getKey(true, 'USER_INFO')
      console.log('用户信息： ', userInfo)
      values.uid = userInfo.id
      values.name = userInfo.uname
      values.photo = userInfo.photo
      values.phone = userInfo.phone
      values.idCard = userInfo.idCard
      values.email = userInfo.email

      fn(values).then((res) => {
        if (res.code === 200) {
          message.success(res.msg);
          close();
          onOk();
        } else {
          message.success('车位已出售');
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
