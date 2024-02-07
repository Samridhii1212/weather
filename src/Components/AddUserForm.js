import React, { useState } from 'react';

const AddUserForm = ({ addUser }) => {
    const [newUser, setNewUser] = useState({ username: '', addedDate: '', status: 'Active' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(newUser);
        setNewUser({ username: '', addedDate: '', status: 'Active' });
    };

    return (
        <form onSubmit={handleSubmit} className='form'>
           
                <input
                 type="text"
                  name="username" 
                  value={newUser.username} 
                  placeholder='username'
                  
                  onChange={handleChange} />
           
            
                <input 
                type="date" 
                name="addedDate" 
                placeholder='date'
                value={newUser.addedDate} onChange={handleChange} />
           
           
                <select name="status" value={newUser.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
           
            <button type="submit" className='submit'>Add User</button>
        </form>
    );
};

export default AddUserForm;
