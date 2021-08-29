import { Component, Fragment } from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import * as ProjectsAPI from "./ProjectsAPI";

import Project from "./ProjectCard";
import AddProjectBox from "./AddProjectBox";

const useStyles = theme => ({
    equalCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    heightEqualToWidth: {
        paddingTop: '45%',
        paddingBottom: '45%'
    }
});


class ProjectsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            classes: props.classes,
        };
    }

    componentDidMount() {
        this.fetchProjects();
    }

    onNewProjectCreated(project) {
        this.setState(prevState => ({
            projects: [...prevState.projects, project]
        }));
    }

    fetchProjects() {
        ProjectsAPI.getProjects()
            .then(response => response.json())
            .then(projects => this.setState({ projects: projects }));
    }

    render() {
        const classes = this.state.classes;
        return (
            <Fragment>
                <Box my={4}>
                    <Typography align="center" variant="h4" color="textSecondary">
                        My projects
                    </Typography>
                </Box>
                <Grid container spacing={4} direction={"row"}>
                    {this.state.projects.map(project => (
                        <Grid item key={project.id} xs={12} sm={6} md={6}>
                            <Project
                                name={project.name}
                                description={project.description}
                                image={project.image}
                                link={project.link}
                                technologies={project.technologies}
                                className={classes.equalCard}
                            />
                        </Grid>
                    ))}
                    <Grid item key='add-project' xs={12} sm={6} md={6}>
                        <AddProjectBox onNewProjectCreated={project => this.onNewProjectCreated(project)} className={`${classes.equalCard} ${classes.heightEqualToWidth}`} />
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

export default withStyles(useStyles)(ProjectsView);