import { Button } from "@blueprintjs/core";
import "./CustomToolBar.css";

interface HeaderParams {
  HeaderText: string;
  OnAddClickHandler(): any;
  OnEditClickHandler(): any;
  OnDeleteClickHandler(): any;
  IsAddActionVisible: boolean;  
}

const CustomToolBar = (params: HeaderParams) => {  
  var btnclass: string = "toolbarbuttontrue";
  if(params.IsAddActionVisible===false)
  {
    btnclass="toolbarbuttonfalse"
  }
  return (
    <div className="toolbardiv">
      <h3 className="customHeaderLabel"> {params.HeaderText}</h3>            
      <Button
        intent="primary"
        icon="trash"
        className={btnclass}        
        onClick={params.OnDeleteClickHandler}
      />
      <Button
        intent="primary"
        icon="edit"
        className={btnclass}     
        onClick={params.OnEditClickHandler}
      />
      <Button
        intent="primary"
        icon="add"
        className={btnclass}        
        onClick={params.OnAddClickHandler}
      />
    </div>
  );
};
export default CustomToolBar;
