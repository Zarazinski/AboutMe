import { Component, Fragment } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from "./Header";
import SkillsList from "./SkillsList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            introsLoaded: false,
            intros: [],
            skillsLoaded: false,
            skills: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:3000/skills")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        skillsLoaded: true,
                        skills: result
                    });
                },
                (error) => {
                    this.setState({
                        skillsLoaded: false,
                        error
                    });
                }
            ).catch(console.error);

        fetch("http://localhost:3000/intros")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        introsLoaded: true,
                        intros: result
                    });
                },
                (error) => {
                    this.setState({
                        introsLoaded: false,
                        error
                    });
                }
            ).catch(console.error);
    }

    render() {
        const { error, introsLoaded, intros, skillsLoaded, skills } = this.state;
        if (error) {
            return <div>Error: {error.message} </div>
        } else if (skillsLoaded && introsLoaded) {
            return (
                <Fragment>
                    <CssBaseline />
                    <Header intro={intros.find(intro => intro.active)} />
                    <SkillsList skills={skills} />
                </Fragment>
            );
        } else {
            return "";
        }
    }
}

export default App;