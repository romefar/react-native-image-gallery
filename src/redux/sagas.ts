import { put, call, takeLatest } from 'redux-saga/effects'
import fetch from '../utils/fetch'
import { getType } from 'typesafe-actions'
import { imageActions } from './images.actions'
import { ImageInfo } from '../types/images.type'

export const delay = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, ms))

export function* sagaWatcher() {
  yield takeLatest(getType(imageActions.fetch.request), fetchImages)
  yield takeLatest(getType(imageActions.clear.request), clearImages)
}

function* fetchImages(): Generator<unknown> {
  try {
    const response = yield call(
      fetch,
      'https://my-json-server.typicode.com/romefar/json_server_test/items'
    )
    const fetchedImages: ImageInfo[] = response as ImageInfo[]
    yield put(imageActions.fetch.success(fetchedImages))
  } catch (error) {
    yield put(imageActions.fetch.failure(error))
  }
}

function* clearImages(): Generator<unknown> {
  try {
    yield call(delay, 2000)
    yield put(imageActions.clear.success())
  } catch (error) {
    yield put(imageActions.clear.failure(error))
  }
}
