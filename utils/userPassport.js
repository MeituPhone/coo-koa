/**
 * 用于user 的 passport验证
 */

import passport from 'koa-passport';
import { Strategy } from 'passport-http-bearer';
import User from '../dao/models/user';
import Administrator from '../dao/models/administrator';
import JWT from 'jsonwebtoken';
import { USER_TOKEN_SECRE_KEY } from '../consts';
import { TOKEN_SECRET_KEY } from '../consts'

passport.use('user', new Strategy(
    async function (token, done) {
        let isAdmin = false;
        //admin
        await JWT.verify(token, TOKEN_SECRET_KEY, async (error, decoded) => {
            if (error) {
                return;
            }
            await Administrator.findByName(decoded.name).then((Administrator) => {
                if (Administrator) {
                    isAdmin = true;
                    return done(null, Administrator);
                }
            }).catch((error) => {
                return;
            });
        });

        //user
        !isAdmin && JWT.verify(token, USER_TOKEN_SECRE_KEY, (error, decoded) => {
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
