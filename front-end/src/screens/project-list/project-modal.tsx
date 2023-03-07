import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal, useProjectQueryKey } from "./util";
import { UserSelector } from "../../components/user-selector";
import { useAddProject, useEditProject } from "../../utils/project";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import styled from "@emotion/styled";


export const ProjectModal = () => {
  const {projectModalOpen, close, editingProject, isLoading} = useProjectModal();

  const title = editingProject ? 'Editing' : "Create"
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {mutateAsync, error, isLoading: mutateLoading} = useMutateProject(useProjectQueryKey());
  const [form] = useForm();

  const onFinish = (values: any) => {
    mutateAsync({...editingProject, ...values}).then(() => {
      form.resetFields();
      close();
    })
  };

  const closeModal = () => {
    form.resetFields();
    close();
  }

  useEffect(() => {
      form.setFieldsValue(editingProject);
  }, [editingProject]);

  return <Drawer forceRender={true} onClose={closeModal} open={projectModalOpen} width={'100%'}>
    <Container>
      {
        isLoading ? <Spin size={"large"}/> : <>
          <h1>{title}</h1>
          {error instanceof Error? error.message : null}
          <Form layout={"vertical"} style={{width: "40rem"}} onFinish={onFinish} form={form}>
            <Form.Item label={'Name'} name={"name"} rules={[{required: true, message: "please input project name"}]}>
              <Input placeholder={"please input project name"}/>
            </Form.Item>
            <Form.Item label={'Organization'} name={"organization"} rules={[{required: true, message: "please input Organization"}]}>
              <Input placeholder={"please input Organization"}/>
            </Form.Item>
            <Form.Item label={'Manager'} name={"personId"}>
              <UserSelector defaultOptionName={'Manager'} />
            </Form.Item>
            <Form.Item style={{display:"flex", justifyContent:"end"}}>
              <Button loading={mutateLoading} type={"primary"} htmlType={"submit"}>
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
  flex-direction: column;
  height: 80vh;
  display: flex;
 
  justify-content: center;
  align-items: center;
`
