// Importación de los hooks y componentes necesarios desde React y PropTypes
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Importación del contexto necesario
import { ApiContext } from './ApiContext'

// Definición del componente ContextProvider que actuará como proveedor del contexto
const ContextProvider = ({ children }) => {
  // Definición de estados utilizando el hook useState
  const [budget, setBudget] = useState(
    JSON.parse(localStorage.getItem('storagedBudget')) ?? 0
  )
  const [validBudget, setValidBudget] = useState(false)
  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem('storagedExpenses')) ?? []
  )
  const [expenseToEdit, setExpenseToEdit] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredExpenses, setFilteredExpenses] = useState([])

  // Función para abrir el modal con una animación
  const openModal = () => {
    setModal(true)

    setTimeout(() => {
      setAnimateModal(true)
    }, 500)
  }

  // Función para cerrar el modal con una animación
  const hideModal = () => {
    setAnimateModal(false)

    setTimeout(() => {
      setExpenseToEdit(null)
      setModal(false)
    }, 500)
  }

  // Función para guardar un gasto en el estado de expenses
  const saveExpense = (expense) => {
    setExpenses([
      ...expenses,
      {
        ...expense,
        id: crypto.randomUUID(),
        fecha: Date.now()
      }
    ])
  }

  // Función para editar un gasto en el estado de expenses
  const editExpense = (editedExpense) => {
    const newExpenses = expenses.map((expense) =>
      expense.id === editedExpense.id ? editedExpense : expense
    )
    setExpenses(newExpenses)
  }

  // Función para eliminar un gasto en el estado de expenses
  const deleteExpense = (deletedExpense) => {
    const newExpenses = expenses.filter(
      (expense) => expense.id !== deletedExpense.id
    )
    setExpenses(newExpenses)
  }

  useEffect(() => {
    if (filter) {
      const filteredExp = expenses.filter(
        (expense) => expense.categoria === filter
      )
      setFilteredExpenses(filteredExp)
    }
  }, [filter])

  // Efecto secundario que se ejecuta cuando cambia el estado de expenses, actualizando el almacenamiento local
  useEffect(() => {
    localStorage.setItem('storagedExpenses', JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem('storagedBudget', JSON.stringify(budget))
  }, [budget])

  // Devolución del proveedor de contexto con los valores y funciones relevantes
  return (
    <ApiContext.Provider
      value={{
        budget,
        setBudget,
        validBudget,
        setValidBudget,
        modal,
        setModal,
        animateModal,
        setAnimateModal,
        expenses,
        setExpenses,
        expenseToEdit,
        setExpenseToEdit,
        openModal,
        hideModal,
        saveExpense,
        editExpense,
        deleteExpense,
        filter,
        setFilter,
        filteredExpenses,
        setFilteredExpenses
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}

// Especificación de los tipos de propiedades que el componente acepta
ContextProvider.propTypes = {
  children: PropTypes.node
}

// Exportación del componente ContextProvider como componente predeterminado
export default ContextProvider
