import { Box } from "@material-ui/core";
import { Component } from "react";

const defaultProps = {
    bgcolor: '#f8f8f8',
    borderColor: '#e0e0e0',
    m: '2px',
    borderRadius: 2,
    border: 1,
    style: { width: '12px', height: '12px' },
};

const levelProps = {
    ...defaultProps,
    bgcolor: '#90ee90',
    borderColor: '#40da40',
};

class ProficiencyIndicator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: props.level,
            length: props.length,
            editable: props.editable,
            size: props.size || '12px',
            defaultStyle: {...defaultProps},
            levelStyle: {...levelProps},
        };

        const size = this.state.size;
        this.state.defaultStyle.style = { width: size, height: size };
        this.state.levelStyle.style = { width: size, height: size };
    }

    changeLevel(level) {
        this.setState({
            level: level,
        });
    }

    render() {
        let { level, length, editable, defaultStyle, levelStyle } = this.state;
        let changeLevelOnClick = () => { };
        if (editable) {
            changeLevelOnClick = (newLevel) => this.changeLevel(newLevel);
        }

        return <Box display="flex">
            {[...Array(level)].map((x, i) => <Box key={i} onClick={() => changeLevelOnClick(i + 1)} {...levelStyle} />)}
            {[...Array(length - level)].map((x, i) => <Box key={i + level} onClick={() => changeLevelOnClick(i + level + 1)} {...defaultStyle} />)}
        </Box>;
    }
}

export default ProficiencyIndicator;