import React from "react";
import { Grid, Stack, Box } from "@mui/material";

import FormAjoutAmoureux from "./FormAjoutAmoureux";
import FormModificationAmoureux from "./FormModificationAmoureux";
import ListeAmoureux from "./ListeAmoureux";
import LoveTester from "./LoveTester";
import LoveApi from "../Utils/LoveApi";
import LoveCalculatorApi from "../Utils/LoveCalculatorApi";
import ListeMatchs from "./ListeMatchs";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amoureux: [],
            matchs: [],
            pourcentage: -1,
            commentaire: "Testez la foudre entre deux personnes !",
            id_modification: null,
        }
        this.getAmoureux = this.getAmoureux.bind(this);
        this.deleteAmoureux = this.deleteAmoureux.bind(this);
        this.postAmoureux = this.postAmoureux.bind(this);
        this.testLove = this.testLove.bind(this);
        this.getMatchs = this.getMatchs.bind(this);
        this.deleteMatch = this.deleteMatch.bind(this);
        this.postMatch = this.postMatch.bind(this);
        this.putAmoureux = this.putAmoureux.bind(this);
        this.setPourcentage = this.setPourcentage.bind(this);
        this.setCommentaire = this.setCommentaire.bind(this);
        this.setIdModification = this.setIdModification.bind(this);
    }

    componentDidMount() {
        this.getAmoureux();
    }

    getAmoureux() {
        LoveApi.get('/lovers')
            .then((res) => {
                this.setState({
                    amoureux: res.data
                });
            });
    }

    deleteAmoureux(id) {
        LoveApi.delete(`/lovers/${id}`)
            .then((res) => {
                const amoureuxList = this.state.amoureux.filter(amoureux => amoureux.id !== id);
                this.setState({ amoureux: amoureuxList });
            });
    }

    postAmoureux(amoureux) {
        LoveApi.post('/lovers', {
            prenom: amoureux.prenom,
            nom: amoureux.nom,
            age: amoureux.age,
            sexe: amoureux.sexe,
        })
            .then((res) => {
                this.getAmoureux();
            });
    }

    testLove(lover1_name, lover2_name) {
        LoveCalculatorApi.get('/getPercentage', {
            params: {
                sname: lover1_name,
                fname: lover2_name
            }
        })
            .then((res) => {
                this.setState({
                    pourcentage: parseInt(res.data.percentage),
                    commentaire: res.data.result
                });
            });
    }

    getMatchs() {
        LoveApi.get('/match')
            .then((res) => {
                this.setState({
                    matchs: res.data
                });
            });
    }

    deleteMatch(id) {
        LoveApi.delete(`/match/${id}`)
            .then((res) => {
                this.getMatchs();
            });
    }

    postMatch(lover1_name, lover2_name) {
        LoveApi.post('/match', {
            lover1_name: lover1_name,
            lover2_name: lover2_name,
            pourcentage: this.state.pourcentage,
        })
            .then((res) => {
                this.getMatchs();
            });
    }

    putAmoureux(amoureux) {
        LoveApi.put(`/lovers`, {
            id: amoureux.id,
            prenom: amoureux.prenom,
            nom: amoureux.nom,
            age: amoureux.age,
            sexe: amoureux.sexe,
        })
            .then((res) => {
                this.getAmoureux();
            }
            );
    }

    setPourcentage(pourcentage) {
        this.setState({
            pourcentage: pourcentage
        });
    }

    setCommentaire(commentaire) {
        this.setState({
            commentaire: commentaire
        });
    }

    setIdModification(id) {
        this.setState({
            id_modification: id
        });
    }


    render() {
        var FormAmoureux = <FormAjoutAmoureux postAmoureux={this.postAmoureux} />;
        if (this.state.id_modification) 
            FormAmoureux = <FormModificationAmoureux putAmoureux={this.putAmoureux} ListeAmoureux={this.state.amoureux} id_modification={this.state.id_modification} setIdModification={this.setIdModification}/>

        return (
            <Box sx={{ p: 3 }}>
                <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="stretch">

                    {/* ZONE GESTION AMOUREUX */}
                    <Grid item xs={12} md={3}>
                        <Stack spacing={3} direction="column" sx={{ height: "100%" }}>
                            
                            {FormAmoureux}
                            <ListeAmoureux ListeAmoureux={this.state.amoureux} deleteAmoureux={this.deleteAmoureux} setIdModification={this.setIdModification} id_modification={this.state.id_modification}/>
                        </Stack>
                    </Grid>

                    {/* ZONE LOVE TESTER */}
                    <Grid item xs={12} md={6}>
                        <LoveTester ListeAmoureux={this.state.amoureux} testLove={this.testLove} postMatch={this.postMatch} pourcentage={this.state.pourcentage} commentaire={this.state.commentaire} setPourcentage={this.setPourcentage} setCommentaire={this.setCommentaire}/>
                    </Grid>

                    {/* ZONE GESTION DES MATCHS */}
                    <Grid item xs={12} md={3}>
                        <ListeMatchs ListeAmoureux={this.state.amoureux} matchs={this.state.matchs} getMatchs={this.getMatchs} deleteMatch={this.deleteMatch} setState={this.setState} />
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default Dashboard;