import React, { useEffect, useState } from "react";
import './UpdateContacts.css';
import FormContacts from "../FormContacts/FormContacts";
import { useParams, useNavigate } from 'react-router-dom'

function UpdateContacts (){

  const [contactsInfo, setContactsInfo] = useState();

  const { UpdateContactsId } = useParams();
  let navigate = useNavigate();

  //  Funciones para editar
  // o botao onclick chama a função onUpdate e pasando o id da receita, o onupdate va no banco dos contactos que estan cadastrdasoi e pega o contacto que queremos alterar esta función é para os dados aparecer na tela para o usuario poder alterar. primeiro buscamos os dados con fectch e los mostramos no estados do formulario

  useEffect(() => {
    fetch(`http://localhost:4000/contact/${UpdateContactsId}`)
      .then((response) => response.json())
      .then((data) => {
      setContactsInfo(data)
        
      });
  },[UpdateContactsId]);

  const handleUpdate = async(contactsData) => {
    
    const response = await fetch('http://localhost:4000/contact/' + contactsData.id, {
      method: 'PATCH',
      body:JSON.stringify(contactsData),
      headers: {'Content-type': 'application/json; charset=UTF-8' }
    });
    if (response.ok) {
      console.log('OKS', response.ok);
      navigate ('/');
    } else {
      console.log('ERRO')
    }
  }

  
  return (
    <div className="containerUpdate">
      <h1>Editar Contato</h1>
      <FormContacts 
      Add={(contactsData)=> handleUpdate (contactsData)}
      contactsInfo= {contactsInfo}
      buttonTitle='Salvar dados alterados'
      />

    </div>
  )

}

export default UpdateContacts;