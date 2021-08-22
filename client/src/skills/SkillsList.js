import React, { Component, Fragment } from "react";
import { List, Typography, Paper, Box, Divider, Button } from "@material-ui/core";

import * as SkillsAPI from "./SkillsAPI";
import SkillItem from "./SkillItem";

const INITIAL_SHOW_COUNT = 4;

class SkillsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            showCount: INITIAL_SHOW_COUNT,
            showAll: false,
        };
    }

    onShowAllClick() {
        this.setState(prevState => ({
            showCount: prevState.skills.length,
            showAll: true,
        }));
    }

    onShowLessClick() {
        this.setState(prevState => ({
            showCount: Math.min(INITIAL_SHOW_COUNT, prevState.skills.length),
            showAll: false,
        }));
    }

    componentDidMount() {
        SkillsAPI.getSkills()
            .then(response => response.json())
            .then(skills => skills.sort((s1, s2) => s2.level - s1.level))
            .then(skills => this.setState({ skills: skills, showCount: Math.min(INITIAL_SHOW_COUNT, skills.length) }));
    }

    render() {
        let { skills, showCount, showAll } = this.state;

        return (
            <Fragment>
                <Box my={4}>
                    <Typography align="center" variant="h4" color="textSecondary">
                        My skills
                    </Typography>
                </Box>

                <Paper elevation={0} variant="outlined">
                    <List>
                        {skills.slice(0, showCount).map(skill => <SkillItem key={skill.id} data={skill} />)}
                    </List>
                    <Divider />
                    {skills.length > INITIAL_SHOW_COUNT &&
                        <Box textAlign="center">
                            {showAll ?
                                <Button fullWidth color="primary" onClick={() => this.onShowLessClick()}>Show less</Button> :
                                <Button fullWidth color="primary" onClick={() => this.onShowAllClick()}>Show all ({skills.length})</Button>
                            }
                        </Box>
                    }
                </Paper>
            </Fragment>
        );
    }
}

export default SkillsList;