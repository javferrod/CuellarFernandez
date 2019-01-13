import Router from 'koa-router';
import { saveUser, saveClient, getToken, generateToken, getUserByToken } from '../database';
import R from 'ramda';


var authRouter = new Router({prefix: '/auth'});

authRouter.post('/login', async (ctx, next) => {
    const { user, password } = ctx.request.body;

    let tokenEntry = await getToken(user, password);
    var token;

    if(passwordWrong(tokenEntry)){
        ctx.response.status = 403;
        return;
    }

    if(isTokenNil(tokenEntry) || isTokenExpired(tokenEntry))
        token = R.head(await generateToken(user, password));
    else
        token = extractToken(tokenEntry);

    ctx.response.body = { token: token };
});

authRouter.post('/register-user', async (ctx, next) => {
    const {username, password, name, residence, gender, birthdate, codice}= ctx.request.body;
    
    const haveAll = has(['username', 'password', 'name', 'residence', 'gender', 'birthdate', 'codice']);

    if(! haveAll(ctx.request.body) ){
        ctx.response.status=400;
        return;
    }

    let id = await saveUser(username, password, name, residence, gender, birthdate, codice);

    if(R.isNil(id))
        ctx.responde.status = 500;
    else
        ctx.response.status = 200;
});

authRouter.post('/register-client', async (ctx, next) => {
    const {username, password, name }= ctx.request.body;

    let id = await saveClient(username, password, name);

    if(R.isNil(id))
        ctx.responde.status = 500;
    else
        ctx.response.status = 200;
});

const authMiddleware = async (ctx, next) => {
    const { token } = ctx.request.body;

    if(R.isNil(token)){
        ctx.response.status = 403;
        return;
    }

    let authData = await getUserByToken(token);

    if(R.isEmpty(authData) || isTokenExpired(authData) ){
        ctx.response.status = 403;
        return;
    }

    ctx.request.body = { ...ctx.request.body, auth: extractUser(authData) }

    await next();
}


const passwordWrong = R.isEmpty;

const isTokenExpired = R.pipe(
    R.head,
    R.prop('expiration'),
    expiration => new Date(expiration),
    expiration => expiration < new Date()
)

const extractToken = R.pipe(
    R.head,
    R.prop('token')
)

const extractUser = R.pipe(
    R.head,
    R.prop('user')
)

const isTokenNil = R.pipe(
    extractToken,
    R.isNil
)


const has = props => R.pipe(
    R.pick(props),
    R.keys,
    R.length,
    R.equals(R.length(props))
);

export { authRouter, authMiddleware };