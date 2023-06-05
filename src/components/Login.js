import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    let navigate=useNavigate()
    const [credentials,setCred]=useState({email:"",password:""})
    const handlesub= async(e)=>{
        e.preventDefault();
        const response=await fetch(`http://localhost:5000/api/auth/login`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json()
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.authToken)
            props.showalert("Logged-In Successfully","success")
            navigate('/')

            
          }
          else{
            props.showalert("Invalid Credentials","danger")
          }
    
    }
    const onChange=(e)=>{
        setCred({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <form className='container my-4' onSubmit={handlesub}>
            <h2 className="my-2">Log-In to iNotebook</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} value={credentials.email}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login