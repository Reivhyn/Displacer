/*
 * The gutter compnent houses all the tierTile images at the bottom of the tier list.
 */

import React, { useContext, useEffect, useState } from 'react'

// * COMPONENTS
import TierTileImage from '../TierTile/TierTileImage'
import GutterPopOutMenu from './GutterPopOutMenu/GutterPopOutMenu'

// * CONTEXT
import { contextTierTiles, contextSelectionBoard } from '../zTierContainerContexts/useContext'

const Gutter = () => {
  // list of tile objects used by the board
  // * USESTATES
  const [tierTiles, setTierTiles] = useContext(contextTierTiles)
  const [popOutMenuOpen, setPopOutMenuOpen] = useState({})
  const [selectionBoard, setSelectionBoard] = useContext(contextSelectionBoard)

  // * FUNCTIONS
  //! REMOVING POPOUT WINDOWS
  // open drop menu
  const togglePopOutMenu = (tileName) => {
    setPopOutMenuOpen((prev) => ({
      ...prev,
      [tileName]: !prev[tileName],
    }))
  }

  // set selectionBoard
  const updateSelectionBoard = (tileIndex) => {
    console.log('UPDATE SELECTION BOARD CALLED');
    
    setSelectionBoard(prev => {
      if (prev === tileIndex) {
        return prev = undefined
      }

      return prev = tileIndex
    })
  }

  // render gutter
  const renderGutter = () => {
    return tierTiles.map((tile, tileIndex) => (
      <div key={tile.name} className="relative">
        <div 
        className='cursor-pointer'
        onClick={() => updateSelectionBoard(tileIndex)}>
          <TierTileImage image={tile.image} name={tile.name} />
        </div>
        
        {/* //! popout menu going to move to selction board */}
        {/* {popOutMenuOpen[tile.name] && (
          <div className='absolute top-full left-0 z-50 mt-2'>
            <GutterPopOutMenu
              tile={tile}
              tileIndex={tileIndex}
            />
          </div>
        )} */}
      </div>
    ))
  }
  
  // * RENDER
  return (
    <>
      <div className="relative">
        <div className="flex items-center gap-2 flex-wrap p-2 ">
          {tierTiles.length ? renderGutter() : 'Loading Gutter'}
        </div>
      </div>
    </>
  )
}

export default Gutter
