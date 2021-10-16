import { put, select } from 'redux-saga/effects';
import { routeWatcher } from './routes.saga';
import asyncFlow from './asyncHandler';
import {
  types as routes,
  actions as routeActions,
} from '../reducers/routes.actions';
import { actions } from '../reducers/user.actions';
import { request } from '../utils/api';
import usersMock from './users.mock';

function* userRouteWatcher() {
  yield routeWatcher(routes.USER, function* () {
    yield put(actions.loadUser.request());
  });
}

const loadUser = asyncFlow({
  actionGenerator: actions.loadUser,
  * transform() {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => request({
    url: `/usuario/${values.id}`,
    method: 'get',
    isMock: true,
    mockResult: usersMock.find((u) => u.id === values.id) ?? null,
  }),
  * postSuccess({ response }) {
    console.log({ user: response.data });
  },
});

const deleteUser = asyncFlow({
  actionGenerator: actions.deleteUser,
  * transform(payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: ({ id, ...values }) => request({
    url: `/usuario/${id}`,
    method: 'delete',
    body: values,
    isMock: true,
    mockResult: {},
  }),
  * postSuccess() {
    yield put(routeActions.redirectTo(routes.HOME));
  },
});

const saveUser = asyncFlow({
  actionGenerator: actions.saveUser,
  * transform(payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: ({ id, ...values }) => request({
    url: `/usuario/${id}`,
    method: 'put',
    body: values,
    isMock: true,
    mockResult: {},
  }),
  * postSuccess() {
    yield put(routeActions.redirectTo(routes.HOME));
  },
});

export const sagas = [
  userRouteWatcher(),
  loadUser.watcher(),
  saveUser.watcher(),
  deleteUser.watcher(),
];
