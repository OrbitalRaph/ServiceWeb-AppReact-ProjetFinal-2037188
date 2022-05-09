import React from 'react';
import { TableHead, TableContainer, Table, TableCell, TableRow, TableBody, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


class ListeAmoureux extends React.Component {

    render() {
        const ListeAmoureux = this.props.ListeAmoureux.map(amoureux => (
            <TableRow
                key={amoureux.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="left">
                    <IconButton sx={{color:'#ff1530'}} size="small" aria-label="delete" disabled={this.props.id_modification !== null ? true : false } onClick={() => this.props.deleteAmoureux(amoureux.id)}>
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                    <IconButton sx={{color:'#3050ff'}} size="small" aria-label="edit" disabled={this.props.id_modification !== null ? true : false } onClick={() => this.props.setIdModification(amoureux.id)}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                    {amoureux.prenom} {amoureux.nom}
                </TableCell>
                <TableCell align="right">{amoureux.sexe}</TableCell>
                <TableCell align="right">{amoureux.age}</TableCell>

            </TableRow>
        )
        )


        return (
        <Paper sx={{height:"100%"}}>
            <Typography variant="h5" color="textPrimary" align="center" pt={2} pb={1}>
                Liste des amoureux
            </Typography>
            <TableContainer sx={{ overflow: "auto" }}>
                <Table size='small' aria-label="Liste des amoureux">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">Nom</TableCell>
                            <TableCell align="right">Sexe</TableCell>
                            <TableCell align="right">Age</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ListeAmoureux}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
            
        );
    }
}

export default ListeAmoureux;