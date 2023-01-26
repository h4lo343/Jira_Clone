import React, { FormEvent } from 'react'
import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { useAsync } from "../utils/use-async";
import { LongButton } from "./index";



export const RegisterScreen = ({onError}: {onError: (error:Error) => void}) => {
  const {register, user} = useAuth();
  const { run, isLoading } = useAsync(undefined);

  const handleSubmit = async (values:{name: string, password: string, cpassword: string} ) => {
    if (values.cpassword !== values.password) {
      onError(new Error('passwords do not match'));
      return;
    }
    try {
      await run(register(values));
    }catch (e:any) {
      onError(e)
    }

  }
  return <Form onFinish={handleSubmit}>
    <Form.Item
      name={"username"}
      rules={[{ required: true, message: "Please input username" }]}
    >
      <Input placeholder={"Username"} type="text" id={"username"} />
    </Form.Item>
    <Form.Item
      name={"password"}
      rules={[{ required: true, message: "Please input password" }]}
    >
      <Input placeholder={"Password"} type="password" id={"password"} />
    </Form.Item>
    <Form.Item
      name={"cpassword"}
      rules={[{ required: true, message: "please confirm password" }]}
    >
      <Input placeholder={"Confirm"} type="password" id={"cpassword"} />
    </Form.Item>
    <Form.Item>
      <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
        Register
      </LongButton>
    </Form.Item>
  </Form>
}
