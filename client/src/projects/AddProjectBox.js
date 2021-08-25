import { Component, Fragment } from "react";
import { Box, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, withStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const useStyles = theme => ({
    input: {
        display: 'none'
    }
});

class AddProjectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            classes: props.classes,
        };
    }

    openDialog() {
        this.setState({
            dialogOpen: true
        });
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        });
    }

    render() {
        let { className } = this.props;
        let { dialogOpen, classes } = this.state;
        return (
            <Fragment>
                <Box border={"4px dashed"} borderRadius={3} borderColor={'#e0e0e0'} justifyContent="center" alignItems="center" className={className}>
                    <Tooltip title="Add a new project">
                        <IconButton onClick={() => this.openDialog()}>
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Dialog open={dialogOpen} onClose={() => this.closeDialog()} aria-labelledby="add-project-dialog-title">
                    <DialogTitle id="add-project-dialog-title">Add a new project</DialogTitle>
                    <DialogContent>
                        <input
                            id="add-project-image"
                            accept="image/*"
                            type="file"
                            name="project"
                            onChange=""
                            className={classes.input} />
                            <label htmlFor="add-project-image">
                                <Button variant="contained" color="primary" component="span">
                                    Select image
                                </Button>
                            </label>
                        <DialogContentText>
                            {/* Add */}
                        </DialogContentText>
                        <TextField />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.closeDialog()} color="secondary">Cancel</Button>
                        <Button onClick={() => this.closeDialog()} color="primary">Create</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>);
    }
}

export default withStyles(useStyles)(AddProjectBox);