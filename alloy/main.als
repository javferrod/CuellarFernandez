
abstract sig Parameter{}

abstract sig FixedParameter extends Parameter {}
abstract sig TemporalParameter extends Parameter{}

one sig Codice, Name, Surname, Birth, Genre,Residence  extends FixedParameter{}
one sig   Location, Hearthrate, Weight extends TemporalParameter{}

sig Value {}

sig User{}

sig AutomatedSOSUser extends User{}

sig Client{
	permissionOf: set User
}


one sig Database {
	users: set User,
	values: set Value,

	has:  User one -> Value,
	belongs: Value -> one User,


	data:  Value->one Parameter,
	reverse_data :  Parameter one->Value
}{
	belongs = ~ has
	reverse_data =~data

	//1 codice per user
	all u:users |#(has[u] & reverse_data[Codice])=1
	//1 name per user
	all u:users |#(has[u] & reverse_data[Name])=1
	//1 surname per user
	all u:users |#(has[u] & reverse_data[Surname])=1

	//at most 1 residence per user
	all u:users |#(has[u] & reverse_data[Residence])<2
	//at most 1 birth date per user
	all u:users |#(has[u] & reverse_data[Birth])<2
	//at most 1 Genre per user
	all u:users |#(has[u] & reverse_data[Genre])<2



	//#(belongs[reverse_data[Codice]]) = #(reverse_data[Codice])



	//all u:users | all v:reverse_data[Codice] | #(u->v)  < 2 
	
}


//All the values and users needs to be stored in the Database
fact {
	all v:Value | v in Database.values
	all u:User | u in Database.users
}


//Values cannot belong to different parameters at the same time
fact{
	all v:Value| one p:Parameter | v->p in Database.data
}

//Values cannot belong to different users at the same time.
fact{
	all v:Value| one u:User | u->v in Database.has
}
/*
fact{
	one u:User | all v:d.reverse_data[FixedParameter] | v in database.
	all d:Database | one v:Value, u:User | u->v in Database.has iff d.data[v] in FixedParameter

}*/



sig Query{
	database: one Database,
	constraints: set (Location + Hearthrate + Weight + Residence +Birth + Genre),  //Represents the logical constraints inposed by the client in the query
	results: set Value, //The data that fullfils the constrained imposed.
	users_matched: set User //The users that fullfill the constraints imposed
}{
	//Queries with few entries will not be allowed
	#(users_matched) > 2

	/* The matched users (the one that fullfills the constraints) must have values 
	    for the constrained parameters. However, not all the users  will fullfill the 
	    constraint */
	all u:users_matched | u in database.belongs[database.reverse_data[constraints]]
	
	//In results all the data of the matched users are present except the protected one.
	results = database.has[users_matched] - database.reverse_data[(Codice + Name + Surname + Residence)]
}

sig IndividualSearch{
	database: one Database,
	codice: one Value,
	result: set Value,
	client: one Client,
}{
	//The codice value must belong to Codice parameter
	database.data[codice] in Codice
	result = database.has[database.belongs[codice] & client.permissionOf]
}

// CHECKS

//If a user is matched, a constraint has to be made to some parameter in which the user have values stored.
check noUserMatchedWithoutConstraints{
	all q:Query |{ 
		all u:q.users_matched |u in q.database.belongs[q.database.reverse_data[q.constraints]]
	}
} for 10

//Any codice, name, surname or residence appears in the result of a query.
check noForbiddenParametersInQuery{
	all q:Query | q.database.data[q.results] not in (Codice + Name + Surname + Residence)
} for 10

//Queries with few entries will not be allowed
check noFewEntries{
	all q:Query | #(q.users_matched)>2
} for 10

//Queries with few entries will not be allowed
check noFewEntries{
	all q:Query | #(q.users_matched)>2
} for 10

//Any user can't have more than 1 codice
check noTwoCodice{
	all d:Database | {
		all u:d.users |#(d.has[u] & d.reverse_data[Codice])<2
	}
} for 10
// Ommited the rest of the checks on numer of genres, residences and so on  for simplicity

//Must be the adequate number of parameters depending of the number of users.
check mandatoryParameters{
		#(Database.users) = #(Database.reverse_data[Codice]) and
		#(Database.users) = #(Database.reverse_data[Name]) and
		#(Database.users) = #(Database.reverse_data[Surname]) and
		#(Database.users) >= #(Database.reverse_data[Birth]) and
		#(Database.users) >= #(Database.reverse_data[Residence]) and
		#(Database.users) >= #(Database.reverse_data[Genre])
} for 100



pred show[q:Query, d:Database, i:IndividualSearch] {
	//#(q.users_matched) > 1 and
	//#(d.reverse_data[Codice])>0
	//#(i.result)>1
}
 

run show for exactly 10 User, exactly 40 Value, exactly 1 Query, exactly 1 Client, exactly 1 IndividualSearch
