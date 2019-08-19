import React, { Component } from 'react';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Paper } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
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

class FormularioTelefone extends Component {


  constructor({ props, classes }) {
    super(props);
    this.classes = classes;
    this.state = {
      tiposTelefone: ['CELULAR', 'RESIDENCIAL', 'COMERCIAL']
    }
  }

  render() {

    return (
      <Paper className={this.classes.conteudo}>
        <Grid container spacing={5} className={this.classes.grid}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography component="h1" variant="h5">Telefones</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <InputMask
              mask="(99) 99999-9999"
              value={this.props.numero}
              onChange={this.props.handlenumero}
            >
              {() => <TextField
                id="numero"
                type="phone"
              />}
            </InputMask>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Select
              value={this.props.tipo}
              onChange={this.props.handletipo}
              inputProps={{
                id: 'tipo'
              }}
            >
              {this.state.tiposTelefone.map(tipo => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
            </Select>

          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Fab disabled={!isAdm()} size="small" color="primary" aria-label="add" onClick={this.props.handleAddTelefone}>
              <AddIcon />
            </Fab>
          </Grid>


        </Grid>
        <Table className={this.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.telefones.map((telefone, index) => (
              <TableRow key={index}>
                <TableCell align="center" component="th" scope="row">
                  {telefone.numero}
                </TableCell>
                <TableCell align="center">
                  {telefone.tipo}
                </TableCell>
                <TableCell align="center">
                  <Fab disabled={!isAdm()} size="small" color="secondary"
                    aria-label="Excluir" className={this.classes.acoes}
                    onClick={e => this.props.handleDeleteTelefone(index, telefone.id)}>
                    <DeleteIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(FormularioTelefone);