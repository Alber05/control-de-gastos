import { useState, useEffect, useContext } from 'react'
import { ApiContext } from '../context/ApiContext'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const ControlPresupuesto = () => {
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, setProcentaje] = useState(0)
  const { expenses, setExpenses, budget, setBudget, setValidBudget } =
    useContext(ApiContext)

  const formatearCantidad = (amount) => {
    return amount.toLocaleString('es', {
      style: 'currency',
      currency: 'EUR'
    })
  }

  const handleRestApp = () => {
    const resultado = confirm('¿Deseas reiniciar presupuesto y gsatos?')

    if (resultado) {
      setExpenses([])
      setBudget(0)
      setValidBudget(false)
    } else {
      return
    }
  }

  useEffect(() => {
    const totalGastado = expenses.reduce(
      (ac, expense) => ac + Number(expense.cantidad),
      0
    )

    const totalDisponible = budget - totalGastado

    const nuevoPorcentaje = (totalGastado / budget) * 100

    setGastado(totalGastado)
    setDisponible(totalDisponible)

    setTimeout(() => {
      setProcentaje(nuevoPorcentaje)
    }, 200)
  }, [expenses])

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? 'red' : '#3b82f6',
            trailColor: '#F5F5F5',
            textColor: porcentaje > 100 ? 'red' : '#3b82f6'
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleRestApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(budget)}
        </p>
        <p className={`${disponible < 0 ? 'negativo' : ''} `}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}
