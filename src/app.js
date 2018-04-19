import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import Header from './components/header/header.js'
import Topic from './components/topic/topic.js'



class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Topic />
                </div>
            </BrowserRouter>
        )
    }
}

export default App