import React, { useEffect, useState } from 'react'
import { getUserById } from '../../../utils/api_calls/user'
import { useParams } from 'react-router-dom';
function UserProfile() {
  const params = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if(!params.id) return;
    getUserById(params.id).then(e=>setUser(e.user));
  }, [params.id]);
  return (
    <div>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
    </div>
  );
}

export default UserProfile