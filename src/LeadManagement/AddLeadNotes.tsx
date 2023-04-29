import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  Icon,
  InputGroup,
  Switch,
  TextArea,
} from "@blueprintjs/core";
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
} from "../CommonComponents/ParentToChildHandler";
import axios from "axios";
import {
  AppToaster,
  ErrorToaser,
  SuccessToaser,
} from "../CommonComponents/Toast";
import { appBaseURL } from "../CommonComponents/ApplicationConstants";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ToggleButton } from "primereact/togglebutton";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./AddLeadNotes.css";
import { Console } from "console";

const AddLeadNotes = forwardRef<ParentToChildHandler, ParentChildHandlerProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {
        setNewNotes(newNotes);
        setisRecordingInProgress(false);
        resetTranscript()
        Initialize();
      },
    }));

    const newNotes = { notes: "" };
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [currentNotes, setNewNotes] = useState(newNotes);
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [isRecordingInProgress, setisRecordingInProgress] = useState(false);

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

    function createPost() {

      
      var leadnotes={"id": 0,
      "leadId": 1,      
      "notes": currentNotes.notes,      
      "createdBy": "string",      
      "updatedBy": "string"}
      axios
        .post(appBaseURL + "/api/LeadNotes", leadnotes)
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

    const onTextChange = (e: any) => {
      setNewNotes((previousdata) => ({
        ...previousdata,
        [e.target.id]: e.target.value,
      }));
    };

    const onResetHandler = () => {
      resetTranscript();
      newNotes.notes = "";
      setNewNotes(newNotes);
    };

    return (
      <div>
        <Dialog
          title="Add Lead Notes"
          icon="add"
          isOpen={ispopupOpen}
          onClose={OnCloseHandler}
          canOutsideClickClose={false}
          style={{ height: "80vh", width: "100vh" }}
        >
          <DialogBody>
            <div className="full-height-parent">
              <div className="full-height-First-child">
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
              <div className="full-height-child">
                {isRecordingInProgress ? (
                  <TextArea
                    id="notes"
                    value={transcript}
                    className="bp4-input bp4-fill"
                    style={{ height: "50vh", maxHeight: "50vh" }}
                    onChange={onTextChange}
                    readOnly
                  />
                ) : (
                  <TextArea
                    id="notes"
                    value={currentNotes.notes}
                    className="bp4-input bp4-fill"
                    style={{ height: "50vh", maxHeight: "50vh" }}
                    onChange={onTextChange}
                  />
                )}
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

export default AddLeadNotes;
