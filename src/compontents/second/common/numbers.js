import React from "react";

class NumberTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numbers:[1, 2, 3, 4, 5]
        }
    }
    render() {
        const listItem = this.state.numbers.map((item) => <li key={item.toString()}>{item}</li>)
        return (
            <div>
                <test></test>
                <ul>{listItem}</ul>
            </div>
        )
    }
}

export default NumberTest