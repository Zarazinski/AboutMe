import { List } from "@material-ui/core";
import React, { Component } from "react";

class BooksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        this.setState({ books: ["no book"] });
    }

    render() {
        return (
            <List>
                {this.state.books.map(book => book)}
            </List>
        );
    }
}

export default BooksList;