import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import React, { forwardRef, useImperativeHandle, useState } from "react";

import axios from "axios";
import { appBaseURL } from "../../CommonComponents/ApplicationConstants";
import {
  ParentToChildHandler,
  ParentChildHandlerProps,
} from "../../CommonComponents/ParentToChildHandler";
import { ErrorToaser, SuccessToaser } from "../../CommonComponents/Toast";
import { User } from "./User";
import { CodeTypeValues } from "../../CodeTypeValues/CodeTypeValues";
import { Dropdown } from "primereact/dropdown";

const AddUser = forwardRef<ParentToChildHandler, ParentChildHandlerProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {
        Initialize();
        setNewUser(newUserdata);
        refreshCTVData("ROLES")
      },
    }));

    const newUserdata: User = {
      name: "",
      email: "",
      id: 0,
      phNumber: "",
      role: "",
    };
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [newUser, setNewUser] = useState(newUserdata);
    const [selectedRole, setRole] = useState<CodeTypeValues>();
    const [srcRole, setSrcRole] = useState<CodeTypeValues[]>();

    const refreshCTVData = (ctShortCode: any) => {
      fetch(appBaseURL + "/api/CodeTypeValues/" + `${ctShortCode}`)
        .then((result) => result.json())
        .then((subrowData: CodeTypeValues[]) =>
          setDataSource(ctShortCode, subrowData)
        )
        .catch((error) => console.log(error));
    };

    const setDataSource = (shortCode: string, data: CodeTypeValues[]) => {
      switch (shortCode) {
        case "ROLES":
          setSrcRole(data);
          break;
        default:
          break;
      }
    };

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

      
      if (newUser.name === "") {
        errorMessage = "Please Enter Name";
        isvalidData = false;
      }
      if (newUser.email === "") {
        if (errorMessage === "") errorMessage = "Please Enter Email";
        else errorMessage = errorMessage + " and Email";
        isvalidData = false;
      }
      if (selectedRole === undefined) {
        if (errorMessage === "") errorMessage = "Please Select Role";
        else errorMessage = errorMessage + " and Role";
        isvalidData = false;
      }
      else
      {
        newUser.role=selectedRole.shortCode;
      }

      if (!isvalidData) {
        ErrorToaser(errorMessage);
      }

      return isvalidData;
    };

    function createPost() {
      axios
        .post(appBaseURL + "/api/User", newUser)
        .then((response) => {
          SuccessToaser("Saved Successfully");
        })
        .then((data) => setIspopupOpen(false))
        .then((p) => props.OnRefreshHandler())
        .catch((e) => {
          ErrorToaser(e.response.data.substring(0, 100));
          console.log(e.response);
        });
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewUser((previousdata) => ({
        ...previousdata,
        [e.target.id]: e.target.value,
      }));
    };

    return (
      <div>
        <Dialog
          title="Add User"
          icon="add"
          isOpen={ispopupOpen}
          onClose={OnCloseHandler}
          canOutsideClickClose={false}
        >
          <DialogBody>
            <FormGroup label="Name" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="name"
                placeholder="Enter Name"
                onChange={onChange}
                value={newUser.name}
                required
                autoFocus
              />
            </FormGroup>
            <FormGroup label="Email" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="email"
                placeholder="Enter Email"
                onChange={onChange}
                value={newUser.email}
                required
              />
            </FormGroup>
            <FormGroup label="PhNumber" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="phNumber"
                placeholder="Enter PhNumber"
                onChange={onChange}
                value={newUser.phNumber}
                required
                autoFocus
              />
            </FormGroup>          
            <FormGroup label="Role" labelFor="text-input" labelInfo="*">
            <Dropdown
              value={selectedRole}
              onChange={(e) => setRole(e.value)}
              options={srcRole}
              optionLabel="description"
              placeholder="Select Role"              
              style={{
                minWidth: "250px",
                maxWidth: "400px",
                width: "82vh",
                height: "40px",
                margin: "2px",
              }}
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
                <Button
                  intent="warning"
                  text="Cancel"
                  onClick={OnCloseHandler}
                />
              </div>
            }
          />
        </Dialog>
      </div>
    );
  }
);

export default AddUser;
