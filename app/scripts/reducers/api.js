'use strict';
import { get, set } from 'object-path';

import {
  AUTHENTICATED,
  LIST_COLLECTIONS,
  QUERY_COLLECTION,
  GET_COLLECTION,
  POST_COLLECTION
} from '../actions';

export const initialState = {
  authenticated: true,
  collections: [],
  collectionDetail: {},
  postedCollections: {}
};

export default function reducer (state = initialState, action) {
  state = Object.assign({}, state);
  switch (action.type) {

    case AUTHENTICATED:
      set(state, 'authenticated', action.data);
      break;

    // TODO put each collection in collectionDetail as well.
    case LIST_COLLECTIONS:
      set(state, 'collections', action.data);
      break;

    case QUERY_COLLECTION:
      set(state, ['collectionDetail', action.data.collectionName], {
        inflight: true
      });
      break;

    case GET_COLLECTION:
      set(state, ['collectionDetail', action.data.collectionName], {
        inflight: false,
        data: action.data
      });
      break;

    case POST_COLLECTION:
      set(state, ['postedCollections', action.postType, action.key], action.data);
      break;
  }
  return state;
}
