import { Grid, Box } from "@material-ui/core";
import { Component } from "react";
import { icons, SkillIcon } from "./icons";

class IconSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onIconSelected: props.onIconSelected,
            selectedIconName: "default",
        };
    }

    onIconSelected(icon) {
        this.setState({
            selectedIconName: icon[0],
        });
    }

    getIcons() {
        return Object.entries(icons);
    }

    render() {
        return (
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}>
                {this.getIcons().map(icon => {
                    let borderColor = icon[0] === this.state.selectedIconName ? "#40da40" : "#c4c4c4";
                    return (<Grid item><Box border={2} p={1 / 2} borderRadius={4} borderColor={borderColor}><SkillIcon onClick={() => this.onIconSelected(icon)} name={icon[0]} withd={32} height={32} /></Box></Grid>);
                })}
            </Grid>
        );
    }
};

export default IconSelector;