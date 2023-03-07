import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import { UserSelector } from "../../components/user-selector";
import { useAddEpic } from "../../utils/epic";
import { useEpicQueryKey } from "./util";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { useProjectIdInUrl } from "../kanban/util";


export const CreateEpic = (props: Pick<DrawerProps, 'open'> &{onClose: () => void}) => {

  const {mutate: addEpic, isLoading, error} = useAddEpic(useEpicQueryKey())
  const [form] = useForm()
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({...values, projectId: projectId})
    props.onClose()
  }

  useEffect(() => {
    form.resetFields()
  }, [form, props.open])

  return <Drawer
    forceRender={true}
    destroyOnClose={true}
    width={'100%'}
    open={props.open}
    onClose={props.onClose}>
      <Container>
        {
          isLoading ? <Spin size={"large"}/> : <>
            <h1>{"Create Epic"}</h1>
            {error instanceof Error? error.message : null}
            <Form layout={"vertical"} style={{width: "40rem"}} onFinish={onFinish} form={form}>
              <Form.Item label={'Name'} name={"name"} rules={[{required: true, message: "please input epic name"}]}>
                <Input placeholder={"please input epic name"}/>
              </Form.Item>
              <Form.Item style={{display:"flex", justifyContent:"end"}}>
                <Button loading={isLoading} type={"primary"} htmlType={"submit"}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        }
      </Container>
    </Drawer>
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
