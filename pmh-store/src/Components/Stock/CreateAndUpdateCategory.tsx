import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";


const CreateAndUpdateCategory: React.FC<PopupChildeProp> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>();
  const { setLoadingState } = useLoading();
  const onSubmit: SubmitHandler<Category> = async (
    data: Category
  ) => {
    try {
      setLoadingState(true);
      await axios.post("stock/Category", data);
      handleClose()
    } catch (error) {
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formCategoryName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Category name"
          {...register("name", { required: "Name is required" })}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formCategoryCode" className="mt-3">
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Category code"
          {...register("code", { required: "Code is required" })}
          isInvalid={!!errors.code}
        />
        <Form.Control.Feedback type="invalid">
          {errors.code?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formCategoryDescription" className="mt-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter Category description"
          {...register("description")}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default CreateAndUpdateCategory;
