//const graphqlHTTP = require('express-graphql')
const axios = require('axios')

const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList,
	GraphQLSchema
} = require('graphql')

schema {
	query: Query
}

const Query = new GraphQLSchema {
	country {
		names {
			en
		}
		geoname_id
		iso_code
	}
	location {
		latitude
		longitude
	}
}

// Geolocation data
const weatherToday = new GraphQLObjectType({
	name: 'weatherToday',
	fields: () => ({
		date_local:    { type: GraphQLInt },
		city_name:     { type: GraphQLInt },
		temperature:   { type: GraphQLInt },
		precipitation: { type: GraphQLInt }
	})
})



// Root Query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		weather: {
			type: new GraphQLList(weatherOfDate),
			resolve(parent, args) {
				return axios
					.get('api.openweathermap.org/data/2.5/weather?q=Atlanta') // link is broken
					.then(res => res.data)
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})