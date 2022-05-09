import React from "react";
import { TextField, Paper, Typography, Stack, Button } from "@mui/material";

class FormAjoutAmoureux extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            prenom: '',
            nom:'',
            sexe:'',
            age: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }

    handleChange(event) {
        const id = event.target.id;
        const value = event.target.value;
    
        this.setState({
            [id]: value
        });
    }

    handleSubmit(event) {
        const amoureux = {
            prenom: this.state.prenom,
            nom: this.state.nom,
            sexe: this.state.sexe,
            age: this.state.age,
        };
        this.props.postAmoureux(amoureux);
        event.preventDefault();
        this.clearInput();
    }

    clearInput() {
        this.setState({
            prenom: '',
            nom: '',
            sexe: '',
            age: '',
        });
    }
    
    render() {
        return (
            <Paper>
                <Typography variant="h5" color="textPrimary" align="center" pt={2} pb={1}>
                    Ajout d'amoureux
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
                    <Button variant="text" size='small'  onClick={this.handleSubmit} disabled={this.state.prenom && this.state.nom && this.state.age && this.state.sexe ? false : true}>Ajouter l'amoureux</Button>
                </Stack>
            </Paper>
        );
    }
}

export default FormAjoutAmoureux;