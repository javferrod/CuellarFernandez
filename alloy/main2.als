
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
}


//
fact{
	all v:Value| one p:Parameter | v->p in Database.data
}

fact {
	all v:Value | v in Database.values
	all v:Value| one u:User | u->v in Database.has
	all u:User | u in Database.users
}


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
	database.data[codice] in Codice
	result = database.has[database.belongs[codice] & client.permissionOf]
}


pred show[q:Query, d:Database, i:IndividualSearch] {
	#(q.users_matched) > 1 and
	#(d.reverse_data[Codice])>1
	#(i.result)>1
}

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


run show for exactly 3 User, exactly 5 Value, exactly 1 Query, exactly 1 Client, exactly 1 IndividualSearch
