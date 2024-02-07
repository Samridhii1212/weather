import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { auth } from './firebase';
import AddUserForm from './AddUserForm';
import { useNavigate } from "react-router-dom"





function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate()
 

  const [users, setUsers] = useState([
    { username: 'JohnDoe', addedDate: '2022-01-01', status: 'Active' },
   
  ]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (username) => {
    setUsers(users.filter((user) => user.username !== username));
  };

  const toggleStatus = (username) => {
    setUsers(
      users.map((user) =>
        user.username === username
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Username', accessor: 'name' },
      { Header: 'Added Date', accessor: 'addedDate' },
      { Header: 'Status', accessor: 'status' },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <>
            <button onClick={() => handleChangeStatus(row.original.id)}>
              {row.original.status === 'Active' ? 'Deactivate' : 'Activate'}
            </button>
            <button onClick={() => handleDeleteUser(row.original.id)}>Delete</button>
          </>
        ),
      },
    ],
   
    []
  );

  const data = React.useMemo(() => users, [users]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: `User ${users.length + 1}`,
      status: 'Active',
      addedDate: new Date().toLocaleDateString(),
    };
    setUsers([...users, newUser]);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleChangeStatus = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    );
    setUsers(updatedUsers);
  };

  const handleLogout = () => {
    navigate("/")
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const fetchWeatherData = async () => {
    const apiKey = '5d2e0a3c6a0e67a18cd89b824a8c103c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const jsondata = await response.json();
    console.log(jsondata.main);
    setWeatherData(jsondata);
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

    
    <div className="container">
     
      <h1>Weather App</h1>
      <label htmlFor="cityInput">Enter City:</label>
      <div className="search-section">
        <input
          type="text"
          id="cityInput"
          className="city-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-button" onClick={fetchWeatherData} disabled={!city}>
          Get Weather
        </button>
      </div>
      {weatherData && (
        <div className="weather-box">
          <h2>Weather Information</h2>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
      </div>

      <AddUserForm addUser={addUser} />
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Added Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.addedDate}</td>
              <td>{user.status}</td>
              <td>
                <button className="deactivate" onClick={() => toggleStatus(user.username)}>
                  {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="delete" onClick={() => deleteUser(user.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
  );
}

export default Home;

