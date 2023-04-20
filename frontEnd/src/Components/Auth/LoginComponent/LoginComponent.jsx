import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import "./login.scss";
import axios from "../../../Axios/axios";
import { useNavigate } from "react-router-dom";
import { Store } from "../../../Context/Context";
import { TOKEN } from "../../../Constants/constant";
import { nav } from "../../../Constants/routes";

function LoginComponent() {
  const [userName, setuserName] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = Store();

  // F=====Functions =======
  const handleLogin = async() => {
    setIsLoading(true);
    axios
      .post("auth/login", { userName, password })
      .then((res) => {
        if(res.status===200){
          setIsLoading(false);
          toast({
            title: "User logined Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
  
          localStorage.setItem(TOKEN, res.data.token);
          setUser(res.data);
          navigate(`${nav.DASHBOARD}`);
        }
        
      }).catch((err) => {
        
        toast({
          title: "invalid User Id or Password",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setIsLoading(false);
        localStorage.removeItem(TOKEN);
      });
  };
  return (
    <div>
      <Text className="login_header_text">Sign In</Text>
      <FormControl mt={5} isRequired>
        <FormLabel>user Name</FormLabel>
        <Input
          placeholder="user Name"
          type={"text"}
          onChange={(e) => {
            setuserName(e.target.value);
          }}
        />
      </FormControl>

      <FormControl mt={2} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Password"
          type={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>

      <Button
        mt={5}
        className="sign_in_button"
        onClick={(e)=>{
          e.preventDefault()
          handleLogin()
        }}
        colorScheme="green"
        isLoading={isLoading}
      >
        Login{" "}
      </Button>
    </div>
  );
}

export default LoginComponent;
