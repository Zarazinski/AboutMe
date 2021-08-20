import { Component } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

class SkillItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.data.description,
            level: props.data.level
        };
    }

    render() {
        let { description, level } = this.state;

        return (
            <ListItem>
                <ListItemIcon>
                    {/* Todo: add an appropriate icon */}
                </ListItemIcon>
                <ListItemText onClick={this.toggleEditMode} primary={description} secondary={"Level: " + level} />
            </ListItem>
        );
    }
}

export default SkillItem;