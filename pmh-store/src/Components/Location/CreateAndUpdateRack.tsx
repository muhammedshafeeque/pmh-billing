import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import AutoComplete from "../AutoComplete/AutoComplete";

const CreateAndUpdateRack: React.FC<PopupChildeProp> = ({ handleClose }) => {
  const [clearChild, setClearChild] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RackCreateBody>();
  const { setLoadingState } = useLoading();
  const onSubmit: SubmitHandler<RackCreateBody> = async (
    data: RackCreateBody
  ) => {
    try {
      setLoadingState(true);
      let body = {
        name: data.name,
        code: data.code,
        description: data.description,
        section: data.section._id,
      };
      await axios.post("stock/rack", body);
      handleClose();
    } catch (error) {
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
          placeholder="Enter Rack name"
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
          placeholder="Enter Rack code"
          {...register("code", { required: "Code is required" })}
          isInvalid={!!errors.code}
        />
        <Form.Control.Feedback type="invalid">
          {errors.code?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formRackDescription" className="mt-3">
        <AutoComplete
          register={register}
          errors={errors}
          name="section"
          label="Section"
          setValue={setValue}
          readField={"name"}
          url={`/stock/section?nameContains`}
          isRequired={true}
          clear={clearChild}
        />
      </Form.Group>

      <Form.Group controlId="formRackDescription" className="mt-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter Rack description"
          {...register("description")}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Submit
      </Button>
    </Form>
  );
};

export default CreateAndUpdateRack;
