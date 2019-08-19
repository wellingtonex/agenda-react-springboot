import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
import { ValidatorForm } from 'react-material-ui-form-validator';
import Fab from '@material-ui/core/Fab';
import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined';

//import update from 'react-addons-update';
import FormularioCliente from './components/FormularioCliente';
import FormularioEndereco from './components/FormularioEndereco';
import FormularioTelefone from './components/FormularioTelefone';
import FormularioEmail from './components/FormularioEmail';

import MySnackbarContentWrapper from './components/MySnackbarContentWrapper'
import Snackbar from '@material-ui/core/Snackbar';
import { logout, userName, isAdm } from '../../services/auth';

import api from '../../services/api'

const styles = {
  conteudo: {
    marginTop: 50
  },
  grid: {
    marginLeft: 10
  },
  acoes: {
    marginRight: 15
  },
  btnSalvar: {
    marginTop: 30,
    marginBottom: 50
  },
  logout: {
    marginTop: 30,
    marginBottom: 50
  }
};

class CadastroClientes extends Component {


  constructor(props) {
    super(props);
    this.state = {
      id: null,
      nome: '',
      cpf: '',
      numero: '',
      version: '',
      tipo: 'CELULAR',
      telefones: [],
      email: '',
      emails: [],
      tiposTelefone: ['CELULAR', 'RESIDENCIAL', 'COMERCIAL'],
      endereco: {
        id: null, cep: '', logradouro: '', bairro: '', cidade: '', uf: '', complemento: '', version: null,
      },
      cidades: [],
      showMessage: false,
      message: ''
    }
  }

  componentDidMount() {
    this.buscarCliente();
  }

  buscarCliente = async () => {
    const id = this.props.match.params.id;
    if (id) {
      const response = await api.get(`/clientes/${id}`);
      const cliente = response.data;

      if (cliente) {
        const cidadesResponse = await api.get(`/cidades/${cliente.endereco.cidade.uf.sigla}`);
        this.setState({ cidades: cidadesResponse.data })
        this.carregarCliente(cliente);
      }
    }
  }

  carregarCliente = (cliente) => {
    this.setState({
      id: cliente.id, nome: cliente.nome, cpf: cliente.cpf, telefones: cliente.telefones, version: cliente.version,
      emails: cliente.emails, endereco: {
        version: cliente.endereco.version, id: cliente.endereco.id, cep: cliente.endereco.cep,
        logradouro: cliente.endereco.logradouro, bairro: cliente.endereco.bairro,
        cidade: cliente.endereco.cidade.id, uf: cliente.endereco.cidade.uf.sigla, complemento: cliente.endereco.complemento
      }
    })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ showMessage: false });
  }

  handleAddTelefone = () => {
    this.setState({ telefones: [...this.state.telefones, { numero: this.state.numero, tipo: this.state.tipo }] });
    this.setState({ numero: ' ' });
    this.setState({ tipo: 'CELULAR' });
  }

  handleAddEmail = () => {
    this.setState({ emails: [...this.state.emails, { email: this.state.email }] });
    this.setState({ email: ' ' });
  }

  handleDeleteTelefone = async (index, id) => {
    if (id) {
      await api.delete(`/telefones/${id}`);
    }
    this.setState({ telefones: this.state.telefones.filter((e, i) => i !== index) });
    this.exibirMensagemSucesso('Telefone excluido com sucesso.')
  }

  handleDeleteEmail = async (index, id) => {
    if (id) {
      await api.delete(`/emails/${id}`);
    }
    this.setState({ emails: this.state.emails.filter((e, i) => i !== index) })
    this.exibirMensagemSucesso('E-mail excluido com sucesso.')
  }

  exibirMensagemSucesso = mensagem => {
    this.setState({ message: mensagem, showMessage: true });
  }

  handleChangeUf = async e => {
    const uf = e.target.value;
    const response = await api.get(`/cidades/${uf}`);
    this.setState({ endereco: { ...this.state.endereco, uf: e.target.value } });
    this.setState({ cidades: response.data });
  }

  handleChangeCEP = async e => {
    const cep = e.target.value;
    this.setState({ endereco: { ...this.state.endereco, cep: cep } })
    let cepSemMascara = cep.replace(/-|_|/gi, '');

    if (cepSemMascara.length === 8) {
      const responseCep = await api.get(`/cep/${cepSemMascara}`);

      if (responseCep.data) {
        const responseCidades = await api.get(`/cidades/${responseCep.data.uf}`);
        this.setState({ cidades: responseCidades.data });
        const endereco = responseCep.data;
        this.setState({ endereco: { cidade: endereco.idCidade, ...endereco } });
      }
    }
  }

  handleLogout = () => {
    logout();
    this.props.history.push('/login');
  }

  handlerSubmit = async (e) => {
    e.preventDefault();
    const endereco = {
      id: this.state.endereco.id,
      cep: this.state.endereco.cep.replace(/\D/g, ''),
      logradouro: this.state.endereco.logradouro,
      complemento: this.state.endereco.complemento,
      bairro: this.state.endereco.bairro,
      cidade: {
        id: this.state.endereco.cidade,
        uf: {
          sigla: this.state.endereco.uf
        }
      },
      version: this.state.endereco.version
    }
    const cliente = {
      id: this.state.id,
      nome: this.state.nome,
      cpf: this.state.cpf.replace(/\D/g, ''),
      telefones: this.state.telefones.map(telefone => ({
        id: telefone.id, numero: telefone.numero.replace(/\D/g, ''), tipo: telefone.tipo, version: telefone.version
      })),
      emails: this.state.emails,
      endereco,
      version: this.state.version
    }

    if (this.state.id) {
      const response = await api.put(`/clientes/${this.state.id}`, cliente)
      this.exibirMensagemSucesso('Cliente alterado com sucesso.')
      this.carregarCliente(response.data);
    } else {
      const response = await api.post('/clientes', cliente);
      this.exibirMensagemSucesso('Cliente cadastrado com sucesso.')
      this.carregarCliente(response.data);
    }

  }


  render() {

    return (
      <Container maxWidth="lg">
        <CssBaseline />
        <Grid container>
          <Grid item xs={12} className={this.props.classes.logout} container direction="row" justify="flex-end" alignItems="flex-end" >
            <Fab size="large" variant="extended" aria-label="Logout" label="Logout" onClick={this.handleLogout}>
              <ExitToAppOutlined />
              {`${userName()} (Sair)`}
            </Fab>
          </Grid>
        </Grid>
        <ValidatorForm ref="form" onSubmit={this.handlerSubmit} autoComplete="off">

          <FormularioCliente
            nome={this.state.nome}
            cpf={this.state.cpf}
            onChangeNome={e => this.setState({ nome: e.target.value })}
            onChangeCPF={e => this.setState({ cpf: e.target.value })} />

          <FormularioEndereco
            cep={this.state.endereco.cep}
            handleChangeCEP={this.handleChangeCEP}
            logradouro={this.state.endereco.logradouro}
            handleLogradouro={e => this.setState({ endereco: { ...this.state.endereco, logradouro: e.target.value } })}
            bairro={this.state.endereco.bairro}
            handleBairro={e => this.setState({ endereco: { ...this.state.endereco, bairro: e.target.value } })}
            complemento={this.state.endereco.complemento}
            handleComplemento={e => this.setState({ endereco: { ...this.state.endereco, complemento: e.target.value } })}
            uf={this.state.endereco.uf}
            handleChangeUf={this.handleChangeUf}
            cidade={this.state.endereco.cidade}
            handleCidade={e => this.setState({ endereco: { ...this.state.endereco, cidade: e.target.value } })}
            cidades={this.state.cidades}
          />

          <FormularioTelefone
            numero={this.state.numero}
            handlenumero={e => this.setState({ numero: e.target.value })}
            tipo={this.state.tipo}
            handletipo={e => this.setState({ tipo: e.target.value })}
            handleAddTelefone={this.handleAddTelefone}
            telefones={this.state.telefones}
            handleDeleteTelefone={this.handleDeleteTelefone}
          />

          <FormularioEmail
            email={this.state.email}
            handleEmail={e => this.setState({ email: e.target.value })}
            handleAddEmail={this.handleAddEmail}
            emails={this.state.emails}
            handleDeleteEmail={this.handleDeleteEmail}
          />

          <Grid item xs={12} container direction="row" justify="space-between">
            <Link to="/clientes">
              <Button variant="contained" color="primary" className={this.props.classes.btnSalvar}>
                <ArrowBack />
                Voltar
              </Button>
            </Link>
            <Button disabled={!isAdm()} variant="contained" type="submit" color="primary" className={this.props.classes.btnSalvar}>
              <SaveIcon />
              Salvar
            </Button>
          </Grid>
        </ValidatorForm>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.showMessage}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message={this.state.message}
          />
        </Snackbar>
      </Container>
    )
  }
}

export default withStyles(styles)(CadastroClientes);