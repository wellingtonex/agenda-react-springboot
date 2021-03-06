import React, { Component } from 'react';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Paper } from '@material-ui/core';
import api from '../../../services/api'
import InputMask from 'react-input-mask';
import { TextValidator } from 'react-material-ui-form-validator';
import { isAdm } from "../../../services/auth";

export default class FormularioEndereco extends Component {

  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      ufs: []
    }
  }

  componentDidMount() {
    this.carregarUfs();
  }

  carregarUfs = async () => {
    const response = await api.get('/ufs');
    this.setState({ ufs: response.data });
  }

  render() {

    return (
      <Paper className={this.classes.conteudo}>
        <Grid container spacing={5} className={this.classes.grid}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography component="h1" variant="h5">Endereço</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <InputMask
              mask="99999-999"
              value={this.props.state.endereco.cep}
              onChange={this.props.handleChangeCEP}
              disabled={!isAdm()}
            >
              {() => <TextField
                id="cep"
                label="CEP:"
                name="cep"
                type="text"
              />}
            </InputMask>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextValidator
              name="logradouro"
              label="Logradouro:"
              id="logradouro"
              value={this.props.state.endereco.logradouro}
              onChange={this.props.handleLogradouro}
              validators={['required']}
              errorMessages={['Logradouro é obrigatório.']}
              disabled={!isAdm()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextValidator
              name="bairro"
              label="Bairro:"
              id="bairro"
              value={this.props.state.endereco.bairro}
              onChange={this.props.handleBairro}
              validators={['required']}
              errorMessages={['Bairro é obrigatório.']}
              disabled={!isAdm()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              name="complemento"
              label="Complemento:"
              id="complemento"
              value={this.props.state.endereco.complemento}
              onChange={this.props.handleComplemento}
              disabled={!isAdm()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Select
              value={this.props.state.endereco.uf}
              onChange={this.props.handleChangeUf}
              displayEmpty
              disabled={!isAdm()}
              inputProps={{
                id: 'ufs',
                name: 'ufs'
              }}
            >
              <MenuItem value="" selected>Uf</MenuItem>)
                  {this.state.ufs.map(uf => <MenuItem key={uf.sigla} value={uf.sigla}>{uf.sigla}</MenuItem>)}
            </Select>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Select
              value={this.props.state.endereco.cidade}
              onChange={this.props.handleCidade}
              displayEmpty
              disabled={!isAdm()}
              inputProps={{
                id: 'cidades',
                name: 'cidades'
              }}
            >
              <MenuItem value="" selected>Cidade</MenuItem>)
                  {this.props.state.cidades.map(cidade => <MenuItem key={cidade.id} value={cidade.id}>{cidade.nome}</MenuItem>)}
            </Select>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}