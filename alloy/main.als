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
	#users_matched > 3

	//If and only if a constraint is present, the user who owns the parameters needs to be matched
	all c:constraints | all u:User|
		u -> c in database.has => u in users_matched

	all u:users_matched | some c:Parameter|
		u -> c in database.has => c in constraints


	//If an user is matched, all the allowed parameters are in the results
	all u:users_matched | all p:(Birth+ Genre+ Location+Hearthrate+Weight ) |
		u->p in database.has => p in results

	//No result can be owned by a not matched user
	no r:results | all u:users_matched | r->u not in database.belongs



}

fact {
	all p:Parameter | some d:Database | p in d.parameters
	all u:User | some d:Database | u in d.users
}


