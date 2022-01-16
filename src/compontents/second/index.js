import React from 'react';
import Greeting from './common/greeting'
import LoginButton from './common/loginButton'
import LogoutButton from './common/logoutButton'
class Second extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isToggleOn: true,
            isLoggedIn: false
        }
    }
    componentDidMount() {
        this.timeID = setInterval(() => {
            this.tick()
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timeID)
    }
    tick() {
        this.setState({
            date:new Date()
        })
    }
    handleClick = () => {
        alert('test')
        // console.log('this is', this)
    }
    loginBtn = () => {
        this.setState({isLoggedIn:false})
    }
    logoutBtn = () => {
        this.setState({isLoggedIn:true})
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        /* 
        第二种组件切换显示方法 在主文件中进行逻辑切换。
        这两种方法大同小异，但是第一种方法主要是封装到一个组件内将父组件方法进行传递到子组件内部改变父组件内部的变量
        
        */
        if (isLoggedIn) {
            button = <LoginButton onClick={this.loginBtn} />
        } else {
            button = <LogoutButton onClick={this.logoutBtn} />
        }
        return (
            <div>
                <h1 onClick={this.handleClick}>Hello,{this.props.name}</h1>
                <h2>It is {new Date().toLocaleTimeString()}</h2>
                {/* 第一种组件切换显示方法 把两个button封装到一个组件进行调用 */}
                <Greeting isLoggedIn={this.state.isLoggedIn} onClick={this.state.isLoggedIn?this.loginBtn:this.logoutBtn}></Greeting>
                {button}
            </div>
            
        )
    }
}
export default Second
/* 


1. 组件传递参数 props
    组件名称采用大驼峰 (Camelcase)
2. State + 生命周期
    使用setState() 修改 State (不能直接修改State PS：this.state.comment = 'hello')
    State 状态异步更新 PS：this.setState((state,props)=>{
        counter:state.counter + props.increment
    })
    State 里的键值对数据可以单独拿出来进行更新 PS：this.setState({counter:xxx}) this.setState({date:xxx})
3. 事件处理
    事件命名采用小驼峰 (camelCase)
    使用 JSX 语法时需要传入一个函数作为事件处理函数，不是一个字符串 PS：<button onClick-{}> Active Lasers </button>
    在React中不能通过返回 false 的方式阻止默认行为。必须使用 preventDefault。PS：e.preventDefault()；e是一个合成事件不需要担心跨浏览器的兼容性问题
    为了在事件回调中使用 `this`，这个绑定是必不可少的。 PS：
        this.handleClick = this.handleClick.bind(this)
        handleClick(){
            this.setState(state=>{
                isToggleOn:!state.isToggleOn
            })
        }
        class 的方法默认是不会绑定this。若是忘记绑定this，当调用这个函数的时候 this 的值为 undefined。
        class fields 正确的绑定回调函数：
            handleClick = () => {
                console.log('this is', this)
            }
        使用箭头函数(不推荐)，在该回调函数作为 props 传入子组件时，这些组件可能会进行额外的重新渲染。建议在构造器中绑定或使用 class fields 语法来避免这类性能问题
            <button onClick={() => this.handleClick()}></button>
    事件处理程序传递参数
        <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
        <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
        上述两种方式是等价的，分别通过 箭头函数 和 Function.prototype.bind 来实现
        在这两种情况下，React的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显示的进行传递，而通过 bing 的方式，事件对象以及更多的参数将会被隐士的进行传递
4. 条件渲染


*/