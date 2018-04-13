import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import style from './header.scss'


class Header extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div id={style.header}>
                <div className={style.head}>
                    <Link className={style.logo} to="/"></Link>
                    <input className={style.search} />
                </div>
            </div>
        )
    }
}

export default Header