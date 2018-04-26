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
            greenInfo:"",
            reply_hide:false,
            topic_content:"",
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
        let _html = "";
        if(data.replies.length){
            let replies = data.replies;
            _html = replies.map((item,index,arr)=>
                  <div className="reply_item" key={index}>
                    <div className="reply_top">
                        <img  className="reply_avator" src={item.author.avatar_url} />
                        <div className="reply_info">
                            <div className="reply_author">{item.author.loginname}</div>
                            <div className="reply_time">{`${Number.parseFloat(index)+1}楼 • ${util.formatDate(item.create_at)}前`}</div>
                            <span className={classnames({isauthor:(data.author.loginname===item.author.loginname)?true:false})}>{(data.author.loginname===item.author.loginname)?"作者":""}</span>
                        </div>
                    </div>
                    <div className="replay_content" dangerouslySetInnerHTML={{__html:item.content}}></div>
                </div>
            )
        }else{
            _html = <div className="reply_item">暂无数据</div>
        }
        this.setState({
            topic_title:data.title,
            topic_info:`• 发布于${util.formatDate(data.create_at)} • 作者${data.author.loginname} • ${data.visit_count}次浏览 • 来自${util.tabObj[data.tab]}`,
            is_green:(data.top||data.good)?true:false,
            greenInfo:data.top?this.state.greenObj.top:((data.good)?this.state.greenObj.good:""),
            reply_info:data.replies.length?(data.replies.length+'条回复'):"",
            reply_hide:data.replies.length?false:true,
            topic_content:data.content,
            reply_content:_html
        })
    }
    render(){
        document.title=this.state.topic_title
        return (
            <div className="detail_box">
                <div className="detail">
                    <Loading showLoading={this.state.showLoading} />
                    <div className="topic_box">
                        <div className="topic_box_top">
                            <div className={classnames({topic_green:this.state.is_green,topic_status:true})}>{this.state.greenInfo}</div>
                            <div className="topic_title">{this.state.topic_title}</div>
                        </div>
                        <div className="topic_info">{this.state.topic_info}</div>
                        <div className="topic_conetnt" dangerouslySetInnerHTML={{__html:this.state.topic_content}}></div>
                    </div>
                    <div className={classnames({reply_box:true,reply_hide:this.state.reply_hide})}>
                        <div className="reply_title">{this.state.reply_info}</div>
                        <div className="reply_content">{this.state.reply_content}
                            {/* <div className="reply_item">
                                <div className="reply_top">
                                    <img  className="reply_avator" src="https://avatars0.githubusercontent.com/u/31952729?v=4&s=120" />
                                    <div className="reply_info">
                                        <div className="reply_author">zeerain</div>
                                        <div className="replay_time"> 1楼•9 小时前</div>
                                        <span className={classnames({isauthor:true})}></span>
                                    </div>
                                </div>
                                <div className="replay_content">@nullcc 爱学，但是不知道学啥，怎么学习</div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Detail