import { Button, Label } from "@blueprintjs/core";

import { Toolbar } from "primereact/toolbar";

import "./CustomToolBar.css";
import React, { useContext, useEffect, useState } from "react";
import { Tag } from "primereact/tag";
import { appBaseURL } from "./ApplicationConstants";
import { CodeTypeValues } from "../CodeTypeValues/CodeTypeValues";
import { AppContext } from "../States/AppProvider";

interface HeaderParams {
  HeaderText: string;
  OnAddClickHandler(): any;
  OnEditClickHandler(): any;
  OnDeleteClickHandler(): any;
  ModuleName: string;
}

interface paramsdata {
  RoleShortCode: string;
}
const CustomToolBar = (params: HeaderParams) => {
  const { state } = useContext(AppContext);
  const [isAddVisible, setAddVisible] = useState<boolean>(false);
  const [isEditVisible, setEditVisible] = useState<boolean>(false);
  const [isDeleteVisible, setDeleteVisible] = useState<boolean>(false);

  useEffect(() => selectedCTVData(), []);
  const selectedCTVData = () => {
    fetch(
      appBaseURL +
        "/api/Permissions/" +
        `${params.ModuleName}` +
        "/" +
        `${state.user.role}`
    )
      .then((result) => result.json())
      .then((subrowData: CodeTypeValues[]) => {
        LoadPermission(subrowData);
      })
      .catch((error) => console.log(error));
  };

  const LoadPermission = (subrowData: CodeTypeValues[]) => {
    console.log(subrowData);
    const addavailable = subrowData?.some(
      (record) => record.shortCode === "ADD"
    );
    console.log(addavailable);
    if (addavailable === true) {
      setAddVisible(addavailable);
    }
    const editavailable = subrowData?.some(
      (record) => record.shortCode === "EDIT"
    );
    if (editavailable === true) {
      setEditVisible(editavailable);
    }
    const deleteavailable = subrowData?.some(
      (record) => record.shortCode === "DELETE"
    );
    if (deleteavailable === true) {
      setDeleteVisible(deleteavailable);
    }

    if (state.user.role === "SuperAdmin") {
      setEditVisible(true);
      if (params.ModuleName !== "RoleManagement") {
        setAddVisible(true);
        setDeleteVisible(true);
      }
    }
  };

  const startContent = (
    <div>
      <Label
        style={{
          color: "aliceblue",
          marginLeft: "10px",
          verticalAlign: "center",
        }}
      >
        {" "}
        {params.HeaderText}
      </Label>
    </div>
  );
  const endContent = (
    <React.Fragment>
      {isAddVisible && (
        <Button
          intent="primary"
          icon="add"
          onClick={params.OnAddClickHandler}
          style={{ marginRight: "5px" }}
        />
      )}
      {isEditVisible && (
        <Button
          intent="primary"
          icon="edit"
          onClick={params.OnEditClickHandler}
          style={{ marginRight: "5px" }}
        />
      )}
      {isDeleteVisible && (
        <Button
          intent="primary"
          icon="trash"
          onClick={params.OnDeleteClickHandler}
          style={{ marginRight: "5px" }}
        />
      )}
    </React.Fragment>
  );

  return (
    <Toolbar
      start={startContent}
      end={endContent}
      style={{ padding: "2px", marginTop: "0px", backgroundColor: "#3b3e40" }}
    />
  );
};
export default CustomToolBar;
