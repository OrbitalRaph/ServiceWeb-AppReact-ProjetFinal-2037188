import React from 'react';
import { Typography, Stack, Button, LinearProgress, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

var lover_id1_local = '';
var lover_id2_local = '';

class LoveTester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lover_id1: '',
            lover_id2: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.HandleLoveTester = this.HandleLoveTester.bind(this);
        
    }
    

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'lover_id1') {
            lover_id1_local = value;
        } else if (name === 'lover_id2') {
            lover_id2_local = value;
        }

        this.setState({
            [name]: value
        });

        this.HandleLoveTester();
    }

    handleSubmit(event) {
        const lover1_name = this.props.ListeAmoureux.find(amoureux => amoureux.id === this.state.lover_id1).prenom + ' ' + this.props.ListeAmoureux.find(amoureux => amoureux.id === this.state.lover_id1).nom;
        const lover2_name = this.props.ListeAmoureux.find(amoureux => amoureux.id === this.state.lover_id2).prenom + ' ' + this.props.ListeAmoureux.find(amoureux => amoureux.id === this.state.lover_id2).nom;

        this.props.postMatch(lover1_name, lover2_name);
        event.preventDefault();
        this.clearInput();
    }

    clearInput() {
        lover_id1_local = '';
        lover_id2_local = '';
        this.setState({
            lover_id1: '',
            lover_id2: '',
        });
        this.HandleLoveTester();
    }

    HandleLoveTester() {
        if (lover_id1_local !== '' && lover_id2_local !== '') {
            const lover1_name = this.props.ListeAmoureux.find(amoureux => amoureux.id === lover_id1_local).prenom.slice(0, 5) + this.props.ListeAmoureux.find(amoureux => amoureux.id === lover_id1_local).nom.slice(0, 2);
            const lover2_name = this.props.ListeAmoureux.find(amoureux => amoureux.id === lover_id2_local).prenom.slice(0, 5) + this.props.ListeAmoureux.find(amoureux => amoureux.id === lover_id2_local).nom.slice(0, 2);
            this.props.testLove(lover1_name, lover2_name);
        } else if (lover_id1_local === '' || lover_id2_local === '') {
            this.props.setPourcentage(-1);
            this.props.setCommentaire("Veuillez sélectionner 2 personnes");
        }
    }

    render() {

        const ListeAmoureux = this.props.ListeAmoureux.map(amoureux => (
            <MenuItem key={amoureux.id} value={amoureux.id}>{amoureux.prenom} {amoureux.nom}</MenuItem>
        )
        )

        return (
            <Stack spacing={4} direction="column" justifyContent="space-around" alignItems="center">

                <Typography variant="h4" color="textPrimary" align="center">
                    Testeur d'amour
                </Typography>
                <Typography variant="h5" color="textPrimary" align="center" paragraph pb={3}>
                    {this.props.commentaire}
                </Typography>
                <div className='image' style={{filter: 'saturate('+this.props.pourcentage+'%)'}}>
                    <img src="./Heart.png" alt='coeur' />
                </div>

                <Stack spacing={1} direction="row" justifyContent="center" alignItems="center" sx={{ minWidth: "100%" }}>
                    <LinearProgress variant={(this.props.pourcentage >= 0) ? "determinate" : "indeterminate"} value={this.props.pourcentage} sx={{ minWidth: "50%" }} />
                    <Typography sx={{display:(this.props.pourcentage >= 0) ? "block" : "none"}} fontSize={"Large"}>{`${Math.round(this.props.pourcentage,)}%`}</Typography>
                </Stack>

                <Stack spacing={2} direction="row" justifyContent="space-around" alignItems="center" pt={1} pb={2}>
                    <Box sx={{minWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel id="lover_id1-label">1ère personne</InputLabel>
                            <Select
                                labelId="lover_id1-label"
                                id="lover_id1"
                                name='lover_id1'
                                label="1ere personne"
                                value={this.state.lover_id1}
                                onChange={this.handleChange}
                            >
                                <MenuItem selected value=''> <em>Aucune sélection</em> </MenuItem>
                                {ListeAmoureux}
                            </Select>
                        </FormControl>
                    </Box>
                    
                    <AddIcon fontSize='large' />

                    <Box sx={{minWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel id="lover_id2-label">2ème personne</InputLabel>
                            <Select
                                labelId="lover_id2-label"
                                id="lover_id2"
                                name='lover_id2'
                                label="2eme personne"
                                value={this.state.lover_id2}
                                onChange={this.handleChange}
                            >
                                <MenuItem selected value=''> <em>Aucune sélection</em> </MenuItem>
                                {ListeAmoureux}
                            </Select>
                        </FormControl>
                    </Box>
                    
                </Stack>

                <Button variant="contained" size='large' pb={2} onClick={this.handleSubmit} disabled={lover_id1_local && lover_id2_local ? false : true }>Enregistrer</Button>

            </Stack>
        );
    }
}

export default LoveTester;