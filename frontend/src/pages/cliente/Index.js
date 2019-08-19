import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined';

import api from "../../services/api";
import { logout, userName, isAdm } from '../../services/auth';

import MySnackbarContentWrapper from './components/MySnackbarContentWrapper'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  acoes: {
    marginRight: 15
  },
  botaoAdd: {
    marginTop: 30,
    marginBottom: 50
  },
  logout: {
    marginTop: 30,
    marginBottom: 50
  }
}));

export default function Clientes(props) {

  const [clientes, setClientes] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {


    async function carregarClientes() {
      const response = await api.get('/clientes');
      setClientes(response.data);
    }
    carregarClientes()
  }, [])

  const classes = useStyles();

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setShowMessage(false);
  }


  function handleLogout() {
    logout();
    props.history.push('/login');
  }

  async function handleDelete(idCliente) {
    api.delete(`/clientes/${idCliente}`);
    setClientes(clientes.filter(cliente => cliente.id !== idCliente));
    setShowMessage(true);
    setMessage('Cliente excluido com sucesso.')
  }

  function handleCadastraNovo(e) {
    props.history.push('/clientes/add');
  }

  function handleEditar(id) {
    props.history.push(`/clientes/add/${id}`);
  }

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} className={classes.logout} container direction="row" justify="flex-end" alignItems="flex-end" >
          <Fab size="large" variant="extended" aria-label="Logout" label="Logout" onClick={handleLogout}>
            <ExitToAppOutlined />
            {`${userName()} (Sair)`}
          </Fab>
        </Grid>
      </Grid>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left" >Nome</TableCell>
              <TableCell align="center">CPF</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map(cliente => (
              <TableRow key={cliente.id}>
                <TableCell align="left">{cliente.nome}</TableCell>
                <TableCell align="center">{cliente.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4")}</TableCell>
                <TableCell align="center">

                  <Fab size="small" color="primary" aria-label="Editar" className={classes.acoes} onClick={e => handleEditar(cliente.id)}>
                    <EditIcon />
                  </Fab>

                  <Fab disabled={!isAdm()} size="small" color="secondary" aria-label="Excluir" className={classes.acoes} onClick={e => handleDelete(cliente.id)}>
                    <DeleteIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>



        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={showMessage}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant="success"
            message={message}
          />
        </Snackbar>
      </Paper>
      <Grid container>
        <Grid item xs={12} container direction="row" justify="flex-end" alignItems="flex-end" >
          <Button disabled={!isAdm()} variant="contained" color="primary" className={classes.botaoAdd} onClick={handleCadastraNovo}>
            <AddIcon />
            Novo
            </Button>
        </Grid>
      </Grid>
    </Container>
  );
}