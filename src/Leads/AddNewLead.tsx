import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    FormGroup,
    InputGroup,  
    NumericInput
  } from "@blueprintjs/core";
  import React, { forwardRef, useImperativeHandle, useState } from "react";
  import {
    ParentToChildHandler,
    ParentChildHandlerProps,
  } from "../CommonComponents/ParentToChildHandler";
  import axios from "axios";
  import {
    ErrorToaser,
    SuccessToaser,
  } from "../CommonComponents/Toast";
  import { appBaseURL, ctvRelative, leadRelative } from "../CommonComponents/ApplicationConstants";
import { GetData, PostData } from "../CommonComponents/APICalls";
import { newCodetypedata } from "../CodeTypeValues/CodeTypeValues";        
import { Dropdown } from "primereact/dropdown";
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
        // PreviousSchedule:"" ,
        // NextSchedule : new Date() 
      };
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [leaddata, setNewLeadData] = useState(newLeaddata);
    const [selectedLeadStatus, setSelectedLeadStatus] = useState(newCodetypedata);
    
    const codeTypeList = [
      newCodetypedata
    ]
    const apiProps ={apiUrl: ctvRelative+ "/LEAD_STATUS"}

    const Initialize = () => {
      
      const resp = GetData(apiProps);
      
      resp.then((response)=>setLeadStatuses(response))
      setIspopupOpen(true);
    };
    const [leadStatus,setLeadStatuses] =useState(codeTypeList);
    

  
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
         LeadStatus :selectedLeadStatus.shortCode,
      };  
      console.log("Modified LeadData:")
      console.log(ctv)     
      const postParam = {postParam:ctv}
      const leadURL = {apiUrl:leadRelative}
      const result = PostData(leadURL,postParam)
        result
        .then((x) => (x)?
        Success():ErrorToaser(x));
       
    }
    
    function Success(){
      SuccessToaser("Saved Successfully");
      setIspopupOpen(false);
      props.OnRefreshHandler()
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewLeadData((previousdata) => ({
        ...previousdata,
        [e.target.id]: e.target.value,
      }));
    };


    const handleValueChange = (valueAsNumber: number) => {
      setNewLeadData((previousdata) => ({
        ...previousdata,
        ["Budget"]: valueAsNumber,
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
                placeholder="Enter budget"
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
            <FormGroup label="Lead Status" labelFor="text-input" labelInfo="*">
            <Dropdown 
                  id="LeadStatus"
                  value={selectedLeadStatus}
                  onChange={(e) => setSelectedLeadStatus(e.value)}
                  options={leadStatus}
                  optionLabel="description"
                  placeholder="Select Lead Status Type"
                  
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
  
  export default AddNewLeadValues;
  