/*
 * The gutter compnent houses all the tierTile images at the bottom of the tier list.
 */

import React, { useContext, useEffect, useState } from 'react'

// * COMPONENTS
import TierTileImage from '../TierTile/TierTileImage'
import GutterDropMenu from './GutterDropMenu/GutterDropMenu'

// * CONTEXT
import { contextTierTiles } from '../zTierContainerContexts/usecontext'

const Gutter = () => {
  // list of tile objects used by the board
  // * USESTATES
  const [tierTiles, setTierTiles] = useContext(contextTierTiles)
  const [dropMenuOpen, setDropMenuOpen] = useState({})

  // * FUNCTIONS
  // open drop menu
  const toggleDropMenu = (tileName) => {
    setDropMenuOpen((prev) => ({
      ...prev,
      [tileName]: !prev[tileName],
    }))
  }

  // render gutter
  const renderGutter = () => {
    return tierTiles.map((tile, tileIndex) => (
      <div key={tile.name} className='relative inline-block'>
        <div onClick={() => toggleDropMenu(tile.name)}>
          <TierTileImage image={tile.image} name={tile.name} />
        </div>
        <GutterDropMenu
          tile={tile}
          tileIndex={tileIndex}
          key={`${tile.name}DropMenu`}
          className={`absolute z-50 mt-2 ${dropMenuOpen[tile.name] ? '' : 'hidden'}`}
        />
      </div>
    ))
  }

  // * RENDER
  return (
    <>
      <div>Gutter</div>
      <div className="flex items-center gap-2 flex-wrap p-2 ">
        {tierTiles.length ? renderGutter() : 'Loading Gutter'}
      </div>
    </>
  )
}

export default Gutter
