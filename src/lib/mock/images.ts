// Shared image library for the reference build.
// These are public Unsplash photo IDs used as stand-in real estate imagery so
// the UI looks real. Rendered through the Photo component, which falls back to
// a teal gradient if any URL is slow or blocked. Nothing here is an actual
// Marshall Reddick listing or person.

// Build a sized Unsplash URL from a photo ID.
export function unsplash(id: string, w = 800): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

// Property exteriors and interiors. Order is stable so listings look curated.
export const PROPERTY_PHOTO_IDS: string[] = [
  "1512917774080-9991f1c4c750",
  "1600596542815-ffad4c1539a9",
  "1600585154340-be6161a56a0c",
  "1600607687939-ce8a6c25118c",
  "1564013799919-ab600027ffc6",
  "1570129477492-45c003edd2be",
  "1568605114967-8130f3a36994",
  "1576941089067-2de3c901e126",
  "1583608205776-bfd35f0d9f83",
  "1605276374104-dee2a0ed3cd6",
  "1605146769289-440113cc3d00",
  "1512915922686-57c11dde9b6b",
];

// A few interior shots for galleries.
export const INTERIOR_PHOTO_IDS: string[] = [
  "1502672260266-1c1ef2d93688",
  "1493809842364-78817add7ffb",
  "1556912172-45b7abe8b7e1",
  "1600210492486-724fe5c67fb0",
];

// Agent headshots. The first is the signed-in agent used across the cockpit.
export const HEADSHOT_IDS: string[] = [
  "1560250097-0b93528c311a",
  "1573496359142-b8d87734a5a2",
  "1500648767791-00dcc994a43e",
  "1580489944761-15a19d654956",
];

// Convenience: a full property photo URL by index (wraps around the set).
export function propertyPhoto(index: number, w = 800): string {
  const id = PROPERTY_PHOTO_IDS[index % PROPERTY_PHOTO_IDS.length];
  return unsplash(id, w);
}

export function headshot(index: number, w = 400): string {
  const id = HEADSHOT_IDS[index % HEADSHOT_IDS.length];
  return unsplash(id, w);
}
