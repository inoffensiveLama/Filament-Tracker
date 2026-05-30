export type FilamentMaterial = "PLA" | "PETG" | "ABS" | "NYLON" | "ASA";

export interface FilamentSpool {
    id?: number;
    brand: string;
    name: string;
    material: FilamentMaterial;
    colorName: string;
    colorHex: string;
    totalWeightGrams: number;
    remainingWeightGrams: number;
}

export interface PrintProfile {
    id?: number;
    profileName: string;
    layerHeight: number;
    extruderTempC: number;
    bedTempC: number;
    printSpeedMms: number;
}

export interface PrintJobLog {
    id?: number;
    projectName: string;
    filamentSpoolId: number;
    printProfileId: number;
    weightUsedGrams: number;
    estimatedTimeMinutes: number;
    status: "SUCCESS" | "FAILED";
    completedAt: string;
}