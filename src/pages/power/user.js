import React, { useState } from "react";
import { Button, Row, Col, Popconfirm, message } from "antd";
import MyPagination from "@/components/pagination";
import UserModal from "@/components/modal/user";
import MyTable from "@/components/table";
import { getUserList, delUser } from "@/api";
import "./index.less";

export default function User() {
  const [tableData, setData] = useState([]);
  const [tableCol, setCol] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShow] = useState(false);
  const [editId, setId] = useState(null);
  const [pageData, setPage] = useState({ curPage: 1 });
  const [editData, setEditData] = useState(null);

  // 显示弹窗
  const showInfoModal = (record, type) => {
    if (record) {
      setId(record.id);
      setEditData(record)
    } else {
      setId(null);
    }
    setShow(type);
  };
  const activeCol = {
    dataIndex: "active",
    key: "active",
    title: "操作",
    align: "center",
    render: (text, record) => (
      <row>
        <Button type="link" onClick={() => showInfoModal(record, true)}>
          编辑
        </Button>
        <Popconfirm
        onConfirm={() => deleteUser(record)}
        okText="确认"
        title="确认删除此用户？"
        cancelText="取消"
      >
        <Button type="link" danger>
          删除
        </Button>
      </Popconfirm>
      </row>
    ),
  };
  const renderTitle = () => (
    <Row justify="space-between" align="center" gutter={80}>
      <Col style={{ lineHeight: "32px" }}>用户信息列表</Col>
      <Col>
        <Button type="primary" onClick={() => showInfoModal(null, true)}>
          添加用户
        </Button>
      </Col>
    </Row>
  );

  const getUserData = (data) => {
    setPage(data);
    getUserList(data).then((res) => {
      const { data, code, count} = res;
      if (code === 200 && data) {
        // const { mapKey, list } = data;
        let list = data
        let total = count

//         email: "22@QQ.COM"
// id: 1
// idCard: "5733673629293893"
// name: "周杰伦"
// phone: "1322345678"
// photo: ""
// pwd: "123456"
// role: 0
// uname: "yy"

        let columns= [
          {
            dataIndex: "id",
            key: "id",
            title: "用户ID",
          },{
            dataIndex: "uname",
            key: "uname",
            title: "登录账号",
          }, {
            dataIndex: "name",
            key: "name",
            title: "姓名",
          }, {
            dataIndex: "phone",
            key: "phone",
            title: "电话",
          },  {
            dataIndex: "email",
            key: "email",
            title: "邮箱",
          }, {
            dataIndex: "idCard",
            key: "idCard",
            title: "身份证",
          }, {
            dataIndex: "role",
            key: "role",
            title: "角色",
            render: (text) => {
              if (text === 1) {
                return "管理员"
              } else {
                return "业主"
              }
            }
          }
        ]
        columns.push(activeCol) // 添加操作按钮
        setCol(columns);
        setTotal(total);
        setData(list);
      }
    });
  };
  const updateUserData = () => {
    getUserData(pageData);
  };

  // 删除用户
  const deleteUser = (info) => {
    delUser(info.id).then((res) => {
      const { msg, code } = res;
      if (code === 200) {
        message.success(msg);
        getUserData(pageData);
      }
    });
  };

  return (
    <div className="user-container">
      <MyTable
        title={renderTitle}
        dataSource={tableData}
        rowKey="id"
        saveKey="userTable"
        columns={tableCol}
        pagination={false}
      />
      <MyPagination
        total={total}
        curPage={pageData.curPage}
        immediately={getUserData}
        change={getUserData}
      />
      <UserModal
        isShow={showModal}
        editId={editId}
        editData={editData}
        onCancel={showInfoModal}
        onOk={updateUserData}
      />
    </div>
  );
}

User.route = { path: "/power/user" };
