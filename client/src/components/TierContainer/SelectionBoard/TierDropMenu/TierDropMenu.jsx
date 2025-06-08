import React, { useContext } from 'react'

// * COMPONENTS
import DropDownContainer from '../DropDownContainer/DropDownContainer'

// * CONTEXT
import {
  contextTierLabels,
  contextTierTiles,
} from '../../zTierContainerContexts/useContext'

// * HELPERS
import { updateTierPositionArr } from '../zHelpersForSelectionBoard/sectionBoardHelpers'

const TierDropMenu = ({ dropMenuIndex, tileIndex }) => {
  const [tierTiles, setTierTiles] = useContext(contextTierTiles)
  const [tierLabels, setTierLabels] = useContext(contextTierLabels)

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
