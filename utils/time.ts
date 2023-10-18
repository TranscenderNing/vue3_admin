export const getTime = () => {
    let msg = ''
    let hours = new Date().getHours()
    if(hours <= 9){
        msg = '早上'
    }else if(hours <= 12){
        msg = '中午'
    }else if(hours <= 19){
        msg = '下午'
    }else{
        msg = '晚上'
    }
    return msg
}