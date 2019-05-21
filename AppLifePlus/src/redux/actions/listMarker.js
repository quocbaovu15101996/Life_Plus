export const UPDATE_MARKERS = 'UPDATE_MARKERS';

export function updateMarkers(markers) {
  return {
    type: UPDATE_MARKERS,
    markers
  };
}
