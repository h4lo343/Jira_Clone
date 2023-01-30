import { useUsers } from "../utils/user";
import { IdSelector } from "./id-selector";

export const UserSelector = (props: React.ComponentProps<typeof IdSelector>) => {
  const {data: users} = useUsers();

  return <IdSelector options={users || []} {...props}></IdSelector>
}
