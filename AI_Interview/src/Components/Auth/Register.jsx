import React from 'react'
import { useState } from 'react';
import { signupFields } from "../Constants/formFields.jsx";
import Input from './Input';
import FormAction from './FormAction';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/user.js';


const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

const Register = () => {

    const [signupState,setSignupState]=useState(fieldsState);
    const dispatch=useDispatch();

    const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

    const handleSubmit=(e)=>{
        e.preventDefault();
     
        console.log(signupState)
        
        // createAccount()

        // const myForm = new FormData()
        // myForm.append('name', signupState['name']);
        // myForm.append('email', signupState['email']);
        // myForm.append('password', signupState['password']);

        // console.log(myForm);

      //   for (let pair of myForm.entries()) {
      //     console.log(pair[0] + ": " + pair[1]);
      // }

        dispatch(register(signupState));
      }

    
  return (
    <div className="min-h-screen px-40 py-20 dark dark:bg-slate-950 items-center flex flex-col overflow-hidden">

<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Signup" />
          <div className='text-white my-10'>
          <p >Already have an account?</p>
          <Link to={'/login'}>
          <p>Login</p>
          </Link>
          </div>
        </div>

         

      </form>
    </div>
  )
}

export default Register