'use strict';

import socket from 'socket.io-client';
import virtualize from 'vdom-virtualize';
import toJson from 'vdom-as-json/toJson';
import applyPatch from 'vdom-serialized-patch/patch';
import { getLocalPathname } from 'local-links';

const worker = new Worker('js/workers/main-worker.js');
const rootElement = document.querySelector('main'); 
let bootstrapped = false;

worker.onmessage = ({data}) => {
    const {url, payload} = data;

    console.log('msg from worker:', data);

    requestAnimationFrame(() => {
        applyPatch(rootElement, payload);

        if (!bootstrapped) {
            bootstrapped = true;
            bootstrap();
        }

        if (url === '/about') {
            document.querySelector('#test').addEventListener('click', function (e) {
                e.preventDefault();
                console.log('test click');
            });
        }

    });

    if (location.pathname !== url) {
        history.pushState(null, null, url);
    }
};

worker.postMessage({
    type: 'start',
    payload: {
        virtualDom: toJson(virtualize(rootElement)),
        url: location.pathname
    }
});

window.addEventListener('popstate', () => {
    worker.postMessage({
        type: 'setUrl',
        payload: location.pathname
    });
});

const bootstrap = () => {
    const navElems = document.querySelectorAll('.nav');

    for (let i = 0; i < navElems.length; i++) {
        navElems[i].addEventListener('click', function (e) {
            const pathname = getLocalPathname(e);

            if (pathname) {
                e.preventDefault();
                worker.postMessage({type: 'setUrl', payload: pathname});
            }
        });
    }
};
