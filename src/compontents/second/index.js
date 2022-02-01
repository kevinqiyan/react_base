import React from 'react';
import Greeting from './common/greeting'
import LoginButton from './common/loginButton'
import LogoutButton from './common/logoutButton'
import NumberTest from './common/numbers'
import FromTest from './common/form'
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
            date: new Date()
        })
    }
    handleClick = () => {
        alert('test')
        // console.log('this is', this)
    }
    loginBtn = () => {
        this.setState({ isLoggedIn: false })
    }
    logoutBtn = () => {
        this.setState({ isLoggedIn: true })
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
                <Greeting isLoggedIn={this.state.isLoggedIn} onClick={this.state.isLoggedIn ? this.loginBtn : this.logoutBtn}></Greeting>
                {button}
                <NumberTest></NumberTest>
                <FromTest></FromTest>
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
        && 与运算符
        ? : 三目运算符
        阻止组件渲染
            在组件的 render 方法中返回 null 并不会影响组件的生命周期
5. 列表 & Key
    万不得已可以使用元素索引 index 作为 key
        若列表的顺序可能会发生变化，不建议索引使用作为 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。React 默认使用索引作为列表项目的 key 值
        key 只是在兄弟节点之间必须为何一
        key 会传递信息给 React，但不会传递给组件。若组件中需要使用 key 属性的值，请使用其他属性名显式传递这个值
            ps：组件不能读取 props.key
    用 key 提取组件
            function ListItem(props) {
                // 正确！这里不需要指定 key：
                return <li>{props.value}</li>;
            }

            function NumberList(props) {
                const numbers = props.numbers;
                const listItems = numbers.map((number) =>
                    // 正确！key 应该在数组的上下文中被指定
                    <ListItem key={number.toString()} value={number} />
            );
            return (
                <ul>{listItems} </ul>
                );
            }

            const numbers = [1, 2, 3, 4, 5];
            ReactDOM.render(
                <NumberList numbers={numbers} />,
                document.getElementById('root')
            );
6. 表单
    在React里，HTML表单元素的工作方式和其他 DOM 元素有些不同，表单元素通常会保持一些内部的 state。
    受控组件
        在React中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新
        渲染表单的 React 组件还控制着用户输入过程中表单发生的操作，被 react 以这种方式控制取值的表单输入元素就叫做“受控组件”
7. 状态提升
    两个子组件的数据同步
        将子组件共同的数据提取到父组件中（props 是只读的）
            因为props是只读的，所以在React中可以通过使用“受控组件”来解决
            在父组件中定义子组件中需要触发的方法，当其中一个输入框发生变化则另一个输入框也跟随变化（通过重新设置值）
8. 组合 VS 继承 （重点）
    https://react.docschina.org/docs/composition-vs-inheritance.html
    在Facebook中没有发现需要使用继承来构建组件层次的情况（原文）

FAQ(整理)
    1. 调用 setState 是异步，若是需要确保每次调用都是使用最新的 state，需要给 setState 传递一个函数而不是一个对象
            incrementCount(){
                this.setState((state)=>{
                    return {count:state.count}
                })
            }
            handleSomething(){
                // 假设 this.state.count 从 0 开始
                this.incrementCount()
                this.incrementCount()
                this.incrementCount()
                // 如果在这里读取 this.state.count 它还是为 0
                // 但是，当 React 重新渲染该组件时，它会变为 3
            }
    2. 目前在事件处理函数内部的 setState 是异步的
*/