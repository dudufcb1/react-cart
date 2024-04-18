import {
  CLEAR_CART, // Se crea una acción para limpiar el carrito
  REMOVE_ITEM, // Se crea una acción para eliminar un item del carrito
  INCREASE_ITEM, // Se crea una acción para aumentar la cantidad de un item en el carrito
  DECREASE_ITEM, // Se crea una acción para disminuir la cantidad de un item en el carrito
  LOADING, // Se crea una acción para indicar si el carrito está cargando o no
  DISPLAY_ITEM, // Se crea una acción para mostrar los items en el carrito
} from './actions';

export const reducer = (state, action) => {
  // Si la acción es de limpiar el carrito
  if (action.type === CLEAR_CART) {
    return {
      ...state, // Se devuelve un nuevo objeto con el estado actual
      cart: new Map(), // Se crea un nuevo mapa vacío para el carrito
    };
  }
  // Si la acción es de eliminar un item
  if (action.type === REMOVE_ITEM) {
    const { id: idItem } = action.payload; // Se obtiene el id del item a eliminar Renombrando
    /* const { id } = action.payload; // Se obtiene el id del item a eliminar desestructurando */
    /* const { id } = action.payload.id; // NO SIRVE */
    /* const id = action.payload.id; si sirve*/

    const newCart = new Map(state.cart); // Se crea un nuevo mapa con el estado actual del carrito
    newCart.delete(idItem); // Se elimina el item del carrito
    return {
      ...state,
      cart: newCart, // Se devuelve el nuevo estado con el carrito actualizado
    };
  }
  // Si la acción es de aumentar la cantidad de un item
  if (action.type === INCREASE_ITEM) {
    const { id } = action.payload; // Se obtiene el id del item a aumentar
    const newCart = new Map(state.cart); // Se crea un nuevo mapa con el estado actual del carrito
    const currentItem = newCart.get(id); // Se obtiene el item del carrito

    if (currentItem) {
      newCart.set(
        id, // Se actualiza la cantidad del item en el carrito
        {
          ...currentItem,
          amount: currentItem.amount + 1,
        }
      );
    }

    return {
      ...state,
      cart: newCart, // Se devuelve el nuevo estado con el carrito actualizado
    };
  }
  // Si la acción es de disminuir la cantidad de un item
  if (action.type === DECREASE_ITEM) {
    const { id } = action.payload; // Se obtiene el id del item a disminuir
    const newCart = new Map(state.cart); // Se crea un nuevo mapa con el estado actual del carrito
    const currentItem = newCart.get(id); // Se obtiene el item del carrito

    if (currentItem && currentItem.amount > 1) {
      newCart.set(
        id, // Se actualiza la cantidad del item en el carrito
        {
          ...currentItem,
          amount: currentItem.amount - 1,
        }
      );
    } else {
      newCart.delete(id); // Se elimina el item del carrito
    }

    return {
      ...state,
      cart: newCart, // Se devuelve el nuevo estado con el carrito actualizado
    };
  }
  // Si la acción es de indicar si está cargando o no
  if (action.type === LOADING) {
    return {
      ...state,
      loading: true, // Se devuelve un nuevo estado con la propiedad loading en true
    };
  }
  // Si la acción es de mostrar los items en el carrito
  if (action.type === DISPLAY_ITEM) {
    const newCart = new Map( // Se crea un nuevo mapa con los nuevos items del carrito
      action.payload.cart.map((item) => {
        return [item.id, item];
      })
    );
    return {
      ...state,
      cart: newCart, // Se devuelve el nuevo estado con el carrito actualizado
      loading: false, // Se devuelve el estado con loading en false
    };
  }

  throw new Error(`No matching action type : ${action.type}`); // Se lanza un error con el tipo de acción
};
