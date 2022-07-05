const movies = require('./movies');
console.log(movies)


// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
const result = moviesArray.map((movie)=> movie.director);
return result;
}
// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
const result = moviesArray.filter
((movie) => movie.director === "Steven Spilberg" && moviesArray.genre.include ('Drama')
);
return result.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  const sum = moviesArray.reduce((a,b)=> {
    if (b.score !== '' && !b.score); {
      return a + b.score;
    }
  }, 0);
  return sum/moviesArray.length;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter ((el) => el.genre.includes ('Drama'));
  const sum =dramaMovies.reduce ((a,b)=> {
    return a + b.score /dramaMovies.length;
  },0);
  return sum;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  moviesArray.sort((a,b) => a.year - b.year);
  return moviesArray;
}
console.log (orderByYear(movies));

/* OTRA SOLUCIÓN:

  function orderByYear (moviesArray) {
  const newArr = [...moviesArray];
  return newArr.sort ((a,b) => a.year - b.year);
} */

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return moviesArray.sort((x,y) => (x.title < y.title ? -1 :0)).slice (0.20);
}
console.log (orderAlphabetically(movies));

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
const newArr = moviesArray.map ((movie) => {
  return calc (movie.duration);
});
console.log (newArr);
}

function calc (element){
  const hourInString = element;
  const splitHour = hourInString.split (' ');
  let hours = 0;
  let minutes = 0;
  if (splitHour [0]){
    hour = parseFloat(splitHour[0].match(/\d+/)[0]);
  }
  if (splitHour [1]){
    hour = parseFloat(splitHour[1].match(/\d+/)[0]);
  }
  const sum = hours * 60 + minutes;
  return sum;
}

/* OTRA SOLUCION:
// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let moviesArrayDurationNew = moviesArray.map(function (movie) {
      let moviesDurationNew= movie.duration.split(” “);
      let moviesArrayHoursMinutes;
      let moviesArrayMinutes;
      //Hours
      if (moviesDurationNew[0] !== “undefined”) {
          let moviesArrayHoursLength= moviesDurationNew[0].length;
          moviesArrayHoursMinutes = moviesDurationNew[0].slice(0,moviesArrayHoursLength-1)*60;
          //console.log(moviesArrayHoursMinutes);
      } else {
          moviesArrayHoursMinutes=0;
      }
      // Minutes
      if ( typeof (moviesDurationNew[1]) !== “undefined”) {
          let moviesArrayMinutesLength= moviesDurationNew[1].length;
          moviesArrayMinutes= moviesDurationNew[1].slice(0, moviesArrayMinutesLength-3);
          //console.log(moviesArrayMinutes);
      } else {
          moviesArrayMinutes=0;
      }
      movie.duration = Number(moviesArrayHoursMinutes) + Number(moviesArrayMinutes);
      return movie;
  });
  let moviesArrayNew =[... moviesArrayDurationNew ]
  return moviesArrayNew;
}
console.log(turnHoursToMinutes(movies)); */

//conseguir extraer los datos del string y multiplicar por 60
// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray = []) {
    if (!moviesArray || moviesArray.length === 0) {
      return null;
    }
    let averagesPerYear = averageScoresPerYear(mapYearToScores(moviesArray));
    const besYear = findMax(averagesPerYear);
    return `The best year was ${besYear.year} with an average score of ${besYear.score}`;
  }
  
  function findMax(averagesPerYear) {
    let max = {
      year: '',
      score: ''
    };
    Object.keys(averagesPerYear).forEach((year) => {
      if (averagesPerYear[year] > max.score) {
        max = {
          year: year,
          score: averagesPerYear[year]
        };
      }
    });
    return max;
  }
  
  function averageScoresPerYear(input) {
    let averagePerYear = {};
    Object.keys(input).forEach(
      (year) =>
        (averagePerYear[year] =
          input[year].reduce((acc, a) => acc + a, 0) / input[year].length)
    );
    return averagePerYear;
  }
  
  function mapYearToScores(moviesArray) {
    const yearMap = {};
    moviesArray.forEach(
      (movie) =>
        (yearMap[movie.year] = yearMap[movie.year]
          ? [...yearMap[movie.year], movie.score]
          : [movie.score])
    );
    return yearMap;
  }


  /* OTRA SOLUCIÓN:
  function bestYearAvg() {
  orderByYear();

  let scoreArr = [];
  let countArr = [];
  let scoreAvgArr = [];
  let yearArr = [];

  let score = 0;
  let count = 0;

  for (let i = 0; i < movies.length; i++) {
    if (i === 0) {
      score += movies[0].score;
      count++;
    }

    else if (movies[i].year !== movies[i - 1].year) {
      scoreArr.push(score);
      countArr.push(count);
      yearArr.push(movies[i - 1].year)
      score = 0;
      count = 0;
    }

    else {
      score += movies[i].score;
      count++;
    };
  }
  // console.log(scoreArr);
  // console.log(countArr);

  for (let i = 0; i < scoreArr.length; i++) {
    if (scoreArr[i] === 0 || countArr[i] === 0) scoreAvgArr[i] = 0;

    else {
      scoreAvgArr[i] = scoreArr[i] / countArr[i];
    }
  }

  // console.log(scoreAvgArr);
  // console.log(yearArr);
  const maxScoreAvg = Math.max(...scoreAvgArr);
  // console.log(maxScoreAvg);
  const index = scoreAvgArr.indexOf(maxScoreAvg)
  // console.log(index);
  const bestYear = yearArr[index];
  // console.log(bestYear);

  return {bestYear, maxScoreAvg}
}


console.log(bestYearAvg());
IMPORTANT - la funcion de arriba usa la funcion de la iteracion #5 orderByYear()
function orderByYear() {
  const orderYear = movies.sort((a, b) => {
    if (a.year > b.year) return 1;
    return -1;
  });
  return orderYear;
}

console.log(orderByYear());*/


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}