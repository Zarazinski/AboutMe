import React, { Component } from "react";

import SkillItem from "./SkillItem";

class SkillsList extends Component {
    constructor(props) {
        super(props);
        this.skills = props.skills;
    }

    render() {
        return (
        <ul>
            {this.skills.map(skill => <SkillItem key={skill.id} data={skill} />)}
        </ul>
        )
    }
}

export default SkillsList;