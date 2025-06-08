import React, { useContext, useEffect, useState } from 'react'

// * COMPONENTS
import TierTileImage from '../TierTile/TierTileImage'
import DropDownContainer from './DropDownContainer/DropDownContainer'
import PositionDropMenu from './PositionDropMenu/PositionDropMenu'
import TierDropMenu from './TierDropMenu/TierDropMenu'
import WeightDropMenu from './WeightDropMenu/WeightDropMenu'

// * CONTEXT
import {
  contextTierTiles,
  contextSelectionBoard,
} from '../zTierContainerContexts/useContext'

export const SelectionBoard = () => {
  // * USESTATES
  const [tierTiles, setTierTiles] = useContext(contextTierTiles)
  const [selectionBoard, setSelectionBoard] = useContext(contextSelectionBoard)

  //total drop menus to be displayed
  const [totalNumberOfMenus, setTotalNumberOfMenus] = useState(1)

  // * FUNCTIONS
  const adjustTotalMenus = (adjustment) => {
    if (adjustment === 'add') {
      setTotalNumberOfMenus((prev) => prev + 1)
    }

    if (adjustment === 'delete') {
      setTotalNumberOfMenus((prev) => prev - 1)
      //todo add logic set last entry to undefined
    }

  }

  const renderTierDropMenus = () => {
    const totalMenus = Array.from({ length: totalNumberOfMenus })

    return totalMenus.map((menu, i) => {
      return (
        <div key={`${tierTiles[selectionBoard].name}TierDropMenu${i}`}>
          <TierDropMenu
            tileIndex={selectionBoard}
            dropMenuIndex={i}
            tile={tierTiles[selectionBoard]}
          />
        </div>
      )
    })
  }

  const renderPositionDropMenus = () => {
    const totalMenus = Array.from({ length: totalNumberOfMenus })

    return totalMenus.map((menu, i) => {
      return (
        <div key={`${tierTiles[selectionBoard].name}positionDropMenu${i}`}>
          <PositionDropMenu
            tileIndex={selectionBoard}
            dropMenuIndex={i}
            tile={tierTiles[selectionBoard]}
          />
        </div>
      )
    })
  }

  const renderWeightDropMenus = () => {
    const totalMenus = Array.from({ length: totalNumberOfMenus })

    return totalMenus.map((menu, i) => {
      return (
        <div key={`${tierTiles[selectionBoard].name}weightDropMenu${i}`}>
          <WeightDropMenu
            tileIndex={selectionBoard}
            dropMenuIndex={i}
            tile={tierTiles[selectionBoard]}
          />
        </div>
      )
    })
  }

  // * RENDER
  return (
    <div>
      {/* selection board title */}
      <div>
        {!selectionBoard ? (
          'Select a tile'
        ) : (
          <div>
            {/* selection board title  */}
            <div
            className='text-white font-bold text-xl bg-blue-800 rounded-l shadow'
            >{`${tierTiles[selectionBoard].name}`}</div>

            <div className="flex">
              {/* tile image */}
              <TierTileImage image={tierTiles[selectionBoard].image} />

              {/* plus minus boxes */}

              <div className="flex justify-around items-center w-full">
                {/* - box */}
                <div className="w-10 h-10 flex items-center justify-center text-white font-bold text-xl rounded-lg bg-red-500 cursor-pointer"
                onClick={() => adjustTotalMenus('delete')}
                >
                  -
                </div>

                {/* + box */}
                <div className="w-10 h-10 flex items-center justify-center text-white font-bold text-xl rounded-lg bg-green-500 cursor-pointer"
                onClick={() => adjustTotalMenus('add')}
                >
                  +
                </div>
              </div>
            </div>

            {/* drop menues */}
            <div className="flex gap-2">
              {/* tier dropmenu wrapper */}
              <div>{renderTierDropMenus()}</div>

              {/* position dropmenu wrapper */}
              <div>
                <div>{renderPositionDropMenus()}</div>
              </div>

              {/* weight dropmenu wrapper*/}
              <div>
                <div>{renderWeightDropMenus()}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
