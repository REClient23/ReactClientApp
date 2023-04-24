import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    FormGroup,
    InputGroup,
    Label,
    Toast,
    Toaster,
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


const createPost=(header: any)=> {
    axios
      .post( appBaseURL+"/api/CodeTypes", header)
      .then((response) => {
        SuccessToaser("Saved Successfully");
      })      
      .catch((e) => {
        ErrorToaser(e.response.data.substring(0,100));
        console.log(e.response);
      });
  }