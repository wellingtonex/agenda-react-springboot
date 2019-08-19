import api from './api'

export default class LocalidadeService {

  listarUfs() {
    return api.get(`/ufs`);
  }

  listarCidadesPorUf(uf) {
    return api.get(`/cidades/${uf}`);
  }
}


