import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    FormGroup,
    InputGroup  
  } from "@blueprintjs/core";
  import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
  import YouTube, { YouTubeProps } from 'react-youtube';

  const ViewPropertyVideo = forwardRef<
    ParentToChildHandler,
    ParentChildHandlerProps
  >((props, ref) => {
    useImperativeHandle(ref, () => ({
      Action() {        
        console.log(props.codeTypes.pictures);        
        Initialize(props);
        if(props !== undefined&& props.codeTypes !== undefined && props.codeTypes.pictures !== undefined)
        setvideoId(props.codeTypes.pictures)
      },
    }));
        
    
    
    const [ispopupOpen, setIspopupOpen] = useState(false);
    const [videoId,setvideoId]=useState("");
    
  
    const Initialize = (props:ParentChildHandlerProps) => {
      setIspopupOpen(true);   
    };

    
  
    const OnCloseHandler = () => {
      console.log("close add window");
      setIspopupOpen(false);
    };
  
    
    return (
      <div>
        <Dialog
          title="Property"
          icon="mobile-video"
          isOpen={ispopupOpen}
          onClose={OnCloseHandler}
          canOutsideClickClose={false}
          style={ {height:"420px",width:"660px"}}
        >
      <YouTube videoId={videoId} style={{padding:"10px"}}/>;         
        </Dialog>
      </div>
    );
  });
  
  export default ViewPropertyVideo;
  