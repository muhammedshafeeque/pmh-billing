import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import { FaSave, FaTimes } from "react-icons/fa";

interface Category {
  _id?: string;
  name: string;
  code: string;
  description?: string;
}

interface CreateAndUpdateCategoryProps extends PopupChildeProp {
  categoryToEdit?: Category | null;
}

const CreateAndUpdateCategory: React.FC<CreateAndUpdateCategoryProps> = ({ handleClose, categoryToEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Category>();
  const { setLoadingState } = useLoading();

  useEffect(() => {
    if (categoryToEdit) {
      reset(categoryToEdit);
    }
  }, [categoryToEdit, reset]);

  const onSubmit: SubmitHandler<Category> = async (data: Category) => {
    try {
      setLoadingState(true);
      if (categoryToEdit) {
        await axios.patch(`stock/Category/${categoryToEdit._id}`, data);
      } else {
        await axios.post("stock/Category", data);
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting category:", error);
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

      <div className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="me-2">
          <FaTimes /> Cancel
        </Button>
        <Button variant="primary" type="submit">
          <FaSave /> {categoryToEdit ? 'Update' : 'Save'} Category
        </Button>
      </div>
    </Form>
  );
};

export default CreateAndUpdateCategory;
