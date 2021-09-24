import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, withStyles, Typography, Box } from "@material-ui/core";
import { FormControl, FormLabel, FormGroup } from "@material-ui/core";
import { Component, Fragment } from "react";
import Alert from '@material-ui/lab/Alert';

import * as SkillsAPI from "./SkillsAPI.js";
import ProficiencyIndicator from "./progress/ProficiencyIndicator.js";
import IconSelector from "../assets/IconSelector.js";

const useStyles = theme => ({
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%'
    },
    fieldset: {
        width: '100%',
        padding: 10,
        border: '1px solid #c4c4c4',
        borderRadius: 5
    },
});

const emptySkillData = { name: "", level: 1, description: "", iconName: "" };
class AddSkillItemBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            dialogOpen: false,
            onNewSkillAdded: props.onNewSkillAdded,
            skillData: emptySkillData,
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
            skillData: emptySkillData,
            errorMessage: null,
        });
    }

    onAddNewSkill() {
        const skillData = this.state.skillData;
        SkillsAPI.addSkill(skillData)
            .then(response => {
                if (!response.ok) {
                    let err = new Error(response.statusText);
                    err.response = response;
                    throw err;
                }
                return response.json();
            })
            .then(skill => {
                this.closeDialog();
                if (this.state.onNewSkillAdded) {
                    this.state.onNewSkillAdded(skill);
                }
            })
            .catch(error => {
                if (error.response) {
                    error.response
                        .text()
                        .then(text => this.setState({ errorMessage: `${error.message}: ${text}` }));
                } else {
                    console.log(error);
                }
            });
    }

    handleSkillDataChange(field, value) {
        this.setState(prevState => {
            const skillData = { ...prevState.skillData };
            skillData[field] = value;
            return {
                skillData: skillData,
                errorMessage: null,
            };
        });
    }

    render() {
        let { dialogOpen, errorMessage, classes } = this.state;
        return <Fragment>
            <Button fullWidth color="primary" onClick={() => this.openDialog()}>Add new</Button>
            <Dialog
                open={dialogOpen}
                onClose={() => this.closeDialog()}
                fullWidth
                maxWidth="sm">
                <DialogTitle>
                    Add a new skill
                </DialogTitle>
                <DialogContent className={classes.dialog}>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    <TextField
                        id="skill-name"
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        onChange={e => this.handleSkillDataChange('name', e.target.value)}
                    />
                    <IconSelector onIconSelected={(icon) => this.handleSkillDataChange('iconName', icon[0])} />
                    <FormControl component="fieldset" className={classes.fieldset}>
                        <FormLabel component="legend" >
                            <Box px={1 / 2}><Typography variant="caption">{"Level"}</Typography></Box>
                        </FormLabel>
                        <FormGroup row>
                            <ProficiencyIndicator
                                editable
                                level={1}
                                length={5}
                                onLevelSelected={(level) => this.handleSkillDataChange('level', level)}
                                size={'20px'} />
                        </FormGroup>
                    </FormControl>
                    <TextField
                        id="skill-description"
                        label="Description"
                        multiline
                        rows={2}
                        variant="outlined"
                        margin="normal"
                        onChange={e => this.handleSkillDataChange('description', e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.closeDialog()} color="secondary">Cancel</Button>
                    <div style={{ flex: '1 0 0' }} />
                    <Button onClick={() => this.onAddNewSkill()} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </Fragment>;
    }
}

export default withStyles(useStyles)(AddSkillItemBox);