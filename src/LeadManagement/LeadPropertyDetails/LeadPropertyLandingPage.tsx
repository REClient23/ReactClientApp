import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import {
  LeadManagementHandlerProps,
  ParentToChildHandler,
} from "../../CommonComponents/ParentToChildHandler";
import Leads from "../Leads";
import { FormGroup, InputGroup } from "@blueprintjs/core";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Property } from "../../Property/Property";
import { appBaseURL } from "../../CommonComponents/ApplicationConstants";
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";
import { AppContext } from "../../States/AppProvider";
import axios from "axios";
import { SuccessToaser, ErrorToaser } from "../../CommonComponents/Toast";

import defaultImage from "./Real-Estate-PNG-Photo.png"

const LeadPropertyLandingPage = forwardRef<
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
      refreshCTVData(props.selectedLead.leadId);
    },
  }));
  const { state } = useContext(AppContext);

  const refreshCTVData = (ctShortCode: any) => {
    fetch(appBaseURL + "/api/LeadPropertyDetails/" + `${ctShortCode}`)
      .then((result) => result.json())
      .then((subrowData: Property[]) => setSrcProperties(subrowData))
      .catch((error) => console.log(error));
  };
  const [srcProperties, setSrcProperties] = useState<Property[]>();
  const [currentLead, setCurrentLead] = useState<Leads>();
  const [layout, setLayout] = useState("grid");

  const deleteLinkedProperty = (property: Property) => {
    const leadPropertyDetails: any = {
      propertyId: property.propertyId,
      leadId: props.selectedLead.leadId,
      leadPropertyID: 0,
      status: "string",
      remarks: "string",
      createdDateTime: "2023-05-22T19:43:59.472Z",
      createdBy: "string",
      updatedDateTime: "2023-05-22T19:43:59.473Z",
      updatedBy: "string",
    };
     axios
      .delete(appBaseURL + "/api/LeadPropertyDetails", {
        headers: {
          "Content-Type": "application/json", // Replace with the appropriate media type
        },
        data: leadPropertyDetails,
      })
      .then((response) => {
        SuccessToaser("Deleted Successfully");
      })
      .then((p) => refreshCTVData(props.selectedLead.leadId))
      .catch((e) => {
        ErrorToaser(e.response.data.substring(0, 100));
        console.log(e.response);
      });
  };

  const getSeverity = (product: Property) => {
    switch (product.furnishedStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };
  const listItem = (product: Property) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={defaultImage}
            alt={product.propertyName}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">
                {product.propertyName}
              </div>
              <Rating value={product.noOfBeds} readOnly cancel={false}></Rating>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.propertyType}</span>
                </span>
                <Tag
                  value={product.furnishedStatus}
                  severity={getSeverity(product)}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">₹ {product.price}</span>
              <Button
                icon="pi pi-trash"
                className="p-button-rounded"
                onClick={(e) => deleteLinkedProperty(product)}
              ></Button>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                disabled={product.furnishedStatus === "OUTOFSTOCK"}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product: Property, layout: "list" | "grid") => {
    if (!product) {
      return;
    }

    if (layout === "list") return listItem(product);
  };
  return (
    <div>
      <DataView
        value={srcProperties}
        itemTemplate={itemTemplate}
        paginator
        rows={4}
        style={{ width: "100vh" }}
      />
    </div>
  );
});
export default LeadPropertyLandingPage;
