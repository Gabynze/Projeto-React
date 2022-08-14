import React, { useEffect, useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import ContactsCard from "./Components/Contacts/ContactsCard";
import Modal from "./Components/Modal/Modal";
import './App.css';

function App() {
  const [names, setNames] = useState ('');
  const [sobreNomes, setSobreNomes] = useState ('');
  const [phones, setPhones] = useState (''); 
  const [emails, setEmails] = useState ('');
  const [listContacts, setListContacts] = useState ([]);

  // estados show modal para confirmar se quer deletar
  const [showModal, setShowModal] = useState (false)

  // estados para deletar los contactos
  const [contactsDelete, setcontactsDelete] = useState ()

  // estados para editar, para decir que estas haciendo una alteración, controlar esas alteraciones
  const [isUpdate, setIsUpdate]= useState()

  // estados para buscar 
  const [search, setSearch] = useState('');
 
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

  // Função para excluir com id do contato e  chama o showmodal
  const onDelete = (contatoId) => {
    setcontactsDelete(contatoId);
    setShowModal (true);
  }
  // Função para excluir os contatos que vai ser chamada por showmodal ao confirmar que quer excluir
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

  // Clico no cancelar colocamos de nuevo el estado de setcontactsDelete como vacio
  const handleCancelar = () => {
    setcontactsDelete ('');
    setShowModal (false);
  }
  // //////////////////

  // Funções para editar
  // o botao onclick chama a função onUpdate com o id da receita, onupdate para os dados aparecer na tela para o usuario poder alterar. 
  const onUpdate = (contatoId) => {
    fetch(`http://localhost:4000/contact/${contatoId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("retorno de alterar", data)
        setIsUpdate(contatoId);
        setNames(data.Nome);
        setSobreNomes (data.Sobrenome);
        setPhones(data.Telefone);
        setEmails (data.Email);
      });
  }

  const handleUpdate = async() => {
    const data = {
      'Nome': names,
      'Sobrenome': sobreNomes,
      'Telefone':phones,
      'Email': emails
    }
    const response = await fetch('http://localhost:4000/contact/' + isUpdate, {
      method: 'PATCH',
      body:JSON.stringify(data),
      headers: {'Content-type': 'application/json; charset=UTF-8' }
    });
    if (response.ok) {
      console.log('OKS', response.ok);
      setIsUpdate(undefined);
      setNames ('');
      setSobreNomes ('');
      setPhones ('');
      setEmails ('');
      contacts ();
    }
  }
  // /// 

  // Filtrar para buscar
  const results = !search ?listContacts : listContacts.filter((data) => data.Nome.toLowerCase().includes(search.toLocaleLowerCase()))
  // //
  
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
            value={search}
            onChange= {(e) =>setSearch(e.target.value)}
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
          onClick={ isUpdate ? handleUpdate : handleAdd}
          > {isUpdate ? "Salvar Dados Alterados" : 'Adicionar Contato'}
          </button>
        </div>
      </div>

      {/* para listar los contatos */}
      <div className="container-contactBody">
        {/* fazemos un map donde para cada receita ele vai mostrar lo que tenemos em retorno */}
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
              upDate= {() => onUpdate(contato.id)}
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
  );
}

export default App;
