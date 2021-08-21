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

    render() {
        let { level, length } = this.props;

        return <Box display="flex">
            {[...Array(level)].map((x, i) => <Box key={i} {...levelProps} />)}
            {[...Array(length - level)].map((x, i) => <Box key={i} {...defaultProps} />)}
        </Box>;
        // return `Level ${level} out of 5`;
    }
}

export default ProficiencyIndicator;