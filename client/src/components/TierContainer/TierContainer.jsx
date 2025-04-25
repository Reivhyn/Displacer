import React, { useEffect, useState } from 'react'

// * COMPONENTS
import TierRow from './TierRow/TierRow'
import TierTileImage from './TierTile/TierTileImage'
import Gutter from './Gutter/Gutter'

// * MOCK DATABASE IMPORTS
import {
  mockTierTiles,
  mockTierLabels,
  mockDefaultTierColors,
} from '../zMockDatabase/mockDatabase'

// * CONTEXT
import {
  contextTierTiles,
  contextTierLabels,
  contextTierColors,
} from './zTierContainerContexts/usecontext'

// * HELPERS
import {
  getPossibleTiers,
  selectTierPosition,
} from './zTierContainerHelpers/helpers'

// * PAGE LOGIC
const TierContainer = () => {
  // * USESTATES
  // value of the label each tier row is given
  const [tierLabels, setTierLabels] = useState(mockTierLabels)

  // array of tile objects used to construct the board
  const [tierTiles, setTierTiles] = useState(mockTierTiles)

  // used to render tier rows
  const [tierRows, setTierRows] = useState('')

  // default tier colors
  const [tierColors, setTierColors] = useState(mockDefaultTierColors)

  // * FUNCTIONS
  // const createBoard = () => {
  //   mockTierTiles.forEach((tile) => selectTierPosition(tile))
  //   const tilesByTier = getPossibleTiers(mockTierTiles)

  //   return tilesByTier.map((tier, i) => (
  //     <TierRow
  //       key={`${tier[i].assignedPosition.tier}Tier`}
  //       tierLabel={tier[i].assignedPosition.tier}
  //       tile={tier}
  //       color="bg-purple-700"
  //     />
  //   ))
  // }

  // render tier rows
  const renderTierRows = () => {
    return tierLabels.map((label, index) => (
      <div key={`${label}Tier`}>
        <TierRow index={index} />
      </div>
    ))
  }

  // * USE EFFECTS
  useEffect(() => {
    setTierRows(renderTierRows)
  }, [tierLabels])

  // useEffect(() => {
  //   setTierBoard(createBoard())
  //   const interval = setInterval(() => {
  //     setTierBoard(createBoard)
  //   }, 1000) // refresh every 3 seconds (adjust as needed)

  //   return () => clearInterval(interval) // clean up on unmount
  // }, [])

  // * RENDER
  return (
    <contextTierLabels.Provider value={[tierLabels, setTierLabels]}>
      <contextTierTiles.Provider value={[tierTiles, setTierTiles]}>
        <contextTierColors.Provider value={[tierColors, setTierColors]}>
          {tierRows ? tierRows : 'Loading Tier Rows'}
          <Gutter />
        </contextTierColors.Provider>
      </contextTierTiles.Provider>
    </contextTierLabels.Provider>
  )
}

export default TierContainer
