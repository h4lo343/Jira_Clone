import React, { FormEvent } from 'react'
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";



export const LoginScreen = () => {
  const {login, user} = useAuth();

  const handleSubmit = (values:{name: string, password: string} ) => {
    login(values);
  }

  return <Form onFinish={handleSubmit}>
    <Form.Item name={'name'} rules={[{required: true, message: "please input username"}]}>
      <Input  placeholder={"username"} type="text" id={'username'}/>
    </Form.Item>
    <Form.Item name={'password'} rules={[{required: true, message: "please input password"}]}>
      <Input placeholder={'password'} type="password" id={'password'}/>
    </Form.Item>
    <Form.Item >
      <Button type={'primary'} htmlType={'submit'}>Login</Button>
    </Form.Item>
  </Form>
}
