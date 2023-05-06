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
import axios from "axios";
import {
  AppToaster,
  ErrorToaser,
  SuccessToaser,
} from "../CommonComponents/Toast";
import { appBaseURL } from "../CommonComponents/ApplicationConstants";

const EditLead = forwardRef<ParentToChildHandler, ParentChildHandlerProps>(
  (props , ref) => {
    useImperativeHandle(ref, () => ({
      Action() {        
        {
          
          newLeaddata.LeadId= props.codeTypes.leadId;
          newLeaddata.Name =props.codeTypes.name;
          newLeaddata.PhNumber =props.codeTypes.phNumber;
          newLeaddata.Budget =props.codeTypes.budget;
          newLeaddata.Criteria =props.codeTypes.criteria;
          newLeaddata.LeadStatus =props.codeTypes.leadStatus;
          newLeaddata.PreviousSchedule=props.codeTypes.previousSchedule;
          newLeaddata.NextSchedule =props.codeTypes.nextSchedule;
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
        PreviousSchedule:"" ,
        NextSchedule :""};
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [newLead, setnewLead] = useState(newLeaddata);

    const Initialize = (props: ParentChildHandlerProps) => {
      console.log(newLead)
      setIspopupOpen(true);
    };

    const OnCloseHandler = () => {
      console.log("close add window");
      setIspopupOpen(false);
    };

    const OnSaveHandler = () => {
      console.log("I am here");
      var isValid =  Validate()
      console.log(isValid)
      if (isValid) {
        createPost();
      }
    };

    const Validate = () => {
      var isvalidData: boolean = true;
      var errorMessage: string = "";

      if (newLead.Name === "") {
        errorMessage = "Please Enter Name";
        isvalidData = false;
      }
      if (newLead.PhNumber === "") {
        if (errorMessage === "") errorMessage = "Please Enter Phone Number";
        else errorMessage = errorMessage + " and Description";
        isvalidData = false;
      }
      console.log(isvalidData)
      if (!isvalidData) {
        ErrorToaser(errorMessage);
      }

      return isvalidData;
    };

    function createPost() {
      console.log(newLead);
      axios
        .put(appBaseURL + "/LeadMgmt", newLead)
        .then((response) => {
          SuccessToaser("Saved Successfully");
        })
        .then((data) => setIspopupOpen(false))
        .then((p) => props.OnRefreshHandler())
        .catch((e) => {
          ErrorToaser(e.response.data.substring(0, 100));
          console.log(e.response);
        });
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
                autoFocus
              />
            </FormGroup>

            <FormGroup label="Budget" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="Budget"
                placeholder="Enter Phone Number"
                onChange={onChange}
                value={newLead.Budget.toString()}
                required
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
            <FormGroup label="LeadStatus" labelFor="text-input" labelInfo="*">
              <InputGroup
                id="LeadStatus"
                placeholder="Enter LeadStatus"
                onChange={onChange}
                value={newLead.LeadStatus}
                required
              />
            </FormGroup>
            <FormGroup label="Previous Schedule" labelFor="text-input" labelInfo="*">
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
