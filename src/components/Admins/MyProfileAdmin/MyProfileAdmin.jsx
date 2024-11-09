import React, { useEffect, useState }  from 'react'
import { getAdminById } from '../../../utils/api_calls/user'
import { Link } from 'react-router-dom';
function MyProfileAdmin({__admin,token}) {
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
      <Link to={`/admins/me/edit`}>Edit</Link>
      <Link to={`/admins/me/delete`}>Delete</Link>
    </div>
  );
}

export default MyProfileAdmin