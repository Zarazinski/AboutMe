import { Component, Fragment } from "react";
import { CardHeader, Card, CardMedia, CardContent, CardActions, Grid, Button, Typography, Box, IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';

import * as ProjectsAPI from "./ProjectsAPI";

import defaultProjectImage from "../assets/images/projects/default-project-image.jpeg";

const useStyles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    equalCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    bottom: {
        flexGrow: 1
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
                        <Grid item key={project.id} xs={12} sm={6} md={4}>
                            <Card className={classes.equalCard}>
                                <CardHeader
                                    title={project.name}
                                    subheader={project.technologies.join(", ")}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={project.image || defaultProjectImage}
                                    title={project.name}
                                />
                                <CardContent>
                                    {project.description}
                                </CardContent>

                                {/* This div makes the CardActions to stick to the bottom - found here https://stackoverflow.com/a/68387465 */}
                                <div className={classes.bottom} />
                                <CardActions>
                                    <Button size="small" color="primary" aria-label="Open on GitHub" onClick={() => window.open(project.link, "_blank")}>Github</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    <Grid item key='add-project' xs={12} sm={6} md={4}>
                        <Box border={"4px dashed"} borderRadius={3} borderColor={'#e0e0e0'} justifyContent="center" alignItems="center" className={`${classes.equalCard} ${classes.heightEqualToWidth}`}>
                            <Tooltip title="Add a new project">
                                <IconButton>
                                    <AddIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

export default withStyles(useStyles)(ProjectsView);