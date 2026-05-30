import React from "react";
import { AddFilamentForm } from "./components/AddFilamentForm";

function App() {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-background">
      <header className="border-b border-border-muted pb-5 mb-8">
        <h1 className="text-4xl font-bold pb-3 mb-3">3D Printing Filament Tracker</h1>
        <p className="text-xl pb-1 mb-1">Manage your inventory and track material usage.</p>
      </header>

      <section>
        <AddFilamentForm/>
      </section>
    </div>
  );
}

export default App;