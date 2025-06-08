// export function assignWeightedPositions(tiles) {
//   return tiles.map((tile) => {
//     //fillter out incomplete positions listed
//     const positions = (tile.positions || []).filter(
//       (position) =>
//         position.tier !== undefined &&
//         position.position !== undefined &&
//         position.weight !== undefined
//     )

//     if (!positions.length) return { ...tile, assignedPosition: undefined }

//     // get total weight off all positions to scale the random selection
//     const totalWeight = positions.reduce((sum, pos) => sum + pos.weight, 0)

//     //if total weight is  0 or less than zero return
//     if (totalWeight <= 0) return { ...tile, assignedPosition: undefined }

//     //generate number between 0 and total weight
//     const rand = Math.random() * totalWeight

//     let accumulated = 0

//     for (let i = 0; i < positions.length; i++) {
//       accumulated += positions[i].weight
//       if (rand <= accumulated) {
//         return { ...tile, assignedPosition: positions[i] }
//       }
//     }

//     // Fallback in case of rounding errors
//     return { ...tile, assignedPosition: positions[positions.length - 1] }
//   })
// }

export function assignWeightedPositions(tiles) {
  const updatedTiles = [];

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];

    // filter out incomplete positions listed
    const positions = (tile.positions || []).filter(
      (position) =>
        position.tier !== undefined &&
        position.position !== undefined &&
        position.weight !== undefined
    );

    // if no valid positions, return with undefined
    if (!positions.length) {
      updatedTiles.push({ ...tile, assignedPosition: undefined });
      continue;
    }

    // get total weight of all positions to scale the random selection
    const totalWeight = positions.reduce((sum, pos) => sum + pos.weight, 0);

    // if total weight is 0 or less than zero, return with undefined
    if (totalWeight <= 0) {
      updatedTiles.push({ ...tile, assignedPosition: undefined });
      continue;
    }

    // generate number between 0 and total weight
    const rand = Math.random() * totalWeight;

    let accumulated = 0;
    let selected = null;

    // pick a position based on weighted random selection
    for (let pos of positions) {
      accumulated += pos.weight;
      if (rand <= accumulated) {
        selected = { ...pos }; // clone so we can safely mutate
        break;
      }
    }

    // fallback in case of rounding errors
    if (!selected) selected = { ...positions[positions.length - 1] };

    // check for duplicates with prior tiles in the same tier
    const conflictingIndex = updatedTiles.findIndex(
      (t) =>
        t.assignedPosition &&
        t.assignedPosition.tier === selected.tier &&
        t.assignedPosition.position === selected.position
    );

    if (conflictingIndex !== -1) {
      // randomly choose which tile to bump
      const resolveUp = Math.random() < 0.5;

      if (resolveUp) {
        // increment current tile's position
        selected.position += 1;
      } else {
        // increment the prior tile's position
        const previousTile = updatedTiles[conflictingIndex];
        const bumpedPosition = {
          ...previousTile.assignedPosition,
          position: previousTile.assignedPosition.position + 1,
        };

        updatedTiles[conflictingIndex] = {
          ...previousTile,
          assignedPosition: bumpedPosition,
        };
      }
    }

    // add the current tile with its assigned position to the result
    updatedTiles.push({ ...tile, assignedPosition: selected });
  }

  return updatedTiles;
}
