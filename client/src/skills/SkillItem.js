import { Component, Fragment } from "react";
import { Avatar, Box, Collapse, IconButton, ListItem, ListItemAvatar, ListItemText, Typography, Menu, MenuItem } from "@material-ui/core";
import { SkillIcon } from "../assets/icons";
import { withStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore, MoreVert } from "@material-ui/icons";
import ProficiencyIndicator from "./progress/ProficiencyIndicator";

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
            name: props.data.name,
            description: props.data.description,
            level: props.data.level,
            iconName: props.data.iconName,
            classes: props.classes,
            showMore: false,
        };
    }

    onShowMoreClick() {
        this.setState(prevState => ({
            showMore: !prevState.showMore
        }));
    }

    handleOpenMenuClick(el) {
        this.setState({
            anchorEl: el
        });
    }

    handleCloseMenuClick() {
        this.setState({
            anchorEl: null
        });
    }

    handleDeleteSkillClick() {
        // TODO
    }

    handleEditSkillClick() {
        // TODO
    }

    render() {
        let { name, description, level, iconName, classes, showMore, anchorEl } = this.state;
        let menuOpen = Boolean(anchorEl);

        return (

            <Fragment>
                <ListItem className={classes.root}>
                    <ListItemAvatar>
                        <Avatar className={`${classes.lightDark} ${classes.mediumAvatar}`}>
                            <SkillIcon name={iconName} width={32} height={32} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText disableTypography
                        primary={
                            <Typography color="textPrimary">
                                {name}
                            </Typography>
                        }
                        secondary={
                            <Fragment>
                                <ProficiencyIndicator level={level} length={5} />
                                <Box mt={1} />
                                <Collapse in={showMore} timeout="auto" unmountOnExit>
                                    {description}
                                </Collapse>
                            </Fragment>
                        } />
                    <Fragment>
                        {showMore ?
                            <IconButton onClick={() => this.onShowMoreClick()}>
                                <ExpandLess />
                            </IconButton>
                            :
                            <IconButton onClick={() => this.onShowMoreClick()}>
                                <ExpandMore />
                            </IconButton>
                        }
                        <Fragment>
                            <IconButton aria-label="settings" aria-controls="skill-menu" aria-haspopup="true" onClick={(e) => this.handleOpenMenuClick(e.currentTarget)}>
                                <MoreVert />
                            </IconButton>
                            <Menu
                                id="skill-menu"
                                anchorEl={anchorEl}
                                transformOrigin={{ vertical: "top", horizontal: "center" }}
                                keepMounted
                                open={menuOpen}
                                onClose={() => this.handleCloseMenuClick()}
                            >
                                <MenuItem disabled onClick={() => this.handleEditSkillClick()}>Edit</MenuItem>
                                <MenuItem onClick={() => this.handleDeleteSkillClick()}>Delete</MenuItem>
                            </Menu>
                        </Fragment>
                    </Fragment>
                </ListItem>
            </Fragment>
        );
    }
}

export default withStyles(useStyles)(SkillItem);