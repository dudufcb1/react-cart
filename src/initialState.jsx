const newCartMap = new Map(); // Crea un nuevo mapa vacio, que se utilizará para el estado inicial del contexto
export const initialState = { loading: true, cart: newCartMap, sent: false }; // Estado inicial del contexto, con dos propiedades: loading (true si está cargando, false si ya está listo) y cart (objeto Map con los datos)
