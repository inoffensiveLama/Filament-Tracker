import Dexie, {type Table} from "dexie";
import { type PrintJobLog, type FilamentSpool, type PrintProfile } from "./types";


export class FilamentTrackerDatabase extends Dexie {
    filaments!: Table<FilamentSpool>;
    profiles!: Table<PrintProfile>;
    jobLogs!: Table<PrintJobLog>;

    constructor() {
        super("FilamentTrackerDB");

        this.version(1).stores({
            filaments: "++id, brand, material",
            profiles: "++id, profileName",
            jobLogs: "++id, filamentSpoolId, printProfileId, completedAt"
        })
    }
}

export const db = new FilamentTrackerDatabase();