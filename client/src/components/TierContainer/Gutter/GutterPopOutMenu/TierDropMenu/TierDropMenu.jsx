import React, { useContext } from 'react'

// * COMPONENTS
import DropDownContainer from '../DropDownContainer/DropDownContainer'

// * CONTEXT
import {
  contextTierLabels,
  contextTierTiles,
} from '../../../zTierContainerContexts/useContext'

// * HELPERS
import { updateTierPositionArr } from '../zHelpersForGutter/popOutHelpers'

const TierDropMenu = ({ dropMenuIndex, tileIndex }) => {
  const [tierTiles, setTierTiles] = useContext(contextTierTiles)
  const [tierLabels, setTierLabels] = useContext(contextTierLabels)

  // * FUNCTIONS

  // const updateTierPositionArr = (selection, key) => {
  //   setTierTiles((prev) => {
  //     //clone the full tile array - avoiding direct mutation
  //     const updated = [...prev]

  //     //clone tspecific tile to be updated
  //     const tile = { ...updated[tileIndex] }

  //     // clone the positions array or start with empty array if it is undefined
  //     const positions = [...(tile.positions || [])]

  //     //clone specific position object at the given index or creat new one if it does not exist
  //     const current = positions[dropMenuIndex] || {}

  //     //make the update to the position key
  //     positions[dropMenuIndex] = {
  //       ...current,
  //       [key]: selection,
  //     }

  //     tile.positions = positions
  //     updated[tileIndex] = tile
  //     return updated
  //   })
  // }

  // * RENDER
  return (
    <DropDownContainer
      label={
        tierTiles[tileIndex]?.positions?.[dropMenuIndex]?.tier || 'Select Tier'
      }
      options={tierLabels}
      onSelect={(value) => {
        console.log(`Tier selected: ${value}`)
        updateTierPositionArr(
          tileIndex,
          dropMenuIndex,
          setTierTiles,
          value,
          'tier'
        )
      }}
    />
  )
}

export default TierDropMenu
