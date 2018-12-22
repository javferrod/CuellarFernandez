import R from 'ramda';

/*
* This class constains all the constraints
* a client may made and holds the results 
* when the searchs are performed.
* It offers helpers too
*/

export default class Query {
    constructor(query){

        this.location = query.location;
        this.weight = query.weight;
        this.hearthrate = query.hearthrate;
        this.residence = query.residence;
        this.age = query.age;
        this.genre = query.genre;

        this.results = [];
    }

    haveWeight(){
        return !R.isNil(this.weight);
    }

    haveHearthRate(){
        return !R.isNil(this.hearthrate);
    }

    haveLocation(){
        return !R.isNil(this.location);
    }


    buildResults(){

    }
}

const isFixedQuery = R.compose(isNotEmpty, R.props('residence', 'age', 'genre'));
const isTemporalQuery = R.compose(isNotEmpty, R.props('location', 'weight', 'hearthrate'));
const haveWeightOrHearthRate = R.compose(isNotEmpty, R.props('weight', 'hearthrate'));

const anyNotNil = R.any(R.isNil)
const haveProps = (props, object) => R.compose(isNotEmpty, R.props(props))(object);

const isNotEmpty = R.compose(R.not, R.isEmpty);