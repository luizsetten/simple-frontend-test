import { all } from 'redux-saga/effects';
import { sagas as homeSagas } from './home.saga';
import { sagas as userSagas } from './user.saga';

const sagas = function* () {
  yield all([...homeSagas, ...userSagas]);
};

export default sagas;
