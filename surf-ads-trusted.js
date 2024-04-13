/**
 * Copyright (C) Microsoft Corporation. All rights reserved.
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

import { SurfADSHandler } from './surf_ads_handler.mojom-webui.js';

const MessagesEnum = {
  REQUEST_DATA: 'requestData',
  RESIZE_IFRAME: 'resizeIframe',
  SAVE_GAME_DATA: 'saveGameData',
  GET_GAME_DATA: 'getGameData',
  RECORD_ACTIONS: 'recordActions',
  RECORD_THEME: 'recordTheme',
  RECORD_GAME_MODE: 'recordGameMode',
  RECORD_BODY_COLOR: 'recordBodyColor',
  RECORD_OUTFIT_COLOR: 'recordOutfitColor',
  RECORD_OUTFITS: 'recordOutfits',
  RECORD_HAIR_COLOR: 'recordHairColor',
  RECORD_HAIR_STYLE: 'recordHairStyle',
  RECORD_ACCESSORY: 'recordAccessory',
  OPEN_SIDEBAR_APP: 'openSidebarApp',
};


const UNTRUSTED_ORIGIN = 'https://seethathuman.github.io/surf/untrusted/surf';

let surfADSHandler = null;

document.addEventListener('DOMContentLoaded', () => {
  // Setup backend mojo.
  surfADSHandler = SurfADSHandler.getRemote();
});

window.addEventListener('message', (event) => {
  if (!(event.origin.startsWith(UNTRUSTED_ORIGIN)) ||
    !event.data.type) {
    return;
  }

  if (event.data.type === MessagesEnum.REQUEST_DATA) {
    event.source.postMessage({
      type: 'init',
      data: loadTimeData.data_,
    }, UNTRUSTED_ORIGIN);
    return;
  }

  if (event.data.type === MessagesEnum.RESIZE_IFRAME) {
    const desiredHeight =
      event.data.height && event.data.height < 580 ? event.data.height : 580;
    document.documentElement.style.height = desiredHeight;
    document.getElementById('untrusted-iframe').style.height = desiredHeight;
    return;
  }

  if (!surfADSHandler) {
    return;
  }

  switch (event.data.type) {
    case MessagesEnum.SAVE_GAME_DATA:
      surfADSHandler.saveGameStats(event.data.stats);
      break;
    case MessagesEnum.GET_GAME_DATA:
      surfADSHandler.getGameStats().then(function (result) {
        event.source.postMessage(result, UNTRUSTED_ORIGIN);
      });
      break;
    case MessagesEnum.RECORD_ACTIONS:
      surfADSHandler.recordSurfActions(event.data.action);
      break;
    case MessagesEnum.RECORD_THEME:
      surfADSHandler.recordSurfTheme(event.data.action);
      break;
    case MessagesEnum.RECORD_GAME_MODE:
      surfADSHandler.recordSurfGameMode(event.data.action);
      break;
    case MessagesEnum.RECORD_BODY_COLOR:
      surfADSHandler.recordSurfBodyColor(event.data.action);
      break;
    case MessagesEnum.RECORD_OUTFIT_COLOR:
      surfADSHandler.recordSurfOutfitColor(event.data.action);
      break;
    case MessagesEnum.RECORD_OUTFITS:
      surfADSHandler.recordSurfOutfits(event.data.action);
      break;
    case MessagesEnum.RECORD_HAIR_COLOR:
      surfADSHandler.recordSurfHairColor(event.data.action);
      break;
    case MessagesEnum.RECORD_HAIR_STYLE:
      surfADSHandler.recordSurfHairStyles(event.data.action);
      break;
    case MessagesEnum.RECORD_ACCESSORY:
      surfADSHandler.recordSurfAccessories(event.data.action);
      break;
    case MessagesEnum.OPEN_SIDEBAR_APP:
      chrome.edgeMarketingPagePrivate.showFeatures('hub_apps_96defd79-4015-4a32-bd09-794ff72183ef');
      break;
    default:
      // Unknown event.
      break;
  }
});

// If iframe loaded early than handler initialized,
// this message will trigger iframe initialization.
const iframe = document.getElementById('untrusted-iframe');
iframe.contentWindow.postMessage({
  type: 'init',
  data: loadTimeData.data_,
}, UNTRUSTED_ORIGIN);
