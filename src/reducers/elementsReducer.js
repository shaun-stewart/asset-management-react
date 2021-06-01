// import {
//   LOAD_ELEMENTS,
//   ADD_ELEMENT,
//   DELETE_ELEMENT,
//   BULK_ADD_ELEMENT
// } from '../actions';
//
//
// const initialState = [];
//
// const elementsReducer =  (state = initialState, { type, payload }) => {
//   switch (type) {
//     case LOAD_ELEMENTS: return payload;
//     case ADD_ELEMENT: return [...state, payload];
//     case BULK_ADD_ELEMENT: return [...state, ...payload];
//     case DELETE_ELEMENT: return state.filter((element) => element.id !== payload);
//     default: return state;
//   }
// }
//
//
//
//
//
// export default elementsReducer;
