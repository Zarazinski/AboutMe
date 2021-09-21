import React, { Component, Fragment } from "react";
import { List, Typography, Paper, Box, Divider, Button } from "@material-ui/core";

import AddSkillItemBox from "./AddSkillItemBox";
import * as SkillsAPI from "./SkillsAPI";
import SkillItem from "./SkillItem";

const INITIAL_SHOW_COUNT = 4;

class SkillsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            showCount: INITIAL_SHOW_COUNT,
        };
    }

    onShowAllClick() {
        this.setState(prevState => ({
            showCount: prevState.skills.length
        }));
    }

    onShowLessClick() {
        this.setState(prevState => ({
            showCount: Math.min(INITIAL_SHOW_COUNT, prevState.skills.length)
        }));
    }

    componentDidMount() {
        this.loadSkills();
    }

    loadSkills() {
        SkillsAPI.getSkills()
            .then(response => response.json())
            .then(skills => this.applySkills(skills, Math.min(INITIAL_SHOW_COUNT, skills.length)));
    }

    applySkills(skills, showCount) {
        const skillsSorted = skills.sort((s1, s2) => s2.level - s1.level);
        this.setState({ skills: skillsSorted, showCount: showCount });
    }

    onNewSkillAdded(skill) {
        const skills = this.state.skills;
        skills.push(skill);
        this.applySkills(skills, this.state.showCount + 1);
    }

    onSkillRemoved(skillId) {
        const skills = this.state.skills.filter(skill => skill.id !== skillId);
        this.applySkills(skills, Math.max(INITIAL_SHOW_COUNT, this.state.showCount - 1));
    }

    render() {
        let { skills, showCount } = this.state;
        let showAll = showCount === skills.length;

        return (
            <Fragment>
                <Box my={4}>
                    <Typography align="center" variant="h4" color="textSecondary">
                        My skills
                    </Typography>
                </Box>

                <Paper elevation={0} variant="outlined">
                    <List disablePadding>
                        {skills.slice(0, showCount).map(skill => <SkillItem removable={true} onSkillRemoved={() => this.onSkillRemoved(skill.id)} key={skill.id} data={skill} />)}
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
                    <Divider />
                    <AddSkillItemBox onNewSkillAdded={(skill) => this.onNewSkillAdded(skill)} />
                </Paper>
            </Fragment>
        );
    }
}

export default SkillsList;