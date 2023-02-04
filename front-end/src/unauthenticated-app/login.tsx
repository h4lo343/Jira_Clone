import React, { FormEvent } from 'react'
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { useAsync } from "../utils/use-async";
import { useDispatch } from "react-redux";



export const LoginScreen = ({onError}: {onError: (error:Error) => void}) => {
  const {login, user} = useAuth();
  const { run, isLoading } = useAsync(undefined);
  const dispatch = useDispatch();

  const handleSubmit = async (values: {
    name: string;
    password: string;
  }) => {
    login(values);
    try {
      await run(login(values));
    } catch (e:any) {
      onError(e);
    }
  };

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
