import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { projectListActions, selectProjectModalOpen } from "./project-list-slice";
import { useAppSelector } from "../../store";


export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useAppSelector(selectProjectModalOpen)
  return <Drawer
    onClose={() => dispatch(projectListActions.closeProjectModal())}
    open={projectModalOpen}
    width={'100%'}
  >
    <h1>Project Modal</h1>
    <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>Close</Button>
  </Drawer>
}

