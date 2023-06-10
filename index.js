//It will require and run our main fetch function.
// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned IP:', ip);
  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log("There is error", error);
      return;
    }
    console.log('It is working', data);
    fetchISSFlyOverTimes(data, (error,response) => {
      if (error) {
        console.log("There has error", error);
        return;
      }

      console.log('Well done', response);
    });
  });
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});


//{ latitude: '49.27670', longitude: '-123.13000' }