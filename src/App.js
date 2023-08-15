import './App.css';
import Form from './components/Form';
import List from './components/List';
import Header from './components/Header';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if(localStorage.getItem("youth")===null)localStorage.setItem("youth",JSON.stringify("[]"))
    return;
  }, [])
  
  return (
    <Router  basename={process.env.PUBLIC_URL}>
      <Header/>
      <Routes>
        <Route index exact path="/" element={<Form/>}/>
        <Route exact path="/list" element={<List/>}/>
      </Routes>
    </Router>
    // <div className="App">
    //   <Form/>
    // </div>
  );
}

export default App;
