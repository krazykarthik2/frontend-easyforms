import React, { useState, useEffect } from 'react';
import { getAdminById } from '../../../utils/api_calls/user';
import { Link } from 'react-router-dom';
import { DateTimeFormat ,showDateTimeDiff} from '../../../utils/formats/formats';
import {LuMailPlus} from 'react-icons/lu';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
function AdminProfile({__admin,token}) {
  const [admin, setAdmin] = useState(null);
  const params = useParams();
  useEffect(() => {
    if(!params.id) return;
    getAdminById(params.id,token).then(data=>{
      setAdmin(data);
    }).catch(err=>{
      console.log(err);
    })
  }, [__admin,params.id,token]);
  return (
    <div className='justify-between w-screen overflow-x-auto h-full py-5 d-center stack'>
      <div>admin#{admin?._id}</div>
      <table className="w-full gap-3 d-center">
        <tbody>
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>{admin?.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{admin?.email}</td>
            <td type="button" role="button" className='text-gray-500 bg-blue-200 rounded-md' onClick={()=>navigator.clipboard.writeText(admin?.email).then(toast.success("Copied to clipboard"))}>::/copy</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td>:</td>
            <td>{DateTimeFormat(admin?.createdAt)}</td>
            <td className="text-gray-500">::/{showDateTimeDiff(admin?.createdAt)}</td>
          </tr>
          <tr>
            <td>Last Login At</td>
            <td>:</td>
            <td>{DateTimeFormat(admin?.lastLogin)}</td>
            <td className="text-gray-500">::/{showDateTimeDiff(admin?.lastLogin)}</td>
          </tr>
          <tr>
            <td>Last Logout At</td>
            <td>:</td>
            <td>{DateTimeFormat(admin?.lastLogout)}</td>
            <td className="text-gray-500">::/{showDateTimeDiff(admin?.lastLogout)}</td>
          </tr>
          <tr>
            <td>Updated At</td>
            <td>:</td>
            <td>{DateTimeFormat(admin?.updatedAt)}</td>
            <td className="text-gray-500">::/{showDateTimeDiff(admin?.updatedAt)}</td>
          </tr>
        </tbody>
      </table>
      <Link type='button' to={'mailto:'+admin?.email} className="gap-2 px-5 py-3 rounded-lg unlink unbtn d-center bg-slightly-green">
        <span>Send Email</span>
        <LuMailPlus />
        </Link>
    </div>
  );
}

export default AdminProfile