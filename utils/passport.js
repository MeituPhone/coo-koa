/**
 * passport验证
 * Created by 王佳欣 on 2018/4/30.
 */
import passport from 'koa-passport';
import {Strategy} from 'passport-http-bearer';
import Administrator from '../dao/models/administrator';
import JWT from  'jsonwebtoken';
import {TOKEN_SECRET_KEY} from '../consts';
import Msg from '../consts/msg';


passport.use('admin',new Strategy(
    
    function (token, done) {
        // 验证token
        JWT.verify(token, TOKEN_SECRET_KEY, (error, decoded) => {
            if (error) {
                return  done(null, false, { msg: error.name });
            }

            Administrator.findByName(decoded.name).then((administrator) => {
                if (!administrator) {
                    return  done(null, false, {...Msg.TOKEN_ERROR});
                }
                return done(null, administrator);
            }).catch((error) => {
                return done(null, false, {msg: JSON.stringify(error)});
            });
        });
    }
));
