import { Component, Fragment } from "react";
import { CssBaseline, Container, Grid, Card } from '@material-ui/core';

import Intro from "./intro/Intro";
import SkillsList from "./skills/SkillsList";
import BooksTable from "./books/BooksTable";
import ProjectsView from "./projects/ProjectsView";

class App extends Component {

    render() {
        return (
            <Fragment>
                <CssBaseline />
                <Container maxWidth="md">

                    <Intro />

                    <Grid container direction="column" spacing={1}>
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
    }
}

export default App;