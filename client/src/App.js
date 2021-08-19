import { Component, Fragment } from "react";
import { CssBaseline, Container, Grid, Divider, Box } from '@material-ui/core';

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

                    <Divider/>
                    <Box my={2} />

                    <Grid container direction="column" spacing={4}>
                        <Grid item>
                            <SkillsList />
                        </Grid>
                        <Grid item>
                            <BooksTable />
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