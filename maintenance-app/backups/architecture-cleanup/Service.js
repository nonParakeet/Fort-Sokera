
import { ORGANIZATION, PROPERTIES } from "../data/properties";
import { createBuilding, createUnit } from "../utils/property";

const KEYS = {
  buildings: "livingstone_buildings",
  units: "livingstone_units",
};

function readRecords(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function writeRecords(key, records) {
  localStorage.setItem(key, JSON.stringify(records));
}

export function getRegistryData() {
  return {
    organization: ORGANIZATION,
    properties: PROPERTIES,
    buildings: readRecords(KEYS.buildings),
    units: readRecords(KEYS.units),
  };
}

export function registerBuilding(data) {
  const propertyExists = PROPERTIES.some(
    (property) => property.id === data.propertyId
  );

  if (!propertyExists) {
    throw new Error("Selected property does not exist.");
  }

  const buildings = readRecords(KEYS.buildings);
  const building = createBuilding(data);

  buildings.push(building);
  writeRecords(KEYS.buildings, buildings);

  return building;
}

export function registerUnit(data) {
  const propertyExists = PROPERTIES.some(
    (property) => property.id === data.propertyId
  );

  if (!propertyExists) {
    throw new Error("Selected property does not exist.");
  }

  const buildings = readRecords(KEYS.buildings);

  if (data.buildingId) {
    const building = buildings.find(
      (item) => item.id === data.buildingId
    );

    if (!building || building.propertyId !== data.propertyId) {
      throw new Error(
        "Selected building does not belong to this property."
      );
    }
  }

  const units = readRecords(KEYS.units);
  const unit = createUnit(data);

  units.push(unit);
  writeRecords(KEYS.units, units);

  return unit;
}
