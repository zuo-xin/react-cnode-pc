import React from 'react'
import style from './topic.scss'
import TopNav from '../topnav/topnav.js'
import List from '../list/list.js'
import {Route } from "react-router-dom";


class Topic extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="topic">
                <TopNav></TopNav>
                <Route  component={List} />
            </div>
        )
    }
    
}
export default Topic