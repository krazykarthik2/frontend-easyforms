import React from 'react'
import { FaShareNodes } from 'react-icons/fa6';
import { toast } from 'react-toastify';

function ShareBtn({url}) {
  const handleShare = () => {
    if(navigator.canShare({url})){
      navigator.share({url});
    }else{
      navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard");
    }
  }
  return (
    <button onClick={handleShare} className='unbtn w-full d-center'>
      <FaShareNodes />
    </button>
  )
}

export default ShareBtn