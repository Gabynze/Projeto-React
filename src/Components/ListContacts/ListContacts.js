import React, { useState, useEffect} from "react";
import './ListContacts.css'
import { MdPersonSearch } from "react-icons/md";
import {Modal } from '../index'
import {ContactsCard} from "../index";
import {useNavigate} from 'react-router-dom'



function ListContacts () {
  const [listContacts, setListContacts] = useState ([]);
  const [showModal, setShowModal] = useState (false)
  const [contactsDelete, setcontactsDelete] = useState ()
  const [search, setSearch] = useState('');
  let navigate = useNavigate();
  
  function contacts () {
    fetch('http://localhost:4000/contact/')
      .then((response) => response.json())
      .then(data => setListContacts(data));
  };
 
  useEffect(() => {
    contacts()
  },[]);

  const onDelete = (contatoId) => {
    setcontactsDelete(contatoId);
    setShowModal (true);
  }
 
  const handleDelete = async () =>{
    setShowModal(false);
    const response = await fetch ('http://localhost:4000/contact/' + contactsDelete,{
      method: 'DELETE',
    })
    if (response.ok) {
      contacts();
    }
    alert ('Deletado com sucesso');
  }

  const handleCancelar = () => {
    setcontactsDelete ('');
    setShowModal (false);
  }
  
  const results = !search ?listContacts : listContacts.filter((data) => data.Nome.toLowerCase().includes(search.toLocaleLowerCase()))

  return(
    <>
      <div className='container-inicio'>
        <p>Bem-vindo a nossa agenda virtual de contatos da Turma 16 Toti</p>            
        <div className='search'>
          <label>Buscar
          <MdPersonSearch className='button-icono'/>
          </label>
          <input 
          className='search-input' 
          type='text'  
          placeholder='Nome do contato'
          value={search}
          onChange= {(e) =>setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="container-contactBody">
        {/* fazemos un map donde para cada receita ele vai mostrar lo que tenemos en retorno */}
        {results.map((contato) => { 
          return (
            <ContactsCard 
              key= {contato.id}
              id={contato.id}
              nome= {contato.Nome}
              sobrenome={contato.Sobrenome}
              telefone= {contato.Telefone}
              email= {contato.Email}
              onDelete= {() => onDelete(contato.id)}
              upDate= {() => navigate(`/UpdateContacts/${contato.id}`)}
            /> 
          )  
        })}
      </div>
      {
        showModal &&
        <Modal 
        handleCancelar={handleCancelar}
        handleDelete={handleDelete}
        />
      }
    
    
    
    </>
    
    

  )
} 
export default ListContacts;
  
  