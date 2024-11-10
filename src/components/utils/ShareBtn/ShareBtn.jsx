import React from 'react'
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
    <button onClick={handleShare}>Share</button>
  )
}

export default ShareBtn