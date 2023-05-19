import axios from "axios";
import { appBaseURL } from "./ApplicationConstants";
import { APIPostProps, APIProps } from "./APIProps";

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

export async function  PostData({ apiUrl }: APIProps,{postParam}:APIPostProps|any) {
        const absURL =appBaseURL+ apiUrl;
        console.log(absURL)
        const result = await axios
        .post(absURL, postParam)
        .then(() => {
          return true;
        })        
        .catch((e) => {
          console.log(e.response);
          return e.response.data.substring(0,100);
        });
        return result
}

export async function  PutData({ apiUrl }: APIProps,{postParam}:APIPostProps|any) {
    const absURL =appBaseURL+ apiUrl;
    console.log(absURL)
    const result = await axios
    .put(absURL, postParam)
    .then(() => {
      return true;
    })        
    .catch((e) => {
      console.log(e.response);
      return e.response.data.substring(0,100);
    });
    return result
}