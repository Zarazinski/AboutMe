import { Component } from "react";

class Header extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.description = props.intro.description;
    }

    render() {
        return (
            <div>
                {this.description}
            </div>
        )
    }
}

export default Header;