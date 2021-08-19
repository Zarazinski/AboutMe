import React, { Component, Fragment } from "react";
import { List, Typography, Paper, Box } from "@material-ui/core";

import * as SkillsAPI from "./SkillsAPI";
import SkillItem from "./SkillItem";

class SkillsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: []
        };
    }

    componentDidMount() {
        SkillsAPI.getSkills()
            .then(response => response.json())
            .then(skills => this.setState({ skills: skills }));
    }

    render() {
        return (
            <Fragment>
                <Box my={4}>
                    <Typography align="center" variant="h4" color="textSecondary">
                        My skills
                    </Typography>
                </Box>

                <Paper elevation={0} variant="outlined">
                    <List>
                        {this.state.skills.map(skill => <SkillItem key={skill.id} data={skill} />)}
                    </List>
                </Paper>
            </Fragment>
        );
    }
}

export default SkillsList;