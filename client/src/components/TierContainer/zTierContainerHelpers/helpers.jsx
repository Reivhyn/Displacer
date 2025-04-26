// assign postiotn to tile based on weighted randomness
export function selectTierPosition(character) {
  const totalWeight = character.positions.reduce(
    (sum, position) => sum + position.weight,
    0
  )
  const random = Math.random() * totalWeight

  let runningTotal = 0
  for (const position of character.positions) {
    runningTotal += position.weight
    if (random <= runningTotal) {
      character.assignedPosition = position
      return position}
  }

  // incase there is floating point weirdness
  character.assignedPosition = character.positions[0]
  return character.positions[0]
}

//* this is specific to the mvp - will need to refactor to be general
// create the board after getting tier positions
export function setBoard(characters) {
  characters.forEach((character) => {
    characters.assignedPosition = selectTierPosition(character.positions)
  })
}

//* this is specific to the mvp - will need to refactor to be general
// get all tiers the board can have
export function getPossibleTiers(characters) {
  const tiersLabels = []

  characters.forEach((character) => {
    character.positions.forEach((position) => {
      if (!tiersLabels.includes(position.tier)) {
        tiersLabels.push(position.tier)
      }
    })
  })

  const charactersByTier = []

  tiersLabels.forEach((tier) => {
    const tilesOfTier = characters.filter(
      (character) => character.assignedPosition.tier === tier
    )

    charactersByTier.push(tilesOfTier)
  })

  charactersByTier.forEach((tier) =>
    tier.sort(
      (a, b) => a.assignedPosition.position - b.assignedPosition.position
    )
  )

  return charactersByTier
}

// create object with list of positions for each tier
// ex {s tier : [objects], b tier : [objects]}
