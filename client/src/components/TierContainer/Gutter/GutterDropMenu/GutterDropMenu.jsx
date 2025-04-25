import React, { useContext, useEffect, useState } from 'react'

// * CONTEXT
import {
  contextTierTiles,
  contextTierLabels,
} from '../../zTierContainerContexts/usecontext'
import { mockTierTiles } from '../../../zMockDatabase/mockDatabase'

const GutterDropMenu = ({ className = '', tile, tileIndex }) => {
  // * USESTATES
  const [tierLabels, setTierLabels] = useContext(contextTierLabels)
  const [tierTile] = useContext(contextTierTiles)
  const [rowPosition, setRowPosition] = useState('')
  const [positionWeight, setPositionWeight] = useState('')
  const [tierDropOpen, setTierDropOpen] = useState(false)
  const [positionDropOpen, setPositionDropOpen] = useState(false)
  const [wightDropOpen, setWightDropOpen] = useState(false)
  const [tierDropSelect, setTierDropSelect] = useState('Select Tier')
  const [positionDropSelect, setPositionDropSelect] =
    useState(' Select Position')
  const [weightDropSelect, setWeightDropSelect] = useState('Select Weight')

  // * FUNCTIONS

  // render tier drop menu section
  const renderTierDropDown = () => {
    return tierLabels.map((label) => (
      <li key={label} onClick={() => updateTierSelection(label)}>
        {label}
      </li>
    ))
  }

  // render position drop menu time
  const renderPositionDropDown = () => {
    return Array.from({ length: mockTierTiles.length }, (_, i) => (
      <li key={`${i + 1}position`} onClick={() => updatePositionSelection(i)}>
        {i + 1}
      </li>
    ))
  }

  // render wight drop menu time
  const renderWeightDropDown = () => {
    return Array.from({ length: 10 }, (_, i) => (
      <li
        key={`${i + 1}weight`}
        onClick={() => updateWeightSelection((i + 1) * 10)}
      >
        {(i + 1) * 10}
      </li>
    ))
  }

  // toggle frop menues
  const toggleDropMenu = (menu) => {
    if (menu === 'tier') {
      setTierDropOpen((prev) => !prev)
    }

    if (menu === 'position') {
      setPositionDropOpen((prev) => !prev)
    }

    if (menu === 'weight') {
      setWightDropOpen((prev) => !prev)
    }
  }

  // update tier in tierTiles and tierDropSelect
  const updateTierSelection = (label) => {
    setTierDropSelect(`Tier: ${label}`)
    toggleDropMenu('tier')
  }
  // update position in tierTiles and positionDropSelect
  const updatePositionSelection = (position) => {
    setPositionDropSelect(`Tier: ${position}`)
    toggleDropMenu('position')
  }
  // update weight in tierTiles and weightDropSelect
  const updateWeightSelection = (weight) => {
    setWeightDropSelect(`Weight: ${weight}`)
    toggleDropMenu('weight')
  }

  // * USEEFFECTS

  return (
    <div className={className}>
      {/* tier rank */}
      <div>
        <div className="cursor-pointer" onClick={() => toggleDropMenu('tier')}>
          {tierDropSelect}
        </div>
        <div className={tierDropOpen ? '' : 'hidden'}>
          {renderTierDropDown()}
        </div>
      </div>

      {/* position within tier */}
      <div>
        <div
          className="cursor-pointer"
          onClick={() => toggleDropMenu('position')}
        >
          {positionDropSelect}
        </div>
        <div className={positionDropOpen ? '' : 'hidden'}>
          {renderPositionDropDown()}
        </div>
      </div>

      {/* weight of position */}
      <div>
        <div
          className="cursor-pointer"
          onClick={() => toggleDropMenu('weight')}
        >
          {weightDropSelect}
        </div>
        <div className={wightDropOpen ? '' : 'hidden'}>
          {renderWeightDropDown()}
        </div>
      </div>
    </div>
  )
}

export default GutterDropMenu
