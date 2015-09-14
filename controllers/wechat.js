/**
 * Created by I309908 on 9/14/2015.
 */
var wechat = require('wechat');

exports.subscribe = wechat("wechat_token",function(req, res, next){
    var message = req.weixin;
    console.log(message);
    if((message.MsgType == 'event') && (message.Event == 'subscribe'))
    {
        var refillStr = "1. 点击记录团队充值"

        var consumeStr = "2. 点击记录团队消费"
        var deleteStr = "3. 点击回退记录"
        var historyStr = "4. 点击查询历史记录"

        var emptyStr = "          ";
        var replyStr = "感谢你的关注！" + "\n"+ emptyStr + "\n" + refillStr + "\n"+ emptyStr + "\n" + consumeStr
            + "\n"+ emptyStr + "\n" + deleteStr + "\n"+ emptyStr + "\n" + historyStr;
        res.reply(replyStr);
    }
});