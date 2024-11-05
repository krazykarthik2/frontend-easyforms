import React, { useEffect, useState } from 'react'
import { getUserById } from '../../../utils/api_calls/user'
import { useParams } from 'react-router-dom';
function MyProfile({__user}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if(!__user) return;
    if(!__user._id) return;
    getUserById(__user._id).then(data=>{
      setUser(data.user);
    });
  }, [__user]);
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}

export default MyProfile