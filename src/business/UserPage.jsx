import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Edit, DeleteOutline } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { actions } from '../reducers/user.actions';
import {
  actions as routeActions,
  types as routes,
} from '../reducers/routes.actions';
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
      console.log('Receber endereço');
    }
  }, [cep]);

  const handleSubmit = (values) => {
    dispatch(actions.saveUser.request(values));
  };

  if (loading) {
    return <div>Carregando usuário</div>;
  }

  return (
    <>
      <h2>
        Usuário #
        {id}
      </h2>

      <form onSubmit={formProps.handleSubmit(handleSubmit)}>
        <ControlledTextField label="Nome" name="nome" formProps={formProps} />
        <ControlledTextField
          label="CEP"
          name="cep"
          InputProps={{
            inputComponent: ZipCodeTextField,
          }}
          formProps={formProps}
        />
        <ControlledTextField
          label="Cidade"
          name="cidade"
          formProps={formProps}
        />
        <ControlledTextField label="UF" name="uf" formProps={formProps} />
        <Button type="submit">GRAVAR</Button>
      </form>
    </>
  );
};

export default UserPage;
