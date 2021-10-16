const requiredValidation = (value) => {
  if (value !== undefined && value !== null && value !== '') return true;
  return 'Campo obrigatório';
};
const validDate = (value) => {
  try {
    if (value instanceof Date) return true;
    if (typeof value !== 'string') return false;
    if (value.length !== 10) return false;
    const [dia, mes, ano] = value.split('/');
    if (!dia || !mes || !ano) return false;
    const diaNumero = parseInt(dia, 10);
    const mesNumero = parseInt(mes, 10);
    const anoNumero = parseInt(ano, 10);
    const date = new Date(anoNumero, mesNumero - 1, diaNumero, 0, 0, 0);
    return (
      date.getFullYear() === anoNumero
      && date.getMonth() === mesNumero - 1
      && date.getDate() === diaNumero
    );
  } catch (e) {
    return false;
  }
};

const validators = {
  object: ({ required = false, custom = {} }) => ({
    validate: {
      required: (value) => !required
          || (value !== undefined && value !== null && value !== {})
          || 'Campo obrigatório',
      ...custom,
    },
  }),
  array: ({ required = false, custom = {} }) => ({
    validate: {
      required: (value) => !required
          || (value !== undefined && Array.isArray(value) && value.length > 0)
          || 'Campo obrigatório',
      ...custom,
    },
  }),
  string: ({
    required = false, minLength, length, custom = {},
  }) => ({
    validate: {
      required: (value) => !required || requiredValidation(value),
      minLength: (value) => !minLength
          || value.length >= minLength
          || `Tamanho mínimo (${minLength})`,
      length: (value) => !length || value.length === length || `Tamanho inválido (${length})`,
      ...custom,
    },
  }),
  email: ({ required = false, custom = {} }) => ({
    validate: {
      required: (value) => !required || requiredValidation(value),
      valid: (value) => (value
        ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value,
        ) || 'E-mail inválido'
        : true),
      ...custom,
    },
  }),
  phone: ({ required = false, custom = {} }) => ({
    validate: {
      required: (value) => !required || requiredValidation(value),
      valid: (value) => (value
        ? (value?.length > 13
                && value?.length <= 15
                && value?.slice(0, 2) !== '(0')
              || 'Telefone inválido'
        : true),
      ...custom,
    },
  }),
  date: ({ required = false, custom = {} }) => ({
    validate: {
      required: (value) => !required || requiredValidation(value),
      valid: (value) => !required || validDate(value) || 'Data inválida',
      ...custom,
    },
  }),
  number: ({ required = false, length, custom = {} }) => ({
    validate: {
      required: (value) => !required || requiredValidation(value),
      length: (value) => !length || value.length === length || `Tamanho inválido (${length})`,
      ...custom,
    },
  }),
};

export default validators;
