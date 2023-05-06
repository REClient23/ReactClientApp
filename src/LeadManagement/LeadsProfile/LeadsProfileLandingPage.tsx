import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  LeadManagementHandlerProps,
  ParentToChildHandler,
} from "../../CommonComponents/ParentToChildHandler";
import Leads from "../Leads";
import { FormGroup, InputGroup } from "@blueprintjs/core";

const LeadsProfileLandingPage = forwardRef<
  ParentToChildHandler,
  LeadManagementHandlerProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    Action() {
      var lead: Leads = {
        leadId: props.selectedLead.leadId,
        name: props.selectedLead.name,
        budget: props.selectedLead.budget,
        leadStatus: props.selectedLead.leadStatus,
        phNumber: props.selectedLead.phNumber,
      };
      setCurrentLead(lead);
    },
  }));

  const [currentLead, setCurrentLead] = useState<Leads>();
  return (
    <div>
      <FormGroup label="Name" labelFor="text-input">
        <InputGroup id="text-input" value={currentLead?.name} readOnly />
      </FormGroup>
      <FormGroup label="Phone" labelFor="text-input">
        <InputGroup id="text-input" value={currentLead?.phNumber} readOnly />
      </FormGroup>
      <FormGroup label="Budget" labelFor="text-input">
        <InputGroup id="text-input" value={currentLead?.budget} readOnly />
      </FormGroup>
      <FormGroup label="Status" labelFor="text-input">
        <InputGroup id="text-input" value={currentLead?.leadStatus} readOnly />
      </FormGroup>
      
    </div>
  );
});

export default LeadsProfileLandingPage;
