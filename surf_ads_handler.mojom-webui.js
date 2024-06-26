// mojom-webui/components/edge_surf_ads/content/mojom/surf_ads_handler.mojom-webui.js is auto generated by mojom_bindings_generator.py, do not edit

// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {mojo} from './resources/mojo/mojo/public/js/bindings.js';


/**
 * @const { {$: !mojo.internal.MojomType} }
 */
export const SurfActionsSpec = { $: mojo.internal.Enum() };

/**
 * @enum {number}
 */
export const SurfActions = {
  
  CUSTOMIZED_CHARACTER: 0,
  SHARE: 1,
  MIN_VALUE: 0,
  MAX_VALUE: 1,
};

/**
 * @const { {$: !mojo.internal.MojomType} }
 */
export const SurfGameThemeSpec = { $: mojo.internal.Enum() };

/**
 * @enum {number}
 */
export const SurfGameTheme = {
  
  Surf: 0,
  Classic: 1,
  Ski: 2,
  Bike: 3,
  Seasonal: 4,
  SpecialEvent: 5,
  NewTheme: 6,
  MIN_VALUE: 0,
  MAX_VALUE: 6,
};

/**
 * @const { {$: !mojo.internal.MojomType} }
 */
export const SurfGameModeSpec = { $: mojo.internal.Enum() };

/**
 * @enum {number}
 */
export const SurfGameMode = {
  
  Classic: 0,
  Buoy: 1,
  Speed: 2,
  Collector: 3,
  MIN_VALUE: 0,
  MAX_VALUE: 3,
};

/**
 * @const { {$: !mojo.internal.MojomType} }
 */
export const SurfGameBodyColorSpec = { $: mojo.internal.Enum() };

/**
 * @enum {number}
 */
export const SurfGameBodyColor = {
  
  ColorOne: 0,
  ColorTwo: 1,
  ColorThree: 2,
  ColorFour: 3,
  ColorFive: 4,
  ColorSix: 5,
  ColorSeven: 6,
  ColorEight: 7,
  ColorNine: 8,
  MIN_VALUE: 0,
  MAX_VALUE: 8,
};

/**
 * @const { {$: !mojo.internal.MojomType} }
 */
export const SurfGameOutfitColorSpec = { $: mojo.internal.Enum() };

/**
 * @enum {number}
 */
export const SurfGameOutfitColor = {
  
  ColorOne: 0,
  ColorTwo: 1,
  ColorThree: 2,
  ColorFour: 3,
  ColorFive: 4,
  ColorSix: 5,
  ColorSeven: 6,
  ColorEight: 7,
  ColorNine: 8,
  MIN_VALUE: 0,
  MAX_VALUE: 8,
};

/**
 * @const { {$: !mojo.internal.MojomType} }
 */
export const SurfGameHairColorSpec = { $: mojo.internal.Enum() };

/**
 * @enum {number}
 */
export const SurfGameHairColor = {
  
  ColorOne: 0,
  ColorTwo: 1,
  ColorThree: 2,
  ColorFour: 3,
  ColorFive: 4,
  ColorSix: 5,
  ColorSeven: 6,
  ColorEight: 7,
  ColorNine: 8,
  MIN_VALUE: 0,
  MAX_VALUE: 8,
};

/**
 * @const { {$: !mojo.internal.MojomType} }
 */
export const SurfGameOutfitsSpec = { $: mojo.internal.Enum() };

/**
 * @enum {number}
 */
export const SurfGameOutfits = {
  
  OutfitOne: 0,
  OutfitTwo: 1,
  OutfitThree: 2,
  MIN_VALUE: 0,
  MAX_VALUE: 2,
};

/**
 * @const { {$: !mojo.internal.MojomType} }
 */
export const SurfGameHairStylesSpec = { $: mojo.internal.Enum() };

/**
 * @enum {number}
 */
export const SurfGameHairStyles = {
  
  HairOne: 0,
  HairTwo: 1,
  HairThree: 2,
  HairFour: 3,
  HairFive: 4,
  HairSix: 5,
  HairSeven: 6,
  HairEight: 7,
  HairNine: 8,
  HairTen: 9,
  HairEleven: 10,
  HairTwelve: 11,
  HairThirteen: 12,
  HairFourteen: 13,
  HairFifteen: 14,
  HairSixteen: 15,
  HairSeventeen: 16,
  HairEighteen: 17,
  HairNineteen: 18,
  HairTwenty: 19,
  HairTwentyOne: 20,
  MIN_VALUE: 0,
  MAX_VALUE: 20,
};

/**
 * @const { {$: !mojo.internal.MojomType} }
 */
export const SurfGameAccessoriesSpec = { $: mojo.internal.Enum() };

/**
 * @enum {number}
 */
export const SurfGameAccessories = {
  
  AccessoryOne: 0,
  AccessoryTwo: 1,
  AccessoryThree: 2,
  AccessoryFour: 3,
  AccessoryFive: 4,
  AccessorySix: 5,
  AccessorySeven: 6,
  AccessoryEight: 7,
  AccessoryNine: 8,
  AccessoryTen: 9,
  AccessoryEleven: 10,
  AccessoryTwelve: 11,
  AccessoryThirteen: 12,
  AccessoryFourteen: 13,
  AccessoryFifteen: 14,
  AccessorySixteen: 15,
  AccessorySeventeen: 16,
  AccessoryEighteen: 17,
  AccessoryNineteen: 18,
  AccessoryTwenty: 19,
  AccessoryTwentyOne: 20,
  MIN_VALUE: 0,
  MAX_VALUE: 20,
};



/**
 * @implements {mojo.internal.interfaceSupport.PendingReceiver}
 */
export class SurfADSHandlerPendingReceiver {
  /**
   * @param {!MojoHandle|!mojo.internal.interfaceSupport.Endpoint} handle
   */
  constructor(handle) {
    /** @public {!mojo.internal.interfaceSupport.Endpoint} */
    this.handle = mojo.internal.interfaceSupport.getEndpointForReceiver(handle);
  }

  /** @param {string=} scope */
  bindInBrowser(scope = 'context') {
    mojo.internal.interfaceSupport.bind(
        this.handle, 'edge_surf_ads.mojom.SurfADSHandler', scope);
  }
}

/** @interface */
export class SurfADSHandlerInterface {
  
  /**
   * @param { !string } gameStats
   */

  saveGameStats(gameStats) {}
  
  /**
   * @return {!Promise<{
        gameStats: !string,
   *  }>}
   */

  getGameStats() {}
  
  /**
   * @param { !SurfActions } action
   */

  recordSurfActions(action) {}
  
  /**
   * @param { !SurfGameTheme } action
   */

  recordSurfTheme(action) {}
  
  /**
   * @param { !SurfGameMode } action
   */

  recordSurfGameMode(action) {}
  
  /**
   * @param { !SurfGameBodyColor } action
   */

  recordSurfBodyColor(action) {}
  
  /**
   * @param { !SurfGameOutfitColor } action
   */

  recordSurfOutfitColor(action) {}
  
  /**
   * @param { !SurfGameBodyColor } action
   */

  recordSurfHairColor(action) {}
  
  /**
   * @param { !SurfGameOutfits } action
   */

  recordSurfOutfits(action) {}
  
  /**
   * @param { !SurfGameHairStyles } action
   */

  recordSurfHairStyles(action) {}
  
  /**
   * @param { !SurfGameAccessories } action
   */

  recordSurfAccessories(action) {}
}

/**
 * @implements { SurfADSHandlerInterface }
 */
export class SurfADSHandlerRemote {
  /** @param {MojoHandle|mojo.internal.interfaceSupport.Endpoint=} handle */
  constructor(handle = undefined) {
    /**
     * @private {!mojo.internal.interfaceSupport.InterfaceRemoteBase<!SurfADSHandlerPendingReceiver>}
     */
    this.proxy =
        new mojo.internal.interfaceSupport.InterfaceRemoteBase(
          SurfADSHandlerPendingReceiver,
          handle);

    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper<!SurfADSHandlerPendingReceiver>}
     */
    this.$ = new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);

    /** @public {!mojo.internal.interfaceSupport.ConnectionErrorEventRouter} */
    this.onConnectionError = this.proxy.getConnectionErrorEventRouter();
  }

  
  /**
   * @param { !string } gameStats
   */

  saveGameStats(
      gameStats) {
    this.proxy.sendMessage(
        690444659,
        SurfADSHandler_SaveGameStats_ParamsSpec.$,
        null,
        [
          gameStats
        ]);
  }

  
  /**
   * @return {!Promise<{
        gameStats: !string,
   *  }>}
   */

  getGameStats() {
    return this.proxy.sendMessage(
        331241618,
        SurfADSHandler_GetGameStats_ParamsSpec.$,
        SurfADSHandler_GetGameStats_ResponseParamsSpec.$,
        [
        ]);
  }

  
  /**
   * @param { !SurfActions } action
   */

  recordSurfActions(
      action) {
    this.proxy.sendMessage(
        1874236855,
        SurfADSHandler_RecordSurfActions_ParamsSpec.$,
        null,
        [
          action
        ]);
  }

  
  /**
   * @param { !SurfGameTheme } action
   */

  recordSurfTheme(
      action) {
    this.proxy.sendMessage(
        323764643,
        SurfADSHandler_RecordSurfTheme_ParamsSpec.$,
        null,
        [
          action
        ]);
  }

  
  /**
   * @param { !SurfGameMode } action
   */

  recordSurfGameMode(
      action) {
    this.proxy.sendMessage(
        2133619492,
        SurfADSHandler_RecordSurfGameMode_ParamsSpec.$,
        null,
        [
          action
        ]);
  }

  
  /**
   * @param { !SurfGameBodyColor } action
   */

  recordSurfBodyColor(
      action) {
    this.proxy.sendMessage(
        908654168,
        SurfADSHandler_RecordSurfBodyColor_ParamsSpec.$,
        null,
        [
          action
        ]);
  }

  
  /**
   * @param { !SurfGameOutfitColor } action
   */

  recordSurfOutfitColor(
      action) {
    this.proxy.sendMessage(
        496112408,
        SurfADSHandler_RecordSurfOutfitColor_ParamsSpec.$,
        null,
        [
          action
        ]);
  }

  
  /**
   * @param { !SurfGameBodyColor } action
   */

  recordSurfHairColor(
      action) {
    this.proxy.sendMessage(
        163512199,
        SurfADSHandler_RecordSurfHairColor_ParamsSpec.$,
        null,
        [
          action
        ]);
  }

  
  /**
   * @param { !SurfGameOutfits } action
   */

  recordSurfOutfits(
      action) {
    this.proxy.sendMessage(
        1661487032,
        SurfADSHandler_RecordSurfOutfits_ParamsSpec.$,
        null,
        [
          action
        ]);
  }

  
  /**
   * @param { !SurfGameHairStyles } action
   */

  recordSurfHairStyles(
      action) {
    this.proxy.sendMessage(
        1463623654,
        SurfADSHandler_RecordSurfHairStyles_ParamsSpec.$,
        null,
        [
          action
        ]);
  }

  
  /**
   * @param { !SurfGameAccessories } action
   */

  recordSurfAccessories(
      action) {
    this.proxy.sendMessage(
        419994998,
        SurfADSHandler_RecordSurfAccessories_ParamsSpec.$,
        null,
        [
          action
        ]);
  }
}

/**
 * An object which receives request messages for the SurfADSHandler
 * mojom interface. Must be constructed over an object which implements that
 * interface.
 */
export class SurfADSHandlerReceiver {
  /**
   * @param {!SurfADSHandlerInterface } impl
   */
  constructor(impl) {
    /** @private {!mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal<!SurfADSHandlerRemote>} */
    this.helper_internal_ = new mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal(
        SurfADSHandlerRemote);

    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceReceiverHelper<!SurfADSHandlerRemote>}
     */
    this.$ = new mojo.internal.interfaceSupport.InterfaceReceiverHelper(this.helper_internal_);


    this.helper_internal_.registerHandler(
        690444659,
        SurfADSHandler_SaveGameStats_ParamsSpec.$,
        null,
        impl.saveGameStats.bind(impl));
    this.helper_internal_.registerHandler(
        331241618,
        SurfADSHandler_GetGameStats_ParamsSpec.$,
        SurfADSHandler_GetGameStats_ResponseParamsSpec.$,
        impl.getGameStats.bind(impl));
    this.helper_internal_.registerHandler(
        1874236855,
        SurfADSHandler_RecordSurfActions_ParamsSpec.$,
        null,
        impl.recordSurfActions.bind(impl));
    this.helper_internal_.registerHandler(
        323764643,
        SurfADSHandler_RecordSurfTheme_ParamsSpec.$,
        null,
        impl.recordSurfTheme.bind(impl));
    this.helper_internal_.registerHandler(
        2133619492,
        SurfADSHandler_RecordSurfGameMode_ParamsSpec.$,
        null,
        impl.recordSurfGameMode.bind(impl));
    this.helper_internal_.registerHandler(
        908654168,
        SurfADSHandler_RecordSurfBodyColor_ParamsSpec.$,
        null,
        impl.recordSurfBodyColor.bind(impl));
    this.helper_internal_.registerHandler(
        496112408,
        SurfADSHandler_RecordSurfOutfitColor_ParamsSpec.$,
        null,
        impl.recordSurfOutfitColor.bind(impl));
    this.helper_internal_.registerHandler(
        163512199,
        SurfADSHandler_RecordSurfHairColor_ParamsSpec.$,
        null,
        impl.recordSurfHairColor.bind(impl));
    this.helper_internal_.registerHandler(
        1661487032,
        SurfADSHandler_RecordSurfOutfits_ParamsSpec.$,
        null,
        impl.recordSurfOutfits.bind(impl));
    this.helper_internal_.registerHandler(
        1463623654,
        SurfADSHandler_RecordSurfHairStyles_ParamsSpec.$,
        null,
        impl.recordSurfHairStyles.bind(impl));
    this.helper_internal_.registerHandler(
        419994998,
        SurfADSHandler_RecordSurfAccessories_ParamsSpec.$,
        null,
        impl.recordSurfAccessories.bind(impl));
    /** @public {!mojo.internal.interfaceSupport.ConnectionErrorEventRouter} */
    this.onConnectionError = this.helper_internal_.getConnectionErrorEventRouter();
  }
}

export class SurfADSHandler {
  /**
   * @return {!string}
   */
  static get $interfaceName() {
    return "edge_surf_ads.mojom.SurfADSHandler";
  }

  /**
   * Returns a remote for this interface which sends messages to the browser.
   * The browser must have an interface request binder registered for this
   * interface and accessible to the calling document's frame.
   *
   * @return {!SurfADSHandlerRemote}
   */
  static getRemote() {
    let remote = new SurfADSHandlerRemote;
    remote.$.bindNewPipeAndPassReceiver().bindInBrowser();
    return remote;
  }
}


/**
 * An object which receives request messages for the SurfADSHandler
 * mojom interface and dispatches them as callbacks. One callback receiver exists
 * on this object for each message defined in the mojom interface, and each
 * receiver can have any number of listeners added to it.
 */
export class SurfADSHandlerCallbackRouter {
  constructor() {
    this.helper_internal_ = new mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal(
      SurfADSHandlerRemote);

    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceReceiverHelper<!SurfADSHandlerRemote>}
     */
    this.$ = new mojo.internal.interfaceSupport.InterfaceReceiverHelper(this.helper_internal_);

    this.router_ = new mojo.internal.interfaceSupport.CallbackRouter;

    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.saveGameStats =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        690444659,
        SurfADSHandler_SaveGameStats_ParamsSpec.$,
        null,
        this.saveGameStats.createReceiverHandler(false /* expectsResponse */));
    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.getGameStats =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        331241618,
        SurfADSHandler_GetGameStats_ParamsSpec.$,
        SurfADSHandler_GetGameStats_ResponseParamsSpec.$,
        this.getGameStats.createReceiverHandler(true /* expectsResponse */));
    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.recordSurfActions =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        1874236855,
        SurfADSHandler_RecordSurfActions_ParamsSpec.$,
        null,
        this.recordSurfActions.createReceiverHandler(false /* expectsResponse */));
    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.recordSurfTheme =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        323764643,
        SurfADSHandler_RecordSurfTheme_ParamsSpec.$,
        null,
        this.recordSurfTheme.createReceiverHandler(false /* expectsResponse */));
    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.recordSurfGameMode =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        2133619492,
        SurfADSHandler_RecordSurfGameMode_ParamsSpec.$,
        null,
        this.recordSurfGameMode.createReceiverHandler(false /* expectsResponse */));
    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.recordSurfBodyColor =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        908654168,
        SurfADSHandler_RecordSurfBodyColor_ParamsSpec.$,
        null,
        this.recordSurfBodyColor.createReceiverHandler(false /* expectsResponse */));
    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.recordSurfOutfitColor =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        496112408,
        SurfADSHandler_RecordSurfOutfitColor_ParamsSpec.$,
        null,
        this.recordSurfOutfitColor.createReceiverHandler(false /* expectsResponse */));
    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.recordSurfHairColor =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        163512199,
        SurfADSHandler_RecordSurfHairColor_ParamsSpec.$,
        null,
        this.recordSurfHairColor.createReceiverHandler(false /* expectsResponse */));
    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.recordSurfOutfits =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        1661487032,
        SurfADSHandler_RecordSurfOutfits_ParamsSpec.$,
        null,
        this.recordSurfOutfits.createReceiverHandler(false /* expectsResponse */));
    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.recordSurfHairStyles =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        1463623654,
        SurfADSHandler_RecordSurfHairStyles_ParamsSpec.$,
        null,
        this.recordSurfHairStyles.createReceiverHandler(false /* expectsResponse */));
    /**
     * @public {!mojo.internal.interfaceSupport.InterfaceCallbackReceiver}
     */
    this.recordSurfAccessories =
        new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(
            this.router_);

    this.helper_internal_.registerHandler(
        419994998,
        SurfADSHandler_RecordSurfAccessories_ParamsSpec.$,
        null,
        this.recordSurfAccessories.createReceiverHandler(false /* expectsResponse */));
    /** @public {!mojo.internal.interfaceSupport.ConnectionErrorEventRouter} */
    this.onConnectionError = this.helper_internal_.getConnectionErrorEventRouter();
  }

  /**
   * @param {number} id An ID returned by a prior call to addListener.
   * @return {boolean} True iff the identified listener was found and removed.
   */
  removeListener(id) {
    return this.router_.removeListener(id);
  }
}

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_SaveGameStats_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_GetGameStats_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_GetGameStats_ResponseParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_RecordSurfActions_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_RecordSurfTheme_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_RecordSurfGameMode_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_RecordSurfBodyColor_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_RecordSurfOutfitColor_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_RecordSurfHairColor_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_RecordSurfOutfits_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_RecordSurfHairStyles_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };

/**
 * @const { {$:!mojo.internal.MojomType}}
 */
export const SurfADSHandler_RecordSurfAccessories_ParamsSpec =
    { $: /** @type {!mojo.internal.MojomType} */ ({}) };




mojo.internal.Struct(
    SurfADSHandler_SaveGameStats_ParamsSpec.$,
    'SurfADSHandler_SaveGameStats_Params',
    [
      mojo.internal.StructField(
        'gameStats', 0,
        0,
        mojo.internal.String,
        null,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_SaveGameStats_Params {
  constructor() {
    /** @type { !string } */
    this.gameStats;
  }
}



mojo.internal.Struct(
    SurfADSHandler_GetGameStats_ParamsSpec.$,
    'SurfADSHandler_GetGameStats_Params',
    [
    ],
    [[0, 8],]);



/**
 * @record
 */
export class SurfADSHandler_GetGameStats_Params {
  constructor() {
  }
}



mojo.internal.Struct(
    SurfADSHandler_GetGameStats_ResponseParamsSpec.$,
    'SurfADSHandler_GetGameStats_ResponseParams',
    [
      mojo.internal.StructField(
        'gameStats', 0,
        0,
        mojo.internal.String,
        null,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_GetGameStats_ResponseParams {
  constructor() {
    /** @type { !string } */
    this.gameStats;
  }
}



mojo.internal.Struct(
    SurfADSHandler_RecordSurfActions_ParamsSpec.$,
    'SurfADSHandler_RecordSurfActions_Params',
    [
      mojo.internal.StructField(
        'action', 0,
        0,
        SurfActionsSpec.$,
        0,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_RecordSurfActions_Params {
  constructor() {
    /** @type { !SurfActions } */
    this.action;
  }
}



mojo.internal.Struct(
    SurfADSHandler_RecordSurfTheme_ParamsSpec.$,
    'SurfADSHandler_RecordSurfTheme_Params',
    [
      mojo.internal.StructField(
        'action', 0,
        0,
        SurfGameThemeSpec.$,
        0,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_RecordSurfTheme_Params {
  constructor() {
    /** @type { !SurfGameTheme } */
    this.action;
  }
}



mojo.internal.Struct(
    SurfADSHandler_RecordSurfGameMode_ParamsSpec.$,
    'SurfADSHandler_RecordSurfGameMode_Params',
    [
      mojo.internal.StructField(
        'action', 0,
        0,
        SurfGameModeSpec.$,
        0,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_RecordSurfGameMode_Params {
  constructor() {
    /** @type { !SurfGameMode } */
    this.action;
  }
}



mojo.internal.Struct(
    SurfADSHandler_RecordSurfBodyColor_ParamsSpec.$,
    'SurfADSHandler_RecordSurfBodyColor_Params',
    [
      mojo.internal.StructField(
        'action', 0,
        0,
        SurfGameBodyColorSpec.$,
        0,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_RecordSurfBodyColor_Params {
  constructor() {
    /** @type { !SurfGameBodyColor } */
    this.action;
  }
}



mojo.internal.Struct(
    SurfADSHandler_RecordSurfOutfitColor_ParamsSpec.$,
    'SurfADSHandler_RecordSurfOutfitColor_Params',
    [
      mojo.internal.StructField(
        'action', 0,
        0,
        SurfGameOutfitColorSpec.$,
        0,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_RecordSurfOutfitColor_Params {
  constructor() {
    /** @type { !SurfGameOutfitColor } */
    this.action;
  }
}



mojo.internal.Struct(
    SurfADSHandler_RecordSurfHairColor_ParamsSpec.$,
    'SurfADSHandler_RecordSurfHairColor_Params',
    [
      mojo.internal.StructField(
        'action', 0,
        0,
        SurfGameBodyColorSpec.$,
        0,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_RecordSurfHairColor_Params {
  constructor() {
    /** @type { !SurfGameBodyColor } */
    this.action;
  }
}



mojo.internal.Struct(
    SurfADSHandler_RecordSurfOutfits_ParamsSpec.$,
    'SurfADSHandler_RecordSurfOutfits_Params',
    [
      mojo.internal.StructField(
        'action', 0,
        0,
        SurfGameOutfitsSpec.$,
        0,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_RecordSurfOutfits_Params {
  constructor() {
    /** @type { !SurfGameOutfits } */
    this.action;
  }
}



mojo.internal.Struct(
    SurfADSHandler_RecordSurfHairStyles_ParamsSpec.$,
    'SurfADSHandler_RecordSurfHairStyles_Params',
    [
      mojo.internal.StructField(
        'action', 0,
        0,
        SurfGameHairStylesSpec.$,
        0,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_RecordSurfHairStyles_Params {
  constructor() {
    /** @type { !SurfGameHairStyles } */
    this.action;
  }
}



mojo.internal.Struct(
    SurfADSHandler_RecordSurfAccessories_ParamsSpec.$,
    'SurfADSHandler_RecordSurfAccessories_Params',
    [
      mojo.internal.StructField(
        'action', 0,
        0,
        SurfGameAccessoriesSpec.$,
        0,
        false /* nullable */,
        0,
      ),
    ],
    [[0, 16],]);



/**
 * @record
 */
export class SurfADSHandler_RecordSurfAccessories_Params {
  constructor() {
    /** @type { !SurfGameAccessories } */
    this.action;
  }
}

