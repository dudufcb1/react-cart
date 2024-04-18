//1.- AppContext, 2.- AppProvider, 3.- setGlobalContext
//Imports
import {
  CLEAR_CART,
  REMOVE_ITEM,
  INCREASE_ITEM,
  DECREASE_ITEM,
  LOADING,
  DISPLAY_ITEM,
} from './actions'; // Actions disponibles para el reducer
const url = 'https://www.course-api.com/react-useReducer-cart-project'; // URL para obtener los datos de la api
import { createContext, useContext, useReducer, useEffect } from 'react'; // Módulos de React para trabajar con el Context
import { reducer } from './reducer'; // Archivo con la lógica del reducer
import cartItems from './data'; // Datos de ejemplo para el contexto
import { getTotals } from './utils'; // Función para calcular totales
import { initialState } from './initialState';
//New context instance
const AppContext = createContext(); // Contexto que se va a usar en toda la aplicación

const newCartArray = cartItems.map((item) => {
  return [item.id, item];
}); // Convierte el array de datos en un array bidimensional, con el id como primer elemento

// Context data PROVIDER
export const AppProvider = ({ children }) => {
  // Componente que va a proveer el contexto a la aplicación
  const [state, dispatch] = useReducer(reducer, initialState); // useReducer es una función de React que permite trabajar con un reducer, y se utiliza para actualizar el estado del contexto
  const { totalAmount, totalCost } = getTotals(state.cart); // Calcula los totales de la compra, utilizando la función getTotals del archivo utils
  const clearCart = () => {
    dispatch({ type: CLEAR_CART }); // Función que se encarga de clear el carrito
  };
  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } }); // Función que se encarga de quitar un item del carrito
  };
  const increaseItem = (id) => {
    dispatch({ type: INCREASE_ITEM, payload: { id } }); // Función que se encarga de aumentar la cantidad de un item en el carrito
  };
  const decreaseItem = (id) => {
    dispatch({ type: DECREASE_ITEM, payload: { id } }); // Función que se encarga de disminuir la cantidad de un item en el carrito
  };

  // era para entender que en efecto el useeffect toma lugar cuando se renderiza main pues es ahi donde esta envuelta la logica.
  const fetchTask = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
    console.log(await response.json());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: LOADING });
        let response = await fetch(url); // Se realiza la petición a la api
        let cart = await response.json(); // Se obtiene la respuesta en formato JSON

        dispatch({ type: DISPLAY_ITEM, payload: { cart } }); // Se actualiza el estado del contexto con los datos obtenidos de la api
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); // Se llama la función para obtener los datos de la api
    fetchTask();
  }, []); // Dependencia vacía, para evitar que se llame en cada render

  return (
    <AppContext.Provider
      value={{
        ...state, // Se pasan todas las propiedades del estado al contexto
        clearCart,
        removeCartItem,
        increaseItem,
        decreaseItem,
        totalAmount,
        totalCost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//Create hook
export const useGlobalContext = () => {
  return useContext(AppContext); // Hook que se encarga de obtener el contexto actual
}; // Se utiliza en cualquier componente que quiera obtener el contexto
