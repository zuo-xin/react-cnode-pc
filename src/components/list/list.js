import React from 'react'
import axios from 'axios'
import classnames from 'classnames'
import {Link} from "react-router-dom"
import util from '../util/util.js'
import style from './list.scss'

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:""
        }
    }
    componentDidMount(){
        const {location} = this.props;
        let tab = util.getQueryStringArgs(location)?(util.getQueryStringArgs(location)).tab:"all"
        this.getList('/api/v1/topics?page=1&tab='+tab)
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        // console.log(this.props)
        this.setState({
            list:""
        })
        const {location} = nextProps;
        
        let tab = util.getQueryStringArgs(location)?(util.getQueryStringArgs(location)).tab:"all"
        console.log(tab)
        alert(tab)
        this.getList('/api/v1/topics?page=1&tab='+tab)
    }
    getList(url){
        axios.get(url).then( (response) =>{
           this.setList(response.data.data)
        }).catch(function (error) {
            console.log(error);
        });
    }
    setList(data){
        let _html = "";
        if(data.length){
            _html = data.map((item,index,arr)=>
                 <div className="item" key={index}>
                    <span className="avator" title={item.author.loginname}>
                        <img src={item.author.avatar_url} />
                    </span>
                    <div className="count">
                        <span className="reply_count">{item.reply_count}</span>
                        <span className="visit_count">/{item.visit_count}</span>
                    </div>
                    <span className={classnames({top:item.top||item.good,tab:true})}>{item.top?util.tabObj.top:(item.good?util.tabObj.good:util.tabObj[item.tab])}</span>
                    <Link to={`/detail/:${item.good}`} className="title" title={item.title}>{item.title}</Link>
                    <span className="last_reply_time">{util.formatDate(item.last_reply_at)}</span>
                </div>
            )
        }else{
            _html = <div className="item">暂无数据</div>
        }
        this.setState({
            list:_html
        })
    }
    reloadPage(){
        this.setList()
    }
    render(){
        return(
            <div className="item_box">{this.state.list}</div>
        )
    }
}

export default List