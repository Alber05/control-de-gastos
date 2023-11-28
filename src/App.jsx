import { useContext, useEffect } from 'react'
import { ApiContext } from './context/ApiContext'
import { Header } from './components/Header'
import { Modal } from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import IconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import Filtros from './components/Filtros'

function App() {
  const { modal, budget, validBudget, setValidBudget, openModal } =
    useContext(ApiContext)

  useEffect(() => {
    if (budget > 0) {
      setValidBudget(true)
    }
  }, [])

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header />
      {validBudget && (
        <>
          <main>
            <Filtros />
            <ListadoGastos />
          </main>
          <div className='nuevo-gasto'>
            <img
              src={IconoNuevoGasto}
              alt='Icono para añadir gasto'
              onClick={openModal}
            />
          </div>
        </>
      )}
      {modal && <Modal />}
    </div>
  )
}

export default App
