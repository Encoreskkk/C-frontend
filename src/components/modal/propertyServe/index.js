import React, { useEffect, useState } from "react";
import { Modal, Select, message } from "antd";
import { editPropertyServe, addPropertyServe } from "@/api";
import MyForm from "@/components/form";
const { Option } = Select;

const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      name: "serviceName",
      rules: [{ required: true, message: "请输入服务项目" }],
      label: "服务项目",
    },
    childProps: {
      placeholder: "服务项目",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "servicePrice",
      rules: [{ required: true, message: "请输入收费标准" }],
      label: "收费标准",
    },
    childProps: {
      placeholder: "服务项目",
    },
  },
  // {
  //   itemType: "inputText",
  //   itemProps: {
  //     name: "serve_desc",
  //     rules: [{ required: true, message: "请输入服务项目描述" }],
  //     label: "项目描述",
  //   },
  //   childProps: {
  //     placeholder: "服务项目描述"
  //   },
  // },
];
export default function PropertyServeModal({ editId, isShow, editData, onCancel, onOk }) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);

  // 初始化表格
  useEffect(() => {
    if (isShow) {
      let items = initFormItems.map((i) => ({ ...i }));
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
      let fn = modify ? editPropertyServe : addPropertyServe;
      if (modify) {
        values.id = editId;
      }
      fn(values).then((res) => {
        if (res.code === 200) {
          message.success(res.msg);
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
