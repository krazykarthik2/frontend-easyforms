import React,{useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    <div className='w-full h-full stack d-center'>
      <form onSubmit={handleSubmit} className='stack d-center'>
        <div className='stack d-center'>
          <div className="form-details stack d-center">
            <p>form#{form?.formId}</p>
            <h1>{form?.name}</h1>
            <p>{form?.attributes?.length} attributes</p>
          </div>
          <div className="gap-10 ques stack d-center">

          <h1>Are you sure<br/> you want to delete this form?</h1>
              <button type='submit' 
              className="gap-3 px-6 py-3 rounded-md unbtn bg-slightly-red d-center"
              >Delete</button>
              <Link to={`/events/id/${params.id}/forms/s/${form?.formId}`}
              className="gap-3 px-6 py-3 bg-gray-500 rounded-md unlink d-center">Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default DeleteForm