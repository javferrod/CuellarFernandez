import R from 'ramda';

/*
* This class constains all the constraints
* a client may made and holds the results 
* when the searchs are performed.
* It offers helpers too
*/

export default class Query {
    constructor(query){
        
        this.temporalParameters = { 
            location: query.location,
            weight: query.weight,
            hearthrate: query.hearthrate
        };
        
        this.fixedParameters = { 
            residence: query.residence,
            age: query.age,
            genre: query.genre
        };


        this.results = [];

    }

    haveFixedParameters(){
        return true;
    }

    haveTemporalParameters(){
        return this.haveWeight() || this.haveHearthRate() || this.haveLocation();
    }

    haveWeight(){
        return !R.isNil(this.temporalParameters.weight);
    }

    haveHearthRate(){
        return !R.isNil(this.temporalParameters.hearthrate);
    }

    haveLocation(){
        return !R.isNil(this.temporalParameters.location);
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