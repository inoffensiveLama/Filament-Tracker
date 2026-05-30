import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../data/db";

export const FilamentInventoryTiles: React.FC = () => {

    const filaments = useLiveQuery(() => db.filaments.toArray());

    if (filaments === undefined) {
        return <h2>Loading spools...</h2>
    }

    if (filaments.length === 0) {
        return <h2>No spools added yet.</h2>
    }

    return (
        <div className="px-5">
            <h2 className="pb-3">Active Filament Inventory</h2>
            <div className="grid grid-cols-1 gap-4">
                {filaments.map((spool) => (
                    <article key={spool.id} className="p-2 col-span-1 grid grid-cols-3 rounded-lg bg-tile-background">
                        <div>
                            <span className="font-bold">{spool.material}</span>
                            <h3>{spool.brand}</h3>
                            <p>{spool.name}</p>
                        </div>
                        <div className="flex">
                            <div className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: spool.colorHex }}/>
                            <span>{spool.colorName}</span>
                        </div>
                        <div>
                            <p>Remaining Weight</p>
                            <p>{spool.remainingWeightGrams}g / {spool.totalWeightGrams}g</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}