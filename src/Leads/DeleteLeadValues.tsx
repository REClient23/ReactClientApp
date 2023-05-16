import {
    Alert  } from "@blueprintjs/core";
  import { forwardRef, useImperativeHandle, useState } from "react";
  import {
    ParentToChildHandler,
    ParentChildHandlerProps,
  } from "../CommonComponents/ParentToChildHandler";
  import axios from "axios";
  import {
    ErrorToaser,
    SuccessToaser,
  } from "../CommonComponents/Toast";
  import { appBaseURL } from "../CommonComponents/ApplicationConstants";

  
const leaddata = { 
  LeadId :0,
  Name :"",
  PhNumber :"",
  Budget :0,
  Criteria :"",
  LeadStatus :"",
  PreviousSchedule:"" ,
  NextSchedule :"" };

  const DeleteLeadValues = forwardRef<
    ParentToChildHandler,
    ParentChildHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {          
        leaddata.LeadId= props.codeTypes.leadId;
        leaddata.Name =props.codeTypes.name;
        leaddata.PhNumber =props.codeTypes.phNumber;
        leaddata.Budget =props.codeTypes.budget;
        leaddata.Criteria =props.codeTypes.criteria;
        leaddata.LeadStatus =props.codeTypes.leadStatus;
        leaddata.PreviousSchedule=props.codeTypes.previousSchedule;
        leaddata.NextSchedule =props.codeTypes.nextSchedule;
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
  
      if (props.codeTypes.leadId === "") {
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
        .delete( appBaseURL+"/LeadMgmt/"+`${props.codeTypes.leadId}`)
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
                        Are you sure you want to delete Code Type Value {leaddata.Name}  ?
                    </p>
                </Alert>        
      </div>
    );
  });
  
  export default DeleteLeadValues;
  