import React,{useState,useEffect } from "react";

// class Home extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             date: new Date()
//         }
//     }
// }
const Home = (props) => {
    const [title, setTitle] = useState('Kevin')
    // 副作用
    useEffect(() => {
        document.title = `测试${title}`
    });
    
    return (
        <div>
            <h2>{title}, 测试</h2>
            <button onClick={() => setTitle('test')}>setTitle</button>
            <button onClick={() => setTitle('kevin')}>setTitle2</button>

        </div>
    )
}

export default Home