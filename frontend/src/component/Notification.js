import React from 'react';
import * as antd from 'antd';
import 'antd/dist/antd.css';

const Notification = (type,msg) => {
    antd.notification[type]({
      message: type,
      description:msg,
      duration: 3,
    });
};


export {Notification};