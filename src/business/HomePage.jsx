import React, { useMemo } from 'react';
import { differenceInYears } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, DeleteOutline } from '@material-ui/icons';

import {
  actions as routeActions,
  types as routes,
} from '../reducers/routes.actions';
import { actions } from '../reducers/user.actions';

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.home);

  const orderedData = useMemo(() => data.sort((a, b) => {
    const today = new Date();
    return differenceInYears(today, b.dataNascimento) - differenceInYears(today, a.dataNascimento);
  }), [data]);

  if (loading) {
    return <div>Carregando usuários</div>;
  }

  return (
    <>
      <h2>Usuários</h2>
      <table>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Cidade/UF</td>
            <td>Idade</td>
            <td>Ações</td>
          </tr>
        </thead>

        <tbody>
          {orderedData.map((u) => {
            const age = differenceInYears(new Date(), u.dataNascimento);
            return (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>
                  {u.cidade}
                  /
                  {u.uf}
                </td>
                <td>
                  {age}
                  {' '}
                  ano
                  {age > 1 ? 's' : ''}
                </td>
                <td>
                  <Edit
                    onClick={() => dispatch(
                      routeActions.redirectTo(routes.USER, { id: u.id }),
                    )}
                  />
                  <DeleteOutline onClick={() => dispatch(actions.deleteUser.request(u))} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
