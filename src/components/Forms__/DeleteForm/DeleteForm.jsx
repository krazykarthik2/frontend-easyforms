import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toastPromise } from '../../../utils/toastify';
import { getFormById, deleteForm } from '../../../utils/api_calls/forms';
function DeleteForm({token}) {
  const [form,setForm] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  function handleDelete(){
    toastPromise(()=>deleteForm(params.formId,token),{
      pending:"Deleting form...",
      success:"Form deleted",
      error:"Failed to delete form",
      then:()=>{
        navigate(`/events/id/${params.id}/forms`);
      }
    })
  }
  function handleSubmit(e){
    e.preventDefault();
    handleDelete();
  }
  useEffect(()=>{
    toastPromise(()=>getFormById(params.formId,token),{
      pending:"Loading form...",
      success:"Form loaded",
      error:"Failed to load form",
      then:(form)=>{
        setForm(form);
      }
    })
  },[params.formId]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='stack'>
          <div className="form-details">
            <p>form#{form?.formId}</p>
            <h1>{form?.name}</h1>
            <p>{form?.attributes?.length} attributes</p>
          </div>
          <h1>Are you sure you want to delete this form?</h1>
          <button type='submit'>Delete</button>
          <button type='button' onClick={()=>navigate(`/events/id/${params.id}/forms/s/${params.formId}`)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default DeleteForm