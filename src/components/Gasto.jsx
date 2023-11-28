import PropTypes from 'prop-types'
import { ApiContext } from '../context/ApiContext'
import { useContext } from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatDate } from '../helpers'
import IconoAhorro from '../assets/img/icono_ahorro.svg'
import IconoCasa from '../assets/img/icono_casa.svg'
import IconoComida from '../assets/img/icono_comida.svg'
import IconoGastos from '../assets/img/icono_gastos.svg'
import IconoOcio from '../assets/img/icono_ocio.svg'
import IconoSalud from '../assets/img/icono_salud.svg'
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones
}

const Gasto = ({ expense }) => {
  const { setExpenseToEdit, openModal, deleteExpense, expenseToEdit } =
    useContext(ApiContext)
  const { categoria, nombre, cantidad, fecha } = expense

  const handleEditExpense = () => {
    setExpenseToEdit(expense)
    openModal()
  }

  const handleDeleteExpense = (expense) => {
    if (expenseToEdit) {
      setExpenseToEdit(null)
    }

    deleteExpense(expense)
  }

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => handleEditExpense(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => handleDeleteExpense(expense)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            {<img src={diccionarioIconos[categoria]} alt='Icono gasto' />}
            <div className='descripcion-gasto'>
              <p className='categoria'>{categoria}</p>
              <p className='nombre-gasto'>{nombre}</p>
              <p className='fecha-gasto'>
                Agregado el: <span>{formatDate(fecha)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>€ {cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

Gasto.propTypes = {
  expense: PropTypes.object.isRequired,
  leadingActions: PropTypes.func
}

export default Gasto
