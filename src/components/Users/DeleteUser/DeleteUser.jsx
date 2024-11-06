import React, { useEffect, useState } from 'react'
import { getUserById } from '../../../utils/api_calls/user'
import { useParams } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { toastPromise } from '../../../utils/toastify';
import { deleteUser } from '../../../utils/api_calls/user';
import { useNavigate } from 'react-router-dom';

function DeleteUser({__user}) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if(!__user) return; 
    if(!__user._id) return;
    getUserById(__user._id).then(data=>{
      setUser(data.user);
    });
  }, [__user]);
  const handleDelete = () => {
    toastPromise(deleteUser(user._id), {
      pending: "Deleting user...",
      success: "User deleted successfully",
      error: "Failed to delete user",
      then: () => {
        navigate("/");
      }
    });
  }
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <button onClick={handleDelete} className='flex gap-2' >
        <FaTrashAlt size={39}/>
        <span>Delete</span>
      </button>
    </div>
  );
}

export default DeleteUser