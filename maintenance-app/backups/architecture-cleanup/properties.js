
export function createBuilding(data) {
  if (!data.propertyId || !data.name) {
    throw new Error("Property ID and building name are required.");
  }

  return {
    id: crypto.randomUUID(),
    propertyId: data.propertyId,
    name: data.name,
    status: "Active",
    createdAt: new Date().toISOString(),
  };
}

export function createUnit(data) {
  if (!data.propertyId || !data.name) {
    throw new Error("Property ID and unit name are required.");
  }

  if (data.buildingId && !data.buildingId.trim()) {
    throw new Error("Building ID must be valid.");
  }

  return {
    id: crypto.randomUUID(),
    propertyId: data.propertyId,
    buildingId: data.buildingId || null,
    name: data.name,
    unitType: data.unitType || "Room",
    occupancyStatus: "Vacant",
    operationalStatus: "Active",
    createdAt: new Date().toISOString(),
  };
}
