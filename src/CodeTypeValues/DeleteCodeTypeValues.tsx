import {
    Alert,
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
import { CodeTypeValues } from "./CodeTypeValues";

  
const newCodetypedata = { ShortCode: "", Description: "",CodeType:"", CodeTypeDesc:"" };

  const DeleteCodeTypeValues = forwardRef<
    ParentToChildHandler,
    ParentChildHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {        
        newCodetypedata.CodeType=props.codeTypes.codeTypeShortCode;
        newCodetypedata.CodeTypeDesc=props.codeTypes.codeTypeDesc;
        newCodetypedata.ShortCode=props.codeTypes.shortCode;
        newCodetypedata.Description=props.codeTypes.description;
        Initialize();               
      },
    }));
  
    
    const [ispopupOpen, setIspopupOpen] = useState(false);    
  
    const Initialize = () => {
      setIspopupOpen(true);
    };
  
    const OnCloseHandler = () => {      
      setIspopupOpen(false);
    };
  
    const OnSaveHandler = () => {      
      if (Validate()) {
        DeleteCodeTypes();
      }
    };
  
    const Validate = () => {
      var isvalidData: boolean = true;
      var errorMessage: string = "";
  
      if (props.codeTypes.shortCode === "") {
        errorMessage = "Please select a Row to delete";
        isvalidData = false;
      }     
  
      if (!isvalidData) {
        ErrorToaser(errorMessage);
      }
  
      return isvalidData;
    };
  
    function DeleteCodeTypes() {

        console.log(props);
      axios
        .delete( appBaseURL+"/api/CodeTypeValues/"+`${props.codeTypes.shortCode}`)
        .then((response) => {
          SuccessToaser("Deleted Successfully");
        })
        .then((data) => setIspopupOpen(false))
        .then((p) => props.OnRefreshHandler())
        .catch((e) => {
          ErrorToaser(e.response.data.substring(0,100));
          console.log(e.response);
        });
    }
  
    return (
      <div>

            <Alert                                                                    
                    cancelButtonText="Cancel"
                    confirmButtonText="Delete"
                    icon="trash"
                    intent="danger"
                    isOpen={ispopupOpen}                    
                    onCancel={OnCloseHandler}
                    onConfirm={OnSaveHandler}                    
                    canEscapeKeyCancel={true}
                >
                    <p>
                        Are you sure you want to delete Code Type Value {newCodetypedata.Description}  ?
                    </p>
                </Alert>        
      </div>
    );
  });
  
  export default DeleteCodeTypeValues;
  