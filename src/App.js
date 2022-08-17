import React, { useEffect, useState } from "react";
import './App.css';
import { 
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import ListContacts from "./Components/ListContacts/ListContacts";
import RegisterContacts from "./Components/RegisterContacts/RegisterContacts";
import UpdateContacts from "./Components/UpdateContacts/UpdateContacts";


function App() {

  return (
    <BrowserRouter>
      <header className='header-container'>
          <h2> Minha Agenda Virtual de contatos</h2>
        <nav id="menu">
          <div className="container-menu">
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/RegisterContacts">Adicionar Contato</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<ListContacts />}/>
        <Route path='/RegisterContacts' element={<RegisterContacts />} />
        <Route path='/UpdateContacts/:UpdateContactsId' element={<UpdateContacts />} />
      </Routes>
    </BrowserRouter>   
  );
}

export default App;



