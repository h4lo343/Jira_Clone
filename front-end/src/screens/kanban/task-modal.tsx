import { useForm } from "antd/es/form/Form";
import { useDeleteTask, useEditTask, useTask, useTasks } from "../../utils/task";
import { useTaskModal, useTasksQueryKey } from "./util";
import { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserSelector } from "../../components/user-selector";
import { TaskTypeSelector } from "../../components/task-type-select";
import Logo from "react-query/types/devtools/Logo";
import { useQueryClient } from "react-query";

const layout = {
  labelCol: {span: 8},
  wrapper: {span: 16}
}

export const TaskModal = () => {
  const queryClient = useQueryClient();
  const [form] = useForm()
  const {editingTaskId, editingTask, close} = useTaskModal()
  const {mutateAsync: editTask, isLoading: editLoading} = useEditTask(useTasksQueryKey());
  const {mutateAsync:deleteTask} = useDeleteTask(useTasksQueryKey())

  const onCancel = () => {
    close()
    form.resetFields()
  }

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    await queryClient.invalidateQueries('taskType');
    close();
  };

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "Confirm",
      cancelText: "Cancel",
      title: `Delete The Task?`,
      onOk() {
        return deleteTask({id: Number(editingTaskId)})
      }
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingTask)
  } ,[form, editingTask])

  return <Modal onCancel={onCancel} onOk={onOk} okText={"Confirm"} cancelText={"Cancel"} confirmLoading={editLoading} title={"Edit task"} open={!!editingTaskId}>
    <Form {...layout} initialValues={editingTask} form={form}>
      <Form.Item label={"Task name"} name={"name"} rules={[{required: true, message: 'please give a task name'}]}>
        <Input/>
      </Form.Item>
      <Form.Item label={"Processor"} name={"processorId"}>
        <UserSelector defaultOptionName={"All ProcessorId"}/>
      </Form.Item>
      <Form.Item label={"Type"} name={"typeId"}>
        <TaskTypeSelector defaultOptionName={"All Types"}/>
      </Form.Item>
    </Form>
    <div style={{textAlign:'right'}}>
      <Button size={"small"} style={{fontSize:"14px"}} onClick={startDelete}>Delete</Button>
    </div>
  </Modal>
}
