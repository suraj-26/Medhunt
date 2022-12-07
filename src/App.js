import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

   const [userName,setuserName] = useState('')
   const [password,setPassword] = useState('')
   const [userList,setUserList] = useState([])

    useEffect(()=>{
        Axios.get('http://localhost:3001/api/get').then((res)=>{
            setUserList(res.data);
        })
    },[])

    const submitData = () =>{
       Axios.post('http://localhost:3001/api/insert',{username:userName,password:password}).then(()=>{
           setUserList([...userList,{username:userName,password:password}])
       })
    }

    function editData(usern,pass){
       setuserName(usern)
        setPassword(pass)
    }

  return (
    <div className="App">
      <div className="form">
          <label htmlFor="userName">User Name</label>
          <input type="text" name="userName" value="" onChange={(e)=>{
              setuserName(e.target.value);
          }}/>

          <label htmlFor="password">Password</label>
          <input type="text" name="password" onChange={(e)=>{
              setPassword(e.target.value);
          }}/>
          <button onClick={submitData}>Submit</button>
      </div>

        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>UserName</th>
                    <th>Password</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
            {
                userList.map((e,index)=>{
                    return (
                            <tr key={index}>
                                <td>{e.username}</td>
                                <td>{e.password}</td>
                                <td><button onClick={ () => editData(e.username,e.password)}
                                    >Edit</button></td>
                            </tr>
                    )
                })
            }
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default App;
