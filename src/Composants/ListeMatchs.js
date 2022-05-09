import React from "react";
import { TableHead, TableContainer, Table, TableCell, TableRow, TableBody, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

class ListeMatch extends React.Component {

    componentDidMount() {
        this.props.getMatchs();
    }

    render() {
        const ListeMatchs = this.props.matchs.map((match) => (
            <TableRow key={match.id}>
                <TableCell align="left" component="th" scope="row">
                    {match.lover1_name}
                </TableCell>
                <TableCell align="left">
                    {match.lover2_name}
                </TableCell>
                <TableCell align="right">{match.pourcentage}%</TableCell>
                <TableCell align="right">
                    <IconButton sx={{color:'#ff1530'}} size="small" aria-label="delete" onClick={() => this.props.deleteMatch(match.id)}>
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                </TableCell>
            </TableRow>
        ))
        return (
            <Paper  sx={{height:"100%"}}>
                <Typography variant="h5" color="textPrimary" align="center" pt={2} pb={1}>
                    Liste des matchs sauvegardés
                </Typography>
                <TableContainer sx={{ overflow: "auto" }}>
                    <Table aria-label="Liste des matchs">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">1ère pers.</TableCell>
                                <TableCell align="left">2ème pers.</TableCell>
                                <TableCell align="right">Pourcentage</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ListeMatchs}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        );
    }
}

export default ListeMatch;