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

  // numnber of times the position menue should be rendered
  const [totalNumberOfPositons, setTotalNumberOfPositions] = useState(1)
  const [popMenu, setPopMenu] = useState('')

  // * FUNCTIONS

  // render tier drop menu section
  const renderTierDropDown = () => {
    return tierLabels.map((label) => (
      <li
        key={label}
        onClick={() => updateTierSelection(label)}
        className="px-3 py-1 hover:bg-purple-700 cursor-pointer"
      >
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
    setPositionDropSelect(`Position: ${position}`)
    toggleDropMenu('position')
  }
  // update weight in tierTiles and weightDropSelect
  const updateWeightSelection = (weight) => {
    setWeightDropSelect(`Weight: ${weight}`)
    toggleDropMenu('weight')
  }

  const AdjustNumberOfMenus = (change) => {
    if(change === 'plus')
    setTotalNumberOfPositions((prev) => prev++)

    if(change === 'minus' && totalNumberOfPositons <= 1)
      setTotalNumberOfPositions(prev => prev--)
  }

  // * USEEFFECTS

  return (
    <div
      className={`flex gap-2 bg-gray-800 text-white p-2 rounded shadow-lg w-48${className}`}
    >
      {/* tier rank */}
      <div className="mb-2">
        <div
          className="cursor-pointer font-semibold"
          onClick={() => toggleDropMenu('tier')}
        >
          {tierDropSelect}
        </div>
        {tierDropOpen && (
          <ul className="mt-1 border border-gray-600 rounded bg-gray-900">
            {renderTierDropDown()}
          </ul>
        )}
      </div>

      {/* position within tier */}
      <div className="mb-2">
        <div
          className="cursor-pointer font-semibold"
          onClick={() => toggleDropMenu('position')}
        >
          {positionDropSelect}
        </div>
        {positionDropOpen && (
          <ul className="mt-1 border border-gray-600 rounded bg-gray-900">
            {renderPositionDropDown()}
          </ul>
        )}
      </div>

      {/* weight of position */}
      <div>
        <div
          className="cursor-pointer font-semibold"
          onClick={() => toggleDropMenu('weight')}
        >
          {weightDropSelect}
        </div>
        {wightDropOpen && (
          <ul className="mt-1 border border-gray-600 rounded bg-gray-900">
            {renderWeightDropDown()}
          </ul>
        )}

        {/* add another position button */}
        <div onClick={() => AdjustNumberOfMenus('plus')}>ADD</div>
      </div>
    </div>
  )
}

export default GutterDropMenu
