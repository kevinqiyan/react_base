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
9. Context 
    主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差
    API: 
        React.createContext
            创建一个Context对象。当React渲染一个订阅了这个Context对象的组件，这个组件会从组件树中离自身那个匹配的 Provider 中读取到当前的 context 值
            只有当组件所处的树中没有匹配到Provider时，其defaultValue参数才会生效。
                注意：将undefined传递给 Provide 的 value时，消费组件的 defaultValue不会生效
        每一个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅context的变化
10. 错误边界
      部分UI的js错误不应该导致整个应用崩溃，为了解决这个问题，React 16引入了一个新的概念 --- 错误边界
      错误边界时一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。
      注意：
            错误边界仅可以捕获其子组件的错误，无法捕获其自身的错误。
11. Fragments
        React中的一个常见模式时一个组件返回多个元素。Fragments允许将子列表分组，无需向 DOM 添加额外节点
        用法：
                正确：可以输出 <td>Hello</td> <td>World</td>
                class Columns extends React.Component {
                    render() {
                        return (
                        <React.Fragment>
                            <td>Hello</td>
                            <td>World</td>
                        </React.Fragment>
                        );
                    }
                }
                错误：如果在组件中的 render() 中使用父div，则生成的 HTML 将无效
                class Columns extends React.Component {
                    render() {
                        return (
                        <div>
                            <td>Hello</td>
                            <td>World</td>
                        </div>
                        );
                    }
                }
12. 高阶组件
        高阶组件时参数为组件，返回值为新组件的函数。组件时将props转换为 UI，而高阶组件是将组件转换为另一个组件
13. 语法糖
        指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。
        JSX 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。
14. JSX
        用户定义的组件必须以大写字母开头，如果需要一个以小写字母开头的组件，则在JSX中使用它之前，必须将它赋值给一个大写字母开头的变量
        Props 默认值是 true；当 props.messages 是空数组时，0 仍然会被渲染，如果需要渲染 false、true、null、undefined等值时，需要先将它们转换为字符串
15. Diffing 算法
        比对不同类型的元素
            当根节点为不同类型的而元素时，React会拆卸原有的树并建立起新的树。
            当拆卸一个树时，对应DOM节点也会被销毁。组件实例将执行 componentWillUnmount()方法。当建立一颗新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中。组件实例将执行 componentWillMount 方法。紧接着 componentDidMount() 方法。所有跟之前的树所关联的 state 也会被销毁。
        比对同一类型的元素
            当对比两个相同类型的 React 元素时，React 会保留 DOM 节点，仅对比及更新有改变的属性
            通过比对这两个元素，React 知道只需要修改 DOM 元素上的 className 属性。
            当更新 style 属性时，React 仅更新有所更变的属性
        比对同一类型的组件元素
            当一个组件更新时，组件实例保持不变，这样 state 在跨越不同的渲染时保持一致。React 将更新该组件实例的 props 以跟最新的元素保持一致，并且调用该实例的 componentWillReceiveProps() 和 componentWillUpdate() 方法。
            下一步，调用 render() 方法，diff 算法将在之前的结果以及新的结果中进行递归。
        对子节点进行递归
            在默认条件下，当递归 DOM 节点的子元素时，React 会同时便利两个子元素的李彪；当产生差异时，生成一个 mutation。
            在子元素列表末尾新增元素时，更变开销比较小
16. React API
        https://react.docschina.org/docs/react-component.html
17. Hook
        简介
            Hook 不能在 class 组件中使用，Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。\
        概览
            Hook 是向下兼容的，可以在不编写class 的情况下使用 state 以及其他的 React 特性
        state Hook
            声明变量
            PS：const [count,setCount] = useState(0)  count 是声明变量，setCount 是对 count 进行赋值时进行调用；
                这种 JavaScript 语法叫数组解构。它意味着我们同时创建了 count 和 setCount 两个变量，count 的值为 useState 返回的第一个值，setCount 是返回的第二个值
                当我们使用 useState 定义state变量时候，它返回一个有两个值的数组。第一个值是当前的state，第二个值是更新 state 的函数。使用 [0] [1]来访问有点令人困惑，所以使用数组解构的原因
        Effect Hook
            1、可以在组件渲染后实现各种不同的副作用。副作用可能需要清除，所以需要返回一个函数 PS：return xxx（函数）、
            2、可以通过跳过 Effect 进行性能优化。PS：
                useEffect(()=>{
                    document.title = `It's ${count} times`
                },[count]) // 仅在 count 更改时更新
                React 会在渲染时将前一次渲染的数据和后一次渲染的数据进行对比，如果所有的元素都是相等的，React 会跳过这个 effect，这就实现了性能的优化
            3、如果想执行只运行一次的 effect （仅在组件挂在和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React effect 不依赖于 props 或 state 中的任何值，
                所以它永远都不需要重复执行。这并不属于特殊情况 -- 它依然遵循依赖数组的工作方式
        Hook 规则
            1、react 通过 Hook 调用顺序来知道 state 对应的哪个 useState，Hook 的调用顺序在每次渲染中都是相同的，所以它能够正常工作。只要 Hook 的调用顺序在多次渲染之间保持一致，
                React就能正确地将内部 state 和对应的 Hook 进行关联
            2、ESLint 插件
                eslint-plugin-react-hooks 
                npm install eslint-plugin-react-hooks --save-dev
                yarn add eslint-plugin-react-hooks --dev
        自定义hook
            自定义 Hook 是一个函数，其名称以 ‘use’ 开头，函数内部可以调用其他的 Hook


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
        注意：
            调用 setState 其实时异步的，不要指望在调用 setState 之后，this.state 会立即映射新的值。如果需要基于当前的 state 来计算出新的值，应该传递一个函数，而不是一个对象
            react 不同步更新 this.state原因：
                1、在开始渲染之前，React会有意地进行等待，直到所有在组件的时间处理函数内部调用的 setState() 完成之后。这样就可以通过避免不必要的重新渲染来提升细嫩那个
                2、这样会破坏props 和 state 之间的一致性，造成一些难以 debug 的问题
                3、这样会让一些我们正在实现的新功能变得无法实现
    3. React组件 AJAX and APIs
        AJAX
            axios、jQuery ajax、window.fetch
        发送请求
            建议在 componentDidMount 中发送请求更新组件的state
            注意：
                在使用fetch请求时不能使用 catch() 来捕获错误 因为 catch 捕获异常会掩盖组件本身可能产生的 bug
    4. Virtual DOM（虚拟DOM）
        是一种编程概念。在这个概念里，UI以一种理想化的，或者说 虚拟的 表现形式被保存于内存中，并通过 ReactDom 等类库使之与真实的DOM 同步。这一过程叫做协调。
        与其将虚拟DOM视为一种技术，不如说它是一种模式

*/