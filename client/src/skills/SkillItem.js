import { Component } from "react";
import { ListItem, ListItemText, TextField } from "@material-ui/core";

class SkillItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.data.description,
            level: props.data.level,
            editMode: false,
        };
    }

    toggleEditMode = () => {
        this.setState(prevState => ({ editMode: !prevState.editMode }));
    }

    render() {
        let { description, level, editMode } = this.state;

        if (editMode) {
            return (
                <ListItem>
                    <TextField onClick={this.toggleEditMode} value={description} onChange={(e) => this.setState({ description: e.target.value })} />
                </ListItem>
            );
        } else {
            return (
                <ListItem>
                    <ListItemText onClick={this.toggleEditMode} primary={description} secondary={"Level: " + level} />
                </ListItem>
            );
        }
    }
}

export default SkillItem;