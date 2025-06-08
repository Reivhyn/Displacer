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

const PositionDropMenu = ({ dropMenuIndex, tileIndex }) => {
  const [tierTiles, setTierTiles] = useContext(contextTierTiles)

  // * FUNCTIONS

  const renderPositionDropMenu = () => {
    return tierTiles.map((tier, index) => {
      return <li key={`position${index}`}>{index + 1}</li>
    })
  }

  // * RENDER
  return (
    <DropDownContainer
      label={
        tierTiles[tileIndex]?.positions?.[dropMenuIndex]?.position + 1 ||
        'Select Position'
      }
      options={Array.from({ length: tierTiles.length }, (_, i) => i + 1)}
      onSelect={(value) => {
        console.log(`Position Selected ${value}`)
        updateTierPositionArr(
          tileIndex,
          dropMenuIndex,
          setTierTiles,
          value - 1,
          'position'
        )
      }}
    />
  )
}

export default PositionDropMenu
