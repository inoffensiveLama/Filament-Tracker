import React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../data/db";

export const FilamentInventoryTiles: React.FC = () => {

    const filaments = useLiveQuery(() => db.filaments.toArray());

    const handleDelete = async (id?: number) => {
        if (!id) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this spool?");
        if (confirmDelete) {
            try {
                await db.filaments.delete(id);
            } catch (error) {
                console.error("Failed to delete filament spool: ", error);
            }
        }
    }

    if (filaments === undefined) {
        return <h2 className="px-5">Loading spools...</h2>
    }

    if (filaments.length === 0) {
        return <h2 className="px-5">No spools added yet.</h2>
    }

    return (
        <div className="px-5">
            <h2 className="pb-3">Active Filament Inventory</h2>
            <div className="grid grid-cols-1 gap-4">
                {filaments.map((spool) => (
                    <article key={spool.id} className="p-2 col-span-1 grid grid-cols-8 rounded-lg bg-tile-background">
                        <div className="col-span-1">
                            <p>ID:</p>
                            <p>{spool.id}</p>
                        </div>
                        <div className="col-span-2">
                            <span className="font-bold">{spool.material}</span>
                            <h3>{spool.brand}</h3>
                            <p>{spool.name}</p>
                        </div>
                        <div className="flex col-span-2">
                            <div className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: spool.colorHex }}/>
                            <span>{spool.colorName}</span>
                        </div>
                        <div className="col-span-2">
                            <p>Remaining Weight</p>
                            <p>{spool.remainingWeightGrams}g / {spool.totalWeightGrams}g</p>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => handleDelete(spool.id)}
                                title="Delete Spool"
                            >
                                ❌
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}