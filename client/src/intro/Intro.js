import { Component } from "react";
import { Avatar, Badge, Typography, Grid, IconButton } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

import * as IntrosAPI from "./IntroAPI";

const useStyles = theme => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    input: {
        display: 'none',
    }
});

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intros: [],
            activeIntro: "",
            classes: props.classes
        };
    }

    componentDidMount() {
        IntrosAPI.getIntros()
            .then(response => response.json())
            .then(intros => this.setState({
                intros: intros,
                activeIntro: intros.find(intro => intro.active)
            }));
    }

    render() {
        const classes = this.state.classes;
        const addPhotoForm = <div>
            <input
                id="add-avatar-image"
                accept="image/*"
                type="file"
                name="avatar"
                onChange={(e) => this.uploadNewAvatar(e)}
                className={classes.input} />
            <label htmlFor="add-avatar-image">
                <IconButton component="span">
                    <AddAPhotoOutlinedIcon fontSize="medium" />
                </IconButton>
            </label>
        </div>;

        return (
            <div style={{ padding: 20 }}>
                <Grid container>
                    <Grid item xs={12} sm={6} md={4} className={classes.center}>
                        <Badge badgeContent={addPhotoForm}>
                            <Avatar
                                alt="It's me"
                                src="img/avatar.jpg"
                                className={classes.large}
                            />
                        </Badge>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                        <Typography variant="h2" color="textPrimary" gutterBottom>
                            About me
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" paragraph>
                            {this.state.activeIntro.description}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(useStyles)(Intro);