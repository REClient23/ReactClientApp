import { CodeTypes } from "../CodeTypes/CodeTypesInterface";

export type ParentToChildHandler = {
    Action: () => void;
  };
  export type ParentChildHandlerProps = 
  {
    codeTypes:any;   
    OnRefreshHandler(): any; 
    
  };