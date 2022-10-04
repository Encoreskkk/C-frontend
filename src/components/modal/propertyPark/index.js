import React, { useEffect, useState } from "react";
import { Modal, Select, message } from "antd";
import { editPropertyPark, addPropertyPark } from "@/api";
import MyForm from "@/components/form";
const { Option } = Select;

const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      name: "parkBm",
      rules: [{ required: true, message: "请输入车位编号" }],
      label: "车位编号",
    },
    childProps: {
      placeholder: "车位编号",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "parkAddress",
      rules: [{ required: true, message: "请输入车位地址" }],
      label: "车位地址",
    },
    childProps: {
      placeholder: "车位地址"
    },
  },
  {
    itemType: "select",
    itemProps: {
      name: "state",
      rules: [{ required: true, message: "请选择车位出售状态" }],
      label: "出售状态",
    },
    childProps: {
      placeholder: "出售状态",
    },
  },
];
export default function PropertyParkModal({ editId, isShow, editData, onCancel, onOk }) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);

  // 初始化表格
  useEffect(() => {
    if (isShow) {
      let items = initFormItems.map((i) => ({ ...i }));

      let data = [{
        'label': '空闲',
        'val': 0
      }, {
        'label': '出售',
        'val': 1
      }]

      items.forEach((i) => {
        if (i.itemProps.name === "state") {
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
      let modify = Boolean(editId);
      let fn = modify ? editPropertyPark : addPropertyPark;
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
