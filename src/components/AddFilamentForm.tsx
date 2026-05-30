import React, { useState } from "react";
import { db } from "../data/db";
import { type FilamentMaterial } from "../data/types";


export const AddFilamentForm: React.FC = () => {
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [material, setMaterial] = useState<FilamentMaterial>("PLA");
    const [colorName, setColorName] = useState("");
    const [colorHex, setColorHex] = useState("#000000");
    const [weight, setWeight] = useState(1000);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!brand || !name || !colorName) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            await db.filaments.add({
                brand,
                name,
                material,
                colorName,
                colorHex,
                totalWeightGrams: weight,
                remainingWeightGrams: weight
            });

            setBrand("");
            setName("");
            setColorName("");
            alert("Filament spool added successfully!");
        } catch (error) {
            console.error("Failed to add filament", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add New Filament Spool</h3>

            <div>
                <label className="form-label" htmlFor="brand">Brand *</label>
                <input 
                    className="form-input"
                    id="brand"
                    type="text"
                    placeholder="e.g., Elegoo"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
            </div>

            <div>
                <label className="form-label" htmlFor="name">Spool Name *</label>
                <input 
                    className="form-input"
                    id="name"
                    type="text"
                    placeholder="e.g., Rapid PLA"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label className="form-label" htmlFor="material">Material *</label>
                <select
                    className="form-input"
                    id="material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value as FilamentMaterial)}
                >
                    <option value="PLA">PLA</option>
                    <option value="PETG">PETG</option>
                    <option value="ABS">ABS</option>
                    <option value="NYLON">NYLON</option>
                    <option value="ASA">ASA</option>
                </select>
            </div>

            <div>
                <label className="form-label" htmlFor="colorName">Color Name *</label>
                <input 
                    className="form-input"
                    id="colorName"
                    type="text"
                    placeholder="e.g., Black"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                />
            </div>

            <div>
                <label className="form-label" htmlFor="colorHex">Hex Swatch *</label>
                <input 
                    className="form-input"
                    id="colorHex"
                    type="color"
                    placeholder="#000000"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                />
            </div>

            <div>
                <label className="form-label" htmlFor="weight">Total Weight (Grams)</label>
                <input 
                    className="form-input"
                    id="weight"
                    type="number"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                />
            </div>

            <button className="form-submit-button" type="submit">Save Spool</button>
        </form>
    );
}