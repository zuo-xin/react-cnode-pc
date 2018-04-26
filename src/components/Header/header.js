import React from 'react'
import style from './header.scss'
import {Link } from "react-router-dom";


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:""
        }
    }

    handleChange(e){
        e.stopPropagation();
        this.setState({
            value: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        let str = this.state.value;
        let query = 'site:cnodejs.org+'+str
        location.href = `http://www.google.com/search?q=${query}`
    }
    render(){
        return (
            <div id="header">
                <div className="head">
                    <Link className="logo" to="/"></Link>
                    {/* <form onSubmit={(e)=>this.handleSubmit(e)} className="form">
                        <input onChange={(e) =>this.handleChange(e)} className="search" />
                        <button type="submit" className="sbtn"></button>
                    </form> */}
                </div>
            </div>
        )
    }
}

export default Header