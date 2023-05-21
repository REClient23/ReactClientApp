import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  LeadManagementHandlerProps,
  ParentToChildHandler,
} from "../../CommonComponents/ParentToChildHandler";
import Leads from "../Leads";
import {
  Button,
  Card,
  FormGroup,
  InputGroup,
  Label  
} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";
import { Tag } from "primereact/tag"; 
import { Fieldset } from "primereact/fieldset";
import { Rating } from "primereact/rating";

import { Image } from "primereact/image";

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
  const legendTemplate = (
    <div className="flex align-items-center text-primary">
      <span className="pi pi-user mr-2"></span>
      <span className="font-bold text-lg">User Profile</span>
    </div>
  );

  return (
    <div>
      <Fieldset legend={legendTemplate}>
        <Card>
          <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
              <img
                className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                src="http://locker.com.au/wp-content/uploads/2017/01/user-icon-png-person-user-profile-icon-20.png"
                alt={currentLead?.name}
              />
              <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                  <div className="text-2xl font-bold text-900">
                    {currentLead?.name}
                  </div>
                  <Rating value={5} readOnly cancel={false}></Rating>
                  <div className="flex align-items-center gap-3">
                    <span className="flex align-items-center gap-2">
                      <i className="pi pi-phone"></i>
                      <span className="font-semibold">
                        {currentLead?.phNumber}
                      </span>
                    </span>
                  </div>
                  <div className="flex align-items-center gap-3">
                    <span className="flex align-items-center gap-2">
                      <i className="pi pi-status"></i>
                      <Tag value={currentLead?.leadStatus}/>                    
                    </span>
                  </div>
                </div>
                <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                  <span className="text-2xl font-semibold">
                    ₹ {currentLead?.budget}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Fieldset>
    </div>
  );
});

export default LeadsProfileLandingPage;
