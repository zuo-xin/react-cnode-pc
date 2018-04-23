import React from 'react'
import classnames from 'classnames'
import style from './loading.scss'



class Loading extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={classnames({showLoading:this.props.showLoading,loading:true})}>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p>Loading...</p>
            </div>
        )
    }
}

module.exports = Loading