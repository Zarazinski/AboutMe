import { Component } from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { SkillIcon } from "../assets/icons";
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    lightDark: {
        backgroundColor: "#F8F8F8",
    },
    mediumAvatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    }
});

class SkillItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.data.description,
            level: props.data.level,
            iconName: props.data.iconName,
            classes: props.classes,
        };
    }

    getSuffix() {
        // Todo: Store the icons' colors property
        return "Color";
    }

    render() {
        let { description, level, iconName, classes } = this.state;

        return (
            <ListItem className={classes.root}>
                <ListItemAvatar>
                    <Avatar className={`${classes.lightDark} ${classes.mediumAvatar}`}>
                        <SkillIcon name={iconName + this.getSuffix()} width={32} height={32} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={description} secondary={"Level: " + level} />
            </ListItem>
        );
    }
}

export default withStyles(useStyles)(SkillItem);