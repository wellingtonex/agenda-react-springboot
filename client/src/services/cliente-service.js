import api from './api'

const CLIENTES_URI = '/clientes'

export default class ClienteService {

  excluir(idCliente) {

  }

  salvar(cliente) {
    return api.post(`/${CLIENTES_URI}`, cliente);
  }

  alterar(idCliente, cliente) {
    return api.put(`/${CLIENTES_URI}/${idCliente}`, cliente)
  }

  exluirTelefone(idTelefone) {
    return api.delete(`/telefones/${idTelefone}`);
  }

  exlcuirEmail(idEmail) {
    return api.delete(`/emails/${idEmail}`)
  }

  consultar(idCliente) {
    return api.get(`/${CLIENTES_URI}/${idCliente}`)
  }
}