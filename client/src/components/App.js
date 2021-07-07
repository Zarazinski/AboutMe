import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            skills: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:3000/skills")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        skills: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, skills } = this.state;
        if (error) {
            return <div>Error: {error.message} </div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <ul>
                    {skills.map(skill => (
                        <li>{JSON.stringify(skill)}</li>
                    ))}
                </ul>
            );
        }
    }
}

export default App;