import { Component, Fragment } from "react";
import { Box, Tooltip, IconButton, CardMedia, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, withStyles } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

import * as ProjectsAPI from "./ProjectsAPI";

const useStyles = theme => ({
    input: {
        display: 'none'
    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%'
    },
    addPhotoBox: {
        display: 'flex',
        flexDirection: 'column',
    },
    media: {
        width: '100%',
        paddingTop: '56.25%'
    }
});

class AddProjectBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            projectData: {},
            classes: props.classes,
            onNewProjectCreated: props.onNewProjectCreated
        };
    }

    openDialog() {
        this.setState({
            dialogOpen: true
        });
    }

    closeDialog() {
        this.setState({
            dialogOpen: false,
            projectData: {}
        });
    }

    handleProjectDataChange(field, value) {
        this.setState(prevState => {
            const projectData = { ...prevState.projectData };
            projectData[field] = value;
            return {
                projectData: projectData
            };
        });
    }

    uploadProjectImage(e) {
        e.preventDefault();
        const image = e.target.files[0];

        ProjectsAPI.uploadProjectImage(image)
            .then(response => response.json())
            .then(imageInfo => this.setState(prevState => ({
                projectData: {
                    ...prevState.projectData,
                    image: imageInfo.path,
                }
            })));
    }

    handleCreateProject() {
        // TODO: add validation and response handling
        ProjectsAPI.createProject(this.state.projectData)
            .then(response => response.json())
            .then(project => {
                this.closeDialog();
                this.state.onNewProjectCreated(project);
            });
    }

    render() {
        let { className } = this.props;
        let { dialogOpen, classes, projectData } = this.state;
        let options = ["Java", "Kotlin", "JavaScript", "Python"];

        return (
            <Fragment>
                <Box border={"4px dashed"} borderRadius={3} borderColor={'#e0e0e0'} justifyContent="center" alignItems="center" className={className}>
                    <Tooltip title="Add a new project">
                        <IconButton onClick={() => this.openDialog()}>
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Dialog
                    open={dialogOpen}
                    onClose={() => this.closeDialog()}
                    aria-labelledby="add-project-dialog-title"
                    fullWidth
                    maxWidth="xs"
                >
                    <DialogTitle id="add-project-dialog-title">Add a new project</DialogTitle>
                    <DialogContent className={classes.dialog}>
                        <TextField
                            id="project-name"
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            onChange={e => this.handleProjectDataChange('name', e.target.value)}
                        />

                        <Autocomplete
                            id="add-technologies"
                            multiple
                            freeSolo
                            onChange={(event, value) => this.handleProjectDataChange('technologies', value)}
                            options={options}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField
                                label="Technologies"
                                variant="outlined"
                                margin="normal"
                                {...params}
                            />}
                        />

                        {projectData.image ?
                            <CardMedia
                                className={classes.media}
                                image={projectData.image}
                            />
                            :
                            <Box
                                border={"2px dashed"}
                                mt={2}
                                mb={1}
                                borderRadius={3}
                                borderColor={'#e0e0e0'}
                                justifyContent="center"
                                alignItems="center"
                                className={classes.addPhotoBox}
                            >
                                <input
                                    id="add-project-image"
                                    accept="image/*"
                                    type="file"
                                    name="project"
                                    onChange={(e) => this.uploadProjectImage(e)}
                                    className={classes.input}
                                />
                                <label htmlFor="add-project-image">
                                    <IconButton component="span">
                                        <AddAPhotoOutlinedIcon fontSize="large" />
                                    </IconButton>
                                </label>
                            </Box>
                        }

                        <TextField
                            id="project-description"
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            margin="normal"
                            onChange={e => this.handleProjectDataChange('description', e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.closeDialog()} color="secondary">Cancel</Button>
                        <div style={{ flex: '1 0 0' }} />
                        <Button onClick={() => this.handleCreateProject()} color="primary">Create</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>);
    }
}

export default withStyles(useStyles)(AddProjectBox);