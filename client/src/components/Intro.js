import { Component, Fragment } from "react";
import { Typography } from "@material-ui/core";

class Intro extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.description = props.intro.description;
    }

    render() {
        return (
            <Fragment>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    About me
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    {this.description}
                </Typography>
            </Fragment>
        )
    }
}

export default Intro;