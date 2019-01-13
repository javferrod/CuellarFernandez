import Router from 'koa-router';
import { getPermissions, getID, updatePermissionStatus, retrieveUserPermissions } from '../database';
import { savePermission } from '../database';
import R from 'ramda';

var permissionManager = new Router({ prefix: '/permissions' });

permissionManager.post('/', async (ctx, next) => {
    const { auth } = ctx.request.body;

    ctx.response.body = await getPermissions(auth);
})

permissionManager.post('/client', async (ctx, next) => {
    const { auth } = ctx.request.body;

    ctx.response.body = { permissions: await retrieveUserPermissions(auth) };
})

permissionManager.post('/request', async (ctx, next) => {
    const { auth, codice } = ctx.request.body;
    
    let user = await getID(codice);

    if(R.isEmpty(user)){
        ctx.response.status = 400;
        return;
    }

    let permissionID = await savePermission(auth, user[0].id);

    if(R.isNil(permissionID))
        ctx.responde.status = 500;
    else
        ctx.response.status = 200;
})

permissionManager.post('/accept', async (ctx, next) => {
    const { permissionID, auth }  = ctx.request.body;

    let id = await updatePermissionStatus(permissionID, auth)

    if(id)
        ctx.response.status = 200;
    else
        ctx.response.status = 400;
})

export default permissionManager;