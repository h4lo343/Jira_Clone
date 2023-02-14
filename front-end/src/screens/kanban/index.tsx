

import { useKanbanSearchParams, useProjectIdInUrl, useProjectInUrl } from "./util";
import { Kanban } from "../../types/kanban";
import { useKanbans } from "../../utils/kanban";
import { useDocumentTitle } from "../../utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./SearchPanel";



export const KanbanScreen = () => {
  useDocumentTitle('Kanban List')

  const {data: currentProject} = useProjectInUrl();
  const {data: Kanbans} = useKanbans(useKanbanSearchParams())
  return (
    <div>
      <h1>{currentProject?.name} Kanban</h1>
      <SearchPanel/>
      <ColumnsContainer>
        {
          Kanbans?.map((kanban: Kanban) => <KanbanColumn kanban={kanban} key={kanban._id}/>)
        }
      </ColumnsContainer>
    </div>
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
  margin-top: 3rem;
  
`
