/*
1、当前支付50金币，参与第二天打开
2、第二天早上5:00 - 8:00 参与打卡
3、支付50金币，参与第二天打开

[task_local]
# 电信摇大奖
0 7 * * * https://raw.githubusercontent.com/Jesn/Rich.Bento/dev/rich_10000_draw lottery.js, tag=电信摇大奖, enabled=true
*/


const $ = new Env('电信摇大奖');
const notify = $.isNode() ? require('./sendNotify') : '';
let openIds = [], allMessage = '', lotteries = [], count = 10

!(async () => {
    try {
        if (process.env.DX_OPENID) {
            openIds = process.env.DX_OPENID.split('&');
            for (let index = 0; index < openIds.length; index++) {
                $.index = index + 1;
                $.openid = openIds[index]
                await drawLottery();
            }
        } else {
            allMessage += '暂无OpenID，请添加DX_OPENID环境变量，多个用&符号分隔';
        }

        if ($.isNode()) {
            if (lotteries) {
                allMessage += `今日中奖为:${lotteries.join(',')}`
                await notify.sendNotify(`${$.name}`, allMessage)
            } else {
                await notify.sendNotify(`${$.name}`, '今日未中奖')
            }
        }
    } catch (e) {
        $.logErr(e)
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        // $.done();
    })


function drawLotteryUrl() {
    return {
        "url": "https://wx.ah.189.cn/wxs/ahdxcj/cj.do",
        "raw_url": "https://wx.ah.189.cn/wxs/ahdxcj/cj.do",
        "method": "post",
        "cookies": {
            "JSESSIONID": "C803474E2CBF36C0D24A2AD69778487F.jvm80"
        },
        "headers": {
            "Host": "wx.ah.189.cn",
            "Accept": "*/*",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://wx.ah.189.cn/wxs/ahdxcj/index2.do?phone=19159003216&sign=b25969fabec9151fecf8a152c7df9645",
            "Accept-Language": "en-us,en"
        },
        "body": `openid=${$.openid}&latnid=551&sign=b25969fabec9151fecf8a152c7df9645&qd=yhq"`

    }
}
function drawLottery() {
    return new Promise(async resolve => {
        $.post(drawLotteryUrl(), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网络重试`);
                } else {
                    data = JSON.parse(data);
                    console.log(data);
                    if (data.result.indexOf('没有抽奖机会了') !== -1 && count > 0) {
                        lotteries.push(data.name)
                        setTimeout(() => {
                            await drawLottery()
                            count = count - 1;
                        }, 2000);


                    } else {
                        console.log(data.result)
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}