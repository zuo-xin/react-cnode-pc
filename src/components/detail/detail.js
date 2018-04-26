import React from 'react'
import axios from 'axios'
import util from '../util/util.js'
import classnames from 'classnames'
import Loading from '../loading/loading.js'
import { message } from "antd"

import style from './detail.scss'

class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showLoading:true,
            topic_title:"",
            topic_info:"",
            reply_info:"",
            reply_content:"",
            is_green:false,
            is_green_text:"",
            isauthor:false,
            greenObj:{
                good:"精华",
                top:"置顶"
            }
        }
    }
    componentDidMount(){
          const {match} = this.props;
          this.getData('/api/v1/topic/'+match.params.id)
    }
    getData(url){
        axios.get(url).then( (response) =>{
            this.setState({
                showLoading:false
            })
            this.setData(response.data.data)
        }).catch(function (error) {
            showLoading:false            
            message.error(error);
        });
    }
    setData(data){
        console.log(data)
        this.setState({
            topic_title:data.title,
            topic_info:`•发布于${util.formatDate(data.create_at)} •作者${data.author.loginname} •${data.visit_count}次浏览 •来自${util.tabObj[data.tab]}`,
            is_green:(data.top||data.good)?true:false
        })
    }
    render(){
        return (
            <div className="detail_box">
                <div className="detail">
                    <Loading showLoading={this.state.showLoading} />
                    <div className="topic_box">
                        <div className="topic_box_top">
                            <div className={classnames({topic_green:true,topic_status:true})}>置顶</div>
                            <div className="topic_title">{this.state.topic_title}</div>
                        </div>
                       
                        <div className="topic_info">{this.state.topic_info}</div>
                    </div>
                    <div className="reply_box">
                        <div className="reply_title">16回复</div>
                        <div className="reply_content">
                            <div className="reply_item">
                                <div className="reply_top">
                                    <img  className="reply_avator" src="https://avatars0.githubusercontent.com/u/31952729?v=4&s=120" />
                                    <div className="reply_info">
                                        <div className="reply_author">zeerain</div>
                                        <div className="replay_time"> 1楼•9 小时前</div>
                                        <span className={classnames({isauthor:true})}></span>
                                    </div>
                                </div>
                                <div className="replay_content">@nullcc 爱学，但是不知道学啥，怎么学习</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Detail