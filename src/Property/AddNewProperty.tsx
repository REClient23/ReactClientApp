import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  InputGroup,
  NumericInput,
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
import { Property } from "./Property";
import { CodeTypeValues } from "../CodeTypeValues/CodeTypeValues";
import { Dropdown } from "primereact/dropdown";

const AddNewProperty = forwardRef<
  ParentToChildHandler,
  ParentChildHandlerProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    Action() {
      Initialize();
      setNewProperty(newPropertydata);
    },
  }));

  const newPropertydata: Property = { propertyId: 0};
  const [ispopupOpen, setIspopupOpen] = useState(false);
  const [newProperty, setNewProperty] = useState(newPropertydata);
  const [selectedPropertyType, setPropertyType] = useState<CodeTypeValues>();
  const [srcPropertyTypes, setSrcPropertyTypes] = useState<CodeTypeValues[]>();
  const [selectedFacing, setFacing] = useState<CodeTypeValues>();
  const [srcFacing, setSrcFacing] = useState<CodeTypeValues[]>();
  const [selectedFurnished, setFurnished] = useState<CodeTypeValues>();
  const [srcFurnished, setSrcFurnished] = useState<CodeTypeValues[]>();
  const refreshCTVData = (ctShortCode: any) => {
    fetch(appBaseURL + "/api/CodeTypeValues/" + `${ctShortCode}`)
      .then((result) => result.json())
      .then((subrowData: CodeTypeValues[]) => setDataSource(ctShortCode,subrowData) )
      .catch((error) => console.log(error));
  };

const setDataSource=(shortCode:string,data:CodeTypeValues[])=>
{
  switch (shortCode) {
    case "PROPERTY_TYPE":
      setSrcPropertyTypes(data)                    
      break;
    case "DOOR_FACING":
      setSrcFacing(data)      
      break;   
      case "FURNISHED_STATUS":
        setSrcFurnished(data)                
      break;   
    default:      
      break;
  }  
}
 
  const Initialize = () => {
    refreshCTVData("PROPERTY_TYPE");
    refreshCTVData("DOOR_FACING");
    refreshCTVData("FURNISHED_STATUS");   
    setFurnished(undefined)
    setFacing(undefined)
    setPropertyType(undefined)
    setTimeout(openDialog, 100);    
  };

  const openDialog=()=>
  {
    setIspopupOpen(true);    
  }
  const OnCloseHandler = () => {
    console.log("close add window");
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

    if (selectedPropertyType !== undefined) {
      newProperty.propertyType = selectedPropertyType.shortCode;
    } else {
      errorMessage = "Please Select Property Type";
      isvalidData = false;
    }
    if (selectedFacing !== undefined) {
      newProperty.facing = selectedFacing.shortCode;
    } else {
      errorMessage = "Please Select Door Facing";
      isvalidData = false;
    }
    if (selectedFurnished !== undefined) {
      newProperty.furnishedStatus = selectedFurnished.shortCode;
    } else {
      errorMessage = "Please Select Furnished status";
      isvalidData = false;
    }
    /*
      if (newCodeType.Description === "") {
        if (errorMessage === "") errorMessage = "Please Enter Description";
        else errorMessage = errorMessage + " and Description";
        isvalidData = false;
      }
  */
    if (!isvalidData) {
      ErrorToaser(errorMessage);
    }

    return isvalidData;
  };

  function createPost() {
    newProperty.finalPrice = newProperty.price;
    axios
      .post(appBaseURL + "/api/Property", newProperty)
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
    setNewProperty((previousdata) => ({
      ...previousdata,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFieldChange = (field: string, value: number | undefined) => {
    setNewProperty((previousdata) => ({
      ...previousdata,
      [field]: value,
    }));
  };
  return (
    <div>
      <Dialog
        title="Add Property"
        icon="add"
        isOpen={ispopupOpen}
        onClose={OnCloseHandler}
        canOutsideClickClose={false}
      >
        <DialogBody>
          <FormGroup label="Property Name" labelFor="text-input" labelInfo="*">
            <InputGroup
              id="propertyName"
              placeholder="Enter Property Name"
              onChange={onChange}
              value={newProperty.propertyName}
              required
              autoFocus
            />
          </FormGroup>
          <FormGroup label="Property Type" labelFor="text-input" labelInfo="*">
            <Dropdown
              value={selectedPropertyType}
              onChange={(e) => setPropertyType(e.value)}
              options={srcPropertyTypes}
              optionLabel="description"
              placeholder="Select property Type"              
              style={{
                minWidth: "250px",
                maxWidth: "400px",
                width: "82vh",
                height: "40px",
                margin: "2px",
              }}
            />
          </FormGroup>
          <FormGroup label="Door Facing" labelFor="text-input" labelInfo="*">
            <Dropdown
              value={selectedFacing}
              onChange={(e) => setFacing(e.value)}
              options={srcFacing}
              optionLabel="description"
              placeholder="Select Door Facing"
              style={{
                minWidth: "250px",
                maxWidth: "400px",
                width: "82vh",
                height: "40px",
                margin: "2px",
              }}
            />
          </FormGroup>

          <FormGroup
            label="Furnished Status"
            labelFor="text-input"
            labelInfo="*"
          >
            <Dropdown
              value={selectedFurnished}
              onChange={(e) => setFurnished(e.value)}
              options={srcFurnished}
              optionLabel="description"
              placeholder="Select Furnished Status"
              style={{
                minWidth: "250px",
                maxWidth: "400px",
                width: "82vh",
                height: "40px",
                margin: "2px",
              }}
            />
          </FormGroup>

          <FormGroup label="Price" labelFor="text-input" labelInfo="*">
            <NumericInput
              id="price"
              placeholder="Enter Price"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("price", valueAsNumber)
              }
              value={newProperty.price}
              buttonPosition="none"
              fill
            />
          </FormGroup>
          <FormGroup label="Address" labelFor="text-input" labelInfo="*">
            <InputGroup
              id="address"
              placeholder="Enter address"
              onChange={onChange}
              value={newProperty.address}
              required
            />
          </FormGroup>
          
          <FormGroup
            label="No. Of Car Parkings"
            labelFor="text-input"
            labelInfo="*"
          >
            <NumericInput
              id="noOfCarParkings"
              placeholder="No. Of Car Parkings"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("noOfCarParkings", valueAsNumber)
              }
              value={newProperty.noOfCarParkings}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup label="Asking Price" labelFor="text-input" labelInfo="*">
            <NumericInput
              id="askingPrice"
              placeholder="Enter Asking Price"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("askingPrice", valueAsNumber)
              }
              value={newProperty.askingPrice}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup label="Amenities" labelFor="text-input" labelInfo="*">
            <InputGroup
              id="amenities"
              placeholder="Enter Amenities"
              onChange={onChange}
              value={newProperty.amenities}
              required
            />
          </FormGroup>          
          <FormGroup label="No Of Beds" labelFor="text-input" labelInfo="*">
            <NumericInput
              id="noOfBeds"
              placeholder="Enter No Of Beds"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("noOfBeds", valueAsNumber)
              }
              value={newProperty.noOfBeds}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup
            label="No Of BathRooms"
            labelFor="text-input"
            labelInfo="*"
          >
            <NumericInput
              id="noOfBathRooms"
              placeholder="Enter No Of BathRooms"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("noOfBathRooms", valueAsNumber)
              }
              value={newProperty.noOfBathRooms}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup label="No Of Balcony" labelFor="text-input" labelInfo="*">
            <NumericInput
              id="noOfBalcony"
              placeholder="Enter No Of Balcony"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("noOfBalcony", valueAsNumber)
              }
              value={newProperty.noOfBalcony}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup label="Dimension" labelFor="text-input" labelInfo="*">
            <NumericInput
              id="dimention"
              placeholder="Enter  Dimension"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("dimention", valueAsNumber)
              }
              value={newProperty.dimention}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup label="Flat Floor" labelFor="text-input" labelInfo="*">
            <NumericInput
              id="flatFloor"
              placeholder="Enter No Of FlatFloor"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("flatFloor", valueAsNumber)
              }
              value={newProperty.flatFloor}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup label="Total Floors" labelFor="text-input" labelInfo="*">
            <NumericInput
              id="totalFloors"
              placeholder="Enter No Of total Floors"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("totalFloors", valueAsNumber)
              }
              value={newProperty.totalFloors}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup
            label="Total no Of Flats In A Floor"
            labelFor="text-input"
            labelInfo="*"
          >
            <NumericInput
              id="noOfFlatsInAFloor"
              placeholder="Enter Total no Of Flats In A Floor"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("noOfFlatsInAFloor", valueAsNumber)
              }
              value={newProperty.noOfFlatsInAFloor}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup label="Property Age" labelFor="text-input" labelInfo="*">
            <NumericInput
              id="propertyAge"
              placeholder="Enter Property Age"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("propertyAge", valueAsNumber)
              }
              value={newProperty.propertyAge}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup label="No Of Lifts" labelFor="text-input" labelInfo="*">
            <NumericInput
              id="noOfLifts"
              placeholder="Enter no Of Lifts"
              onValueChange={(valueAsNumber) =>
                handleFieldChange("noOfLifts", valueAsNumber)
              }
              value={newProperty.noOfLifts}
              buttonPosition="none"
              min={0}
              fill
            />
          </FormGroup>
          <FormGroup label="Video ID" labelFor="text-input" labelInfo="*">
            <InputGroup
              id="pictures"
              placeholder="Video ID"
              onChange={onChange}
              value={newProperty.pictures}
              required
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

export default AddNewProperty;
