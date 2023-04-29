import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  InputGroup,
  TextArea,
} from "@blueprintjs/core";
import React, { forwardRef, useImperativeHandle, useState } from "react";
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

const AddLeadNotes = forwardRef<ParentToChildHandler, ParentChildHandlerProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {
        setNewCodeType(newCodetypedata);
        setisRecordingInProgress(false);
        Initialize();
      },
    }));

    const newCodetypedata = { ShortCode: "", Description: "" };
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [newCodeType, setNewCodeType] = useState(newCodetypedata);
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const [isRecordingInProgress, setisRecordingInProgress] = useState(false);

    const onRecordingChage = (e: any) => {
      setisRecordingInProgress(e.value);
      if (e.value === true) {
        SpeechRecognition.startListening({ continuous: true });
      } else {
        SpeechRecognition.stopListening();
      }
    };
    const Initialize = () => {
      setIspopupOpen(true);
    };

    const OnCloseHandler = () => {
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

      if (newCodeType.ShortCode === "") {
        errorMessage = "Please Enter Shortcode";
        isvalidData = false;
      }
      if (newCodeType.Description === "") {
        if (errorMessage === "") errorMessage = "Please Enter Description";
        else errorMessage = errorMessage + " and Description";
        isvalidData = false;
      }

      if (!isvalidData) {
        ErrorToaser(errorMessage);
      }

      return isvalidData;
    };

    function createPost() {
      axios
        .post(appBaseURL + "/api/CodeTypes", newCodeType)
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
      setNewCodeType((previousdata) => ({
        ...previousdata,
        [e.target.id]: e.target.value,
      }));
    };

    return (
      <div>
        <Dialog
          title="Add Lead Notes"
          icon="add"
          isOpen={ispopupOpen}
          onClose={OnCloseHandler}
          canOutsideClickClose={false}     
          style={{ height: "80vh",width:"100vh"}}    
        >
          <DialogBody>
            <div className="full-height-parent">
              <div className="full-height-First-child">
                <ToggleButton
                  onIcon="pi pi-stop-circle"
                  offIcon="pi pi-microphone"
                  onLabel="Stop"
                  offLabel="Record"
                  checked={isRecordingInProgress}
                  onChange={onRecordingChage}
                  style={{ height: "40px", paddingBottom: "5px",margin:"5px" }}
                />
                <Button
                  intent="warning"
                  icon="reset"
                  text="Reset"
                  onClick={resetTranscript}
                  style={{                    
                    height: "40px",                    
                    margin:"5px"
                  }}
                />
              </div>
              <div className="full-height-child">
                <TextArea value={transcript} className="bp4-input bp4-fill" style={{ height: "50vh",maxHeight:"50vh"}}/>
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
