const md5 = require('md5');

const { User } = require('../config/Index')

class ShopUser {

    async register(ctx){
        let body = ctx.request.body
        if(body.nick_mobile||body.nick_pass){
            try{
                await User.findOrCreate({
                    where:{nick_mobile : body.nick_mobile},
                    defaults: {
                        nick_mobile : body.nick_mobile,
                        nick_pass : md5(body.nick_pass),
                        nick_icon : body.nick_icon,
                        nick_name : body.nick_name
                    }

                }).spread((user, created) => {
                    if(created === false) {
                        ctx.body = {
                            code : 0,
                            message : '用户已存在',
                            data : {}
                        }
                    }else{
                        ctx.body = {
                            code : 1,
                            message : '用户创建成功',
                            data : {}
                        }
                    }
                })

            }catch (e) {
                console.log(e.message)
                ctx.body = {
                    code : 0,
                    message : '系统错误',
                    data : {}
                }
            }

        }else{
            ctx.body = {
                code : 0,
                message : '参数不存在',
                data : {}
            }
        }
    }
    async login(ctx){
        // console.log(ctx.request.body,'ctx.request.body')
        let body = ctx.request.body
        if(!body.nick_mobile||!body.nick_pass){
            ctx.body = {
                code : 0,
                message :' 账号或密码不存在',
                data : {}
            }
            return
        }
        try {
            let user = await User.find({
                where: {
                    nick_mobile : body.nick_mobile,
                    nick_pass : md5(body.nick_pass)
                },
                attributes:{
                    exclude : ['nick_pass']
                }
            })
            if(user){
                ctx.session.user = user
                console.log(ctx.session.user,1111111111111)
                ctx.body = {
                    code : 1,
                    message :'登录成功',
                    data :ctx.session.user
                }
            }else{
                if(user.nick_mobile){
                    ctx.body = {
                        code : 0,
                        message :'账号或密码错误',
                        data :{}
                    }
                }else{
                    ctx.body = {
                        code : 0,
                        message :'用户不存在',
                        data :{}
                    }
                }
            }

        }catch (e) {
            ctx.body = {
                code : 0,
                message :'系统错误',
                data :{}
            }
        }
    }
    loginOut(ctx) {
        try {
            ctx.session = null
            ctx.body = {
                code:1,
                message:'退出成功',
                data: {}
            }
        }catch (e) {
            ctx.body = {
                code:0,
                message :e.message,
                data: {}
            }
        }
    }


}



module.exports  = {ShopUser: new ShopUser()}
