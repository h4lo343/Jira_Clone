import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { KanbanScreen } from "../kanban";
import { EpicScreen } from "../epic";


export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>Kanban</Link>
      <Link to={"epic"}>Tasks</Link>

      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen/>}/>
        <Route path={"/epic"} element={<EpicScreen/>}/>
        <Route index element={<Navigate to={window.location.pathname + "/kanban"} replace={true}/>} />
      </Routes>
    </div>
  )
}
