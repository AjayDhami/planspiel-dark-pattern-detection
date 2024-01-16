import React, { useState } from 'react';
import { SuperAdminUser } from '../../types';

const SuperAdminSignin = () => {
const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
})
  return (
    <div><form>
        <input type="email" />
        <input type="password" onChange={(e) => e.target.value}/></form> </div>
  )
}

export default SuperAdminSignin