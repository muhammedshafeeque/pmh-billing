import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import { FaSave, FaTimes } from "react-icons/fa";

interface CreateAndUpdateSectionProps extends PopupChildeProp {
  sectionToEdit?: Section | null;
}

const CreateAndUpdateSection: React.FC<CreateAndUpdateSectionProps> = ({ handleClose, sectionToEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Section>();
  const { setLoadingState } = useLoading();

  useEffect(() => {
    if (sectionToEdit) {
      reset(sectionToEdit);
    }
  }, [sectionToEdit, reset]);

  const onSubmit: SubmitHandler<Section> = async (data: Section) => {
    try {
      setLoadingState(true);
      if (sectionToEdit) {
        await axios.patch(`stock/section/${sectionToEdit._id}`, data);
      } else {
        await axios.post("stock/section", data);
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting section:", error);
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

      <Form.Group controlId="formSectionCode" className="mt-3">
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter section code"
          {...register("code", { required: "Code is required" })}
          isInvalid={!!errors.code}
        />
        <Form.Control.Feedback type="invalid">
          {errors.code?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formSectionDescription" className="mt-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter section description"
          {...register("description")}
        />
      </Form.Group>

      <div className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="me-2">
          <FaTimes /> Cancel
        </Button>
        <Button variant="primary" type="submit">
          <FaSave /> {sectionToEdit ? 'Update' : 'Save'} Section
        </Button>
      </div>
    </Form>
  );
};

export default CreateAndUpdateSection;
