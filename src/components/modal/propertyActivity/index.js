import React, { useEffect, useState } from "react";
import { Modal, Select, message } from "antd";
import dayjs from "dayjs";
import { editPropertyActivity, addPropertyActivity } from "@/api";
import MyForm from "@/components/form";
const { Option } = Select;

const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      name: "activityName",
      rules: [{ required: true, message: "请输入活动名称" }],
      label: "活动名称",
    },
    childProps: {
      placeholder: "活动名称",
    }
  },
  {
    itemType: "datePicker",
    itemProps: {
      name: "activityBeginTime",
      rules: [{ required: true, message: "选择活动开始时间" }],
      label: "开始时间",
    },
    childProps: {
      placeholder: "活动开始时间",
      showTime: 'showTime',
      format: "YYYY-MM-DD HH:mm"
    },
  },
  {
    itemType: "datePicker",
    itemProps: {
      name: "activityEndTime",
      rules: [{ required: true, message: "选择活动结束时间" }],
      label: "结束时间",
    },
    childProps: {
      placeholder: "活动结束时间",
      showTime: 'showTime',
      format: "YYYY-MM-DD HH:mm"
    },
  },
  {
    itemType: "inputText",
    itemProps: {
      name: "activityDis",
      label: "活动描述",
    },
    childProps: {
      placeholder: "活动描述"
    },
  },
];
export default function PropertyActivityModal({ editId, isShow, editData, onCancel, onOk }) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);

  // 初始化表格
  useEffect(() => {
    if (isShow) {
      let items = initFormItems.map((i) => ({ ...i }));

      let data = [{
        'label': '物业经理',
        'val': '物业经理'
      }, {
        'label': '物业主任',
        'val': '物业主任'
      }, {
        'label': '保洁员',
        'val': '保洁员'
      }]

      items.forEach((i) => {
        if (i.itemProps.name === "staff_role") {
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
      console.log('editData: ', editData)
      for (const k in editData) { //日期回显处理
        if (k === 'activityBeginTime' || k === 'activityEndTime') {
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
      let fn = modify ? editPropertyActivity : addPropertyActivity;
      if (modify) {
        values.id = editId;
      }
      values.activityBeginTime = dayjs(values.activityBeginTime).format('YYYY-MM-DD HH:mm:ss')
      values.activityEndTime = dayjs(values.activityEndTime).format('YYYY-MM-DD HH:mm:ss')
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
