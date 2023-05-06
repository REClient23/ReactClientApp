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
import "./AddLeadSchedules.css";
import { Console } from "console";
import { Dropdown } from "primereact/dropdown";
import { CodeTypeValues } from "../../CodeTypeValues/CodeTypeValues";
const AddLeadSchedules = forwardRef<
  ParentToChildHandler,
  LeadManagementHandlerProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    Action() {
      newNotes.leadId = props.selectedLead.leadId;
      setNewNotes(newNotes);
      setisRecordingInProgress(false);
      resetTranscript();
      Initialize();
    },
  }));
  const [date, setDate] = useState<Date>();
  const [minDate, setminDate] = useState<Date>(new Date());
  const newNotes = { notes: "", leadId: "" };
  const [ispopupOpen, setIspopupOpen] = useState(false);
  const [currentNotes, setNewNotes] = useState(newNotes);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isRecordingInProgress, setisRecordingInProgress] = useState(false);
  const [selectedScheduleType, setScheduleType] = useState<CodeTypeValues>();
  const [srcScheduleTypes, setSrcScheduleTypes] = useState<CodeTypeValues[]>();

  const onDateChangeHandler = (e: any) => {
    setDate(e.value);
  };

  const onRecordingChage = (e: any) => {
    setisRecordingInProgress(e.value);
    if (!isRecordingInProgress) {
      setisRecordingInProgress(true);
      SpeechRecognition.startListening({
        continuous: true,
        interimResults: true,
      });
    } else {
      setisRecordingInProgress(false);
      SpeechRecognition.stopListening();
      newNotes.notes = transcript;
      setNewNotes(newNotes);
    }
  };

  const Initialize = () => {
    setIspopupOpen(true);
    refreshCTVData("SCHEDULE_TYPE");
  };

  const OnCloseHandler = () => {
    onResetHandler();
    SpeechRecognition.stopListening();
    setIspopupOpen(false);
  };

  const OnSaveHandler = () => {
    if (isRecordingInProgress === false) {
      if (Validate()) {
        createPost();
      }
    } else {
      ErrorToaser("Please stop recording below saving!!");
    }
  };

  const Validate = () => {
    var isvalidData: boolean = true;
    var errorMessage: string = "";

    if (currentNotes.notes === "") {
      errorMessage = "Please Enter Notes";
      isvalidData = false;
    }
    if (!isvalidData) {
      ErrorToaser(errorMessage);
    }

    return isvalidData;
  };
  const options = { hour12: false };
  function createPost() {
    var leadnotes = {
      scheduleId: 0,
      scheduleTime: date ? date.toISOString() : undefined,
      leadId: props.selectedLead.leadId,
      facility: 0,
      scheduleType: selectedScheduleType?.shortCode,
      scheduleNotes: currentNotes.notes,
      createdDateTime: "2023-05-06T21:01:41.882Z",
      createdBy: "SC_Admin",
      updatedDateTime: "2023-05-06T21:01:41.882Z",
      updatedBy: "2023-05-06T21:01:41.882Z",
    };

    console.log(leadnotes);
    axios
      .post(appBaseURL + "/api/Schedule", leadnotes)
      .then((response) => {
        SuccessToaser("Saved Successfully");
      })
      .then((data) => setIspopupOpen(false))
      .catch((e) => {
        ErrorToaser(e.response.data.substring(0, 100));
        console.log(e.response);
      });
  }

  const onTextChange = (e: any) => {
    setNewNotes((previousdata) => ({
      ...previousdata,
      [e.target.id]: e.target.value,
    }));
  };
  const refreshCTVData = (ctShortCode: any) => {
    fetch(appBaseURL + "/api/CodeTypeValues/" + `${ctShortCode}`)
      .then((result) => result.json())
      .then((subrowData: CodeTypeValues[]) => setSrcScheduleTypes(subrowData))
      .catch((error) => console.log(error));
  };

  const onResetHandler = () => {
    resetTranscript();
    newNotes.notes = "";
    setNewNotes(newNotes);
  };

  return (
    <div>
      <Dialog
        title="Add Lead Appointments "
        icon="add"
        isOpen={ispopupOpen}
        onClose={OnCloseHandler}
        canOutsideClickClose={false}
        style={{ width: "100vh" }}
      >
        <DialogBody>
          <div className="containerschedules">
            <div className="rowschedule">
              <div>
                <Dropdown
                  value={selectedScheduleType}
                  onChange={(e) => setScheduleType(e.value)}
                  options={srcScheduleTypes}
                  optionLabel="description"
                  placeholder="Select Schedule Type"
                  style={{ width: "70vh" }}
                />
              </div>
            </div>
            <div className="rowschedule">
              <Calendar
                value={date}
                onChange={onDateChangeHandler}
                minDate={minDate}
                showTime
                hourFormat="12"
                inline
                style={{ width: "70vh" }}
                footerTemplate={() => (
                  <div> {date ? date.toLocaleString() : "select date"}</div>
                )}
              />
            </div>
            <div className="rowscheduleNotes">
              <div>
                <div>
                  <div>
                    <i
                      className="pi pi-microphone"
                      style={{
                        fontSize: "1.5rem",
                        paddingRight: "5px",
                      }}
                    ></i>
                    <Switch
                      checked={isRecordingInProgress}
                      onChange={onRecordingChage}
                      inline
                      large
                      style={{ paddingBottom: "5px", marginBottom: "5px" }}
                    />
                    <Button
                      intent="warning"
                      text="Reset"
                      icon="reset"
                      onClick={onResetHandler}
                      style={{
                        paddingBottom: "5px",
                        marginBottom: "5px",
                        textAlign: "right",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                {isRecordingInProgress ? (
                  <TextArea
                    id="notes"
                    value={transcript}
                    className="bp4-input bp4-fill"
                    onChange={onTextChange}
                    readOnly
                    style={{ height: "100px", maxHeight: "80vh" }}
                  />
                ) : (
                  <TextArea
                    id="notes"
                    value={currentNotes.notes}
                    className="bp4-input bp4-fill"
                    style={{ height: "100px", maxHeight: "80vh" }}
                    onChange={onTextChange}
                  />
                )}
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

export default AddLeadSchedules;
