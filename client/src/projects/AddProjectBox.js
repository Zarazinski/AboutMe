import { Component } from "react";
import { Box, Tooltip, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

class AddProjectBox extends Component {

    render() {
        let { className } = this.props;
        return (
            <Box border={"4px dashed"} borderRadius={3} borderColor={'#e0e0e0'} justifyContent="center" alignItems="center" className={className}>
                <Tooltip title="Add a new project">
                    <IconButton>
                        <AddIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Box>);
    }
}

export default AddProjectBox;