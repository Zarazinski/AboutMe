import React, { Component } from "react";

import JavaColor from "./images/java-color.svg";
import Gears from "./images/gears.svg";

const icons = {
    javaColor: { icon: JavaColor, title: "Java logo" },
    default: { icon: Gears, titel: "Generic skill logo" }
};

class SkillIcon extends Component {
    render() {
        let { icon, title } = icons[this.props.name] ? icons[this.props.name] : icons.default;

        return <img src={icon} alt={title} width={this.props.width} height={this.props.height} />;
    }
};

export { SkillIcon };