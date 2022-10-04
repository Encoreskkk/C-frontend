import React, { useEffect, useState } from "react";
import { Modal, Select, message } from "antd";
import dayjs from "dayjs";
import { editPropertyTask, addPropertyTask, getPropertyStaffList } from "@/api";
import MyForm from "@/components/form";
const { Option } = Select;

const initFormItems = [
  {
    itemType: "select",
    itemProps: {
      name: "staffId",
      rules: [{ required: true, message: "请输入人员姓名" }],
      label: "人员姓名",
    },
    childProps: {
      placeholder: "人员姓名",
    },
  },
  {
    itemType: "datePicker",
    itemProps: {
      name: "workBenginTime",
      rules: [{ required: true, message: "选择任务开始时间" }],
      label: "开始时间",
    },
    childProps: {
      placeholder: "任务开始时间",
      showTime: 'showTime',
      format: "YYYY-MM-DD HH:mm"
    },
  },
  {
    itemType: "datePicker",
    itemProps: {
      name: "workEndTime",
      rules: [{ required: true, message: "选择任务结束时间" }],
      label: "结束时间",
    },
    childProps: {
      placeholder: "任务结束时间",
      showTime: 'showTime',
      format: "YYYY-MM-DD HH:mm"
    },
  },
  {
    itemType: "inputText",
    itemProps: {
      name: "workContent",
      label: "任务描述",
    },
    childProps: {
      placeholder: "任务描述"
    },
  },
];
export default function PropertyTaskModal({ editId, isShow, editData, onCancel, onOk }) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);

  // 初始化表格
  useEffect(() => {
    if (isShow) {
      getPropertyStaffList().then((res) => {
        const { data, code } = res;
        if (code === 200) {
          let items = initFormItems.map((i) => ({ ...i }));
          items.forEach((i) => {
            if (i.itemProps.name === "staffId") {
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
    }
  }, [isShow]);

  // 初始化表格
  useEffect(() => {
    if (editId && form) {
      for (const k in editData) { //日期回显处理
        if (k === 'workBenginTime' || k === 'workEndTime') {
          editData[k] = dayjs(editData[k])
        }
      }
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
      let fn = modify ? editPropertyTask : addPropertyTask;
      if (modify) {
        values.id = editId;
      }
      values.workBenginTime = dayjs(values.workBenginTime).format('YYYY-MM-DD HH:mm:ss')
      values.workEndTime = dayjs(values.workEndTime).format('YYYY-MM-DD HH:mm:ss')
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
