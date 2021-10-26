import React, { useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardDatePicker } from '@material-ui/pickers';

import { actions } from '../reducers/user.actions';
import { ControlledTextField, ZipCodeTextField } from '../components/inputs';
import { loadAddress } from '../utils/loadAddress';

const UserPage = () => {
  const dispatch = useDispatch();

  const { loading, data, id } = useSelector((state) => state.user);
  const rules = {
    dataNascimento: {
      required: true,
    },
    nome: {
      required: true,
    },
    cidade: {
      required: true,
    },
    uf: {
      required: true,
    },
    cep: {
      required: true,
    },
  };
  const initialValues = {
    nome: '',
    dataNascimento: new Date(),
    cep: '',
    cidade: '',
    uf: '',
    ...data,
  };

  const {
    getValues, watch, setValue, handleSubmit, ...rest
  } = useForm();

  const formProps = {
    ...rest,
    rules,
    initialValues,
  };

  const cep = watch('cep');

  useEffect(() => {
    const cleanCep = String(cep).replace('-', '');
    if (cleanCep.length === 8) {
      loadAddress(cleanCep, setValue);
    }
  }, [cep]);

  const onSubmit = (values) => {
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

  const onError = (e) => {
    console.log('Error', e);
  };

  return (
    <>
      <Box my={4}>
        <Typography variant="h4" align="center" mx="4">
          {id === -1 ? 'Novo usuário' : `Usuário #${id}`}
        </Typography>
      </Box>

      <Container component={Paper}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid align="center" item xs={12} sm={3} md={2}>
              <ControlledTextField label="Nome" name="nome" formProps={formProps} fullWidth />
            </Grid>
            <Grid align="center" item xs={12} sm={3} md={2}>
              <ControlledTextField
                fullWidth
                label="CEP"
                name="cep"
                InputProps={{
                  inputComponent: ZipCodeTextField,
                }}
                formProps={formProps}
              />
            </Grid>
            <Grid align="center" item xs={12} sm={3} md={2}>
              <ControlledTextField
                label="Cidade"
                name="cidade"
                formProps={formProps}
                fullWidth
              />
            </Grid>

            <Grid align="center" item xs={12} sm={2} md={1}>
              <ControlledTextField label="UF" name="uf" formProps={formProps} fullWidth />
            </Grid>

            <Grid align="center" item xs={12} sm={3} md={2}>
              <Controller
                name="dataNascimento"
                defaultValue={formProps.initialValues.dataNascimento}
                control={formProps.control}
                rules={rules.dataNascimento}
                render={({ onChange, value }) => (
                  <KeyboardDatePicker
                    clearable
                    onChange={onChange}
                    value={value}
                    variant="inline"
                    label="Data Nascimento"
                    placeholder="Selecione a data"
                    maxDate={new Date()}
                    fullWidth
                    format="dd/MM/yyyy"
                    error={formProps.errors.dataNascimento}
                  />
                )}
              />
            </Grid>

            <Grid align="center" item xs={12} sm={2} style={{ margin: 'auto 0' }}>
              <Button type="submit" className="save">
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
