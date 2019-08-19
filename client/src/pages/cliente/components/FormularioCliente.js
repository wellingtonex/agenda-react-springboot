import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { TextValidator } from 'react-material-ui-form-validator';
import InputMask from 'react-input-mask';
import { isAdm } from "../../../services/auth";

const styles = {
  conteudo: {
    marginTop: 50
  },
  grid: {
    marginLeft: 10
  },
  acoes: {
    marginRight: 15
  }
};

class FormularioCliente extends Component {


  constructor({ props, classes }) {
    super(props);
    this.classes = classes;

  }

  render() {

    return (
      <Paper className={this.classes.conteudo}>
        <Grid container spacing={5} className={this.classes.grid}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography component="h1" variant="h5">
              Cadastrar cliente
                </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextValidator
              name="nome"
              label="Nome:"
              id="nome"
              value={this.props.nome}
              onChange={this.props.onChangeNome}
              validators={['required']}
              errorMessages={['Nome é obrigatorio.']}
              disabled={!isAdm()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <InputMask
              mask="999.999.999-99"
              value={this.props.cpf}
              onChange={this.props.onChangeCPF}
              disabled={!isAdm()}
            >
              {() => <TextField
                id="cpf"
                label="CPF:"
                name="cpf"
                type="text"
                
              />}
            </InputMask>

          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(FormularioCliente);