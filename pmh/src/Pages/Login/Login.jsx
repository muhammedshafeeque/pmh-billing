import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./login.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../../Api/Axios";
import { useForm } from "react-hook-form";
import { getToken, setToken } from "../../Common/auth";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { nav } from "../../Constants/routes";

function Login() {
  const alert = useAlert();
  const navigate = useNavigate("");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios
      .post("auth/login", data)
      .then((res) => {
        setToken(res.data.token);
        alert.success("Login Success");
        navigate(nav.HOME);
      })
      .catch((err) => {
        alert.error(err.response.data);
      });
  };
  useEffect(() => {
    let token = getToken();
    if (token) {
      axios
        .get("auth/get-req-user")
        .then((res) => {
          if (res.data) {
            navigate(nav.HOME);
          }
        })
        .catch(() => {
          localStorage.clear();
        });
    }
  }, [navigate]);
  return (
    <div>
      <Container className="login_body mt-5">
        <div className="input_area mt-5">
          <h2 className="mt-5" style={{ textAlign: "center" }}>
            Login
          </h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                {...register("userName", { required: true })}
                type="text"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" style={{ width: "100%" }} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
