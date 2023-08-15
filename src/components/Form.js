import React,{useState} from 'react';
import { db } from '../firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
const coll=collection(db,"youth");

function Form() {
    const [name, setName] = useState("")
    const [call, setCall] = useState("")
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(name==="" || call===""){
            alert("Please! fill all fields")
            return;
        }
        await addDoc(coll,{
            name,call,createdAt:serverTimestamp(),done:false
        })
        alert(`${name} is registered successfully!`)
        setName("")
        setCall("")
    }
    return (<>
        <div className='d-flex align-item-center justify-content-center'>
            <form className='form  mx-2 bg-color p-2 rounded text-start text-white w-100'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e=>setName(e.target.value)} value={name} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="number" className="form-control" value={call} id="exampleInputPassword1" onChange={e=>setCall(e.target.value)} required/>
                </div>
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
        </>)
}

export default Form 
