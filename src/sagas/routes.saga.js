import { select, spawn, takeEvery } from 'redux-saga/effects';

export function* routeWatcher(route, worker) {
  const initialRoute = yield select((state) => state.location.type);
  if (initialRoute === route) {
    yield spawn(worker);
  }
  yield takeEvery(route, worker);
}
