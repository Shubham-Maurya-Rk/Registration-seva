import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';

function List() {
    const [youthdata, setyouthdata] = useState(JSON.parse(localStorage.getItem("youth")));
    const set=(data)=>{
        setyouthdata(data);
        localStorage.setItem("youth", JSON.stringify(data));
    }

    const reload = (e) => {
        e.preventDefault();
        const coll = collection(db, "youth");
        const q = query(coll, orderBy("createdAt"));
        onSnapshot(q, snapshot => {
            let t = []
            snapshot.forEach(y => {
                t.push({ id: y.id, ...y.data() });
            })
            set(t)
            // localStorage.setItem("youth", JSON.stringify(t));
            // window.location.reload();
        })
    }

    const handleDel = (e) => {
        const id = e.target.id;
        const docRef = doc(db, "youth", id);
        // let data = JSON.parse(localStorage.getItem("youth"));
        deleteDoc(docRef).then(() => {
            let data = youthdata.filter(youth => {
                return youth.id !== id;
            })
            set(data);
        }).catch(error => {
            alert(error);
        })
        // window.location.reload();
    }

    const handleCheck = (e) => {
        const id = e.target.name;
        const done = e.target.checked;
        const docRef = doc(db, "youth", id);
        updateDoc(docRef, {done})
            .then(docRef => {
                let data=youthdata.map(y=>{
                    if(id===y.id)y.done=done;
                    return y;
                })
                set(data);
            })
            .catch(error => {
                alert(error);
            })
    }

    return (<>
        <div className='container mt-3'>
            <div className='container-fluid'>
                <button title="Refresh" onClick={reload} className='btn btn-primary rounded-circle float-end my-2 d-flex justify-content-center align-items-center' style={{ width: "5vh", height: "5vh" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                </button>
            </div>
            <table className="table table-warning">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" className='text-center'>Done</th>
                        <th scope="col" className='text-center'>Name</th>
                        <th scope="col" className='text-center'>Call</th>
                        <th scope="col" className='text-center'>Whatsapp</th>
                        <th scope="col" className='text-center'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        youthdata.map(function (yt, index) {
                            return <tr key={yt.id}>
                                <th scope="row">{index + 1}</th>
                                <td className='text-center'>
                                    <input type="checkbox" checked={yt.done} onChange={handleCheck} name={`${yt.id}`} /></td>
                                <td className='text-center'>{yt.name}</td>
                                <td className='text-center'><a href={`tel:${yt.call}`}>{yt.call}</a></td>
                                <td className='text-center'><a href={`https://api.whatsapp.com/send/?phone=91${yt.call}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.08  4-.182-.133-.38-.232z" />
                                    </svg>
                                </a></td>
                                <td className='text-center'>
                                    <button className='bg-transparent border-0' onClick={handleDel} id={`${yt.id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16" id={`${yt.id}`}>
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" id={`${yt.id}`} />
                                        </svg>
                                    </button>
                                </td>
                            </tr>

                        })
                    }
                </tbody>
            </table>
        </div>
    </>)
}

export default List
