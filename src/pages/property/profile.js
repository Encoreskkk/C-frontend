import React, { useState } from "react";
import { Form, Input,  Button, Row, Col, Spin, message, Popconfirm } from "antd";
import MyPagination from "@/components/pagination";
import MyTable from "@/components/table";
import PropertyProfileModal from '@/components/modal/propertyProfile'

import { getPropertyProfileList, delProfile } from "@/api";

import "./index.less";
export default function SearchPage() {
  const [searchForm] = Form.useForm();
  const [pageData, setPageData] = useState({ curPage: 1 });
  const [tableData, setData] = useState([]);
  const [tableCol, setCol] = useState([]);
  const [load, setLoad] = useState(true);
  const [total, setTotal] = useState(0);
  const [showModal, setShow] = useState(false);
  const [editId, setId] = useState(null);
  const [editData, setEditData] = useState(null);


  // 显示弹窗
  const showInfoModal = (record, type) => {
    if (record) {
      debugger
      setId(record.id);
      setEditData(record)
    } else {
      setId(null);
      setEditData(null)
    }
    setShow(type);
  };
  const activeCol = {
    dataIndex: "active",
    key: "active",
    title: "操作",
    align: "center",
    render: (text, record) => (
      <Row>
        <Button type="link" onClick={() => showInfoModal(record, true)}>
          编辑
        </Button>
        <Popconfirm
          onConfirm={() => deleteProfile(record)}
          okText="确认"
          title="确认删除此用户档案？"
          cancelText="取消"
        >
          <Button type="link" danger>
            删除
          </Button>
        </Popconfirm>
      </Row>
    ),
  };
  // 获取列表
  const getDataList = (data) => {
    getPropertyProfileList(data).then((res) => {
      const { data, code, count} = res;
      if (code === 200) {
        // let { list, total, mapKey } = data;
        // mapKey = mapKey.map((i) => {
        //   if (i.key === "description") {
        //     i.width = 500;
        //   }
        //   return i;
        // });

        let list = data 
        let total = count
        let columns= [
          {
            dataIndex: "id",
            key: "id",
            title: "序号",
          }, {
            dataIndex: "name",
            key: "name",
            title: "业主姓名",
          }, {
            dataIndex: "phone",
            key: "phone",
            title: "业主电话",
          }, {
            dataIndex: "floorBm",
            key: "floorBm",
            title: "业主户号",
          }, {
          }, {
            dataIndex: "area",
            key: "area",
            title: "房间面积",
          }, {
            dataIndex: "floorDis",
            key: "floorDis",
            title: "位置",
          },  {
            dataIndex: "ifIn",
            key: "ifIn",
            title: "门禁",
            render: (text) => {
              if (text === 1) {
                return '已录入'
              } else {
                return '未录入'
              }
            }
          }
        ]
        columns.push(activeCol) // 添加操作按钮
        setCol(columns);
        setTotal(total);
        setData(list.map((i) => ({ ...i, key: i.m_id })));
        setLoad(false);
        return;
      }
    });
  };

  // 顶部搜索
  const search = (isSearch) => {
    setPageData({ curPage: 1 });
    let data = searchForm.getFieldsValue();
    let params = { ...data };
    if (!isSearch) {
      params = { ...params, ...pageData };
    }
    getDataList(params);
  };

  // 页码改版
  const pageChange = (pageData) => {
    let data = searchForm.getFieldsValue();
    getDataList({ ...pageData, ...data });
    setPageData(pageData);
  };

  const tableTop = (
    <Row justify="space-between" align="center" gutter={80}>
      <Col style={{ lineHeight: "32px" }}>档案查询</Col>
      <Col>
        <Button type="primary" onClick={() => setShow(true)}>
          添加档案
        </Button>
      </Col>
    </Row>
  );

  const updatePropertyData = () => {
    getDataList(pageData);
  };

  // 删除档案信息
  const deleteProfile = (info) => {
    delProfile(info.id).then((res) => {
      const { msg, code } = res;
      if (code === 200) {
        message.success(msg);
        getDataList(pageData);
      }
    });
  };

  return (
    <div className="search-container">
      <Spin spinning={load}>
        <div className="top-form">
          <Form layout="inline" form={searchForm}>
            <Form.Item name="name">
              <Input placeholder="输入业主姓名" />
            </Form.Item>
            {/* <Form.Item name="description">
              <Input placeholder="输入消息描述词" />
            </Form.Item> */}
            <Button onClick={search} type="primary" className="submit-btn">
              搜索
            </Button>
            <Button
              onClick={() => {
                searchForm.resetFields();
                search();
              }}
            >
              清空
            </Button>
          </Form>
        </div>
        <MyTable
          title={() => tableTop}
          dataSource={tableData}
          columns={tableCol}
          pagination={false}
          saveKey="listForm"
          rowKey="id"
        />
        <MyPagination
          curPage={pageData.curPage}
          immediately={getDataList}
          change={pageChange}
          total={total}
        />
      </Spin>

      <PropertyProfileModal
        isShow={showModal}
        editId={editId}
        editData={editData}
        onCancel={showInfoModal}
        onOk={updatePropertyData}
      />

      {/* 添加弹窗 */}
      {/* <Modal
        title="添加物资"
        visible={showModal}
        cancelText="取消"
        okText="添加"
        onOk={() => addList()}
        onCancel={() => setShow(false)}
      >
        <Form form={form}>
          <Form.Item
            label="物资名称"
            name="goods_name"
            rules={[
              {
                required: true,
                message: "请输入物资名称!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="物资数量"
            name="goods_num"
            rules={[
              {
                required: true,
                message: "请输入物资数量!",
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="物资价格"
            name="goods_price"
            rules={[
              {
                required: true,
                message: "请输入物资价格!",
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
}
SearchPage.route = {
  path: "/property/profile",
};
