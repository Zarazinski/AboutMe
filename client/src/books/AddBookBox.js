import { Button, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { Component, Fragment } from "react";

class AddBookBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        };
    }

    openDialog() {
        this.setState({
            dialogOpen: true,
        });
    }

    closeDialog() {
        this.setState({
            dialogOpen: false,
        });
    }

    render() {
        let { dialogOpen } = this.state;
        return <Fragment>
            <Button fullWidth color="primary" onClick={() => this.openDialog()}>Add new</Button>
            <Dialog
                open={dialogOpen}
                onClose={() => this.closeDialog()}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>
                        Add a new book
                    </DialogTitle>
                    <DialogContent>
                        Here is the context
                    </DialogContent>
            </Dialog>
        </Fragment>;
    }
};

export default AddBookBox;