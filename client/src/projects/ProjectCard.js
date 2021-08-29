import { Component } from "react";
import { Button, Card, IconButton, CardContent, CardMedia, CardHeader, CardActions } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";

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
            className: props.className,
            classes: props.classes,
        };
    }

    render() {
        let { name, technologies, link, image, description, className, classes } = this.state;

        return (
            <Card className={className}>
                <CardHeader
                    title={name}
                    subheader={technologies.join(", ")}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVert />
                            {/* TODO: Show menu for remove/edit */}
                        </IconButton>
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