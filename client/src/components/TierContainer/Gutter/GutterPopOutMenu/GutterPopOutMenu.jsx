import React, { useContext, useEffect, useState } from 'react'

// * COMPONENTS
import TierDropMenu from './TierDropMenu/TierDropMenu'
import PositionDropMenu from './PositionDropMenu/PositionDropMenu'
import WeightDropMenu from './WeightDropMenu/WeightDropMenu'

// * CONTEXT
import {
  contextTierLabels,
  contextTierTiles,
} from '../../zTierContainerContexts/useContext'

const GutterPopOutMenu = ({ className = '', tile, tileIndex }) => {
  // * USESTATES
  //total drop menus to be displayed
  const [totalNumberOfMenus, setTotalNumberOfMenus] = useState(3)

  // * FUNCTIONS
  const adjustTotalMenus = (adjustment) => {
    if (adjustment === 'add') {
      setTotalNumberOfMenus((prev) => prev + 1)
    }

    if (adjustment === 'delete') {
      setTotalNumberOfMenus((prev) => prev - 1)
    }
  }

  const renderTierDropMenus = () => {
    const totalMenus = Array.from({ length: totalNumberOfMenus })

    return totalMenus.map((menu, i) => {
      return (
        <div key={`${tile.name}TierDropMenu${i}`}>
          <TierDropMenu tileIndex={tileIndex} dropMenuIndex={i} tile={tile} />
        </div>
      )
    })
  }

  const renderPositionDropMenus = () => {
    const totalMenus = Array.from({ length: totalNumberOfMenus })

    return totalMenus.map((menu, i) => {
      return (
        <div key={`${tile.name}positionDropMenu${i}`}>
          <PositionDropMenu
            tileIndex={tileIndex}
            dropMenuIndex={i}
            tile={tile}
          />
        </div>
      )
    })
  }

  const renderWeightDropMenus = () => {
    const totalMenus = Array.from({ length: totalNumberOfMenus })

    return totalMenus.map((menu, i) => {
      return (
        <div key={`${tile.name}weightDropMenu${i}`}>
          <WeightDropMenu tileIndex={tileIndex} dropMenuIndex={i} tile={tile} />
        </div>
      )
    })
  }

  // * USEEFFECTS

  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow-xl w-64 border border-gray-600">
      {/* Tile Name */}
      <div>{tile.name}</div>

      {/* popout menu wrapper */}
      <div className="flex gap-2">
        {/* tier dropmenu wrapper */}
        <div>
          <div>Tier</div>
          {renderTierDropMenus()}
        </div>

        {/* position dropmenu wrapper */}
        <div>
          <div>Position</div>
          <div>{renderPositionDropMenus()}</div>
        </div>

        {/* weight dropmenu wrapper*/}
        <div>
          <div>Weight</div>
          <div>{renderWeightDropMenus()}</div>
        </div>

        {/* add button */}
        <div onClick={() => adjustTotalMenus('add')}>ADD</div>
      </div>
    </div>
  )
}

export default GutterPopOutMenu
