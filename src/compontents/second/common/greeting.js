import React from "react";
import LoginButton from './loginButton';
import LogoutButton from './logoutButton'

class Greeting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        let isLogin = this.props.isLoggedIn
        let click = this.props.onClick
        if (isLogin) {
            return <LoginButton onClick={ click }/>
        } else {
            return <LogoutButton onClick={ click }/>
        }
    }
}
export default Greeting