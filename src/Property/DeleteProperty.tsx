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
import { Property } from "./Property";
  
var cuurentdata={propertyId:"",Description:""};

  const DeleteProperty = forwardRef<
    ParentToChildHandler,
    ParentChildHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {
        Initialize();       
        cuurentdata.propertyId=props.codeTypes.propertyId;        
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
        .delete( appBaseURL+"/api/Property/"+`${props.codeTypes.propertyId}`)
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
                        "Are you sure you want to Delete Property" {cuurentdata.propertyId} ?
                    </p>
                </Alert>        
      </div>
    );
  });
  
  export default DeleteProperty;
  