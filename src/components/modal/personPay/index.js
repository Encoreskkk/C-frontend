import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getKey } from "@/utils";
import { Modal, Select, message } from "antd";
import { editPersonApply, addPersonPay } from "@/api";
import MyForm from "@/components/form";
const { Option } = Select;

const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      name: "wy_price",
      rules: [{ required: true, message: "请输入缴费金额" }],
      label: "物业费",
    },
    childProps: {
      placeholder: "物业费",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "sd_price",
      rules: [{ required: true, message: "请输入缴费金额" }],
      label: "水电费",
    },
    childProps: {
      placeholder: "水电费"
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "cw_price",
      label: "车位费",
    },
    childProps: {
      placeholder: "车位费"
    },
  },
];
export default function PersonPayModal({ editId, isShow, editData, onCancel, onOk }) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);

  // 初始化表格
  useEffect(() => {
    if (isShow) {
      let items = initFormItems.map((i) => ({ ...i }));

      let data = [{
        'label': '物业费',
        'val': '物业费'
      }, {
        'label': '水电费',
        'val': '水电费'
      }, {
        'label': '车位费',
        'val': '车位费'
      }]

      items.forEach((i) => {
        if (i.itemProps.name === "content") {
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
      let fn = modify ? editPersonApply : addPersonPay;
      if (modify) {
        values.edit_id = editId;
      } 
      let addPayData = {
        payTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      }

      let totalPrice = 0
      let arr = []
      for (const k in values) {
        totalPrice += parseFloat(values[k])
        debugger
        if (k === 'wy_price') {
          arr.push({
            'id': 1,
            'serviceName': '物业费',
            'servicePrice': values[k]
          })
        } else if (k === 'sd_price') {
          arr.push({
            'id': 2,
            'serviceName': '水电费',
            'servicePrice': values[k]
          })
        } else {
          arr.push({
            'id': 2,
            'serviceName': '车位费',
            'servicePrice': values[k]
          })
        }
      }

      let userInfo = getKey(true, 'USER_INFO')
      console.log('用户信息： ', userInfo)
      addPayData.uid = userInfo.id
      addPayData.payAmout = totalPrice
      addPayData.payItem = JSON.stringify(arr)

      // addPayData.name = userInfo.uname
      // addPayData.photo = userInfo.photo
      // addPayData.phone = userInfo.phone
      // addPayData.idCard = userInfo.idCard
      // addPayData.email = userInfo.email

      console.log(addPayData)
      fn(addPayData).then((res) => {
        if (res.code === 200) {
          message.success(res.msg);
          close();
          onOk();
        } else {
          message.success('只有业主才可以缴费');
          close();
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
