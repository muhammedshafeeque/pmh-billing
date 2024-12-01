import React, { useState } from "react";
import "./Login.scss";
import { Form, Button, Container, Row, Col, Card, InputGroup } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "../../Api/Api";
import { usePmh } from "../../Contexts/PmhContext";
import { useLoading } from "../../Contexts/LoaderContext";
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

// Define types for the form data
interface LoginFormInputs {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = usePmh();
  const { setLoadingState } = useLoading();
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={5} xl={4}>
            <Card className="login-card">
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="login-title">Welcome to PMH STORE</h2>
                  <p className="login-subtitle">Please sign in to continue</p>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <InputGroup.Text>
                        <FaUser />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        {...register("userName", { required: "Username is required" })}
                        isInvalid={!!errors.userName}
                      />
                    </InputGroup>
                    {errors.userName && <Form.Text className="text-danger">{errors.userName.message}</Form.Text>}
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })}
                        isInvalid={!!errors.password}
                      />
                      <Button 
                        variant="outline-secondary"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                    {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
