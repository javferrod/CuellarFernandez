import Router from 'koa-router';
import { getPermissions, getID } from '../database/search';
import { savePermission } from '../database/insert';
import R from 'ramda';

var permissionManager = new Router({ prefix: '/permissions' });

permissionManager.post('/', async (ctx, next) => {
    const { id } = ctx.request.body;

    ctx.response.body = await getPermissions(id);
})

permissionManager.post('/request', async (ctx, next) => {
    const { id, codice } = ctx.request.body;
    
    let user = await getID(codice);

    console.log(user);

    if(R.isEmpty(user)){
        ctx.response.status = 400;
        return;
    }

    let permissionID = await savePermission(id, user[0].id);

    if(R.isNil(permissionID))
        ctx.responde.status = 500;
    else
        ctx.response.status = 200;
})

export default permissionManager;