import React from "react";
import { TextField, Paper, Typography, Stack, Button, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

class FormModificationAmoureux extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            prenom: this.props.ListeAmoureux.find(amoureux => amoureux.id === this.props.id_modification).prenom,
            nom: this.props.ListeAmoureux.find(amoureux => amoureux.id === this.props.id_modification).nom,
            sexe: this.props.ListeAmoureux.find(amoureux => amoureux.id === this.props.id_modification).sexe,
            age: this.props.ListeAmoureux.find(amoureux => amoureux.id === this.props.id_modification).age,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const id = event.target.id;
        const value = event.target.value;
    
        this.setState({
            [id]: value
        });
    }

    handleSubmit(event) {
        console.log(this.props.id_modification + " " + this.state.prenom + " " + this.state.nom + " " + this.state.age + " " + this.state.sexe);
        const amoureux = {
            id: this.props.id_modification,
            prenom: this.state.prenom,
            nom: this.state.nom,
            sexe: this.state.sexe,
            age: this.state.age,
        };
        this.props.putAmoureux(amoureux);
        event.preventDefault();
        this.props.setIdModification(null);
    }
    
    render() {
        return (
            <Paper>
                
                <Typography variant="h5" color="textPrimary" align="center" pt={2} pb={1}>
                    <IconButton aria-label="back" onClick={() => this.props.setIdModification(null)}>
                            <ArrowBackIcon />
                    </IconButton>
                     Modification d'amoureux
                </Typography>
                <Stack spacing={2} direction="column" alignItems="space-around" pb={1} pr={3} pl={3}>
                    <Stack spacing={2} direction="row" justifyContent="space-around" alignItems="center">
                        <TextField id="prenom" label="prenom" variant="standard" value={this.state.prenom} onChange={this.handleChange} inputProps={{ maxLength: 50 }}/>
                        <TextField id="nom" label="nom" variant="standard" value={this.state.nom} onChange={this.handleChange} inputProps={{ maxLength: 50 }}/>
                    </Stack>
                    <Stack spacing={2} direction="row" justifyContent="space-around" alignItems="center">
                        <TextField id="sexe" label="sexe" variant="standard" value={this.state.sexe} onChange={this.handleChange} inputProps={{ maxLength: 50 }}/>
                        <TextField id="age" type="number" label="age" variant="standard" value={this.state.age} onChange={this.handleChange}/>
                    </Stack>
                    <Button variant="text" size='small'  onClick={this.handleSubmit} disabled={this.state.prenom && this.state.nom && this.state.age && this.state.sexe ? false : true}>Modifier l'amoureux</Button>
                </Stack>
            </Paper>
        );
    }
}

export default FormModificationAmoureux;