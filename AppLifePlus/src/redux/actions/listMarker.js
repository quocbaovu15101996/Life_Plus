export const UPDATE_MARKERS = 'UPDATE_MARKERS';

export function updateMarkers(markers) {
  // alert(JSON.stringify(markers))
  return {
    type: UPDATE_MARKERS,
    markers
  };
}
