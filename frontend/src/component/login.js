import React from 'react';
import ReactDOM from 'react-dom';
import { AppContext } from './data';
import * as antd from 'antd';
import 'antd/dist/antd.css';

const LoginPage = () => {
    const appCtx = React.useContext(AppContext);

    React.useEffect(()=>{
      if (appCtx.account!=''){
        window.location.href = '/#/inProcess';
      }
    })

    const LoginForm = () => {
      return (
        <antd.Form
          onFinish={(values) => appCtx.fetchLogin(values.account, values.password)}
        >
          <antd.Form.Item
            name="account"
            rules={[{ required: true, message: '帳號不可以空白!' }]}
          >
            <antd.Input
              prefix={<i className="fa fa-user" />}
              placeholder="請輸入帳號"
            />
          </antd.Form.Item>

          <antd.Form.Item
            name="password"
            rules={[{ required: true, message: '密碼不可以空白!' }]}
          >
            <antd.Input.Password
              prefix={<i className="fa fa-lock" />}
              placeholder="請輸入密碼"
            />
          </antd.Form.Item>

          <antd.Form.Item className="text-center">
            <antd.Button type="primary" shape="round" htmlType="submit">
              登入
            </antd.Button>
          </antd.Form.Item>
        </antd.Form>
      );
    };

    return (
      <div className="d-flex align-items-center vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-4 m-4 text-center font-weight-bold"
              style={{ fontSize: '20px' }}
            >
              Login
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-4">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  };

  export { LoginPage };
