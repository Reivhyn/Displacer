import React, { useContext } from 'react'
import TierTileImage from '../TierTile/TierTileImage'
import { motion } from 'framer-motion'

// * CONTEXT
import {
  contextTierTiles,
  contextTierLabels,
  contextTierColors,
} from '../zTierContainerContexts/usecontext'

const TierRow = ({ index }) => {
  // * USESTATES
  const [tierlabels, setTierLabels] = useContext(contextTierLabels)
  const [tierColors, setTierColors] = useContext(contextTierColors)

  return (
    <>
      <div className="flex items-center gap-2 p-2 rounded-x1 bg-gray-900 shadow-md">
        {/* Tier Label */}
        <div
          className={`w-20 h-full flex items-center justify-center text-white font-bold text-xl rounded-lg ${tierColors[index]}`}
        >
          {tierlabels[index]} Tier
        </div>

        {/* Tier Item Tiles */}
        <div className="flex flex-wrap gap-2 p-2  flex-1">
          CHARACTER TILES GO HERE
        </div>

        {/* options panel */}
        <div className="w-16 text-white text-sm opacity-50 text-right">⚙️</div>
      </div>
    </>
  )
}

export default TierRow
