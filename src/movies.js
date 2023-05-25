// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    let directors = moviesArray.map(element => element.director)
    return [...new Set(directors)]
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter(element => element.director === 'Steven Spielberg' && element.genre.includes('Drama')).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (!moviesArray.length) {
        return 0
    }
    let sumScores = moviesArray.reduce((total, current) => {
        if (current.score) {
            return total + current.score
        } else {
            return total
        }
    }, 0)
    let result = sumScores / moviesArray.length
    return Number(result.toFixed(2))
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    let dramaMovies = moviesArray.filter(element => element.genre.includes('Drama'))
    let result = scoresAverage(dramaMovies)
    return result
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let moviesSorted = [...moviesArray]

    moviesSorted.sort((a, b) => {
        if (a.year > b.year) return 1
        if (a.year < b.year) return -1
        if (a.year === b.year) return a.title.localeCompare(b.title)
    })

    return moviesSorted
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    let moviesSorted = [...moviesArray]

    moviesSorted.sort((a, b) => {
        return a.title.localeCompare(b.title)
    })

    let titleArray = moviesSorted.map(element => element.title)
    let first20Title = titleArray.slice(0, 20)

    return first20Title
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    let moviesMinutes = JSON.parse(JSON.stringify(moviesArray))

    moviesMinutes.map((element) => {
        let timeHours = element.duration
        let timeHoursArray = timeHours.split(' ')
        let hours = Number(timeHoursArray[0].slice(0, -1))
        let minutes = 0;
        if (timeHoursArray.length > 1) {
            minutes = Number(timeHoursArray[1].slice(0, -3))
        }
        let timeMinutes = hours * 60 + minutes
        element.duration = timeMinutes
        return element
    })

    return moviesMinutes
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {

    if (!moviesArray.length) {
        return null
    }

    let years = moviesArray.map(element => {
        return { year: element.year, avgScore: null }
    })

    years.forEach(year => {

        let movieFiltered = moviesArray.filter(element => element.year === year.year)
        let yearScoreSum = movieFiltered.reduce((total, current) => total + current.score, 0)

        year.avgScore = yearScoreSum / movieFiltered.length

    });

    years.sort((a, b) => {
        if(a.avgScore > b.avgScore) return -1
        if(a.avgScore < b.avgScore) return 1
        if(a.avgScore === b.avgScore) {
            return a.year - b.year
        }
    })

    return `The best year was ${years[0].year} with an average score of ${years[0].avgScore}`
}
