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

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

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

  // const getLanguages=async ()=>{
  //   const options = {
  //     method: 'GET',
  //     url: 'https://judge0-extra-ce.p.rapidapi.com/languages/63',
  //     headers: {
  //       'x-rapidapi-key': 'a4c3594ffdmshd5658bdeb018a1ep193cfejsn2ea83bf4f97d',
  //       'x-rapidapi-host': 'judge0-extra-ce.p.rapidapi.com'
  //     }
  //   };
    
  //   try {
  //     const response = await axios.request(options);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
    
  // }
  
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
       "X-RapidAPI-Host": "judge0-extra-ce.p.rapi",
        "X-RapidAPI-Key": "a4c3594ffdmshd5658bdeb018a1ep193cfejsn2ea83bf4f97d",
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
//     <div className='bg-custom-blue min-h-screen py-5'>
       


// <p className='text-white font-bold text-2xl mb-5'>{questions.length>0 && questions[index].question}</p>
//     </div>

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

{/* <a
  href="https://github.com/manuarora700/react-code-editor"
  title="Fork me on GitHub"
  class="github-corner"
  target="_blank"
  rel="noreferrer"
>
  <svg
    width="50"
    height="50"
    viewBox="0 0 250 250"
    className="relative z-20 h-20 w-20"
  >
    <title>Fork me on GitHub</title>
    <path d="M0 0h250v250"></path>
    <path
      d="M127.4 110c-14.6-9.2-9.4-19.5-9.4-19.5 3-7 1.5-11 1.5-11-1-6.2 3-2 3-2 4 4.7 2 11 2 11-2.2 10.4 5 14.8 9 16.2"
      fill="currentColor"
      style={{ transformOrigin: "130px 110px" }}
      class="octo-arm"
    ></path>
    <path
      d="M113.2 114.3s3.6 1.6 4.7.6l15-13.7c3-2.4 6-3 8.2-2.7-8-11.2-14-25 3-41 4.7-4.4 10.6-6.4 16.2-6.4.6-1.6 3.6-7.3 11.8-10.7 0 0 4.5 2.7 6.8 16.5 4.3 2.7 8.3 6 12 9.8 3.3 3.5 6.7 8 8.6 12.3 14 3 16.8 8 16.8 8-3.4 8-9.4 11-11.4 11 0 5.8-2.3 11-7.5 15.5-16.4 16-30 9-40 .2 0 3-1 7-5.2 11l-13.3 11c-1 1 .5 5.3.8 5z"
      fill="currentColor"
      class="octo-body"
    ></path>
  </svg>
</a> */}

<div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
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
    </div>
    {outputDetails && <OutputDetails outputDetails={outputDetails} />}
  </div>
</div>

</>
  )
}

export default CodeEditor