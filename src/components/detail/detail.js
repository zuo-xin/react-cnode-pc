import React from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Loading from '../loading/loading.js'
import { message } from "antd"

import style from './detail.scss'

class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showLoading:true
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
    }
    render(){
        return (
            <div className="detail">
                <Loading showLoading={this.state.showLoading} />
                <div className="topic_box">
                    <div className={classnames({topic_green:true,topic_status:true})}>置顶</div>
                    <div className="topic_title">前端女生转行</div>
                    <div class="topic_info"> 发布于 4 小时前  作者 jiayin3204  271 次浏览  来自 问答</div>
                </div>
                <div className="reply_box">
                    <div className="reply_title">16回复</div>
                    <div className="reply_content">
                        <div className="reply_item">
                            <div className="reply_top">
                                <img className="reply_avator"href="https://avatars2.githubusercontent.com/u/19531988?v=4&s=120" />
                                <div className="reply_info"></div>
                                <span className={classnames({isauthor:true})}></span>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

module.exports = Detail