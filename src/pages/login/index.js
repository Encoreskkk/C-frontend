import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message, Tabs, Radio } from "antd";
import { connect } from "react-redux";
import MyIcon from "@/components/icon";
import { saveUser, getLocalUser, saveToken } from "@/utils";
import { setUserInfoAction } from "@/store/user/action";
import { login, addUser } from "@/api";
import "./index.less";

const { TabPane } = Tabs;

// 触发保存用户信息更新到store中
const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (info) => dispatch(setUserInfoAction(info)),
});
const IPT_RULE_USERNAME = [
  {
    required: true,
    message: "请输入用户名",
  },
];

const IPT_RULE_PASSWORD = [
  {
    required: true,
    message: "请输入密码",
  },
];


const IPT_RULE_SELLERACCOUNT = [
  {
    required: true,
    message: "请输入登录账号",
  },
];

const IPT_RULE_USEREMAIL = [
  {
    required: true,
    message: "请输入邮箱",
  },
];
const IPT_RULE_IDCARD = [
  {
    required: true,
    message: "请输入身份证",
  },
];
const IPT_RULE_SELLERPHONE = [
  {
    required: true,
    message: "请输入手机号",
  },
];

function useLogin(setUserInfo) {
  const [btnLoad, setBtnLoad] = useState(false);
  const onFinish = (values) => {
    setBtnLoad(true);
    values.name = values.uname
    delete values.uname

    login(values)
      .then((res) => {
        const { data, msg, code, token='' } = res;
        setBtnLoad(false);
        if (code !== 200) {
          message.error(msg)
          return;
        }
        saveToken(token);
        data.isLogin = true;
        message.success(msg);
        if (values.remember) {
          saveUser(data);
        }
        setUserInfo(data);
      })
      .catch(() => {
        setBtnLoad(false);
      });
  };
  return { btnLoad, onFinish };
}

function Login({ setUserInfo }) {
  const { btnLoad, onFinish } = useLogin(setUserInfo);
  const [form] = Form.useForm();
  const [tabKey, setTabKey] = useState("1");
  const [role, setRole] = useState(1);
  function handleReg() {
    form.validateFields().then((values)=>{　　// 如果全部字段通过校验，会走then方法，里面可以打印出表单所有字段（一个object）
      addUser(values).then((result) => {
        console.log('注册：', result)
        if (result.code === 200) {
          form.resetFields()
          message.success('注册成功，请登录')
          setTabKey("1")
        } else {
          message.error(result.msg)
        }
      })
    }).catch((errInfo)=>{　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
      message.error('请填写参数')
    })
    
  }

  function chooseHandle(k) {
    setTabKey(k)
  }

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setRole(e.target.value);
  };


  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="title">社区生活服务管理系统</div>
        <div className="welcome">欢迎使用，请先登录</div>
        <Tabs defaultActiveKey="1"  activeKey={tabKey} onChange={chooseHandle}>
            <TabPane tab="登录" key="1">
              <Form
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item name="uname" rules={IPT_RULE_USERNAME}>
                  <Input
                    prefix={<MyIcon type="icon_nickname" />}
                    placeholder="账号"
                  />
                </Form.Item>
                <Form.Item name="pwd" rules={IPT_RULE_PASSWORD}>
                  <Input
                    prefix={<MyIcon type="icon_locking" />}
                    type="password"
                    placeholder="密码"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                  </Form.Item>
                </Form.Item>
                <Form.Item className="btns">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={btnLoad}
                  >
                    登录
                  </Button>
                  {/* <Button htmlType="reset">重置</Button> */}
                </Form.Item>
              </Form>
            </TabPane>
{/*           <TabPane tab="注册" key="2">
              <Form
                form={form}
              >
              <Form.Item name="uname" rules={IPT_RULE_SELLERACCOUNT}>
                <Input
                  placeholder="登录账号"
                />
              </Form.Item>
              <Form.Item name="pwd" rules={IPT_RULE_PASSWORD}>
                <Input
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item name="name" rules={IPT_RULE_USERNAME}>
                <Input
                  placeholder="姓名"
                />
              </Form.Item>
              <Form.Item name="email" rules={IPT_RULE_USEREMAIL}>
                <Input
                  placeholder="邮箱"
                />
              </Form.Item>
              <Form.Item name="phone" rules={IPT_RULE_SELLERPHONE}>
                <Input
                  placeholder="电话"
                />
              </Form.Item>
              <Form.Item name="idCard" rules={IPT_RULE_IDCARD}>
                <Input
                  placeholder="身份证"
                />
              </Form.Item>
              <Form.Item name="role"
                rules={[
                  {
                    required: true,
                    message: "请选择身份",
                  },
              ]}
              >
                <Radio.Group onChange={onChange}>
                  <Radio value={1}>管理员</Radio>
                  <Radio value={0}>业主</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item className="btns">
              <Button type="primary" onClick={handleReg}>
                注册
              </Button>
              </Form.Item>
            </Form>
          </TabPane> */}
        </Tabs>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Login);
