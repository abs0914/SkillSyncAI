import React, { useState } from 'react';

   function Register() {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

     const handleSubmit = (e) => {
       e.preventDefault();
       // Add registration logic here
       console.log('Register submitted', { username, password });
     };

     return (
       <form onSubmit={handleSubmit}>
         <h3>Register</h3>
         <div>
           <label>Username:</label>
           <input
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
           />
         </div>
         <div>
           <label>Password:</label>
           <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
         </div>
         <button type="submit">Register</button>
       </form>
     );
   }

   export default Register;