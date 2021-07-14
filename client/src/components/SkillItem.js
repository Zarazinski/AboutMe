import { Component } from "react";
import { ListItem, ListItemText } from "@material-ui/core";

class SkillItem extends Component {
    constructor(props) {
        super(props);
        this.description = props.data.description;
        this.level = props.data.level;
    }

    render() {
        return (
            <ListItem divider={true}>
                <ListItemText primary={this.description} secondary={"Level: " + this.level} />
            </ListItem>
        )
    }
}

export default SkillItem;