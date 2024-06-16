import {all, put, takeEvery } from 'redux-saga/effects'
import { INFODATAFETCH, dataSuccess } from './actions'

function* fetchHandler(action) {
    // console.log(action);
    yield put(dataSuccess(action.payload))
}

function* watchFetchHandler() {
    yield takeEvery(INFODATAFETCH, fetchHandler)
}

export default function* rootSaga() {
    yield all([watchFetchHandler()])
}