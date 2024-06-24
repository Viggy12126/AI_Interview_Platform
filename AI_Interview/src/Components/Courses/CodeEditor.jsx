import React, { useState,useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { classnames } from "./utils/general";
import { languageOptions } from "./utils/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../../lib/defineTheme";
import useKeyPress from "../../hooks/useKeyPress.jsx";
import OutputWindow from "./CodeComponents/OutputWindow.jsx";
import CustomInput from "./CodeComponents/CustomInput.jsx";
import OutputDetails from "./CodeComponents/OutputDetails.jsx";
import ThemeDropdown from "./CodeComponents/ThemeDropdown.jsx";
import LanguagesDropdown from "./CodeComponents/LanguagesDropdown.jsx";
import CodeEditorWindow from "./CodeComponents/CodeEdiorWindow.jsx";

const javascriptDefault = `


// Java implementation of iterative Binary Search
class Main {
    // Returns index of x if it is present in arr[l....r], else return -1
    int binarySearch(int arr[], int l, int r, int x)
    {
        while (l <= r) {
            int mid = (l + r) / 2;
 
            // If the element is present at the
            // middle itself
            if (arr[mid] == x) {
                return mid;
 
            // If element is smaller than mid, then
            // it can only be present in left subarray
            // so we decrease our r pointer to mid - 1 
            } else if (arr[mid] > x) {
                r = mid - 1;
 
            // Else the element can only be present
            // in right subarray
            // so we increase our l pointer to mid + 1
            } else {
              l = mid + 1;
            }  
        }
 
        // We reach here when element is not present
        //  in array
        return -1;
    }
 
    // Driver method to test above
    public static void main(String args[])
    {
        Main ob = new Main();
 
        int arr[] = { 2, 3, 4, 10, 40 };
        int n = arr.length;
        int x = 10;
        int result = ob.binarySearch(arr, 0, n - 1, x);
 
        if (result == -1)
            System.out.println("Element not present");
        else
            System.out.println("Element found at index "
                               + result);
    }
}
`;

const CodeEditor = () => {

  const {loading,questions,speech,isCoding}=useSelector(
    state => state.course
  );

  // console.log(questions);

  const [index,setIndex]=useState(0);
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[13]);
  const [feed,setFeed]=useState(false);
  const [question,setQuestion]=useState('');
  const [feedback,setFeedback]=useState('');
  const [form,setForm]=useState({answer:'',question:''});
  const [loader,setLoader]=useState(false);
  const [rating,setRating]=useState("");

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const handleNextQuestion =()=>{
      
    setFeed(false);
    setIndex((prev) => (prev === questions?.length - 1 ? 0 : prev + 1));
  }

  const handleprevious=()=>{
    setFeed(false);
  }

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

 
  
  const handleCompile = () => {

    // getLanguages();
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: import.meta.env.VITE_REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
     console.log(code);
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
       "X-RapidAPI-Host": import.meta.env.VITE_REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  useEffect(()=>{
     
    const fetchData=async ()=>{
      const response=await fetch('/api/v1/feedback',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(form)
      })

      const data = await response.json();
      // console.log(data);
      setLoader(false);
      setFeedback(data.feedback);
      setRating(data.rating);
    }

    if(form.answer!==''){
      console.log(form);
      setLoader(true);
    fetchData();
      }
  },[form])

  const handlesubmit=async ()=>{
    try {
     setFeed(true);
 
     setQuestion(questions[index].question);

     setForm({answer:code,question:question})

   } catch (error) {
     console.log(error);
    }
     }

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (

<div>
{feed ? (
  <div className='bg-custom-blue min-h-screen'>
  <div className='flex justify-between' >

    <div className='w-[640px] h-[560px] my-10 mx-20 px-3 py-3   border-2 rounded-md bg-white  '>
      <h1 className='text-2xl'>Your Code</h1>
      <p>{code}</p>
    </div>

 <div>

 </div>

    <div className='w-[700px] h-[560px] my-10 mx-20  px-3 py-3 border-2 rounded-md bg-white   text-2xl'>
      {loader ? (
          <div>Loading...</div>
      ):(
<>
<h1>Feedback of your answer</h1>
      {feedback}
      <p>The rating for this code on the scale of 10 would be {rating}</p>
</>
      )}
    
    </div>

 
  </div>

  <div className='flex justify-center'>

<button onClick={handleNextQuestion} className='px-[10px] py-[20px] m-[10px] rounded-sm w-[200px]  text-black bg-custom-green'>Next Question</button>
<button onClick={handleprevious} className='px-[10px] py-[20px] m-[10px] rounded-sm w-[200px]  text-black bg-custom-green'>Previous Question</button>
</div>

  </div>
 
) :(
  <>
<ToastContainer
  position="top-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>

<div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>

<div className='my-5 mx-5'>
<h1 className='text-black font-bold mb-10 text-2xl'>Question {index+1}</h1>
<p className='text-black font-bold text-2xl mb-5'>{questions.length>0 && questions[index].question}</p>

</div>
<div className="flex flex-row">
  <div className="px-4 py-2">
    <LanguagesDropdown onSelectChange={onSelectChange} />
  </div>
  <div className="px-4 py-2">
    <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
  </div>
</div>
<div className="flex flex-row space-x-4 items-start px-4 py-4">
  <div className="flex flex-col w-full h-full justify-start items-end">
    <CodeEditorWindow
      code={code}
      onChange={onChange}
      language={language?.value}
      theme={theme.value}
    />
  </div>

  <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
    <OutputWindow outputDetails={outputDetails} />
    <div className="flex flex-col items-end">
      <CustomInput
        customInput={customInput}
        setCustomInput={setCustomInput}
      />
      <button
        onClick={handleCompile}
        disabled={!code}
        className={classnames(
          "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
          !code ? "opacity-50" : ""
        )}
      >
        {processing ? "Processing..." : "Compile and Execute"}
      </button>

      <button
      onClick={handlesubmit}
      className={classnames(
        "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
        !code ? "opacity-50" : ""
      )}
    >
      Submit
      </button>
    </div>
    {outputDetails && <OutputDetails outputDetails={outputDetails} />}
  </div>
</div>

</>
)}
</div>
  )
}

export default CodeEditor