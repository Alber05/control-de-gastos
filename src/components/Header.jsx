import { ApiContext } from '../context/ApiContext'
import { useContext } from 'react'
import { NuevoPresupuesto } from './NuevoPresupuesto'
import { ControlPresupuesto } from './ControlPresupuesto'

export const Header = () => {
  const { validBudget } = useContext(ApiContext)

  return (
    <header>
      <h1>Planificador de gastos</h1>

      {validBudget ? <ControlPresupuesto /> : <NuevoPresupuesto />}
    </header>
  )
}
