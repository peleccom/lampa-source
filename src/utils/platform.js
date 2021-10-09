import Storage from './storage'

function init(){
    if(typeof webOS !== 'undefined'){
        Storage.set('platform','webos')
    }
    else if(typeof webapis !== 'undefined' && typeof tizen !== 'undefined'){
        Storage.set('platform','tizen')

        tizen.tvinputdevice.registerKey("MediaPlayPause");
        tizen.tvinputdevice.registerKey("MediaPlay");
        tizen.tvinputdevice.registerKey("MediaStop");
        tizen.tvinputdevice.registerKey("MediaPause");
        tizen.tvinputdevice.registerKey("MediaRewind");
        tizen.tvinputdevice.registerKey("MediaFastForward");
    }
    else if(navigator.userAgent.toLowerCase().indexOf("lampa_client") > -1){
        Storage.set('platform', 'lampa_client')
    }
    else if(navigator.userAgent.toLowerCase().indexOf("android") > -1) {
        Storage.set('platform', 'android')
    }
    else if(navigator.userAgent.toLowerCase().indexOf("windows nt") > -1) {
        Storage.set('platform', 'browser')
    }
    else{
        Storage.set('platform','')
    }
    
    Storage.set('native',Storage.get('platform') ? true : false)
}

/**
 * Какая платформа
 * @returns String
 */
function get(){
    return Storage.get('platform','')
}

/**
 * Если это платформа
 * @param {String} need - какая нужна? tizen, webos, android
 * @returns Boolean
 */
function is(need){
    if(get() == need) return true
}

/**
 * Если хоть одна из платформ tizen, webos, android
 * @returns Boolean
 */
function any(){
    if(is('tizen') || is('webos') || is('android') || is('lampa_client')) return true
}

export default {
    init,
    get,
    any,
    is
}