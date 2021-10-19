import React, { useMemo } from 'react';
import { differenceInYears } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, DeleteOutline } from '@material-ui/icons';
import {
  Table,
  TableHead,
  TableBody,
  CircularProgress,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Box,
} from '@material-ui/core';

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
    return (
      <div>
        Carregando usuários
        {' '}
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Box my={4}>
        <Typography variant="h4" align="center">Usuários</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Cidade/UF</TableCell>
              <TableCell>Idade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orderedData.map((u) => {
              const age = differenceInYears(new Date(), u.dataNascimento);
              return (
                <TableRow key={u.id}>
                  <TableCell>{u.nome}</TableCell>
                  <TableCell>
                    {u.cidade}
                    /
                    {u.uf}
                  </TableCell>
                  <TableCell>
                    {age}
                    {' '}
                    ano
                    {age > 1 ? 's' : ''}
                  </TableCell>
                  <TableCell>
                    <Edit
                      onClick={() => dispatch(
                        routeActions.redirectTo(routes.USER, { id: u.id }),
                      )}
                      className="edit"
                    />
                    <DeleteOutline onClick={() => dispatch(actions.deleteUser.request(u))} className="delete" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HomePage;
