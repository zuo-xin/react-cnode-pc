import React from 'react'
import style from './topnav.scss'
import classnames from 'classnames'
import { Link, withRouter } from "react-router-dom";

import util from '../util/util.js'

class TopNav extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {location} = this.props;
        //console.log(location)
        let tab = util.getQueryStringArgs(location)?(util.getQueryStringArgs(location)).tab:"";
        return(
            <ul className="topnav">
                <li>
                    <Link className={classnames({active:tab===""})}   to={{pathname: '/'}}>全部</Link>
                </li>
                <li>
                    <Link className={classnames({active:tab==="good"})}   to={{pathname: '/', search: '?tab=good'}}>精华</Link>
                </li>
                <li>
                    <Link className={classnames({active:tab==="share"})}  to={{pathname: '/', search: '?tab=share'}}>分享</Link>
                </li>
                <li>
                    <Link className={classnames({active:tab==="ask"})}  to={{pathname: '/', search: '?tab=ask'}}>问答</Link>
                </li>
                <li>
                    <Link className={classnames({active:tab==="job"})}  to={{pathname: '/', search: '?tab=job'}}>招聘</Link>
                </li>
                <li>
                    <Link className={classnames({active:tab==="dev"})}  to={{pathname: '/', search: '?tab=dev'}}>客户端测试</Link>
                </li>
            </ul>
        )
    }

}
const TopNavWithRouter = withRouter(TopNav)
export default TopNavWithRouter