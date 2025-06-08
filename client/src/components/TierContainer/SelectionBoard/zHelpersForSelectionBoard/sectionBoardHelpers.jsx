export  const updateTierPositionArr = (tileIndex, dropMenuIndex, setTierTiles, selection, key) => {
  setTierTiles((prev) => {
    //clone the full tile array - avoiding direct mutation
    const updated = [...prev]

    //clone tspecific tile to be updated
    const tile = { ...updated[tileIndex] }

    // clone the positions array or start with empty array if it is undefined
    const positions = [...(tile.positions || [])]

    //clone specific position object at the given index or creat new one if it does not exist
    const current = positions[dropMenuIndex] || { tier: undefined, position: undefined, weight: undefined }

    //make the update to the position key
    positions[dropMenuIndex] = {
      ...current,
      [key]: selection,
    }

    tile.positions = positions

    console.log('positions', positions)
    updated[tileIndex] = tile
    return updated
  })
}