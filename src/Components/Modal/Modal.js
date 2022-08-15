import React from "react";
import './Modal.css'

function Modal ({handleDelete, handleCancelar}) {

  return(
    <div className='confirm-modal'>
      <div className='modal-info'>
        <h3>Tem certeza que deseja excluir o contato selecionado?</h3>
        <p>se eliminar não voltará a ver este registro</p>
      </div>
      <div className='modal-button'>
        <button className= 'button-confirmar' onClick={handleDelete}>Confirmar</button>
        <button className= 'button-cancelar'onClick={handleCancelar}> Cancelar</button>
      </div> 
    </div>
  )
  }
  
  export default Modal;