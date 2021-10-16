const status = ['REQUEST', 'SUCCESS', 'FAILURE'];

export const createAsyncAction = (name, payloadCreator = (p) => p) => {
  const actionMethods = {};

  status.forEach((s) => {
    const a = `${name}_${s}`;
    const subAction = (payload) => ({
      type: a,
      payload: payloadCreator(payload),
    });

    actionMethods[s] = a;
    actionMethods[s.toLowerCase()] = subAction;

    return subAction;
  });

  return actionMethods;
};

export const createSyncAction = (type, payload, other = {}) => ({
  type,
  payload,
  ...other,
});
