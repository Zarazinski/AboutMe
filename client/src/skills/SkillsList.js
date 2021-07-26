import React, { Component } from "react";
import { List } from "@material-ui/core";

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
            <List>
                {this.state.skills.map(skill => <SkillItem key={skill.id} data={skill} />)}
            </List>
        );
    }
}

export default SkillsList;