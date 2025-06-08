import React, { useContext } from 'react'

// * CONTEXT

const TierTileImage = ({ image, name }) => {
  return (
    <div>
      <img
        src={image}
        alt={name || 'Tier Tile'}
        className="w-20 object-contain border border-white"
      />
    </div>
  )
}

export default TierTileImage
