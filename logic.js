const { distance, closest } = require('fastest-levenshtein');
const { fuzzy, search } = require('fast-fuzzy');

const closestMatch = (data, query) => {
  const canteens = data.map(canteen => canteen.name);
  const canteenDistances = canteens.map((name) => fuzzy(query, name))

  const menus = data.map(canteen => Object.keys(canteen.menu))

  const menuDistances = menus.map((menu, index) => {
    let distances = search(query, menu, { returnMatchData: true });
    if (distances.length == 0) return 0
    else {
      return distances.reduce((acc, cur) => acc += cur.score, 0)
    }
  })

  const finalScores = canteenDistances.map((cur, i) => {
    return {
      name: canteens[i],
      score: 1.5*cur + 3*menuDistances[i],
      index: i
    }
  }).sort((a, b) => b.score > a.score ? 1 : -1)

  return finalScores

}

module.exports = {
  closestMatch
}