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
   
  import axios from "axios";
import { appBaseURL } from "../../CommonComponents/ApplicationConstants";
import { ParentToChildHandler, ParentChildHandlerProps } from "../../CommonComponents/ParentToChildHandler";
import { ErrorToaser, SuccessToaser } from "../../CommonComponents/Toast";
import { User } from "./User";
   
  
var cuurentdata:User={name:"",email:"",id:0,phNumber:"",role:""};

  const DeleteUser = forwardRef<
    ParentToChildHandler,
    ParentChildHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {
        Initialize();       
        cuurentdata.name=props.codeTypes.name;        
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
  
      if (props.codeTypes.id === "") {
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
        .delete( appBaseURL+"/api/user/"+`${props.codeTypes.id}`)
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
                        "Are you sure you want to Delete User" {cuurentdata.name} ?
                    </p>
                </Alert>        
      </div>
    );
  });
  
  export default DeleteUser;
  