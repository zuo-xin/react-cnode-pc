import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header/header.js'


class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <Header />
        )
    }
}

module.exports = App