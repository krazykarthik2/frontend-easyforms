import React, { useEffect, useState } from 'react'
import {askHelp} from '../../../utils/api_calls/help';
import { toastPromise } from "../../../utils/toastify.js";
import MdEditor from "@uiw/react-md-editor"
function BackendHelp({__admin,__user,token}) {
  const [help,setHelp]= useState(null)
  useEffect(()=>{
    
    toastPromise(() => askHelp(__admin?"admin":(__user?"user":"not-logged-in"),token), {
      pending: "Asking Help...",
      success: "Help fetched successfully",
      error: "Error Fetching Help",
      then: (data) => {
        setHelp(data)
      },
    });
  },[__admin,__user,token]);
  return (
    <div className='h-full w-full d-center stack'>
      <MdEditor.Markdown className='h-full  w-full d-center stack' source={help?.data} />
    </div>
  )
}

export default BackendHelp