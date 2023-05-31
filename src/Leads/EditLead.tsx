import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import {
  ParentToChildHandler,
  ParentChildHandlerProps,
} from "../CommonComponents/ParentToChildHandler";
import {
  ErrorToaser,
  SuccessToaser,
} from "../CommonComponents/Toast";
import { ctvRelative, leadRelative } from "../CommonComponents/ApplicationConstants";
import { GetData, PutData } from "../CommonComponents/APICalls";
import { newCodetypedata } from "../CodeTypeValues/CodeTypeValues";
import { Dropdown } from "primereact/dropdown";
import { RequiredValidation } from "../CommonComponents/Validation";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";

const EditLead = forwardRef<ParentToChildHandler, ParentChildHandlerProps>(
  (props , ref) => {
    useImperativeHandle(ref, () => ({
      Action() {        
        {
          const currentStatus = leadStatus.find((x)=>x.description===props.codeTypes.leadStatus)
          const currentLeadStatus = (currentStatus)?currentStatus:newCodetypedata
          newLeaddata.LeadId= props.codeTypes.leadId;
          newLeaddata.Name =props.codeTypes.name;
          newLeaddata.PhNumber =props.codeTypes.phNumber;
          newLeaddata.Budget =props.codeTypes.budget;
          newLeaddata.Criteria =props.codeTypes.criteria;
          
          setSelectedLeadStatus(currentLeadStatus);
          // newLeaddata.PreviousSchedule=props.codeTypes.previousSchedule;
          // newLeaddata.NextSchedule =props.codeTypes.nextSchedule;
        };
        
        setnewLead(newLeaddata);
        // console.log(newLeaddata);
        Initialize(props);
      },
    }));

    const newLeaddata = {    LeadId :0,
        Name :"",
        PhNumber :"",
        Budget :0,
        Criteria :"",
        LeadStatus :"",        
      };

      const codeTypeList = [
        newCodetypedata
      ]
      const apiProps ={apiUrl: ctvRelative+ "/LEAD_STATUS"}
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [newLead, setnewLead] = useState(newLeaddata);
    const [selectedLeadStatus, setSelectedLeadStatus] = useState(newCodetypedata);
    const [leadStatus,setLeadStatuses] =useState(codeTypeList);

    const Initialize = (props: ParentChildHandlerProps) => {
      const resp = GetData(apiProps);
      
      resp.then((response)=>setLeadStatuses(response))
      
      setIspopupOpen(true);
    };

    const handleValueChange = (e:InputNumberValueChangeEvent) => {
      setnewLead((previousdata) => ({
        ...previousdata,
        [e.target.id]: e.value,
      }));
    };


    const OnCloseHandler = () => {
      console.log("close add window");
      setIspopupOpen(false);
    };

    const OnSaveHandler = () => {
      var isValid =  Validate()
      if (isValid) {
        createPost();
      }
    };


    const Validate = () => {

      var isvalidData: boolean = true;
      var errorMessage: string = "";
      var defaultMessage:string ="Please enter "
      console.log(newLead.Budget)
      errorMessage = RequiredValidation(newLead.Name,"Lead Name");
      errorMessage += RequiredValidation(newLead.PhNumber,"Phone Number");
      errorMessage += RequiredValidation(newLead.Criteria,"Criteria");
      errorMessage += RequiredValidation(newLead.Budget,"Budget");

 
      if(errorMessage.length>1)
      {
        isvalidData = false;
      }
      

      if (!isvalidData) {
        ErrorToaser(defaultMessage +  errorMessage.slice(0,errorMessage.length-1));
      }

      return isvalidData;
    };

    function createPost() {
      //console.log(newLead);
   

      var ctv={
        LeadId: newLead.LeadId,
        Name :newLead.Name,
        PhNumber :newLead.PhNumber,
         Budget :newLead.Budget,
         Criteria :newLead.Criteria,
         LeadStatus :selectedLeadStatus.shortCode,
      };  

      console.log(selectedLeadStatus.shortCode)
      console.log(ctv)

      const putParam = {postParam:ctv}
      const leadURL = {apiUrl:leadRelative}
      const result = PutData(leadURL, putParam);
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
      setnewLead((previousdata) => ({
        ...previousdata,
        [e.target.id]: e.target.value,
      }));
    };

    return (
      <div>
        <Dialog
          title="Edit Leads"
          icon="edit"
          isOpen={ispopupOpen}
          onClose={OnCloseHandler}
          canOutsideClickClose={false}
        >
          <DialogBody>
            <FormGroup label="Name" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="Name"
                placeholder="Enter Lead Name"
                value={newLead.Name}
                onChange={onChange}
                required
              />
            </FormGroup>
            <FormGroup label="Phone Number" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="PhNumber"
                placeholder="Enter Phone Number"
                onChange={onChange}
                value={newLead.PhNumber}
                required
              />
            </FormGroup>

            <FormGroup label="Budget" labelFor="text-input" labelInfo="*">             
                <InputNumber
            value={newLead.Budget} 
            id="Budget"
            onValueChange={(e) => handleValueChange(e)}  
            mode="decimal"
             />
            </FormGroup>

            <FormGroup label="Criteria" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="Criteria"
                placeholder="Enter Criteria"
                onChange={onChange}
                value={newLead.Criteria}
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
            {/* <FormGroup label="LeadStatus" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="LeadStatus"
                placeholder="Enter LeadStatus"
                onChange={onChange}
                value={newLead.LeadStatus}
                required
              />
            </FormGroup> */}
            {/* <FormGroup label="Previous Schedule" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="PreviousSchedule"
                onChange={onChange}
                value={newLead.PreviousSchedule}
                required
                disabled
                
              />
            </FormGroup>
            <FormGroup label="Next Schedule" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="NextSchedule"
                placeholder="Please define schedule"
                onChange={onChange}
                value={newLead.NextSchedule}
                required
                disabled
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
                <Button
                  intent="warning"
                  text="Cancel"
                  onClick={OnCloseHandler}
                />
              </div>
            }
          />
        </Dialog>
      </div>
    );
  }
);

export default EditLead;
