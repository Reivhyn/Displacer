import React, { useEffect, useState } from 'react'

// * COMPONENTS
import TierRow from './TierRow/TierRow'
import TierTileImage from './TierTile/TierTileImage'
import Gutter from './Gutter/Gutter'
import { SelectionBoard } from './SelectionBoard/SelectionBoard'

// * MOCK DATABASE IMPORTS
import {
  mockTierTiles,
  mockTierLabels,
  mockDefaultTierColors,
} from '../zMockDatabase/mockDatabase'

// * CONTEXT
import {
  contextTierColors,
  contextTierTiles,
  contextPlacedTiles,
  contextTierLabels,
  contextSelectionBoard,
} from './zTierContainerContexts/useContext'

// * HELPERS
import { assignWeightedPositions } from './zTierContainerHelpers/tierContainerHelpers'
import { clamp } from 'framer-motion'

// * PAGE LOGIC
const TierContainer = () => {
  // * USESTATES
  // value of the label each tier row is given
  const [tierLabels, setTierLabels] = useState(mockTierLabels)

  // array of tile objects used to construct the board
  const [tierTiles, setTierTiles] = useState(mockTierTiles)

  // used to render tier rows
  const [tierRows, setTierRows] = useState([])

  // used to render selectionBoard
  const [selectionBoard, setSelectionBoard] = useState()

  // default tier colors
  const [tierColors, setTierColors] = useState(mockDefaultTierColors)

  // placedTiles - tiles placed on the board
  const [placedTiles, setPlacedTiles] = useState('')

  // * FUNCTIONS

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
    const interval = setInterval(() => {
      setTierTiles((prev) => assignWeightedPositions(prev))
    }, 1000) // refresh every 3 seconds (adjust as needed)

    return () => clearInterval(interval) // clean up on unmount
  }, [])

  useEffect(() => {
    console.log('tierTiles', tierTiles)
  }, [tierTiles])

  // * RENDER
  return (
    <contextTierLabels.Provider value={[tierLabels, setTierLabels]}>
      <contextTierTiles.Provider value={[tierTiles, setTierTiles]}>
        <contextTierColors.Provider value={[tierColors, setTierColors]}>
          <contextPlacedTiles.Provider value={[placedTiles, setPlacedTiles]}>
            <contextSelectionBoard.Provider
              value={[selectionBoard, setSelectionBoard]}
            >
              {/*tierboard and selection board  */}
              <div className="flex w-full gap-5">
                <div className="w-3/4 bg-[url('/assets/background.png')]  bg-[length:auto_100%] bg-repeat-x bg-top">{renderTierRows()}</div>
                <div className="w-1/4 bg-pink-">
                  <SelectionBoard />
                </div>
              </div>

              <Gutter />
            </contextSelectionBoard.Provider>
          </contextPlacedTiles.Provider>
        </contextTierColors.Provider>
      </contextTierTiles.Provider>
    </contextTierLabels.Provider>
  )
}

export default TierContainer
