import { Component, Fragment } from "react";
import { CardHeader, Card, CardMedia, CardContent, CardActions, Grid, Button, Typography, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as ProjectsAPI from "./ProjectsAPI";

const useStyles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    equalCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
                <Grid container spacing={4}>
                    {this.state.projects.map(project => (
                        <Grid item key={project.id} xs={12} sm={6} md={6}>
                            <Card className={classes.equalCard}>
                                <CardHeader
                                    title={project.name}
                                    subheader={project.technologies.join(", ")}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={project.image}
                                    title={project.name}
                                />
                                <CardContent>
                                    {project.description}
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" aria-label="Open on GitHub" onClick={() => window.open(project.link, "_blank")}>Github</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Fragment>
        );
    }
}

export default withStyles(useStyles)(ProjectsView);