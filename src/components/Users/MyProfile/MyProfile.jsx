import React, { useEffect, useState } from 'react'
import { getUserById } from '../../../utils/api_calls/user'
import { useParams } from 'react-router-dom';
function MyProfile({__user,token}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if(!__user) return;
    if(!__user._id) return;
    getUserById(__user._id,token).then(data=>{
      setUser(data);
    }).catch(err=>{
      console.log(err);
    })
  }, [__user]);
  return (
    <div>
      <div>user#{user?._id}</div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}

export default MyProfile