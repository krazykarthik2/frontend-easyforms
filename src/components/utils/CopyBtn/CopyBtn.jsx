import React from 'react'
import { toast } from 'react-toastify';
import { FaCopy } from 'react-icons/fa';
function CopyBtn({url}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
  }
  return (
    <button onClick={handleCopy}>
        <FaCopy size={20} />
    </button>
  )
}

export default CopyBtn