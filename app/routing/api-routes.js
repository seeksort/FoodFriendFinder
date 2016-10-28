/*
Your api-routes.js file should contain two routes:

A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
*/
var path = require('path');
var friends = require('../data/friends.js');

module.exports = function(app) {
    function compareResults(newItem, arr) {
        // trying to get array of differences b/w new friend and existing friends
        var diffs = arr.map(function(obj) {
            return obj.scores.map(function(objScore, index) {
                return Math.abs(newItem.scores[index] - objScore);
            }).reduce(function(p, c) {
                return p + c;
            });
        });
        var minDiff = arrMin(diffs);
        // returns the array index of friend w/ smallest score differential
        console.log('diffs ' + diffs);
        console.log('minDiff: ' + minDiff)
        return diffs.indexOf(minDiff);
    }

    function arrMin(arr) {
        // go through the array and return smallest difference
        return arr.reduce(function(p,c){
            return Math.min(p,c);
        });
    }
    app.get('/api/friends', function(req,res){
        res.send(JSON.stringify(friends));
    });
    app.post('/api/friends', function(req,res){
        console.log('post working');
        console.log(friends);
        var newFriend = req.body;
        console.log('newFriend scores: ' + newFriend.scores);
        var matchedFriend = friends[compareResults(newFriend, friends)];
        // TODO need to figure how to send response with new friend to modal
        friends.push(newFriend);
        res.send(matchedFriend);
    });
}

/*
// It works!

21:50:10 $: node server.js
Server listening on port ****
post working
[ { name: 'yogi bear', scores: [ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ] },
  { name: 'boo boo', scores: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ] } ]
newFriend scores: 2,2,2,2,2,2,2,2,2,2
diffs 30,10
minDiff: 10


// response from Postman: 
{
  "name": "boo boo",
  "scores": [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ]
}
*/