import { Button, Label } from "@blueprintjs/core";

import { Toolbar } from 'primereact/toolbar';
        
import "./CustomToolBar.css";
import React from "react";
import { Tag } from "primereact/tag";

interface HeaderParams {
  HeaderText: string;
  OnAddClickHandler(): any;
  OnEditClickHandler(): any;
  OnDeleteClickHandler(): any;
  IsAddActionVisible: boolean;  
}

const CustomToolBar = (params: HeaderParams) => {  

  const startContent = (
    <div>
        <Label style={{color:"aliceblue",marginLeft:"10px",verticalAlign:"center" }}> {params.HeaderText}</Label>   
    </div>
);
const endContent = (
  <React.Fragment>
     <Button
        intent="primary"
        icon="add"        
        onClick={params.OnAddClickHandler}
        style={{marginRight:"5px"}}
      />
     <Button
        intent="primary"
        icon="edit"          
        onClick={params.OnEditClickHandler}
        style={{marginRight:"5px"}}
      />
     <Button
        intent="primary"
        icon="trash"        
        onClick={params.OnDeleteClickHandler}
        style={{marginRight:"5px"}}
      />            
  </React.Fragment>
);
  var btnclass: string = "toolbarbuttontrue";
  if(params.IsAddActionVisible===false)
  {
    btnclass="toolbarbuttonfalse"
  }
  return (
    <Toolbar start={startContent} end={endContent} style={{padding:"2px",marginTop:"0px",backgroundColor:"#3b3e40"}}/>   
  );
};
export default CustomToolBar;
