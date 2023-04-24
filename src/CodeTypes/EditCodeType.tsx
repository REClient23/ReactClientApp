import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    FormGroup,
    InputGroup  
  } from "@blueprintjs/core";
  import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
  import { appBaseURL } from "../CommonComponents/ApplicationConstants";
  
  const EditCodeType = forwardRef<
    ParentToChildHandler,
    ParentChildHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {        
        console.log(props.codeTypes);
        var newCodeTypedata={ShortCode:props.codeTypes.shortCode,Description:props.codeTypes.description}
        setNewCodeType(newCodeTypedata);
       console.log(newCodeTypedata)
        Initialize(props);

      },
    }));
        
    
    const newCodetypedata = { ShortCode: "Keshava", Description: "Keshava" };
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [newCodeType, setNewCodeType] = useState(newCodetypedata);
  
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
  
      if (newCodeType.ShortCode === "") {
        errorMessage = "Please Enter Shortcode";
        isvalidData = false;
      }
      if (newCodeType.Description === "") {
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
      console.log(newCodeType);
      axios
        .put( appBaseURL+"/api/CodeTypes", newCodeType)
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
          title="Edit Code Types"
          icon="edit"
          isOpen={ispopupOpen}
          onClose={OnCloseHandler}
          canOutsideClickClose={false}
        >
          <DialogBody>
            <FormGroup label="Short Code" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="ShortCode"
                placeholder="Enter Short Code"                
                value={newCodeType.ShortCode}
                disabled
              />
            </FormGroup>
            <FormGroup label="Description" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="Description"
                placeholder="Enter Description"
                onChange={onChange}
                value={newCodeType.Description}
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
  
  export default EditCodeType;
  