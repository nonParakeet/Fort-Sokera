
import { useState } from "react";
import {
  Building2,
  DoorOpen,
  Plus,
  Home,
} from "lucide-react";

import {
  getRegistryData,
  registerBuilding,
  registerUnit,
} from "../services/propertyService";

export default function Properties() {
  const [registry, setRegistry] = useState(getRegistryData);

  const [selectedProperty, setSelectedProperty] = useState(
    registry.properties[0]?.id || ""
  );

  const [buildingName, setBuildingName] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitType, setUnitType] = useState("Room");
  const [buildingId, setBuildingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const refreshRegistry = () => {
    setRegistry(getRegistryData());
  };

  const currentProperty = registry.properties.find(
    (property) => property.id === selectedProperty
  );

  const propertyBuildings = registry.buildings.filter(
    (building) => building.propertyId === selectedProperty
  );

  const propertyUnits = registry.units.filter(
    (unit) => unit.propertyId === selectedProperty
  );

  const handleBuildingSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      registerBuilding({
        propertyId: selectedProperty,
        name: buildingName.trim(),
      });

      setBuildingName("");
      refreshRegistry();
      setSuccess("Building registered successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUnitSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      registerUnit({
        propertyId: selectedProperty,
        buildingId: buildingId || null,
        name: unitName.trim(),
        unitType,
      });

      setUnitName("");
      setBuildingId("");
      refreshRegistry();
      setSuccess("Unit registered successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-slate-500">
          Livingstone Management / Registry
        </p>
        <h2 className="mt-1 text-2xl font-bold">
          Property Registry
        </h2>
        <p className="mt-2 text-slate-500">
          Manage properties, buildings and rental units.
        </p>
      </div>

      {/* Property overview */}
      <section className="grid gap-4 sm:grid-cols-2">
        {registry.properties.map((property) => {
          const buildings = registry.buildings.filter(
            (item) => item.propertyId === property.id
          );

          const units = registry.units.filter(
            (item) => item.propertyId === property.id
          );

          return (
            <button
              key={property.id}
              onClick={() => {
                setSelectedProperty(property.id);
                setBuildingId("");
                setError("");
                setSuccess("");
              }}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm transition ${
                selectedProperty === property.id
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                  <Home size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">{property.name}</h3>
                  <p className="text-sm text-slate-500">
                    {property.operationalStatus}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Buildings</p>
                  <p className="text-2xl font-bold">
                    {buildings.length}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Units</p>
                  <p className="text-2xl font-bold">
                    {units.length}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      {currentProperty && (
        <>
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">
              Selected Property
            </h3>

            <p className="text-xl font-bold">
              {currentProperty.name}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {currentProperty.propertyType} ·{" "}
              {currentProperty.operatingModel}
            </p>
          </section>

          {/* Register building */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Building2 size={20} />
              <h3 className="text-lg font-semibold">
                Register Building / Block
              </h3>
            </div>

            <form
              onSubmit={handleBuildingSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
                placeholder="e.g. Block A"
                required
                className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3"
              />

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-slate-700"
              >
                <Plus size={18} />
                Add Building
              </button>
            </form>

            <div className="mt-4 space-y-2">
              {propertyBuildings.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No buildings registered for this property.
                </p>
              ) : (
                propertyBuildings.map((building) => (
                  <div
                    key={building.id}
                    className="rounded-lg bg-slate-50 p-3"
                  >
                    {building.name}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Register unit */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <DoorOpen size={20} />
              <h3 className="text-lg font-semibold">
                Register Unit / Room
              </h3>
            </div>

            <form
              onSubmit={handleUnitSubmit}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Unit name / number
                </label>
                <input
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  placeholder="e.g. Room 01"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Unit type
                </label>
                <select
                  value={unitType}
                  onChange={(e) => setUnitType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                >
                  <option value="Room">Room</option>
                  <option value="Bedsitter">Bedsitter</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Shop">Shop</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Building (optional)
                </label>

                <select
                  value={buildingId}
                  onChange={(e) => setBuildingId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                >
                  <option value="">
                    Directly under property (no building)
                  </option>

                  {propertyBuildings.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-white hover:bg-blue-600 sm:col-span-2"
              >
                <Plus size={18} />
                Register Unit
              </button>
            </form>
          </section>

          {/* Unit register */}
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">
              Registered Units
            </h3>

            {propertyUnits.length === 0 ? (
              <p className="text-sm text-slate-400">
                No units registered yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b text-slate-500">
                    <tr>
                      <th className="py-3">Unit</th>
                      <th className="py-3">Type</th>
                      <th className="py-3">Building</th>
                      <th className="py-3">Occupancy</th>
                    </tr>
                  </thead>

                  <tbody>
                    {propertyUnits.map((unit) => {
                      const building = registry.buildings.find(
                        (item) => item.id === unit.buildingId
                      );

                      return (
                        <tr key={unit.id} className="border-b">
                          <td className="py-3 font-medium">
                            {unit.name}
                          </td>
                          <td className="py-3">{unit.unitType}</td>
                          <td className="py-3">
                            {building?.name || "Direct property unit"}
                          </td>
                          <td className="py-3">
                            {unit.occupancyStatus}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {success}
        </p>
      )}
    </div>
  );
}
