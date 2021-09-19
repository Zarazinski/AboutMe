import { Component } from "react";
import { Avatar, Button, Badge, Typography, Grid, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import EditIcon from '@material-ui/icons/Edit';

import * as IntrosAPI from "./IntroAPI";

const useStyles = theme => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    input: {
        display: 'none',
    }
});

class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intros: [],
            activeIntro: {},
            updatedIntro: {},
            openEditIntroDialog: false,
            classes: props.classes
        };
    }

    componentDidMount() {
        IntrosAPI.getIntros()
            .then(response => response.json())
            .then(intros => this.setState({
                intros: intros,
                activeIntro: intros.find(intro => intro.active)
            }));
    }

    updateIntro(newIntro) {
        IntrosAPI.updateIntro(newIntro)
            .then(response => response.json())
            .then(updatedIntro => this.setState(prevState => ({
                intros: [updatedIntro, ...prevState.intros.filter(intro => intro.id !== updatedIntro.id)],
                activeIntro: updatedIntro,
            })));
    }

    uploadNewAvatar(avatarFile) {
        IntrosAPI.uploadAvatarImage(avatarFile)
            .then(response => response.json())
            .then(imageData => {
                const currentActiveIntro = this.state.activeIntro;
                currentActiveIntro.avatar = imageData.path;

                this.updateIntro(currentActiveIntro);
            });
    }

    onEditIntroClick() {
        this.setState(prevState => ({
            openEditIntroDialog: true,
            updatedIntro: { ...prevState.activeIntro }
        }));
    }

    closeDialog() {
        this.setState({
            openEditIntroDialog: false,
        });
    }

    onUpdateIntroClick() {
        const changedIntro = this.state.updatedIntro;
        const mergedIntro = { ...this.state.activeIntro, ...changedIntro };
        this.updateIntro(mergedIntro);
        this.closeDialog();
    }

    render() {
        const classes = this.state.classes;
        const addPhotoForm = <div>
            <input
                id="add-avatar-image"
                accept="image/*"
                type="file"
                name="avatar"
                onChange={(e) => {
                    e.preventDefault();
                    const image = e.target.files[0];
                    this.uploadNewAvatar(image);
                }}
                className={classes.input} />
            <label htmlFor="add-avatar-image">
                <IconButton component="span">
                    <AddAPhotoOutlinedIcon fontSize="medium" />
                </IconButton>
            </label>
        </div>;

        let { activeIntro, openEditIntroDialog, updatedIntro } = this.state;

        return (
            <div style={{ padding: 20 }}>
                <Grid container>
                    <Grid item xs={12} sm={6} md={4} className={classes.center}>
                        <Badge badgeContent={addPhotoForm}>
                            <Avatar
                                alt="It's me"
                                src={activeIntro.avatar}
                                className={classes.large}
                            />
                        </Badge>
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                        <Badge className={classes.center} badgeContent={<IconButton onClick={() => this.onEditIntroClick()} component="span"><EditIcon fontSize="medium" /></IconButton>}>
                            <Typography variant="h2" color="textPrimary" align="center" gutterBottom>
                                {activeIntro.title}
                            </Typography>
                        </Badge>
                        <Typography variant="subtitle1" color="textSecondary" align="center" paragraph>
                            {activeIntro.description}
                        </Typography>
                    </Grid>
                </Grid>
                <Dialog
                    maxWidth="sm"
                    fullWidth
                    open={openEditIntroDialog}>
                    <DialogTitle>
                        Edit intro
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="intro-title"
                            label="Title"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={updatedIntro.title}
                            onChange={e => this.setState(prevState => ({ updatedIntro: { ...prevState.updatedIntro, title: e.target.value } }))}
                        />
                        <TextField
                            id="intro-description"
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            multiline
                            rows={4}
                            value={updatedIntro.description}
                            onChange={e => this.setState(prevState => ({ updatedIntro: { ...prevState.updatedIntro, description: e.target.value } }))}
                        />
                        <DialogActions>
                            <Button onClick={() => this.closeDialog()} color="secondary">Cancel</Button>
                            <div style={{ flex: '1 0 0' }} />
                            <Button onClick={() => this.onUpdateIntroClick()} color="primary">Update</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(useStyles)(Intro);