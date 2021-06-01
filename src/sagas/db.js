// import { all, fork, takeEvery } from '@redux-saga/core/effects'
// import { PUT_IN_TABLE, BULK_PUT_IN_TABLE, DELETE_FROM_TABLE, QUERY_TABLE } from '../actions'
// import db from '../db'
//
//
// // export function loadElements() {
// //   return (dispatch) => {
// //     db.table('elements')
// //       .toArray()
// //       .then((elements) => {
// //         dispatch({
// //           type: LOAD_ELEMENTS,
// //           payload: elements
// //         })
// //       })
// //   }
// // };
//
//
//
//
//
// export function* watchPutInTable() {
//   yield takeEvery(PUT_IN_TABLE, putInTable)
// }
//
// export function* watchBulkPutInTable() {
//   yield takeEvery(BULK_PUT_IN_TABLE, bulkPutInTable)
// }
//
// export function* watchDeleteFromTable() {
//   yield takeEvery(DELETE_FROM_TABLE, deleteFromTable)
// }
//
// export function* watchQueryTable() {
//   yield takeEvery(QUERY_TABLE, queryTable)
// }
//
//
// export default function*() {
//   yield all([
//     fork(watchPutInTable),
//     fork(watchBulkPutInTable),
//     fork(watchDeleteFromTable),
//     fork(watchQueryTable)
//   ])
// }