
export function RequiredValidation(value:string | number,fieldName:string) : string{
    console.log(value)
    if((value==="") || (value===0)){
        return fieldName + ',';
    }
    else{
        return ""
    }    
}