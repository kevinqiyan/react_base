import React from 'react';
class LogoutButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            text:'这个是一个退出的按钮组件'
        }
    }
    handleClick = () => {
        alert(this.state.text)
    }
    render() {
        return (
            <button onClick={this.props.onClick}>退出</button>
            // <button onClick={this.handleClick}></button>
        )
    }
}
export default LogoutButton