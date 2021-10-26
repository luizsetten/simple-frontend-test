import { request } from './api';

export const loadAddress = async (cepClean, setValue) => {
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
