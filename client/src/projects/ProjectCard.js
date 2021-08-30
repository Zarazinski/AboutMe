import { Component, Fragment } from "react";
import { Button, Card, IconButton, CardContent, CardMedia, CardHeader, CardActions, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";

import { deleteProject } from "./ProjectsAPI";

import defaultProjectImage from "../assets/images/projects/default-project-image.jpeg";

const useStyles = theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    bottom: {
        flexGrow: 1
    },
});

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            description: props.description,
            technologies: props.technologies,
            link: props.link,
            image: props.image,
            onProjectDeleted: props.onProjectDeleted,
            menuOpen: false,
            className: props.className,
            classes: props.classes,
        };
    }

    handleOpenMenuClick(anchorEl) {
        this.setState({
            anchorEl: anchorEl,
        });
    }

    handleCloseMenuClick() {
        this.setState({
            anchorEl: null
        });
    }

    handleDeleteProjectClick() {
        const id = this.state.id;
        deleteProject(id)
            .then(response => {
                if (response.ok) {
                    this.state.onProjectDeleted(id);
                }
            })
            .catch(e => console.log(e.message));

        this.handleCloseMenuClick();
    }

    handleEditProjectClick() {
        // Not implemented
        this.handleCloseMenuClick();
    }

    render() {
        let { name, technologies, link, image, description, anchorEl, className, classes } = this.state;
        let menuOpen = Boolean(anchorEl);

        return (
            <Card className={className}>
                <CardHeader
                    title={name}
                    subheader={technologies.join(", ")}
                    action={
                        <Fragment>
                            <IconButton aria-label="settings" aria-controls="project-menu" aria-haspopup="true" onClick={(e) => this.handleOpenMenuClick(e.currentTarget)}>
                                <MoreVert />
                            </IconButton>
                            <Menu
                                id="project-menu"
                                anchorEl={anchorEl}
                                transformOrigin={{ vertical: "top", horizontal: "center" }}
                                keepMounted
                                open={menuOpen}
                                onClose={() => this.handleCloseMenuClick()}
                            >
                                <MenuItem disabled onClick={() => this.handleEditProjectClick()}>Edit</MenuItem>
                                <MenuItem onClick={() => this.handleDeleteProjectClick()}>Delete</MenuItem>
                            </Menu>
                        </Fragment>
                    }
                />
                <CardMedia
                    className={classes.media}
                    image={image || defaultProjectImage}
                    title={name}
                />
                <CardContent>
                    {description}
                </CardContent>

                {/* This div makes the CardActions to stick to the bottom - found here https://stackoverflow.com/a/68387465 */}
                <div className={classes.bottom} />
                <CardActions>
                    <Button size="small" color="primary" aria-label="Open on GitHub" onClick={() => window.open(link, "_blank")}>Github</Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(useStyles)(Project);