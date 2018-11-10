abstract sig Parameter {
}


sig Codice, Name, Surname, Birth, Genre, Residence, Location, Hearthrate, Weight extends Parameter{}

sig User {

}{
}


pred show[] {}

run show for exactly 1 Database, exactly 10 Parameter, exactly 4 User, exactly 1 Query


sig Database{
	users: set User,
	parameters: set Parameter,
	
	has: users one -> some parameters,
	belongs:  parameters some -> one users
}{
	belongs = ~has
}

sig Query {
	users_matched: set User,

	constraints: some Parameter,
	results: set Parameter,

	database: one Database
}{
	no p:Codice+Name+Surname+Residence | p in results
	no p:Codice+Name+Surname | p in constraints

	//Basic rules 
	constraints in database.parameters
	users_matched in database.users
	
	// Minimun number of users to protect privacy
	#users_matched > 1

	//If and only if a constraint is present, the user who owns the parameters needs to be matched
//	all c:constraints | all u:User|
//		u -> c in database.has => u in users_matched

	all u:users_matched| some c:constraints | 
		u->c  in database.has


	//If an user is matched, all the allowed parameters are in the results
	all u:users_matched | all p:(Birth+ Genre+ Location+Hearthrate+Weight ) |
		u->p in database.has => p in results

	//No result can be owned by a not matched user
	no r:results | all u:users_matched | r->u not in database.belongs



}

//All users and parameters must belong to a database
fact {
	all p:Parameter | some d:Database | p in d.parameters
	all u:User | some d:Database | u in d.users
}

//The querys shall not result in forbidden parameters

check noForbiddenParameters{
	all p:( Codice+Name+Surname+Residence) |no q:Query | p in q.results
} for 10

check queryWellBuild {
	all q:Query | q.users_matched->q.constraints in q.database.has
	//all q:Query, u:User, c:Parameter | u in q.users_matched and c in q.constraints and (c->u) in q.database.belongs 
} for 10

/*check usersHaveParamenters {
	all u:User,d:Database | u->Parameter in d.has
} for 4*/



