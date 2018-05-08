/**
 * 用于user 的 passport验证
 */

import passport from 'koa-passport';
import { Strategy } from 'passport-http-bearer';
import User from '../dao/models/user';
import JWT from 'jsonwebtoken';
import { TOKE_SECRET_KEY } from '../consts';

passport.use(new Strategy(
    function (token, done) {
        JWT.verify(token, TOKE_SECRET_KEY, (error, decoded) => {
            if (error) {
                return done(null, false, { msg: error.name });
            }
            User.findByName(decoded.name).then((user) => {
                if (!user) {
                    return done(null, false, { msg: 'Incorrect token.' })
                }
                return done(null, user);
            }).catch((error) => {
                return done(null, false, { msg: JSON.stringify(error) });
            });
        });
    }
));
