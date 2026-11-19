
export const ORGANIZATION = {
  id: "ORG-001",
  name: "Livingstone Management",
};

export const PROPERTIES = [
  {
    id: "PROP-001",
    organizationId: ORGANIZATION.id,
    name: "Livingstone Hostel A",
    propertyType: "Residential",
    operationalStatus: "Active",
    operatingModel: "Long-term rental",
  },
  {
    id: "PROP-002",
    organizationId: ORGANIZATION.id,
    name: "Livingstone Hostel B",
    propertyType: "Residential",
    operationalStatus: "Active",
    operatingModel: "Long-term rental",
  },
];

// Buildings belong to properties.
// Populate this registry with actual building records
// as they are established.

export const BUILDINGS = [];

// Units can belong to a building or directly to a property.

export const UNITS = [];
