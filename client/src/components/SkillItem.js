import { Component } from "react";

class SkillItem extends Component {
    constructor(props) {
        super(props);
        this.description = props.data.description;
        this.level = props.data.level;
    }

    render() {
        return (
            <li>
                {this.description}, Level: {this.level}
            </li>
        )
    }
}

export default SkillItem;