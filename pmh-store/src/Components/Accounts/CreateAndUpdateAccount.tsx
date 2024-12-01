import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "../../Api/Api";
import { useLoading } from "../../Contexts/LoaderContext";
import { FaSave, FaTimes } from "react-icons/fa";

interface Account {
  _id?: string;
  name: string;
  // Add other account properties here
}

interface CreateAndUpdateAccountProps extends PopupChildeProp {
  accountToEdit?: Account | null;
}

const CreateAndUpdateAccount: React.FC<CreateAndUpdateAccountProps> = ({ handleClose, accountToEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Account>();
  const { setLoadingState } = useLoading();

  useEffect(() => {
    if (accountToEdit) {
      reset(accountToEdit);
    }
  }, [accountToEdit, reset]);

  const onSubmit: SubmitHandler<Account> = async (data: Account) => {
    try {
      setLoadingState(true);
      if (accountToEdit) {
        await axios.patch(`accounts/account/${accountToEdit._id}`, data);
      } else {
        await axios.post("accounts/account", data);
      }
      handleClose();
    } catch (error) {
      console.error("Error submitting account:", error);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formAccountName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter account name"
          {...register("name", { required: "Name is required" })}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Add more form fields for other account properties here */}

      <div className="modal-footer">
        <Button variant="secondary" onClick={handleClose} className="me-2">
          <FaTimes /> Cancel
        </Button>
        <Button variant="primary" type="submit">
          <FaSave /> {accountToEdit ? 'Update' : 'Save'} Account
        </Button>
      </div>
    </Form>
  );
};

export default CreateAndUpdateAccount;
