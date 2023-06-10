const request = require('request-promise-native');


const fetchMyIP = () => {

  return request('https://api.ipify.org?format=json');
};

// iss_promised.js:

// ...

/*
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const parse = JSON.parse(body).ip;
  return request(`https://ipwho.is/${parse}`);
};

const fetchISSFlyOverTimes = (body) => {
  let { latitude, longitude } = JSON.parse(body);
  let url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};
const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const { response } = JSON.parse(body);
      return response;
    });
};
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };