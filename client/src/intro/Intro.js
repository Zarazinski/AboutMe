import { Component, Fragment } from "react";
import { Typography } from "@material-ui/core";

import * as IntrosAPI from "./IntroAPI";

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intros: [],
            activeIntro: ""
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
        return (
            <Fragment>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    About me
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    {this.state.activeIntro.description}
                </Typography>
            </Fragment>
        );
    }
}

export default Intro;