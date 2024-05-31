import React from "react";
import "./Login.scss";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "../../Api/Api";
import { usePmh } from "../../Contexts/PmhContext";
import { useLoading } from "../../Contexts/LoaderContext";
import { Button } from "react-bootstrap";

// Define types for the form data
interface LoginFormInputs {
userName: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = usePmh();
  const { setLoadingState } = useLoading();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (body) => {
    try {
      setLoadingState(true);
      const { data } = await axios.post("auth/login", body);
      login({ ...data, isLoggedIn: true });
    } catch (error) {
      // Handle error if necessary
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <div>
      <div className="mt-5 pt-2">
        <div className="login_container col-md-12">
          <div className="col-md-6 log_container">
            <p className="login_welcome">Welcome to</p>
            <h2>PMH STORE</h2>
          </div>

          <Form
            className="login_input_area col-md-9 mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Name"
                {...register("userName", { required: true })}
                isInvalid={!!errors.userName}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid user.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              className="mt-4"
              controlId="validationCustom02"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              className="mt-4"
              controlId="validationCustom02"
            >
              <Button style={{ width: "100%" }} type="submit">
                Login
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
