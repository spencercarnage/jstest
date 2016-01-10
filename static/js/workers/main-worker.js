'use strict';

import diff from 'virtual-dom/diff'
import serializePatch from 'vdom-serialized-patch/serialize'
import fromJson from 'vdom-as-json/fromJson'
import app from '../views/app';
let currentVDom;

const state = {
    url: '/'
};

self.onmessage = ({data}) => {
    const {type, payload} = data;

    console.log('worker got message:', data);

    switch (type) {
        case 'start': {
            currentVDom = fromJson(payload.virtualDom);
            state.url = payload.url;
            break;
        }

        case 'setUrl': {
            state.url = payload;
            break;
        }
    }

    const newVDom = app(state);

    // do the diff
    const patches = diff(currentVDom, newVDom);

    // cache last vdom so we diff against the new one the next time through
    currentVDom = newVDom;

    self.postMessage({
        url: state.url,
        payload: serializePatch(patches)
    });
};
