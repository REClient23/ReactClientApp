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
import { appBaseURL } from "../../CommonComponents/ApplicationConstants";
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

interface LinkLeadProperty {
  status: string;
  remarks: string;
  propertyId: number;
  leadId: string;
  createdBy: string;
  updatedBy: string;
}

const LinkLeadProperties = forwardRef<
  ParentToChildHandler,
  LeadManagementHandlerProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    Action() {
      newNotes.leadId = props.selectedLead.leadId;
      Initialize();
    },
  }));
  const newNotes = { notes: "", leadId: "" };
  const [ispopupOpen, setIspopupOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property[]>();
  const [srcProperties, setSrcProperties] = useState<Property[]>();

  const Initialize = () => {
    setIspopupOpen(true);
    refreshCTVData("SCHEDULE_TYPE");
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

    if (selectedProperty === undefined || selectedProperty?.length === 0) {
      errorMessage = "Please select a Property to Link";
      isvalidData = false;
    }
    if (!isvalidData) {
      ErrorToaser(errorMessage);
    }
    return isvalidData;
  };

  function createPost() {
    let leadPropertyDetails: LinkLeadProperty[] = [];
    selectedProperty?.forEach((datapoint: Property) => {
      let leadProperty: LinkLeadProperty = {
        status: "New",
        remarks: "New Link",
        propertyId: datapoint.propertyId,
        leadId: props.selectedLead.leadId,
        createdBy: "string",
        updatedBy: "string",
      };

      leadPropertyDetails.push(leadProperty);
    });    
    axios
      .post(appBaseURL + "/api/LeadPropertyDetails",leadPropertyDetails)
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
    fetch(appBaseURL + "/api/Property")
      .then((result) => result.json())
      .then((subrowData: Property[]) => setSrcProperties(subrowData))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Dialog
        title="Link Lead & Properties "
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
                <MultiSelect
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.value)}
                  options={srcProperties}
                  optionLabel="propertyName"
                  display="chip"
                  placeholder="Select Properties"
                  maxSelectedLabels={100}
                  className="w-full"
                />
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
              <Button intent="warning" text="Cancel" onClick={OnCloseHandler} />
            </div>
          }
        />
      </Dialog>
    </div>
  );
});

export default LinkLeadProperties;
