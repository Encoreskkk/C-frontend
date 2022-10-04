import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { editPropertyTool, addPropertyTool } from "@/api";
import MyForm from "@/components/form";
import dayjs from "dayjs";

const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      name: "infrastructureName",
      rules: [{ required: true, message: "请输入设施名称" }],
      label: "设施名称",
    },
    childProps: {
      placeholder: "设施名称",
    },
  },
  {
    itemType: "inputText",
    itemProps: {
      name: "infrastructureDis",
      rules: [{ required: true, message: "请输入设施描述" }],
      label: "设施描述",
    },
    childProps: {
      placeholder: "设施描述",
    },
  },
];
export default function PropertyToolModal({ editId, isShow, editData, onCancel, onOk }) {
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
      let fn = modify ? editPropertyTool : addPropertyTool;
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
