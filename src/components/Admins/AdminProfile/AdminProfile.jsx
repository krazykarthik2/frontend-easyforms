import React, { useState, useEffect } from 'react';
import { getAdminById } from '../../../utils/api_calls/user';
import { Link } from 'react-router-dom';

function AdminProfile({__admin,token}) {
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    if(!__admin) return;
    if(!__admin._id) return;
    getAdminById(__admin._id,token).then(data=>{
      setAdmin(data);
    }).catch(err=>{
      console.log(err);
    })
  }, [__admin]);
  return (
    <div>
      <div>admin#{admin?._id}</div>
      <h1>{admin?.name}</h1>
      <p>{admin?.email}</p>
      <p>{admin?.createdAt}</p>
      <p>{admin?.lastLogin}</p>
      <p>{admin?.lastLogout}</p>
      <p>{admin?.updatedAt}</p>
      <Link to={`/admins/edit/${admin?._id}`}>Edit</Link>
      <Link to={`/admins/delete/${admin?._id}`}>Delete</Link>
    </div>
  );
}

export default AdminProfile