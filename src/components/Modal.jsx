import { useState, useEffect, useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import CerrarBtn from '../assets/img/cerrar.svg'
import { Mensaje } from './Mensaje'

const initialState = {
  nombre: '',
  cantidad: '',
  categoria: '',
  id: null
}

export const Modal = () => {
  const [expenseForm, setExpenseForm] = useState(initialState)
  const [mensaje, setMensaje] = useState('')

  const {
    animateModal,
    hideModal,
    saveExpense,
    editExpense,
    expenseToEdit,
    setExpenseToEdit
  } = useContext(ApiContext)

  useEffect(() => {
    console.log(expenseForm)
    if (expenseToEdit === null) {
      setExpenseForm(initialState)
    } else {
      setExpenseForm(expenseToEdit)
    }
  }, [expenseToEdit])

  const handleChange = (e) => {
    setExpenseForm({
      ...expenseForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { nombre, cantidad, categoria } = expenseForm

    if (!nombre || !cantidad || !categoria) {
      setMensaje('Todos los campos son necesarios')

      setTimeout(() => {
        setMensaje('')
      }, 2000)

      return
    }

    if (expenseForm.id === null) {
      saveExpense(expenseForm)
    } else {
      editExpense(expenseForm)
    }

    setExpenseToEdit(null)
    setExpenseForm(initialState)
    hideModal()
  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img
          src={CerrarBtn}
          alt='Icono para cerrar modal'
          onClick={hideModal}
        />
      </div>
      <form
        className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
        onSubmit={handleSubmit}
      >
        <legend>
          {expenseForm.id === null ? 'Nuevo Gasto' : 'Editar Gasto'}
        </legend>
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
        <div className='campo'>
          <label htmlFor='nombre'>Nombre Gasto</label>
          <input
            id='nombre'
            name='nombre'
            type='text'
            placeholder='Añade el nombre del gasto'
            value={expenseForm.nombre}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input
            id='cantidad'
            name='cantidad'
            type='number'
            placeholder='Añade la cantidad del gasto'
            value={expenseForm.cantidad}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Categoría</label>
          <select
            id='categoria'
            name='categoria'
            value={expenseForm.categoria}
            onChange={(e) => handleChange(e)}
          >
            <option value=''>-- Seleccione --</option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos Varios</option>
            <option value='ocio'>Ocio</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>

        <input
          type='submit'
          value={expenseForm.id === null ? 'Añadir Gasto' : 'Editar Gasto'}
        />
      </form>
    </div>
  )
}

Modal.propTypes = {}
