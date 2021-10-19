import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Save } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button, CircularProgress, Container, Grid, Paper, Typography,
} from '@material-ui/core';
import { actions } from '../reducers/user.actions';
import { ControlledTextField, ZipCodeTextField } from '../components/inputs';
import { request } from '../utils/api';

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, data, id } = useSelector((state) => state.user);
  const rules = {};
  const initialValues = {
    nome: '',
    dataNascimento: '',
    cep: '',
    cidade: '',
    uf: '',
    ...data,
  };

  const {
    getValues, watch, setValue, ...rest
  } = useForm();

  const formProps = {
    ...rest,
    rules,
    initialValues,
  };

  const cep = watch('cep');

  const loadAddress = async (cepClean) => {
    try {
      const { data: requestData } = await request({
        url: `https://viacep.com.br/ws/${cepClean}/json/`,
        method: 'GET',
      });

      if (requestData.localidade) setValue('cidade', requestData.localidade);
      if (requestData.uf) setValue('uf', requestData.uf);

      if (requestData.erro) {
        return;
      }
    } catch {
      console.log('CEP inválido');
    }
  };

  useEffect(() => {
    const cleanCep = String(cep).replace('-', '');
    if (cleanCep.length === 8) {
      loadAddress(cleanCep);
    }
  }, [cep]);

  const handleSubmit = (values) => {
    dispatch(actions.saveUser.request(values));
  };

  if (loading) {
    return (
      <div>
        Carregando usuário
        {' '}
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Box my={4}>
        <Typography variant="h4" align="center" mx="4">
          Usuário #
          {id}
        </Typography>
      </Box>

      <Container component={Paper}>
        <form onSubmit={formProps.handleSubmit(handleSubmit)}>
          <Grid container spacing={2}>
            <Grid align="center" item xs={12} sm={3}>
              <ControlledTextField label="Nome" name="nome" formProps={formProps} />
            </Grid>
            <Grid align="center" item xs={12} sm={3}>
              <ControlledTextField
                label="CEP"
                name="cep"
                InputProps={{
                  inputComponent: ZipCodeTextField,
                }}
                formProps={formProps}
              />
            </Grid>
            <Grid align="center" item xs={12} sm={3}>
              <ControlledTextField
                label="Cidade"
                name="cidade"
                formProps={formProps}
              />
            </Grid>

            <Grid align="center" item xs={12} sm={1}>
              <ControlledTextField label="UF" name="uf" formProps={formProps} />
            </Grid>

            <Grid align="center" item xs={12} sm={1} style={{ margin: 'auto 0' }}>
              <Button type="submit" onClick={() => dispatch(actions.saveUser.request(getValues()))} className="save">
                <Save />
                Salvar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default UserPage;
