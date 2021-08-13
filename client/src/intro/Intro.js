import { Component } from "react";
import { Avatar, Typography, Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

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
        return (
            <div style={{ padding: 20 }}>
                <Grid container>
                    <Grid item xs={4} className={classes.center}>
                        <Avatar
                            alt="It's me"
                            className={classes.large}
                        />
                    </Grid>
                    <Grid item xs={8}>
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