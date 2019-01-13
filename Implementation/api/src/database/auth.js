import { knex } from './init';
import { TOKENS, USERS } from './names';
import { leftJoin } from './common';
import UIDGenerator from 'uid-generator';
import R from 'ramda';
import moment from 'moment';

const tokenGenerator = new UIDGenerator();

async function getToken(user, password){
    const filter = R.pipe(
        leftJoin(TOKENS, 'user'),
        filterByUsernameAndPassword(user, password)
    )

    return filter(knex(USERS).select('token', 'expiration', `${TOKENS}.id`));
}

async function getUserByToken(token){
    const filter = filterByToken(token);

    return filter(knex(TOKENS).select('user', 'expiration'))
}

// Generates and saves a new token for the given user.
async function generateToken(user, password){
    let token = await tokenGenerator.generate();
    let userID = await getUserID(user, password);

    let data = {
        token: token,
        user: userID[0].id,
        expiration: moment().add(7, 'days').format('YYYY-MM-DD')
    }

    return knex(TOKENS).returning('token').insert(data);
}

async function deleteToken(tokenEntry){
    let id = R.head(tokenEntry).id

    return knex(TOKENS).where('id', id).del();
}

export { getToken, getUserByToken, generateToken, deleteToken }


// HELPERS

const getUserID = (user, password) => {

    const filter = R.pipe(
        filterByUsernameAndPassword(user, password)
    );

    return filter(knex(USERS).select('id'));
}

const filterByUsernameAndPassword = R.curry((user, password, query) => {
    query.where(`${USERS}.username`, user)
    query.where(`${USERS}.password`, password)

    return query;
})

const filterByToken = R.curry((token, query) => {
    query.where(`${TOKENS}.token`, token)

    return query;
});