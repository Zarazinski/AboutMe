import { List } from "@material-ui/core";
import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";

class BooksList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        BooksAPI.getBooks()
            .then(response => response.json())
            .then(books => this.setState({ books: books }));
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