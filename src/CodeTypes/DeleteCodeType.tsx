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
import { CodeTypes } from "./CodeTypesInterface";
  
var cuurentdata:CodeTypes={ShortCode:"",Description:""};

  const DeleteCodeType = forwardRef<
    ParentToChildHandler,
    ParentChildHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {
        Initialize();       
        cuurentdata.ShortCode=props.codeTypes.shortCode;        
      },
    }));
  
    
    const [ispopupOpen, setIspopupOpen] = useState(false);    
  
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
        .delete( appBaseURL+"/api/CodeTypes/"+`${props.codeTypes.shortCode}`)
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
                >
                    <p>
                        "Are you sure you want to Delete code type" {cuurentdata.ShortCode} ?
                    </p>
                </Alert>        
      </div>
    );
  });
  
  export default DeleteCodeType;
  