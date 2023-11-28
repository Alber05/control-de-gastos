import { useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import { useState } from 'react'
import { Mensaje } from './Mensaje'

export const NuevoPresupuesto = () => {
  const [mensaje, setMensaje] = useState('')

  const { budget, setBudget, setValidBudget } = useContext(ApiContext)

  const handleBudget = (e) => {
    e.preventDefault()

    if (!budget || budget < 0) {
      setMensaje('No es un presupuesto válido')
      return
    }

    setMensaje('')

    setMensaje('')
    setValidBudget(true)
  }

  return (
    <div className='contenedor-presupuesto sombra'>
      <form onSubmit={handleBudget} className='formulario'>
        <div className='campo'>
          <label htmlFor='nuevo-presupuesto'>Definir Presupuesto</label>
          <input
            id='nuevo-presupuesto'
            type='number'
            className='nuevo-presupuesto'
            placeholder='Añade tu Presupuesto'
            value={budget}
            pattern='[0-9]*'
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>
        <input type='submit' value='Añadir' />
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
      </form>
    </div>
  )
}
