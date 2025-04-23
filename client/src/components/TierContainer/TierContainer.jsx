import React, { useEffect, useState } from 'react'

// * COMPONENTS
import TierRow from '../TierRow/TierRow'
import TierTile from '../TierTile/TierTile'
import Gutter from '../Gutter/Gutter'

// * CONTEXT
import { contextTierTiles } from '../zusecontext/usecontext'
import { characters } from '../zhelpers/mockTiles'

// * HELPERS
import { getPossibleTiers, selectTierPosition } from '../zhelpers/helpers'

// * PAGE LOGIC
const TierContainer = () => {
  // * USESTATES
  const [tierBoard, setTierBoard] = useState('')
  const [tierLabel, setTierLabel] = useState(['S', 'A'])
  const [tierColors, setTierColors] = useState([
    'bg-purple-700',
    'bg-purple-600',
  ])

  // * FUNCTIONS
  const createBoard = () => {
    characters.forEach((character) => selectTierPosition(character))
    const charactersByTier = getPossibleTiers(characters)

    return charactersByTier.map((tier, i) => (
      <TierRow
        key={`${tier[0].assignedPosition.tier}Tier`}
        tierLabel={tier[0].assignedPosition.tier}
        color="bg-purple-700"
        characters={tier.map((character) => character.name)}
        objects={tier}
      />
    ))
  }
  // * USE EFFECTS

  useEffect(() => {
    setTierBoard(createBoard())
    const interval = setInterval(() => {
      setTierBoard(createBoard)
    }, 1000) // refresh every 3 seconds (adjust as needed)

    return () => clearInterval(interval) // clean up on unmount
  }, [])

  // * RENDER
  return <>{tierBoard ? tierBoard : 'loading'}</>
}

/* 
return (
    <>
      <TierRow
        tierLabel="S"
        color="bg-purple-700"
        characters={[
          characters[0].name,
          characters[1].name,
          characters[2].name,
          characters[3].name,
        ]}
      />
      <TierRow
        tierLabel="A"
        color="bg-purple-600"
        characters={[characters[4].name, characters[5].name]}
      />
      </>
    )
*/

export default TierContainer
