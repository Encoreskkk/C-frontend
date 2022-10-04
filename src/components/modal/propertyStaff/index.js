import React, { useEffect, useState } from "react";
import { Modal, Select, message } from "antd";
import { editPropertyStaff, addPropertyStaff, getPropertyStaffPositionList } from "@/api";
import MyForm from "@/components/form";
const { Option } = Select;

const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      name: "name",
      rules: [{ required: true, message: "请输入人员姓名" }],
      label: "人员姓名",
    },
    childProps: {
      placeholder: "人员姓名",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "phone",
      rules: [{ required: true, message: "请输入人员电话" }],
      label: "人员电话",
    },
    childProps: {
      placeholder: "人员电话",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "post",
      rules: [{ required: true, message: "请选择人员职位" }],
      label: "人员职位",
    },
    childProps: {
      placeholder: "人员职位",
    },
  },
  {
    itemType: "select",
    itemProps: {
      name: "sex",
      label: "员工性别",
    },
    childProps: {
      placeholder: "员工性别"
    },
  },
];
export default function PropertyStaffModal({ editId, isShow, editData, onCancel, onOk }) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);

  // 初始化表格
  useEffect(() => {
    if (isShow) {
      let items = initFormItems.map((i) => ({ ...i }));

      // getPropertyStaffPositionList().then((res) => {
      //   const { data, code } = res;
      //   if (code === 200) {
      //     let items = initFormItems.map((i) => ({ ...i }));
      //     items.forEach((i) => {
      //       if (i.itemProps.name === "post") {
      //         i.childProps.children = data.map((power) => (
      //           <Option value={power.name} key={power.name}>
      //             {power.name}
      //           </Option>
      //         ));
      //       }
      //     });
      //     setItems(items);
      //   }
      // })
      


      let data = [{
        'label': '男',
        'val': 1
      }, {
        'label': '女',
        'val': 0
      }]

      items.forEach((i) => {
        if (i.itemProps.name === "sex") {
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
      let fn = modify ? editPropertyStaff : addPropertyStaff;
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
