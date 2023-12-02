//Using commonjs because its simpler for these small scripty things
const data = require('./data.js');

/**
 * Problem: 
 * Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. 
 * What is the sum of the IDs of those games?
 * 
 * cubes are returned to the bag after every "grab" aka after every ';'
 */
/**
 * This is the situation we are comparing against to see if it is possible
 */
const actualBagContents = new Map([['red', 12], ['green', 13], ['blue', 14]]);


const parsedData = data.map(l1 => {
    //I'm not a fan of multi-state mutations like this
    //But no one else needs to read this code

    //Get each GRAB as a separate string
    const splitLine = l1.split(';')
        //Split the result of each grab into a separates string, For this solution a grab doesn't matter
        .map(l2 => l2.split(',')
            //Remove whitespaces
            .map(l3 => l3.trim()));

    return splitLine;
});

/**
 * Result of above
 *   [
    [ '5 blue', '2 green', '8 red' ],
    [ '12 red' ],
    [ '13 red', '4 blue', '4 green' ],
    [ '7 red', '11 blue' ],
    [ '10 blue', '2 green', '2 red' ],
    [ '6 red', '12 blue' ]
  ],
  [
    [ '4 green', '2 blue', '4 red' ],
    [ '9 blue', '11 red', '1 green' ],
    [ '5 green: 2 blue', '12 green' ],
    [ '6 green', '1 red', '12 blue' ],
    [ '1 green', '5 blue', '1 red' ],
    [ '1 red', '12 green', '6 blue' ],
    [ '16 blue', '3 green' ]
  ]
 */


//Count of how many games are possible
let runningIdCount = 0;

//Soooo many loops. This could be solved with a better data structure
//But its here now so going with it

parsedData.forEach((game, gameId) => {
    let gamePossible = true;


    game.forEach(grab => {
        let green = 0;
        let blue = 0;
        let red = 0;

        grab.forEach(colorSet => {
            const [countStr, color] = colorSet.split(' ');
            const count = Number.parseInt(countStr);
            switch (color) {
                case 'green':
                    green += count;
                    break;
                case 'red':
                    red += count;
                    break;
                case 'blue':
                    blue += count;
                    break;
                default:
                    console.log(color, 'Not found');
            }

        })
        if (green > actualBagContents.get('green') || red > actualBagContents.get('red') || blue > actualBagContents.get('blue')) {
            gamePossible = false;
        }

    });

    if (gamePossible) {
        console.log(gameId);
        runningIdCount += (gameId + 1);
    }

});


console.log(runningIdCount);