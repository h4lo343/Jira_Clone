import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import { Card } from "antd";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return <div style={{display:"flex", justifyContent:'center'}}>
    <Card>
      {
        isRegister ? <RegisterScreen/> : <LoginScreen/>
      }
      <button onClick={()=> setIsRegister(!isRegister)}>Change to {isRegister? "Login" : "Register"}</button>
    </Card>
  </div>
}
