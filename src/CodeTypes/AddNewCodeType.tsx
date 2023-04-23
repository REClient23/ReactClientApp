import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  InputGroup,
  Label,
  Toast,
  Toaster,
} from "@blueprintjs/core";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  ParentToChildHandler,
  ParentChildHandlerProps,
} from "../CommonComponents/ParentToChildHandler";
import axios from "axios";
import {
  AppToaster,
  ErrorToaser,
  SuccessToaser,
} from "../CommonComponents/Toast";

const AddNewCodeType = forwardRef<
  ParentToChildHandler,
  ParentChildHandlerProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    Action() {
      Initialize();
      setNewCodeType(newCodetypedata);
    },
  }));

  const newCodetypedata = { shortcode: "", description: "" };
  const [ispopupOpen, setIspopupOpen] = useState(false);
  const [newCodeType, setNewCodeType] = useState(newCodetypedata);

  const Initialize = () => {
    setIspopupOpen(true);
  };

  const OnCloseHandler = () => {
    console.log("close add window");
    setIspopupOpen(false);
  };

  const OnSaveHandler = () => {
    console.log("I am here");
    if (Validate()) {
      createPost();
    }
  };

  const Validate = () => {
    var isvalidData: boolean = true;
    var errorMessage: string = "";

    if (newCodeType.shortcode === "") {
      errorMessage = "Please Enter Shortcode";
      isvalidData = false;
    }

    if (newCodeType.description === "") {
      if (errorMessage === "") errorMessage = "Please Enter Description";
      else errorMessage = errorMessage + " and Description";
      isvalidData = false;
    }

    if (!isvalidData) {
      ErrorToaser(errorMessage);
    }

    return isvalidData;
  };

  function createPost() {
    axios
      .post("https://localhost:7166/api/CodeTypes", newCodeType)
      .then((response) => {
        SuccessToaser("Saved Successfully");
      })
      .then((data) => setIspopupOpen(false))
      .then((p) => props.OnRefreshHandler())
      .catch((e) => {
        ErrorToaser(e.response.data.substring(0,100));
        console.log(e.response);
      });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCodeType((previousdata) => ({
      ...previousdata,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div>
      <Dialog
        title="Add Code Types"
        icon="add"
        isOpen={ispopupOpen}
        onClose={OnCloseHandler}
        canOutsideClickClose={false}
      >
        <DialogBody>
          <FormGroup label="Short Code" labelFor="text-input" labelInfo="*">
            <InputGroup
              id="shortcode"
              placeholder="Enter Short Code"
              onChange={onChange}
              value={newCodeType.shortcode}
              required
            />
          </FormGroup>
          <FormGroup label="Description" labelFor="text-input" labelInfo="*">
            <InputGroup
              id="description"
              placeholder="Enter Description"
              onChange={onChange}
              value={newCodeType.description}
              required
            />
          </FormGroup>
        </DialogBody>
        <DialogFooter
          actions={
            <div>
              <Button
                type="submit"
                intent="primary"
                text="Save"
                onClick={OnSaveHandler}
              />
              <Button intent="warning" text="Cancel" onClick={OnCloseHandler} />
            </div>
          }
        />
      </Dialog>
    </div>
  );
});

export default AddNewCodeType;
