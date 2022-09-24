import parsedAccountData from './readAccountData';

function formataCPF(cpf){
  cpf = cpf.replace(/[^\d]/g, "");

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export const searchAccountByCpf = (cpf) => {
  const parsedCpf = formataCPF(cpf)
  console.log(parsedCpf)
}
