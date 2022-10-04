import React, { useEffect, useState } from "react";
import { Modal, Select, message } from "antd";
import { editPropertyRoom, addPropertyRoom, getPropertyBuildList } from "@/api";
import MyForm from "@/components/form";
const { Option } = Select;

const initFormItems = [
  {
    itemType: "input",
    itemProps: {
      name: "floorBm",
      rules: [{ required: true, message: "请输入户号" }],
      label: "房间户号",
    },
    childProps: {
      placeholder: "房间户号",
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "area",
      rules: [{ required: true, message: "请输入房间面积" }],
      label: "房间面积",
    },
    childProps: {
      placeholder: "房间面积"
    },
  },
  {
    itemType: "input",
    itemProps: {
      name: "floorDis",
      label: "房间说明",
    },
    childProps: {
      placeholder: "房间说明"
    },
  },

  {
    itemType: "select",
    itemProps: {
      name: "buildId",
      rules: [{ required: true, message: "请选择房间所在大楼" }],
      label: "房间楼栋",
    },
    childProps: {
      placeholder: "房间楼栋",
    },
  },
  // {
  //   itemType: "select",
  //   itemProps: {
  //     name: "state",
  //     rules: [{ required: true, message: "请选择房间入住状态" }],
  //     label: "是否入住",
  //   },
  //   childProps: {
  //     placeholder: "是否入住",
  //   },
  // },
];
export default function PropertyRoomModal({ editId, isShow, editData, onCancel, onOk }) {
  const [form, setForm] = useState(null);
  const [formItems, setItems] = useState([]);
  const [buildingData, setBuildingData] = useState([]);

  // 初始化表格
  useEffect(() => {
    if (isShow) {
      // let items = initFormItems.map((i) => ({ ...i }));

      getPropertyBuildList().then((res) => {
        const { data, code } = res;
        if (code === 200) {
          setBuildingData(data)
          let items = initFormItems.map((i) => ({ ...i }));
          items.forEach((i) => {
            if (i.itemProps.name === "buildId") {
              i.childProps.children = data.map((power) => (
                <Option value={power.id} key={power.id}>
                  {power.buildName}
                </Option>
              ));
            }
          });
          setItems(items);
        }
      })
      
      // let datas = [{
      //   'label': '未入住',
      //   'val': 0
      // }, {
      //   'label': '已入住',
      //   'val': 1
      // }]
      // items.forEach((i) => {
      //   if (i.itemProps.name === "state") {
      //     i.childProps.children = datas.map((power) => (
      //       <Option value={power.val} key={power.label}>
      //         {power.label}
      //       </Option>
      //     ));
      //   }
      // });
      // setItems(items);
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
      let fn = modify ? editPropertyRoom : addPropertyRoom;
      if (modify) {
        values.id = editId;
      }

      for (const k in buildingData) {
        if (buildingData[k]['id'] === values.buildId) {
          values.buildName = buildingData[k]['buildName']
          values.buildAddress = buildingData[k]['buildAddress']
        }
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
