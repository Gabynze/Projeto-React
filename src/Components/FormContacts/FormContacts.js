import React, { useState, useEffect } from "react";
import './FormContacts.css'

function FormContacts ({Add, buttonTitle, contactsInfo }) {
  const [names, setNames] = useState ('');
  const [sobreNomes, setSobreNomes] = useState ('');
  const [phones, setPhones] = useState (''); 
  const [emails, setEmails] = useState ('');

  useEffect(() => {
    setNames(contactsInfo?.Nome);
    setSobreNomes(contactsInfo?.Sobrenome);
    setPhones(contactsInfo?.Telefone);
    setEmails(contactsInfo?.Email);
  }, [contactsInfo]) 

  const handleAdd = (event) => {
    event.preventDefault();
    const data = {
      'Nome': names,
      'Sobrenome': sobreNomes,
      'Telefone':phones,
      'Email': emails
    }
    if(contactsInfo){
      data.id = contactsInfo.id;
    }

    Add(data);
  }

  return(
    <div className='container-form'> 
      <form className='reg-form'>
        <div>
          <label>Nome</label>
          <input 
          className='form-input' 
          type="text"
          value={names}
          onChange={(e) =>setNames(e.target.value)}
          />
        </div>
        <div>
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
          >{buttonTitle}
        </button>
      </div>
    </div>
    
  )
}
  
export default FormContacts;