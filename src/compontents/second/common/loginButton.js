import React from 'react';
class LoginButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text:'登录按钮组件'
        }
    }
    handleClick = () => {
        alert(this.state.text)
    }
    render() {
        return (
            <button onClick={this.props.onClick}>登录</button>
            // <button onClick={this.handleClick}></button>
        )
    }
}
export default LoginButton