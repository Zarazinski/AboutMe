import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import JavaColor from "./images/skills/java-color.svg";
import JavaBlack from "./images/skills/java-black.svg";
import PythonColor from "./images/skills/python-color.svg";
import PythonBlack from "./images/skills/python-black.svg";
import JavaScriptColor from "./images/skills/javascript-color.svg";
import JavaScriptBlack from "./images/skills/javascript-black.svg";

import Gears from "./images/skills/gears.svg";

const icons = {
    javaColor: { icon: JavaColor, title: "Java logo color" },
    javaBlack: { icon: JavaBlack, title: "Java logo black" },
    pythonColor: { icon: PythonColor, title: "Python logo color" },
    pythonBlack: { icon: PythonBlack, title: "Python logo black" },
    javaScriptColor: { icon: JavaScriptColor, title: "JavaScript logo color" },
    javaScriptBlack: { icon: JavaScriptBlack, title: "JavaScript logo black" },

    default: { icon: Gears, title: "Generic skill logo" }
};

const useStyles = theme => ({
    image: {
        display: 'block'
    }
});


class PureSkillIcon extends Component {
    render() {
        let { icon, title } = icons[this.props.name] ? icons[this.props.name] : icons.default;

        return <img className={this.props.classes.image} onClick={this.props.onClick} src={icon} alt={title} width={this.props.width} height={this.props.height} />;
    }
};

const SkillIcon = withStyles(useStyles)(PureSkillIcon);
export { SkillIcon, icons };