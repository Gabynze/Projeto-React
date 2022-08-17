import React, { useState } from "react";
import './RegisterContacts.css'
import FormContacts from "../FormContacts/FormContacts";
import {useNavigate} from 'react-router-dom';



function RegisterContacts () {

  let navigate = useNavigate ();

  const Add = async (contactsData) => {
    const response = await fetch('http://localhost:4000/contact/', {
      method: 'POST',
      body: JSON.stringify(contactsData),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    });

    if (response.ok)  {
      console.log ('OKS', response.ok)
      alert ('contato adicionado com sucesso')
      navigate ('/');
    }
    else
    console.log ('ERRO')
  }
  

  return(
    <div className="containerFormContacts">
      <h1>Adicionar Novo Contato</h1>
      <FormContacts 
       Add={(contactsData)=> Add (contactsData)}
       buttonTitle="Adicionar Contato"
        />
    </div>  
  )
}
  
export default RegisterContacts;