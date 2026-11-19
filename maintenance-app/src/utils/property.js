
export function createBuilding(data) {
  if (!data.propertyId || !data.name?.trim()) {
    throw new Error("Property ID and building name are required.");
  }

  return {
    id: crypto.randomUUID(),
    propertyId: data.propertyId,
    name: data.name.trim(),
    status: "Active",
    createdAt: new Date().toISOString(),
  };
}

export function createUnit(data) {
  if (!data.propertyId || !data.name?.trim()) {
    throw new Error("Property ID and unit name are required.");
  }

  return {
    id: crypto.randomUUID(),
    propertyId: data.propertyId,
    buildingId: data.buildingId || null,
    name: data.name.trim(),
    unitType: data.unitType || "Room",
    occupancyStatus: "Vacant",
    operationalStatus: "Active",
    createdAt: new Date().toISOString(),
  };
}
