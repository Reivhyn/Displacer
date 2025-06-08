import React, { useContext, useEffect, useState } from 'react'

// * COMPONENTS
import DropDownContainer from '../DropDownContainer/DropDownContainer'

// * CONTEXT
import {
  contextTierLabels,
  contextTierTiles,
} from '../../../zTierContainerContexts/useContext'

// * HELPERS
import { updateTierPositionArr } from '../zHelpersForGutter/popOutHelpers'

const WeightDropMenu = ({ dropMenuIndex, tileIndex }) => {
  const [tierTiles, setTierTiles] = useContext(contextTierTiles)
  const [tierLabels, setTierLabels] = useContext(contextTierLabels)

  // * FUNCTIONS

  const renderWeightDropMenu = () => {
    const weights = Array.from({ length: 10 }, (_, i) => (i + 1) * 10)

    return weights.map((weight) => {
      return <li key={`weight${weight}`}>{weight}</li>
    })
  }

  // * RENDER
  return (
    <DropDownContainer
      label={
        tierTiles[tileIndex]?.positions?.[dropMenuIndex]?.weight ||
        'Select Weight'
      }
      options={Array.from({ length: 10 }, (_, i) => (i + 1) * 10)}
      onSelect={(value) => {
        console.log(`Weight selected: ${value}`)
        updateTierPositionArr(
          tileIndex,
          dropMenuIndex,
          setTierTiles,
          value,
          'weight'
        )
      }}
    />
  )
}

export default WeightDropMenu
