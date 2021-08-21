import { Component, Fragment } from "react";
import { Avatar, Box, Collapse, ListItem, ListItemAvatar, ListItemText, Typography } from "@material-ui/core";
import { SkillIcon } from "../assets/icons";
import { withStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ProficiencyIndicator from "./progress/ProgressIndicator";

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
            showMore: false,
        };
    }

    getSuffix() {
        // Todo: Store the icons' colors property
        return "Color";
    }

    onShowMoreClick() {
        this.setState(prevState => ({
            showMore: !prevState.showMore
        }));
    }

    render() {
        let { description, level, iconName, classes, showMore } = this.state;

        return (

            <Fragment>
                <ListItem alignItems="flex-start" button onClick={() => this.onShowMoreClick()} className={classes.root}>
                    <ListItemAvatar>
                        <Avatar className={`${classes.lightDark} ${classes.mediumAvatar}`}>
                            <SkillIcon name={iconName + this.getSuffix()} width={32} height={32} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography
                        primary={
                            <Typography color="textPrimary">
                                {description}
                            </Typography>
                        }
                        secondary={
                            <Fragment>
                                <ProficiencyIndicator level={level} length={5}/>
                                <Box mt={1}/>
                                <Collapse in={showMore} timeout="auto" unmountOnExit>
                                    {/* TODO */}
                                    {"Here is more information about this skill"}
                                </Collapse>
                            </Fragment>
                        } />
                    {showMore ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
            </Fragment>
        );
    }
}

export default withStyles(useStyles)(SkillItem);