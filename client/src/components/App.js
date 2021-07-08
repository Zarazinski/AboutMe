import { Component } from "react";

import SkillsList from "./SkillsList";

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
                })
            .catch(console.error);
    }

    render() {
        const { error, isLoaded, skills } = this.state;
        if (error) {
            return <div>Error: {error.message} </div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return <SkillsList skills={skills} />
        }
    }
}

export default App;