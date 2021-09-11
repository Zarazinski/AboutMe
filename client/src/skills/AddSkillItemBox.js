import { Button, Dialog, DialogActions, DialogTitle, DialogContent, TextField, withStyles } from "@material-ui/core";
import { Component, Fragment } from "react";
import Alert from '@material-ui/lab/Alert';

import * as SkillsAPI from "./SkillsAPI.js";

const useStyles = theme => ({
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%'
    },
});

class AddSkillItemBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            onNewSkillAdded: props.onNewSkillAdded,
            skillData: {}
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
            skillData: {}
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
                this.state.onNewSkillAdded(skill);
            })
            .catch(error => error.response
                .text()
                .then(text => this.setState({ errorMessage: `${error.message}: ${text}` }))
            );
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
                    {/* TODO: Add a list to choose a skill icon */}
                    {/* TODO: Add a skill level selector */}
                    <TextField
                        id="skill-description"
                        label="Description"
                        multiline
                        rows={2}
                        variant="outlined"
                        margin="normal"
                        onChange={e => this.handleSkillDataChange('name', e.target.value)}
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