import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import { FaSave, FaTimes } from "react-icons/fa";
import AutoComplete from "../AutoComplete/AutoComplete";

interface CreateAndUpdateRackProps extends PopupChildeProp {
  rackToEdit?: Rack | null;
}

const CreateAndUpdateRack: React.FC<CreateAndUpdateRackProps> = ({ handleClose, rackToEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Rack>();
  const { setLoadingState } = useLoading();

  useEffect(() => {
    if (rackToEdit) {
      reset(rackToEdit);
    }
  }, [rackToEdit, reset]);

  const onSubmit: SubmitHandler<Rack> = async (data:any) => {
    try {
      console.log(data.section);
      setLoadingState(true);
      let body: any = {
        code: data.code,
        description: data.description,
        name: data.name,
        section: data.section._id,
      }
      if (rackToEdit) {
        await axios.patch(`stock/rack/${rackToEdit._id}`, body);
      } else {
        await axios.post("stock/rack", body); // Use body instead of data
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting rack:", error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formRackName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter rack name"
          {...register("name", { required: "Name is required" })}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formRackCode" className="mt-3">
        <Form.Label>Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter rack code"
          {...register("code", { required: "Code is required" })}
          isInvalid={!!errors.code}
        />
        <Form.Control.Feedback type="invalid">
          {errors.code?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formRackSection" className="mt-3">
        <AutoComplete
          register={register}
          errors={errors}
          name="section"
          label="Section"
          setValue={setValue}
          readField={"name"}
          url={`/stock/section?nameContains`}
          isRequired={true}
        />
      </Form.Group>

      <Form.Group controlId="formRackDescription" className="mt-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter rack description"
          {...register("description")}
        />
      </Form.Group>

      <div className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="me-2">
          <FaTimes /> Cancel
        </Button>
        <Button variant="primary" type="submit">
          <FaSave /> {rackToEdit ? 'Update' : 'Save'} Rack
        </Button>
      </div>
    </Form>
  );
};

export default CreateAndUpdateRack;
