import { Component } from "react";
import { CardHeader, Card, CardContent, CardActions, Grid, IconButton } from "@material-ui/core";
import { Link as LinkIcon } from '@material-ui/icons';
import * as ProjectsAPI from "./ProjectsAPI";

class ProjectsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        ProjectsAPI.getProjects()
            .then(response => response.json())
            .then(projects => this.setState({ projects: projects }));
    }

    render() {
        return (
            <Grid container spacing={4}>
                {this.state.projects.map(project => (
                    <Grid item key={project.name} xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader
                                title={project.name}
                                subheader={project.technologies.join(", ")}
                            />
                            <CardContent>
                                {project.description}
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="Open on GitHub" onClick={() => window.open(project.link, "_blank")}>
                                    <LinkIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default ProjectsView;