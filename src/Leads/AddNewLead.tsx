import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  ParentToChildHandler,
  ParentChildHandlerProps,
} from "../CommonComponents/ParentToChildHandler";
import { ErrorToaser, SuccessToaser } from "../CommonComponents/Toast";
import {
  ctvRelative,
  leadRelative,
  userRelative,
} from "../CommonComponents/ApplicationConstants";
import { GetData, PostData } from "../CommonComponents/APICalls";
import { newCodetypedata } from "../CodeTypeValues/CodeTypeValues";
import { Dropdown } from "primereact/dropdown";
import { RequiredValidation } from "../CommonComponents/Validation";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { User } from "../AccessManagement/UserMangement/User";

const AddNewLeadValues = forwardRef<
  ParentToChildHandler,
  ParentChildHandlerProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    Action() {
      console.log(props);
      setNewLeadData(newLeaddata);
      setSelectedLeadStatus(newCodetypedata);
      setSelectedUser(undefined);
      Initialize();
    },
  }));

  const newLeaddata = {
    LeadId: 0,
    Name: "",
    PhNumber: "",
    Budget: 0,
    Criteria: "",
    LeadStatus: "",
    UserId: 0,
  };
  const [ispopupOpen, setIspopupOpen] = useState(false);
  const [leaddata, setNewLeadData] = useState(newLeaddata);
  const [selectedLeadStatus, setSelectedLeadStatus] = useState(newCodetypedata);
  const [selectedUser, setSelectedUser] = useState<User>();

  const codeTypeList = [newCodetypedata];

  const apiProps = { apiUrl: ctvRelative + "/LEAD_STATUS" };
  const userProps = { apiUrl: userRelative };

  const Initialize = () => {
    const resp = GetData(apiProps);
    resp.then((response) => setLeadStatuses(response));

    const userResp = GetData(userProps);
    userResp.then((response) => setUsers(response));

    console.log(users);

    setIspopupOpen(true);
  };
  const [leadStatus, setLeadStatuses] = useState(codeTypeList);
  const [users, setUsers] = useState<User[]>();

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
    var defaultMessage: string = "Please enter ";
    errorMessage = RequiredValidation(leaddata.Name, "Lead Name");
    errorMessage += RequiredValidation(leaddata.PhNumber, "Phone Number");
    errorMessage += RequiredValidation(leaddata.Criteria, "Criteria");
    errorMessage += RequiredValidation(leaddata.Budget, "Budget");
    if (errorMessage.length > 1) {
      isvalidData = false;
    }

    if (!isvalidData) {
      ErrorToaser(
        defaultMessage + errorMessage.slice(0, errorMessage.length - 1)
      );
    }

    return isvalidData;
  };

  function createPost() {
    console.log(selectedUser);
    var ctv = {
      LeadId: leaddata.LeadId,
      Name: leaddata.Name,
      PhNumber: leaddata.PhNumber,
      Budget: leaddata.Budget,
      Criteria: leaddata.Criteria,
      LeadStatus: selectedLeadStatus.shortCode,
      UserId: selectedUser?.id,
    };
    console.log("Modified LeadData:");
    console.log(ctv);
    const postParam = { postParam: ctv };
    const leadURL = { apiUrl: leadRelative };
    const result = PostData(leadURL, postParam);
    result.then((x) => (x ? Success() : ErrorToaser(x)));
  }

  function Success() {
    SuccessToaser("Saved Successfully");
    setIspopupOpen(false);
    props.OnRefreshHandler();
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLeadData((previousdata) => ({
      ...previousdata,
      [e.target.id]: e.target.value,
    }));
  };

  const handleValueChange = (e: InputNumberValueChangeEvent) => {
    setNewLeadData((previousdata) => ({
      ...previousdata,
      [e.target.id]: e.value,
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
              minLength={10}
              maxLength={13}
              required
            />
          </FormGroup>

          <FormGroup label="Budget" labelFor="text-input" labelInfo="*">
            <InputNumber
              value={leaddata.Budget}
              id="Budget"
              onValueChange={(e) => handleValueChange(e)}
              mode="decimal"
            />

            {/* <NumericInput
              id="Budget"
              placeholder="Enter budget"
              onValueChange={handleValueChange}
              value={leaddata.Budget}
              required
            /> */}
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
          <FormGroup label="Assigned User" labelFor="text-input" labelInfo="*">
            <Dropdown
              id="AssignedUser"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.value)}
              options={users}
              optionLabel="email"
              placeholder="Select User"
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
