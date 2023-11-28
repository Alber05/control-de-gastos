import { ApiContext } from '../context/ApiContext'
import { useContext } from 'react'
import Gasto from './Gasto'

const ListadoGastos = () => {
  const { expenses, filter, filteredExpenses } = useContext(ApiContext)
  return (
    <div className='listado-gastos contenedor'>
      {filter ? (
        <>
          <h2>{filteredExpenses.length ? 'Gastos' : 'No hay gastos'}</h2>
          {filteredExpenses.map((expense) => (
            <Gasto key={expense.id} expense={expense} />
          ))}
        </>
      ) : (
        <>
          <h2>{expenses.length ? 'Gastos' : 'No hay gastos'}</h2>
          {expenses.map((expense) => (
            <Gasto key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  )
}

export default ListadoGastos
