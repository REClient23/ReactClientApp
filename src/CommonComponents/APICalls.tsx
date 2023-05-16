import axios from "axios";
import { appBaseURL } from "./ApplicationConstants";
import { APIProps } from "./APIProps";

export async function  GetData({ apiUrl }: APIProps)  {
    try{
        const absURL = appBaseURL + apiUrl ;
        console.log(absURL)
    const response =await axios.get(absURL)
                            .then((response)=>response.data)
    
 
    return response;}
    catch(error)  {
        console.log(error)
    } 
}

export async function  GetAllData()  {
    try{
        const absURL = appBaseURL;
        console.log(absURL)
    const response =await axios.get(absURL)
                            .then((response)=>response.data)
    
 
    return response;}
    catch(error)  {
        console.log(error)
    } 
}