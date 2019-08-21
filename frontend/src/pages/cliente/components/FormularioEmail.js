import React, { Component } from 'react';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
import { TextValidator } from 'react-material-ui-form-validator';
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

class FormularioEmail extends Component {

  constructor(props) {
    super(props);
    this.classes =  props.classes;
  }

  render() {

    return (
      <Paper className={this.classes.conteudo}>
        <Grid container spacing={5} className={this.classes.grid}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography component="h1" variant="h5">E-mails</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextValidator
              name="email"
              label="E-mail:"
              id="email"
              value={this.props.state.email}
              onChange={this.props.handleEmail}
            />

          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Fab disabled={!isAdm()} size="small" color="primary" aria-label="add" onClick={this.props.handleAddEmail}>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>

        <Table className={this.classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.state.emails.map((email, index) => (
              <TableRow key={index}>
                <TableCell align="center" component="th" scope="row">
                  {email.email}
                </TableCell>
                <TableCell align="center">
                  <Fab disabled={!isAdm()} size="small" color="secondary" aria-label="Excluir" className={this.classes.acoes} onClick={e => this.props.handleDeleteEmail(index, email.id)}>
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

export default withStyles(styles)(FormularioEmail);