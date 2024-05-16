import React from 'react'
import { useState } from 'react';
import { loginFields } from "../Constants/formFields";
import FormAction from "./FormAction";
// import FormExtra from "./FormExtra";
import Input from "./Input";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/user';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');


const Login = () => {

    const [loginState,setLoginState]=useState(fieldsState);
    const dispatch=useDispatch();

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        // authenticateUser();
        dispatch(login(loginState));

        
    }

    //Handle Login API Integration here
    // const authenticateUser = () =>{
        
     
        // let loginFields={
        //         email:loginState['email-address'],
        //         password:loginState['password']
        // };
           
        //  }
    
  return (
    <div className="min-h-screen px-40 py-20 dark dark:bg-slate-950 items-center flex flex-col overflow-hidden">

<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        {/* <FormExtra/> */}
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    </div>
  )
}

export default Login