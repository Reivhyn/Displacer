import React, { useContext } from 'react'
import TierTileImage from '../TierTile/TierTileImage'
import { AnimatePresence, motion } from 'framer-motion'
import background from '../../../assets/background.png'

// * CONTEXT
import {
  contextTierTiles,
  contextPlacedTiles,
  contextTierLabels,
  contextTierColors,
} from '../zTierContainerContexts/useContext'

const TierRow = ({ index }) => {
  // * USESTATES
  const [tierLabels, setTierLabels] = useContext(contextTierLabels)
  const [tierColors, setTierColors] = useContext(contextTierColors)
  const [tierTiles, setTierTiles] = useContext(contextTierTiles)

  // placedTiles - tiles placed on the board
  const [placedTiles, setPlacedTiles] = useContext(contextPlacedTiles)

  // * FUNCTION
  const renderTiles = () => {
    if (!tierTiles) return null
    const tiles = tierTiles.filter(
      (tile) => tile.assignedPosition?.tier === tierLabels[index]
    )

    tiles.sort(
      (a, b) => a.assignedPosition.position - b.assignedPosition.position
    )

    console.log(`${tierLabels[index]} TIER`, tiles)

    return tiles.map((tile, index) => {
      return (
        <motion.div
          key={tile.name}
          layout // <-- This enables smooth layout animations
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="transition-tile"
        >
          <TierTileImage
            key={`tile${index}`}
            image={tile.image}
            name={tile.name}
          />
        </motion.div>
      )
    })
  }

  return (
    <div>
      <div className="flex items-center gap-2 p-2 rounded-xl shadow-md h-30 "
      // style={{ backgroundImage: `url(${background})` }}
      >
        {/* Tier Label */}
        <div
          className={`w-20 h-10 flex items-center justify-center text-white font-bold text-xl rounded-lg ${tierColors[index]}`}
        >
          {tierLabels[index]} Tier
        </div>

        {/* Tier Item Tiles */}
        <div className="flex flex-wrap gap-2 p-2  flex-1">{renderTiles()}</div>

        {/* options panel */}
        <div className="w-16 text-white text-sm opacity-50 text-right">⚙️</div>
      </div>
    </div>
  )
}

export default TierRow
