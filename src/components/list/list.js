import React from 'react'
import axios from 'axios'
import { message, Pagination } from "antd"
import Loading from '../loading/loading.js'
import classnames from 'classnames'
import {Link} from "react-router-dom"
import util from '../util/util.js'
import style from './list.scss'

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:"",
            curPage:"1",
            showLoading:true
        }
        this.changePage = this.changePage.bind(this)
    }

    changePage(page) {
        this.setState({
          curPage: page,
          list:"",
          showLoading:true
        })
        const {location} = this.props;
        let tab = util.getQueryStringArgs(location)?(util.getQueryStringArgs(location)).tab:"all"
        this.getList('/api/v1/topics?page='+page+'&limit=15&tab='+tab)
      }
    componentDidMount(){
        const {location} = this.props;
        let tab = util.getQueryStringArgs(location)?(util.getQueryStringArgs(location)).tab:"all"
        this.getList('/api/v1/topics?page=1&limit=15&tab='+tab)
    }
    componentWillReceiveProps(nextProps){
        
        const {location} = nextProps;
        const prevLocation = this.props.location;
        if(location.pathname ==="/"){

            this.setState({
                list:"",
                showLoading:true
            })
        let tab = util.getQueryStringArgs(location)?(util.getQueryStringArgs(location)).tab:"all"
        let prevtab = util.getQueryStringArgs(prevLocation)?(util.getQueryStringArgs(prevLocation)).tab:"all"
        this.setState({
            curPage:(tab===prevtab)?(util.getQueryStringArgs(location)).page:"1"
        })
        this.getList('/api/v1/topics?page='+((tab===prevtab)?(util.getQueryStringArgs(location)).page:"1")+'&limit=15&tab='+tab)
    }else{

    }
    }
    getList(url){
        axios.get(url).then( (response) =>{
            this.setState({
                showLoading:false
              })
            this.setList(response.data.data)
        }).catch(function (error) {
            showLoading:false            
            message.error(error);
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
                    <Link to={`/detail/${item.id}`} className="title" title={item.title}>{item.title}</Link>
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
            <div>
                <Loading showLoading={this.state.showLoading} />
                <div className="item_box">{this.state.list}</div>
                <Pagination
                    onChange={this.changePage}
                    total={400}
                    current={Number.parseInt(this.state.curPage)}
                />
            </div>
        )
    }
}

export default List