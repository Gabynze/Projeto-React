import React, { useEffect, useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import ContactsCard from "./Components/Contacts/ContactsCard";
import './App.css';

function App() {
  const [names, setNames] = useState ('');
  const [sobreNomes, setSobreNomes] = useState ('');
  const [phones, setPhones] = useState (''); 
  const [emails, setEmails] = useState ('');

  const [listContacts, setListContacts] = useState ([]);
 
// Função para adicionar Contato e ir costruindo a lista de contato
  const handleAdd = async (e) => {
    e.preventDefault();
    const data = {
      'Nome': names,
      'Sobrenome': sobreNomes,
      'Telefone':phones,
      'Email': emails
    }
    if (data.Nome === '' || data.Sobrenome === '' || data.Telefone === '' || data.Email ===''){
      console.log('return')
      return
    }
    const response = await fetch('http://localhost:4000/contact/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    if (response.ok)  {
      console.log ('OKS', response.ok)
      setNames ('');
      setSobreNomes ('');
      setPhones ('');
      setEmails ('');
      contacts();
    }
  }
  // ///////

  //Função para buscar todos os contatos e colocarlos dentro de um estado setListContacts
  function contacts () {
    fetch('http://localhost:4000/contact/')
      .then((response) => response.json())
      .then(data => setListContacts(data));
  };
  // ////////

  //useEffect para mostrar por primeira vez os contatos que temos cadastrados na tela
  useEffect(() => {
    contacts()
  },[]);
  // ////
  
  return (
    <>
      <header>
        <div className='container-header'>
          <h1>Agenda de contatos</h1>            
          <div className='search'>
            <label>Buscar
            <MdPersonSearch className='button-icono'/>
            </label>
            <input 
            className='search-input' 
            type='text'  
            placeholder='Nome do contato'
            />
          </div>
        </div>
      </header>

      <div className='container-form'> 
        <form className='reg-form'>
          <div >
            <label>Nome</label>
            <input 
            className='form-input' 
            type="text"
            value={names}
            onChange={(e) =>setNames(e.target.value)}
            />
          </div>
          <div >
            <label>Sobrenome</label>
            <input 
            className='form-input' 
            type="text"
            value={sobreNomes}
            onChange={(e) =>setSobreNomes(e.target.value)}
            />
          </div>
          <div>
            <label>Telefone</label>
            <input 
            className='form-input' 
            type="text" 
            value={phones}
            onChange={(e) =>setPhones(e.target.value)}
            />
          </div>
          <div>
            <label>Email</label>
            <input 
            className='form-input' 
            type="text"
            value={emails} 
            onChange={(e) =>setEmails(e.target.value)}
            />
          </div>
        </form>
        <div>
          <button 
          className='form-boton' 
          type="submit"
          onClick={handleAdd}
          >Adicionar Contato
          </button>
        </div>
      </div>

      {/* para listar los contatos */}
      <div className="container-contactBody">
        {/* fazemos un map donde para cada receita ele vai mostrar lo que tenemos em retorno */}
        {listContacts.map((contato) => { 
          return (
            <ContactsCard  
              key= {contato.id}
              id={contato.id}
              nome= {contato.Nome}
              sobrenome={contato.Sobrenome}
              telefone= {contato.Telefone}
              email= {contato.Email}
            /> 
          )  
        })}
      </div>
    </>
  );
}

export default App;
