const util = {
    getQueryStringArgs(str) {
        let qs = str.search.length > 0 ? str.search.substring(1) : "",
            args = {},
            items = qs.split("&"),
            len = items.length,
            name = null,
            value = null;
        if (qs.length == 0) {
            return null;
        };
        for (var i = 0; i < len; i++) {
            let item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            args[name] = value;
        }
        return args;
    },
    tabObj:{
        "share":"分享",
        "ask":"问答",
        "job":"招聘",
        "dev":"测试",
        "good":"精华",
        "top":"置顶"
    },
    formatDate(date){
        let last_reply_time = new Date(date),
            now = Date.now(),
            minute = 1000*60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7,
            month = day * 30,
            year = month * 12,
            result = "";
        let diffTime = now - last_reply_time;
        if(diffTime<0){
            result = "--"
            return result  
        }
        let minC = diffTime/minute,
            hourC = diffTime/hour,
            dayC = diffTime/day,
            monthC = diffTime/month,
            yearC = diffTime/year;
        if(yearC>=1){
            result = Math.floor(yearC) + "年前"
            return result  
        }else if(monthC>=1 && monthC< 12){
            result = Math.floor(monthC) + "个月前"
            return result  
        }else if(dayC>=1&&dayC<30){
            result = Math.floor(dayC) + "天前"
            return result  
        }else if(hourC>=1 && hourC<24){
            result = Math.floor(hourC) + "小时前"
            return result  
        } else if(minC>=1&&minC<60){
            result = Math.floor(minC) + "分钟前"
            return result  
        }else if(minC>0&&minC<1){
            result = "刚刚"
            return result  
        }
              
}

}
export default util