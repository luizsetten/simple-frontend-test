import { call, put, takeEvery } from 'redux-saga/effects';
import { handleApiErrors } from '../utils/api';

export const apiWrapper = (apiPromise) => apiPromise.then(handleApiErrors).catch((error) => {
  throw error;
});

export const genericErrorHandler = ({ error }) => {
  console.log({ error });
};

const asyncFlow = ({
  actionGenerator,
  transform = (p) => p,
  api,
  preSuccess = () => {},
  postSuccess = () => {},
  preFailure = () => {},
  postFailure = genericErrorHandler,
}) => ({
  * handler(action) {
    let values; let
      response;
    try {
      values = yield transform(action.payload);
      response = yield call(apiWrapper, api(values));
      yield preSuccess({
        original: action.payload,
        values,
        response,
      });
      yield put(
        actionGenerator.success({
          original: action.payload,
          values,
          response,
        }),
      );
      yield postSuccess({
        original: action.payload,
        values,
        response,
      });
    } catch (error) {
      const abort = yield preFailure({
        original: action.payload,
        values,
        response,
        error,
      });
      if (abort === true) return;
      yield put(
        actionGenerator.failure({
          original: action.payload,
          values,
          response,
          error,
        }),
      );
      yield postFailure({
        original: action.payload,
        values,
        response,
        error,
      });
    }
  },
  * watcher() {
    yield takeEvery(actionGenerator.REQUEST, this.handler);
  },
});

export default asyncFlow;
