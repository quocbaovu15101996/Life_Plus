export const UPDATE_MARKERS_SEARCH = 'UPDATE_MARKERS_SEARCH';

export function updateListMarkers(listMarkers) {
  // alert(JSON.stringify(markers))
  return {
    type: UPDATE_MARKERS_SEARCH,
    listMarkers
  };
}
