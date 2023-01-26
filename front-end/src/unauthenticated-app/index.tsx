import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import { Button, Card, Divider } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { ErrorBox } from "../components/lib";
import { useDocumentTitle } from "../utils";

export const UnauthenticatedApp = () => {
  useDocumentTitle("Please login");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return <Container>
    <Header/>
    <Background/>
    <ShadowCard>
      <Title>{isRegister ? "Please register" : "Please login"}</Title>
      <ErrorBox error={error} />
      {
        isRegister ?
          <RegisterScreen onError={setError}/>
          :
          <LoginScreen onError={setError}/>
      }
      <Divider/>
      <Button  type={"link"} onClick={()=> setIsRegister(!isRegister)}>
        {isRegister ? "Already have account Login" : "No account, get one"}
      </Button>
    </ShadowCard>
  </Container>
}


export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(50vw),
  calc(50vw), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
