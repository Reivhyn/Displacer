import React from 'react'
import TierTile from '../TierTile/TierTile'
import { motion } from 'framer-motion'

const TierRow = ({
  tierLabel = 'S',
  color = 'bg-purple-700',
  characters = [],
  objects
}) => {
  return (
    <>
      <div className="flex items-center gap-2 p-2 rounded-x1 bg-grey-900 shadow-md">
        {/* Tier Label */}
        <div
          className={`w-20 h-full flex items-center justify-center text-white font-bold text-xl rounded-lg ${color}`}
        >
          {tierLabel} Tier
        </div>

        {/* Tier Item Tiles */}
        <div className="flex flex-wrap gap-2 p-2  flex-1">
          {characters.map((character, index) => (
            <motion.div
            key={character.name}
              className="w-16 h-16 bg-grey-800 border-2 border-grey-600 rounded-lg flex items-center justify-center text-white text-xs"
            >
              <img src={objects[index].image} alt="" />
              {character}
            </motion.div>
          ))}
        </div>

        {/* options panel */}
        <div className="w-16 text-white text-sm opacity-50 text-right">⚙️</div>
      </div>
    </>
  )
}

export default TierRow
