import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter,Route } from "react-router-dom";
import Header from './components/header/header.js'
import Topic from './components/topic/topic.js'
import Detail from './components/detail/detail.js'



class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Route path='/' exact  component={Topic} />
                    <Route path="/detail/:id" exact  component={Detail} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App