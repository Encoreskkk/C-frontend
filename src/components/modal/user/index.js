import React, { useEffect, useState } from "react";
import { Modal, Select, message } from "antd";
import { addUser,  editUser } from "@/api";
import MyForm from "@/components/form";
const { Option } = Select;

const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      name: "uname",
      rules: [{ required: true, message: "请填写登录账号" }],
      label: "登录账号",
    },
    childProps: {
      placeholder: "登录账号",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "pwd",
      rules: [{ required: true, message: "请填写登录密码" }],
      label: "登录密码",
    },
    childProps: {
      placeholder: "登录密码,若填写则表示修改",
      // type: "password",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "name",
      rules: [{ required: true, message: "请填写用户名" }],
      label: "用户名",
    },
    childProps: {
      placeholder: "用户名",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "phone",
      rules: [{ required: true, message: "请填写用户电话" }],
      label: "用户电话",
    },
    childProps: {
      placeholder: "用户电话",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "email",
      rules: [{ required: true, message: "请填写用户邮箱" }],
      label: "用户邮箱",
    },
    childProps: {
      placeholder: "用户邮箱",
    },
  },
  {
    itemType: "input",
    itemProps: {
      rules: [{ required: true, message: "请填写身份证" }],
      name: "idCard",
      label: "身份证",
    },
    childProps: {
      placeholder: "身份证",
    },
  },
  {
    itemType: "select",
    itemProps: {
      rules: [{ required: true, message: "请选择角色" }],
      name: "role",
      label: "用户角色",
    },
    childProps: {
      placeholder: "用户角色",
    },
  },
];
export default function UserModal({ editId, isShow, editData, onCancel, onOk  }) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);
  useEffect(() => {
    if (isShow) {

      let items = initFormItems.map((i) => ({ ...i }));

      let data = [{
        'label': '管理员',
        'val': 1
      }, {
        'label': '业主',
        'val': 0
      }]

      items.forEach((i) => {
        if (i.itemProps.name === "role") {
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

  useEffect(() => {
    if (editId && form) {
      form.setFieldsValue(editData);
      let items = initFormItems.map((i) => ({ ...i }));
      // items.forEach((i) => {
      //   if (i.itemProps.name === "pswd") {
      //     i.itemProps.rules = null;
      //   }
      // });
      setItems(items);
    } else if (!editId) {
      // set formItem
      let items = initFormItems.map((i) => ({ ...i }));
      // items.forEach((i) => {
      //   if (i.itemProps.name === "pswd") {
      //     i.itemProps.rules = paswdRule;
      //   }
      // });
      setItems(items);
    }
  }, [editId, editData, form]);

  const submit = () => {
    form.validateFields().then((values) => {
      let modify = Boolean(editId);
      let fn = modify ? editUser : addUser;
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
      title={editId ? "修改信息" : "添加账户"}
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
