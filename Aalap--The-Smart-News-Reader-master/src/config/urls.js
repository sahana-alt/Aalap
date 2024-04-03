
const isBrowser = typeof window !== 'undefined'

let baseUrl = 'http://api.tmp.trawish.com';
let baseImgur = "https://api.imgur.com";
/*
let isQa = activeEnv === 'qa';
let isStage = activeEnv === 'stage';
isQa && (baseUrl = 'http://qa-news.newshunt.com');
isStage && (baseUrl = 'http://stage-api-news.dailyhunt.in');
*/
//login: "/oauth2/token",
var urlMap = {
  baseUrl:baseUrl,
  login:"/v1/crm/company/user/login",
  pages: "/v1/pages",
  imageAuth: "/oauth2/image/token",
  albumCreate: baseImgur + "/3/album",
  uploadImage: baseImgur + "/3/image",
  uploadGeneric: baseImgur + "/3/upload",
  countries:  "/v1/countries",
  country: "/v1/countries/", // get, delete
  editCountry: "/v1/country", //add,update
  editDestination: "/v1/destination", //add,update
  editPOI: "/v1/poi", //add,update
  allDestinations: "/v1/destinations",
  hotel: "/v1/services/hotels",
  destination: "/v1/destinations/",
  itinerary: "/v1/itinerary",
  itineraryHighlights: "/v1/common/attrs/includes-highlight",
  poi: "/v1/pois",
  tours:"/v1/tours",
  queries:"/v1/crm/company/queries",
  clients : "/v1/crm/company/clients",
  client : "/v1/crm/company/client",
  query : "/v1/crm/company/query",
  interactions: "/v1/crm/company/interactions",
  users:"/v1/crm/company/users",
}


module.exports = urlMap;


