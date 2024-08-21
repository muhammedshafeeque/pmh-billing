import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";


const CreateAndUpdateAccount: React.FC<PopupChildeProp> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } :any= useForm<any>();
  const { setLoadingState } = useLoading();
  const onSubmit: SubmitHandler<any> = async (
    data: any
  ) => {
    try {
      setLoadingState(true);
      await axios.post("accounts/account", data);
      handleClose()
    } catch (error) {
    } finally {
      setLoadingState(false);
    } 
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formSectionName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter section name"
          {...register("name", { required: "Name is required" })}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default CreateAndUpdateAccount;
