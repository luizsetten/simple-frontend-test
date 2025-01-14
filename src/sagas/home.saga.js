import { put } from 'redux-saga/effects';
import { routeWatcher } from './routes.saga';
import asyncFlow from './asyncHandler';
import { types as routes } from '../reducers/routes.actions';
import { actions } from '../reducers/home.actions';
import { request } from '../utils/api';

function* homeRouteWatcher() {
  yield routeWatcher(routes.HOME, function* () {
    yield put(actions.loadUsers.request());
  });
}

const loadUsers = asyncFlow({
  actionGenerator: actions.loadUsers,
  api: () => request({
    url: 'person',
    method: 'get',
  }),
  * postSuccess({ response }) {
    console.log({ users: response.data });
  },
});

export const sagas = [homeRouteWatcher(), loadUsers.watcher()];
