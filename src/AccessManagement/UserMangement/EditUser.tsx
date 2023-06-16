import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    FormGroup,
    InputGroup  
  } from "@blueprintjs/core";
  import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
   
  import axios from "axios";
import { appBaseURL } from "../../CommonComponents/ApplicationConstants";
import { ParentToChildHandler, ParentChildHandlerProps } from "../../CommonComponents/ParentToChildHandler";
import { ErrorToaser, SuccessToaser } from "../../CommonComponents/Toast";       
import { User } from "./User";
import { CodeTypeValues } from "../../CodeTypeValues/CodeTypeValues";
import { Dropdown } from "primereact/dropdown";
  const EditUser = forwardRef<
    ParentToChildHandler,
    ParentChildHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {        
        console.log(props.codeTypes);
        setRole(undefined);
        var newCodeTypedata={name:props.codeTypes.name,email:props.codeTypes.email,id:props.codeTypes.id,phNumber:props.codeTypes.phNumber,role:props.codeTypes.role}
        setNewUser(newCodeTypedata);
       console.log(newCodeTypedata)
        Initialize(props);
        refreshCTVData("ROLES")
      },
    }));
        
    
    const newCodetypedata:User={name:"",email:"",id:0,phNumber:"",role:""};
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [newUser, setNewUser] = useState(newCodetypedata);
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
          presetRole();
          break;
        default:
          break;
      }
    };

    const presetRole =()=>{  
      const dataproptype= srcRole?.find(x=>x.shortCode===props.codeTypes.role);
      setRole(dataproptype);    
    }
    const Initialize = (props:ParentChildHandlerProps) => {
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
        errorMessage = "Please Enter Shortcode";
        isvalidData = false;
      }
      if (newUser.email === "") {
        if (errorMessage === "") errorMessage = "Please Enter Description";
        else errorMessage = errorMessage + " and Description";
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
      console.log(newUser);
      axios
        .put( appBaseURL+"/api/User", newUser)
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
      setNewUser((previousdata) => ({
        ...previousdata,
        [e.target.id]: e.target.value,
      }));
    };
  
    return (
      <div>
        <Dialog
          title="Edit User"
          icon="edit"
          isOpen={ispopupOpen}
          onClose={OnCloseHandler}
          canOutsideClickClose={false}
        >
          <DialogBody>
            <FormGroup label="Name" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="name"
                placeholder="Enter Name"                
                value={newUser.name}
                disabled
              />
            </FormGroup>
            <FormGroup label="Email" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="email"
                placeholder="Enter Email"
                onChange={onChange}
                value={newUser.email}
                required
                autoFocus
              />                        
            </FormGroup>
            <FormGroup label="Ph Number" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="phNumber"
                placeholder="Enter Ph Number"
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
                <Button intent="warning" text="Cancel" onClick={OnCloseHandler} />
              </div>
            }
          />
        </Dialog>
      </div>
    );
  });
  
  export default EditUser;
  