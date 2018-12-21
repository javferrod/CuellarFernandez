import Router from 'koa-router';
var dataRecollector = new Router({ prefix: '/data' });

import { isValidParameter } from '../common/validators';
import { saveTemporalParameter } from '../database/temporal';

dataRecollector.post('/', (ctx, next) => {
    let user = ctx.request.body.auth;
    let parameters = ctx.request.body.parameters;

    if(!user || !parameters){
        ctx.response.status = 400;
        return;
    }
    processParameters(parameters, user);

    ctx.response.status = 200;
});

function processParameters(parameters, user){
    console.log(parameters);
    console.log(parameters.filter(isValidParameter));

    parameters
        .filter(isValidParameter)
        .forEach(saveTemporalParameter(user));
}


export default dataRecollector;