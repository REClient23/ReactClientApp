import { AnyARecord } from "dns";
import React from "react";
import Leads from "../LeadManagement/Leads";
import { CodeTypeValues } from "../CodeTypeValues/CodeTypeValues";
export interface APIProps {
    apiUrl: string;
    //apiParameter: string;
}
export interface APIPostProps{
    postParam:Leads|CodeTypeValues;
}
