'use strict';

import { get, set } from 'object-path';
import { createReducer } from '@reduxjs/toolkit';
import assignDate from './utils/assign-date';
import {
  createClearItemReducer,
  createErrorReducer,
  createInflightReducer,
  createSuccessReducer,
} from './utils/reducer-creators';
import {
  PROVIDER,
  PROVIDER_INFLIGHT,
  PROVIDER_ERROR,
  NEW_PROVIDER,
  NEW_PROVIDER_INFLIGHT,
  NEW_PROVIDER_ERROR,
  PROVIDER_COLLECTIONS,
  PROVIDER_COLLECTIONS_INFLIGHT,
  PROVIDER_COLLECTIONS_ERROR,
  UPDATE_PROVIDER,
  UPDATE_PROVIDER_INFLIGHT,
  UPDATE_PROVIDER_ERROR,
  UPDATE_PROVIDER_CLEAR,
  PROVIDERS,
  PROVIDERS_INFLIGHT,
  PROVIDERS_ERROR,
  SEARCH_PROVIDERS,
  CLEAR_PROVIDERS_SEARCH,
  FILTER_PROVIDERS,
  CLEAR_PROVIDERS_FILTER,
  PROVIDER_DELETE,
  PROVIDER_DELETE_INFLIGHT,
  PROVIDER_DELETE_ERROR,
  OPTIONS_PROVIDERGROUP,
  OPTIONS_PROVIDERGROUP_INFLIGHT,
  OPTIONS_PROVIDERGROUP_ERROR,
} from '../actions/types';

export const initialState = {
  list: {
    data: [],
    meta: {},
    params: {},
  },
  dropdowns: {},
  map: {},
  search: {},
  collections: {},
  created: {},
  updated: {},
  deleted: {},
  restarted: {},
  stopped: {},
};

export default createReducer(initialState, {
  [PROVIDER]: (state, action) => {
    const { id, data } = action;

    state.map[id] = {
      inflight: false,
      data,
      error: null,
    };

    if (get(state, ['deleted', id, 'status']) !== 'error') {
      delete state.deleted[id];
    }
  },
  [PROVIDER_INFLIGHT]: (state, action) => {
    state.map[action.id] = { inflight: true };
  },
  [PROVIDER_ERROR]: createErrorReducer('map'),
  [NEW_PROVIDER]: createSuccessReducer('created'),
  [NEW_PROVIDER_INFLIGHT]: createInflightReducer('created'),
  [NEW_PROVIDER_ERROR]: createErrorReducer('created'),
  [PROVIDER_COLLECTIONS]: (state, { id, data }) => {
    state.collections[id] = { data: data.results.map((c) => c.collectionName) };
  },
  [PROVIDER_COLLECTIONS_INFLIGHT]: (state, action) => {
    state.collections[action.id] = { inflight: true };
  },
  [PROVIDER_COLLECTIONS_ERROR]: (state, action) => {
    state.collections[action.id] = {
      inflight: false,
      error: action.error,
    };
  },
  [UPDATE_PROVIDER]: (state, action) => {
    const { id, data } = action;
    state.map[id] = { data };
    state.updated = { ...state.updated, [id]: { status: 'success' } };
  },
  [UPDATE_PROVIDER_INFLIGHT]: createInflightReducer('updated'),
  [UPDATE_PROVIDER_ERROR]: createErrorReducer('updated'),
  [UPDATE_PROVIDER_CLEAR]: createClearItemReducer('updated'),
  [PROVIDERS]: (state, action) => {
    state.list.data = action.data.results;
    state.list.meta = assignDate(action.data.meta);
    state.list.inflight = false;
    state.list.error = false;
  },
  [PROVIDERS_INFLIGHT]: (state) => {
    state.list.inflight = true;
  },
  [PROVIDERS_ERROR]: (state, action) => {
    state.list.inflight = false;
    state.list.error = action.error;
  },
  [SEARCH_PROVIDERS]: (state, action) => {
    state.list.params.prefix = action.prefix;
  },
  [CLEAR_PROVIDERS_SEARCH]: (state) => {
    delete state.list.params.prefix;
  },
  [FILTER_PROVIDERS]: (state, action) => {
    state.list.params[action.param.key] = action.param.value;
  },
  [CLEAR_PROVIDERS_FILTER]: (state, action) => {
    delete state.list.params[action.paramKey];
  },
  [PROVIDER_DELETE]: createSuccessReducer('deleted'),
  [PROVIDER_DELETE_INFLIGHT]: createInflightReducer('deleted'),
  [PROVIDER_DELETE_ERROR]: createErrorReducer('deleted'),
  [OPTIONS_PROVIDERGROUP]: (state, action) => {
    // Map the list response to an object with key-value pairs like:
    // displayValue: optionElementValue
    const options = action.data.results.reduce(
      (obj, provider) => {
        // Several `results` items can share a `providerName`, but
        // these are de-duplciated by the key-value structure
        obj[provider.providerName] = provider.providerName;
        return obj;
      },
      { '': '' }
    );

    set(state.dropdowns, 'group.options', options);
  },
  [OPTIONS_PROVIDERGROUP_INFLIGHT]: () => {},
  [OPTIONS_PROVIDERGROUP_ERROR]: (state, action) => {
    set(state.dropdowns, 'group.options', []);
    state.list.error = action.error;
  },
});
