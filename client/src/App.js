import { Component, Fragment } from "react";
import { CssBaseline, Container, Grid, Card } from '@material-ui/core';

import Intro from "./intro/Intro";
import SkillsList from "./skills/SkillsList";
import BooksTable from "./books/BooksTable";
import ProjectsView from "./projects/ProjectsView";

const BASE_URL = "http://localhost:3000";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            introsLoaded: false,
            intros: [],
        };
    }

    componentDidMount() {
        this.fetchIntros();
    }

    fetchIntros() {
        fetch(BASE_URL + "/intros")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        introsLoaded: true,
                        intros: result
                    });
                },
                (error) => {
                    this.setState({
                        introsLoaded: false,
                        error
                    });
                }
            ).catch(console.error);
    }

    render() {
        const { error, introsLoaded, intros } = this.state;
        if (error) {
            return (<div>Error: {error.message} </div>);
        } else if (introsLoaded) {
            return (
                <Fragment>
                    <CssBaseline />
                    <Container maxWidth="md">

                        <Intro intro={intros.find(intro => intro.active)} />

                        <Grid container direction="column" aligItems="center" spacing={1}>
                            <Grid item>
                                <Card>
                                    <SkillsList />
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <SkillsList />
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card>
                                    <BooksTable />
                                </Card>
                            </Grid>
                            <Grid item>
                                <ProjectsView />
                            </Grid>
                        </Grid>
                    </Container>
                </Fragment>
            );
        } else {
            return "";
        }
    }
}

export default App;