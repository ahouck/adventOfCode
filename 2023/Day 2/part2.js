//Using commonjs because its simpler for these small scripty things
const data = require('./data.js');

const testDataCorrectOutcome = 2286;
const testData =
    [
        "3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    ]
/**
 * what is the fewest number of cubes of each color that could have been in the bag to make the game possible?
 * 
 * The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. 
 * The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. 
 * Adding up these five powers produces the sum 2286.
 * For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
 */

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


let sumOfPower = 0;
parsedData.forEach((game, gameId) => {
    //highest count of each color
    //Starting at 1 becuse we are going to multiply them together
    //and use that number rather than the actual count
    let green = 1;
    let blue = 1;
    let red = 1;
    game.forEach(grab => {
        grab.forEach(colorSet => {
            const [countStr, color] = colorSet.split(' ');
            const count = Number.parseInt(countStr);
            switch (color) {
                case 'green':
                    if (count > green) green = count;
                    break;
                case 'red':
                    if (count > red) red = count;
                    break;
                case 'blue':
                    if (count > blue) blue = count;
                    break;
                default:
                    console.log(color, 'Not found');
            }
        })
    });
    const power = green * red * blue;
    sumOfPower += power;
});


console.log(`Sum of Power:`, sumOfPower);