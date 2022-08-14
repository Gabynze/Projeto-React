import './ContactsCard.css'
import { BsFillPersonFill } from "react-icons/bs"


function ContactsCard ({ nome, sobrenome, telefone, email }) {

  return(
    <section className='card-contatos'>
      <div className='card-icons'>
        <BsFillPersonFill className='icono'/>
      </div>
      <div className='card-info' >
        <div>
          <ul className='card-list'>
            <li><span>Nome:</span> {nome} </li>
            <li><span>Sobrenome:</span> {sobrenome} </li>
            <li><span>Telefone:</span> {telefone} </li>
            <li><span>Email:</span> {email} </li>
          </ul>
        </div>
        <div className='card-button'>
          <button 
            className='btn btn-danger'
            >
            <i className='fa fa-trash'/>
          </button>
          <button 
            className='btn btn-primary'
            >
            <i className='fa fa-pen'/>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ContactsCard;