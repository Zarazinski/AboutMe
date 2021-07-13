import React, { Component } from "react";
import { List } from "@material-ui/core";

import SkillItem from "./SkillItem";

class SkillsList extends Component {
    constructor(props) {
        super(props);
        this.skills = props.skills;
    }

    render() {
        return (
            <List>
                {this.skills.map(skill => <SkillItem key={skill.id} data={skill} />)}
            </List>
        )
    }
}

export default SkillsList;