/**
 * passport验证
 * Created by 王佳欣 on 2018/4/30.
 */
import passport from 'koa-passport';
import {Strategy} from 'passport-http-bearer';
import Administrator from '../dao/models/administrator';
import JWT from  'jsonwebtoken';
import {TOKE_SECRET_KEY} from '../consts';

passport.use(new Strategy(
    function (token, done) {
        JWT.verify(token, TOKE_SECRET_KEY, (error, decoded) => {
            if (error) {
                return  done(null, false, { msg: error.name });
            }
            Administrator.findByName(decoded.name).then((administrator) => {
                if (!administrator) {
                    return  done(null, false, { msg: 'Incorrect token.' })
                }
                return done(null, administrator);
            }).catch((error) => {
                return done(null, false, {msg: JSON.stringify(error)});
            });
        });
    }
));
