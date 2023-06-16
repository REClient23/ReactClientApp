import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  Icon,
  InputGroup,
  Label,
  Switch,
  TextArea,
} from "@blueprintjs/core";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ParentToChildHandler,
  ParentChildHandlerProps,
  LeadManagementHandlerProps,
} from "../../CommonComponents/ParentToChildHandler";
import axios from "axios";
import {
  AppToaster,
  ErrorToaser,
  SuccessToaser,
} from "../../CommonComponents/Toast";
import { ModuleName, appBaseURL } from "../../CommonComponents/ApplicationConstants";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ToggleButton } from "primereact/togglebutton";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Console } from "console";
import { Dropdown } from "primereact/dropdown";
import { CodeTypeValues } from "../../CodeTypeValues/CodeTypeValues";
import { MultiSelect } from "primereact/multiselect";
import { Property } from "../../Property/Property";

interface ModuleRolePermissionDetails {
  RoleID:string;
  RoleShortCode: string;
  ModuleRoleShortCode:string;
  ModuleShortCode: string;
  PermissionShortCode: string;
  createdBy: string;
  updatedBy: string;
}

const AssignRoles = forwardRef<ParentToChildHandler, ParentChildHandlerProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {     
        setSelectedCodeType(undefined);  
        setSelectedCodeTypeValues(undefined);
        setSelectedLeads(undefined);
        setSelectedProperty(undefined);
        setSelectedDashBoard(undefined);
        setselectedRoleManagement(undefined);
        setselectedUser(undefined);
        Initialize();
      },
    }));    
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [selectedCodeTypeValues, setSelectedCodeTypeValues] =useState<CodeTypeValues[]>();
    const [srcCodeTypeValues, setSrcCodeTypeValues] =useState<CodeTypeValues[]>();

    const [selectedCodeType, setSelectedCodeType] =useState<CodeTypeValues[]>();
    const [srcCodeType, setSrcCodeType] =useState<CodeTypeValues[]>();

    const [selectedDashBoard, setSelectedDashBoard] =useState<CodeTypeValues[]>();
    const [srcDashBoard, setSrcDashBoard] =useState<CodeTypeValues[]>();

    const [selectedLeads, setSelectedLeads] =useState<CodeTypeValues[]>();
    const [srcLeads, setSrcLeads] =useState<CodeTypeValues[]>();

    const [selectedProperty, setSelectedProperty] =useState<CodeTypeValues[]>();
    const [srcProperty, setSrcProperty] =useState<CodeTypeValues[]>();

    const [selectedRoleManagement, setselectedRoleManagement] =useState<CodeTypeValues[]>();
    const [srcRoleManagement, setsrcRoleManagement] =useState<CodeTypeValues[]>();

    const [selectedUser, setselectedUser] =useState<CodeTypeValues[]>();    
    const [srcUser, setsrcUser] =useState<CodeTypeValues[]>();

  

    const Initialize = () => {
      setIspopupOpen(true);      
      refreshCTVData(ModuleName.CodeTypes);
      refreshCTVData(ModuleName.CodeTypeValues);
      refreshCTVData(ModuleName.DASHBOARD);
      refreshCTVData(ModuleName.LEADS);
      refreshCTVData(ModuleName.PROPERTY);
      refreshCTVData(ModuleName.RoleManagement);
      refreshCTVData(ModuleName.User);
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
      /*
      var errorMessage: string = "";

      if (
        selectedCodeTypeValues === undefined ||
        selectedCodeTypeValues?.length === 0
      ) {
        errorMessage = "Please select a Property to Link";
        isvalidData = false;
      }
      if (!isvalidData) {
        ErrorToaser(errorMessage);
      }*/
      return isvalidData;
    };

    function createPost() {
      let RoleModPermissionDetails: ModuleRolePermissionDetails[] = [];
      selectedCodeTypeValues?.forEach((datapoint: CodeTypeValues) => {        
        let roleModPermission: ModuleRolePermissionDetails = mapdata(props, datapoint);  
        RoleModPermissionDetails.push(roleModPermission);        
      });
      selectedCodeType?.forEach((datapoint: CodeTypeValues) => {        
        let roleModPermission: ModuleRolePermissionDetails = mapdata(props, datapoint);  
        RoleModPermissionDetails.push(roleModPermission);        
      });
      selectedDashBoard?.forEach((datapoint: CodeTypeValues) => {        
        let roleModPermission: ModuleRolePermissionDetails = mapdata(props, datapoint);  
        RoleModPermissionDetails.push(roleModPermission);        
      });
      selectedLeads?.forEach((datapoint: CodeTypeValues) => {        
        let roleModPermission: ModuleRolePermissionDetails = mapdata(props, datapoint);  
        RoleModPermissionDetails.push(roleModPermission);        
      });
      selectedProperty?.forEach((datapoint: CodeTypeValues) => {        
        let roleModPermission: ModuleRolePermissionDetails = mapdata(props, datapoint);  
        RoleModPermissionDetails.push(roleModPermission);        
      });
      selectedRoleManagement?.forEach((datapoint: CodeTypeValues) => {        
        let roleModPermission: ModuleRolePermissionDetails = mapdata(props, datapoint);  
        RoleModPermissionDetails.push(roleModPermission);        
      });
      selectedUser?.forEach((datapoint: CodeTypeValues) => {        
        let roleModPermission: ModuleRolePermissionDetails = mapdata(props, datapoint);  
        RoleModPermissionDetails.push(roleModPermission);        
      });
      axios
        .post(appBaseURL + "/api/RoleModulePermissons", RoleModPermissionDetails)
        .then((response) => {
          SuccessToaser("Saved Successfully");
        })
        .then((data) => setIspopupOpen(false))
        .catch((e) => {
          ErrorToaser(e.response.data.substring(0, 100));
          console.log(e.response);
        });
    }

    const refreshCTVData = (ctShortCode: any) => {
      fetch(appBaseURL + "/api/RoleModulePermissons/" + `${ctShortCode}`)
        .then((result) => result.json())
        .then((subrowData: CodeTypeValues[]) =>
          setDataSource(ctShortCode, subrowData)          
        )
        .catch((error) => console.log(error));
    };
    const selectedCTVData = (ctShortCode: any) => {
      fetch(appBaseURL + "/api/Permissions/" + `${ctShortCode}`+"/"+`${props.codeTypes.shortCode}`)
        .then((result) => result.json())
        .then((subrowData: CodeTypeValues[]) =>
        setSelectedDataSource(ctShortCode, subrowData)
        )
        .catch((error) => console.log(error));
    };

    const setDataSource = (shortCode: string, data: CodeTypeValues[]) => {
      switch (shortCode) {
        case ModuleName.CodeTypes:
          setSrcCodeType(data);
          selectedCTVData(ModuleName.CodeTypes);
          break;
        case ModuleName.CodeTypeValues:
          setSrcCodeTypeValues(data);
          selectedCTVData(ModuleName.CodeTypeValues);
          break;
        case ModuleName.DASHBOARD:
          setSrcDashBoard(data);
          selectedCTVData(ModuleName.DASHBOARD);
          break;
          case ModuleName.LEADS:
            setSrcLeads(data);
            selectedCTVData(ModuleName.LEADS);
          break;
          case ModuleName.PROPERTY:
            setSrcProperty(data);
            selectedCTVData(ModuleName.PROPERTY);
          break;
          case ModuleName.RoleManagement:
            setsrcRoleManagement(data);
            selectedCTVData(ModuleName.RoleManagement);
            break;
            case ModuleName.User:
            setsrcUser(data);
            selectedCTVData(ModuleName.User);
          break;
        default:
          break;
      }
    };

    const setSelectedDataSource = (shortCode: string, data: CodeTypeValues[]) => {
      switch (shortCode) {
        case ModuleName.CodeTypes:
          setSelectedCodeType(data);          
          break;
        case ModuleName.CodeTypeValues:
          setSelectedCodeTypeValues(data);          
          break;
        case ModuleName.DASHBOARD:
          setSelectedDashBoard(data);          
          break;
          case ModuleName.LEADS:
            setSelectedLeads(data);            
          break;
          case ModuleName.PROPERTY:
            setSelectedProperty(data);            
          break;
          case ModuleName.RoleManagement:
            setselectedRoleManagement(data);            
          break;
          case ModuleName.User:
            setselectedUser(data);            
          break;
        default:
          break;
      }
    };
    return (
      <div>
        <Dialog
          title="Manage Permissions for Roles "
          icon="link"
          isOpen={ispopupOpen}
          onClose={OnCloseHandler}
          canOutsideClickClose={false}
          style={{ width: "100vh" }}
        >
          <DialogBody>
            <div className="containerschedules">
              <div className="rowschedule">
                <div>
                  <FormGroup
                    label="Code Type"
                    labelFor="text-input"
                    labelInfo="*"
                  >
                    <MultiSelect
                      value={selectedCodeType}
                      onChange={(e) => setSelectedCodeType(e.value)}
                      options={srcCodeType}
                      optionLabel="description"
                      display="chip"
                      placeholder="Select Permissions"
                      maxSelectedLabels={100}
                      className="w-full"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Code Type values"
                    labelFor="text-input"
                    labelInfo="*"
                  >
                    <MultiSelect
                      value={selectedCodeTypeValues}
                      onChange={(e) => setSelectedCodeTypeValues(e.value)}
                      options={srcCodeTypeValues}
                      optionLabel="description"
                      display="chip"
                      placeholder="Select Permissions"
                      maxSelectedLabels={100}
                      className="w-full"
                    />
                  </FormGroup>

                  <FormGroup
                    label="Dashboards"
                    labelFor="text-input"
                    labelInfo="*"
                  >
                    <MultiSelect
                      value={selectedDashBoard}
                      onChange={(e) => setSelectedDashBoard(e.value)}
                      options={srcDashBoard}
                      optionLabel="description"
                      display="chip"
                      placeholder="Select Permissions"
                      maxSelectedLabels={100}
                      className="w-full"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Leads"
                    labelFor="text-input"
                    labelInfo="*"
                  >
                    <MultiSelect
                      value={selectedLeads}
                      onChange={(e) => setSelectedLeads(e.value)}
                      options={srcLeads}
                      optionLabel="description"
                      display="chip"
                      placeholder="Select Permissions"
                      maxSelectedLabels={100}
                      className="w-full"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Property"
                    labelFor="text-input"
                    labelInfo="*"
                  >
                    <MultiSelect
                      value={selectedProperty}
                      onChange={(e) => setSelectedProperty(e.value)}
                      options={srcProperty}
                      optionLabel="description"
                      display="chip"
                      placeholder="Select Permissions"
                      maxSelectedLabels={100}
                      className="w-full"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Role Management"
                    labelFor="text-input"
                    labelInfo="*"
                  >
                    <MultiSelect
                      value={selectedRoleManagement}
                      onChange={(e) => setselectedRoleManagement(e.value)}
                      options={srcRoleManagement}
                      optionLabel="description"
                      display="chip"
                      placeholder="Select Permissions"
                      maxSelectedLabels={100}
                      className="w-full"
                    />
                  </FormGroup>
                  <FormGroup
                    label="User Management"
                    labelFor="text-input"
                    labelInfo="*"
                  >
                    <MultiSelect
                      value={selectedUser}
                      onChange={(e) => setselectedUser(e.value)}
                      options={srcUser}
                      optionLabel="description"
                      display="chip"
                      placeholder="Select Permissions"
                      maxSelectedLabels={100}
                      className="w-full"
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
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

export default AssignRoles;

function mapdata(props: ParentChildHandlerProps, datapoint: CodeTypeValues): ModuleRolePermissionDetails {
  return {
    RoleID: "0",
    RoleShortCode: props.codeTypes.shortCode,
    ModuleRoleShortCode: props.codeTypes.shortCode,
    ModuleShortCode: datapoint.codeTypeShortCode,
    PermissionShortCode: datapoint.shortCode,
    createdBy: "Admin",
    updatedBy: "Admin"
  };
}

