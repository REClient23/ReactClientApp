import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    FormGroup,
    InputGroup  
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
  import { appBaseURL } from "../CommonComponents/ApplicationConstants";
  
  const EditCodeTypeValues = forwardRef<
    ParentToChildHandler,
    ParentChildHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {                
        newCodetypedata.CodeType=props.codeTypes.codeTypeShortCode;
        newCodetypedata.CodeTypeDesc=props.codeTypes.codeTypeDesc;
        newCodetypedata.ShortCode=props.codeTypes.shortCode;
        newCodetypedata.Description=props.codeTypes.description;
        
        setNewCodeType(newCodetypedata);
        Initialize();
      },
    }));
  
    const newCodetypedata = { ShortCode: "", Description: "",CodeType:"", CodeTypeDesc:"" };
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [newCodeType, setNewCodeType] = useState(newCodetypedata);
  
    const Initialize = () => {
      setIspopupOpen(true);
    };
  
    const OnCloseHandler = () => {      
      setIspopupOpen(false);
    };
  
    const OnSaveHandler = () => {      
      if (Validate()) {
        createPost();
      }
    };
  
    const Validate = () => {
      var isvalidData: boolean = true;
      var errorMessage: string = "";
       
      if (newCodeType.Description === "") {
         errorMessage = "Please Enter Description";        
        isvalidData = false;
      }
  
      if (!isvalidData) {
        ErrorToaser(errorMessage);
      }
  
      return isvalidData;
    };
  
    function createPost() {

       var ctv={shortCode:newCodeType.ShortCode,description:newCodeType.Description,codeTypeShortCode:newCodeType.CodeType};        
      axios
        .put( appBaseURL+"/api/CodeTypeValues", ctv)
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
          title="Edit Code Type Values"
          icon="add"
          isOpen={ispopupOpen}
          onClose={OnCloseHandler}
          canOutsideClickClose={false}
        >
          <DialogBody>
          <FormGroup label="Code Type" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="CodeType"                            
                value={newCodeType.CodeTypeDesc}                
                disabled
              />
            </FormGroup>
            <FormGroup label="Short Code" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="ShortCode"
                placeholder="Enter Short Code"
                onChange={onChange}
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
                autoFocus
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
  
  export default EditCodeTypeValues;
  