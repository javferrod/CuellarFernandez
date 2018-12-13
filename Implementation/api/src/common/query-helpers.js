const isNotEmpty = R.compose(R.not, R.isEmpty);
const isFixedQuery = R.compose(isNotEmpty, R.props('residence', 'age', 'genre'));
const isTemporalQuery = R.compose(isNotEmpty, R.props('location', 'weight', 'hearthrate'));


export {isNotEmpty, isFixedQuery, isTemporalQuery}; 