import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    FormGroup,
    InputGroup,  
    NumericInput
  } from "@blueprintjs/core";
  import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
  import '@blueprintjs/datetime'
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
import { DatePicker } from "@blueprintjs/datetime";

  // import { DatePicker } from "@blueprintjs/datetime";
  // const modifiers = { isSunday };
  const AddNewLeadValues = forwardRef<
    ParentToChildHandler,
    ParentChildHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {        
        console.log(props);         
        setNewLeadData(newLeaddata);
        Initialize();
      },
    }));
  
    const newLeaddata = { LeadId :0,
        Name :"",
        PhNumber :"",
        Budget :0,
        Criteria :"",
        LeadStatus :"",
        PreviousSchedule:"" ,
        NextSchedule : new Date() };
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [leaddata, setNewLeadData] = useState(newLeaddata);
  
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
  
    //   if (newCodeType.ShortCode === "") {
    //     errorMessage = "Please Enter Shortcode";
    //     isvalidData = false;
    //   }
    //   if (newCodeType.Description === "") {
    //     if (errorMessage === "") errorMessage = "Please Enter Description";
    //     else errorMessage = errorMessage + " and Description";
    //     isvalidData = false;
    //   }
  
      if (!isvalidData) {
        ErrorToaser(errorMessage);
      }
  
      return isvalidData;
    };
  
    function createPost() {

       var ctv={
        LeadId: leaddata.LeadId,
        Name :leaddata.Name,
        PhNumber :leaddata.PhNumber,
         Budget :leaddata.Budget,
         Criteria :leaddata.Criteria,
         LeadStatus :leaddata.LeadStatus,
        // PreviousSchedule:leaddata.PreviousSchedule,
         NextSchedule :leaddata.NextSchedule
      };   
      console.log("Modified LeadData:")
      console.log(ctv)     
      axios
        .post( appBaseURL+"/LeadMgmt", ctv)
        .then((response) => {
          SuccessToaser("Saved Successfully");
        })
        .then((data) => setIspopupOpen(false))
        .then((p) => props.OnRefreshHandler())
        .catch((e) => {
          console.log(e.response);
          ErrorToaser(e.response.data.substring(0,100));
          
        });
    }
  
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewLeadData((previousdata) => ({
        ...previousdata,
        [e.target.id]: e.target.value,
      }));
    };

    const handleValueChange = (valueAsNumber: number,valueAsString: string) => {
      setNewLeadData((previousdata) => ({
        ...previousdata,
        ["Budget"]: valueAsNumber,
      }));
  };

    const handleDateChange = (date:Date) =>{
      setNewLeadData((previousdata) => ({
        ...previousdata,
        ["NextSchedule"]: date,
      }));
    };
  
    return (
      <div>
        <Dialog
          title="Add Lead Types Values"
          icon="add"
          isOpen={ispopupOpen}
          onClose={OnCloseHandler}
          canOutsideClickClose={false}
        >
           <DialogBody>
           <FormGroup label="Name" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="Name"
                placeholder="Enter Lead Name"
                onChange={onChange}
                value={leaddata.Name}
                required
                autoFocus
              />
            </FormGroup>
            <FormGroup label="Phone Number" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="PhNumber"
                placeholder="Enter Phone Number"
                onChange={onChange}
                value={leaddata.PhNumber}
                required
                
              />
            </FormGroup>

            <FormGroup label="Budget" labelFor="text-input" labelInfo="*">
              <NumericInput
                id="Budget"
                placeholder="Enter Phone Number"
                onValueChange={handleValueChange}
                value={leaddata.Budget}
                required
              />
            </FormGroup>

            <FormGroup label="Criteria" labelFor="numeric-input" labelInfo="*">
              <InputGroup
                id="Criteria"
                placeholder="Enter Criteria"
                onChange={onChange}
                value={leaddata.Criteria}
                required
              />
            </FormGroup>
            <FormGroup label="LeadStatus" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="LeadStatus"
                placeholder="Enter LeadStatus"
                onChange={onChange}
                value={leaddata.LeadStatus}
                required
              />
            </FormGroup>
            <FormGroup label="Previous Schedule" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="PreviousSchedule"
                onChange={onChange}
                value={leaddata.PreviousSchedule}
                required
                disabled
                
              />
            </FormGroup>
           
            <FormGroup label="Next Schedule" labelFor="text-input" labelInfo="*">
              <DatePicker
              canClearSelection={true}
              onChange={(newDate)=>handleDateChange(newDate)}
              />
            </FormGroup>
            {/* <FormGroup label="Next Schedule" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="NextSchedule"
                placeholder="Please define schedule"
                onChange={onChange}
                value={leaddata.NextSchedule}
                required
                
              />
            </FormGroup> */}
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
  
  export default AddNewLeadValues;
  