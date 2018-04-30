/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-header-layout/app-header-layout.html","9d57e45d5c8b52026ba80099307dc874"],["bower_components/app-layout/app-header/app-header.html","611b00b75388e2a548c3656087e9b4ec"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","354cc13dae18b154ae055036e959e2ae"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","387b0a58c54afa617265a50ab25c792c"],["bower_components/app-layout/app-toolbar/app-toolbar.html","40628b2aaf9a599891097923c5de5a10"],["bower_components/app-layout/helpers/helpers.html","93fe432abe69a56d9909c97bb00fc66a"],["bower_components/app-localize-behavior/app-localize-behavior.html","a76c581985b223c114ccd0f34ae2fe45"],["bower_components/app-route/app-location.html","0b9bf992c84f9e6b593e53e2fb90ce94"],["bower_components/app-route/app-route-converter-behavior.html","c5d76631af30c2de417baec672168673"],["bower_components/app-route/app-route.html","fa50c38d15affd0702bbb8959ae69d4b"],["bower_components/canvg/dist/canvg.bundle.min.js","9e11f6f529c22ce7c4375b441bebd799"],["bower_components/d3/d3.js","4a654f23f7fe2763dec419cbd7963dcf"],["bower_components/es6-promise/es6-promise.min.js","b6b92e1fa8d691d068902a60d472aa73"],["bower_components/intl-messageformat/dist/intl-messageformat.min.js","7399b33d4036b8fbaf5e7c780923501e"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","e416e843a80e32d5ac1cf3d99f92a290"],["bower_components/iron-a11y-keys/iron-a11y-keys.html","27147263cb7aecbaee4a2f96c11652f0"],["bower_components/iron-ajax/iron-ajax.html","cdb34647662aa97819437b199ca0dc3e"],["bower_components/iron-ajax/iron-request.html","2cd86cb426f03e5ac050e5b9534ca01e"],["bower_components/iron-behaviors/iron-control-state.html","26408b231f3184ed4c861a77090782d0"],["bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","308cda98232643a0bbfe3caffeb5fedf"],["bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","4941bb1f98c18a580867935163391b6c"],["bower_components/iron-dropdown/iron-dropdown.html","69de7cbbb5154bc46a1faf232c0826e2"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","fc0c50a581a28e9269400ddd3e98f802"],["bower_components/iron-flex-layout/iron-flex-layout.html","ff9477722c978e3fdd3fbf292cc3f2fc"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","8ea5b57ab9067df1c61dc124c496120b"],["bower_components/iron-icon/iron-icon.html","d4b7a82c9ccbbeca2b0c89f4e53ffb05"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","acf544611f84b0de9873f6de8a06d6fc"],["bower_components/iron-label/iron-label.html","f159542334a57b80359e6518cee020e4"],["bower_components/iron-location/iron-location.html","1e9bfdd12bf66c6c1e090eb6d07e8001"],["bower_components/iron-location/iron-query-params.html","202ab9d2102acc73b019107ceb09d6c3"],["bower_components/iron-media-query/iron-media-query.html","5fb17283155ca3ad912dafebc9f06a74"],["bower_components/iron-meta/iron-meta.html","048f486e348206798370e3e2a61f27ee"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","b935952337df172121dae50aa75d0ff6"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","a70e5917cb2f5bb64e53e44b2f0cd764"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","7227fe9e747518edb9676d3d5bce48ff"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","dfcf04b2b9b17dceb9176c5d4a1233b8"],["bower_components/iron-pages/iron-pages.html","6eb057080296abef128e6fac44d202f3"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","26731b518fc39146a6ef617bf2446cab"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","33c023f229cd353ec7d21b5a3b9e137b"],["bower_components/iron-selector/iron-multi-selectable.html","d4765be6d51eb9e5e170b7191b222aec"],["bower_components/iron-selector/iron-selectable.html","033c526023ee6429bb66dab8407497f5"],["bower_components/iron-selector/iron-selection.html","d38a136db111dc594d0e9b27c283a47a"],["bower_components/iron-selector/iron-selector.html","fd5fa9e6f3bf894b065f43d2711bba45"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","3fb306c07a03ea899a4a29b582e75567"],["bower_components/moment/min/moment.min.js","aeb7908241d9f6d5a45e504cc4f2ec15"],["bower_components/moment/moment.js","d8a123e9f7c06ef8c0d4a9a9e8ac8cd5"],["bower_components/neon-animation/animations/cascaded-animation.html","bcf80aa6db30123e8a1ffff937b26a6b"],["bower_components/neon-animation/animations/fade-in-animation.html","32e6403f666f0a23bf0a12d9d13ac7e0"],["bower_components/neon-animation/animations/fade-out-animation.html","0b7783df10a3455dd3079d5dabfc1882"],["bower_components/neon-animation/animations/hero-animation.html","b1eefd8b6cabff93f7ccbea1107d462f"],["bower_components/neon-animation/animations/opaque-animation.html","6a80ef397cfb1699889f778d805e87f1"],["bower_components/neon-animation/animations/reverse-ripple-animation.html","dd588a37285192d33719e510181e7d75"],["bower_components/neon-animation/animations/ripple-animation.html","44c51e83425230eff30eb063acd111eb"],["bower_components/neon-animation/animations/scale-down-animation.html","bf8b23cb33b924d9eacdd76fa25f28d7"],["bower_components/neon-animation/animations/scale-up-animation.html","de076496a5be793364972055c53a930f"],["bower_components/neon-animation/animations/slide-down-animation.html","ac4479a820ba8b2a7d07dd49a9a1430a"],["bower_components/neon-animation/animations/slide-from-bottom-animation.html","38804a526b0bad4e07c1b6a34766cf99"],["bower_components/neon-animation/animations/slide-from-left-animation.html","124419e9c992f884ef99c071877437aa"],["bower_components/neon-animation/animations/slide-from-right-animation.html","3222fff275d4efa2c767788f2c5ec9aa"],["bower_components/neon-animation/animations/slide-from-top-animation.html","ab70c895dcf4b03c87987de1a000f289"],["bower_components/neon-animation/animations/slide-left-animation.html","c1b42e45838b946792e0dbad93177444"],["bower_components/neon-animation/animations/slide-right-animation.html","283f5588bd62f173cefde766efe39d15"],["bower_components/neon-animation/animations/slide-up-animation.html","b5fe71e48ddecd24314d9ec44fa4cb71"],["bower_components/neon-animation/animations/transform-animation.html","c9900ea1299867392142eeb17b39f718"],["bower_components/neon-animation/neon-animatable-behavior.html","ff071e084f0046cb0d74204891f95fc5"],["bower_components/neon-animation/neon-animation-behavior.html","7bea601b65a14b9d7389d806db6cbfec"],["bower_components/neon-animation/neon-animation-runner-behavior.html","0d0e9eeccf315df7c0c6330049c2cd45"],["bower_components/neon-animation/neon-animations.html","c26ac24c430faa9ab2dbc97a1983ba93"],["bower_components/neon-animation/neon-shared-element-animation-behavior.html","4135fba5f238c77814408a5848433bd2"],["bower_components/numbro/dist/languages.min.js","eb87cb54ce1cbc2053875c69863fa779"],["bower_components/numbro/dist/numbro.min.js","5198dd4751d9d7cea4c186b8409546d2"],["bower_components/polymer/polymer-micro.html","92fd0b45f5825a3fdbdd514c53f5286c"],["bower_components/polymer/polymer-mini.html","33590e553c48885f8b88d04a14ea0abe"],["bower_components/polymer/polymer.html","6552d20463cfbb2b046a9994d6f78608"],["bower_components/promise-polyfill/Promise.js","6d72e76387d06f828797b0ce05a2feb7"],["bower_components/promise-polyfill/promise-polyfill-lite.html","50605b3f393ae31ee7bc1af06fff0dc1"],["bower_components/px-alert-label/css/px-alert-label-styles.html","e25e853c47a4fe7d4bb78188e6a79ff5"],["bower_components/px-alert-label/px-alert-label.html","f38ef258d9110abf666aea3eb7ff635f"],["bower_components/px-app-helpers/object-assign-polyfill/object-assign-polyfill.html","042592c4b2dd363219050e68cab50d3f"],["bower_components/px-app-helpers/px-app-asset/px-app-asset-behavior-activatable.html","2536c011817550c891f16b871d08c3eb"],["bower_components/px-app-helpers/px-app-asset/px-app-asset-behavior-graph.es6.js","9ac0a5c1941e46798e1e4ec68797d97a"],["bower_components/px-app-helpers/px-app-asset/px-app-asset-behavior-graph.html","3576b25f997328a277b7778573bf928a"],["bower_components/px-app-helpers/px-app-asset/px-app-asset-behavior-selectable.html","2fd72a01bfc8c797e43a51c46a4f298a"],["bower_components/px-app-helpers/px-app-header/css/px-app-header-styles.html","da13651913d6c899d054656841f285c4"],["bower_components/px-app-helpers/px-app-header/px-app-header-scroll-effect.es6.js","c91c66ef382226fdcaca0fb03709a33f"],["bower_components/px-app-helpers/px-app-header/px-app-header-scroll-effect.html","0fee47e5f6d5c22873752f66bfa64099"],["bower_components/px-app-helpers/px-app-header/px-app-header.es6.js","1366f88d9f81df8e661cb6d4ed4b863d"],["bower_components/px-app-helpers/px-app-header/px-app-header.html","8874c55b8ca04ce62ee6fb89b8f3a308"],["bower_components/px-app-helpers/symbol-polyfill/dist/symbol-polyfill.min.js","8ea4d11a0ad2e04f77a96e7d76d5fe85"],["bower_components/px-app-helpers/symbol-polyfill/symbol-polyfill.html","23e99ac0592ff11ff5037de5177d0b6c"],["bower_components/px-app-helpers/symbol-tree/dist/symbol-tree.min.js","a1e1f7dd9e74e0f258f188216cb4f4b8"],["bower_components/px-app-helpers/symbol-tree/symbol-tree.html","133762d05b5e35c0496c21a9287690bc"],["bower_components/px-app-nav/css/px-app-nav-group-styles.html","cb839087b9d0449aeea6d54a181820df"],["bower_components/px-app-nav/css/px-app-nav-item-styles.html","62022d9c5e65cdb641527cef2c12b18f"],["bower_components/px-app-nav/css/px-app-nav-styles.html","f9c0f6d60e650d3e08771e4136e4c592"],["bower_components/px-app-nav/css/px-app-nav-subgroup-styles.html","7b0f485ccbf9ac3a58f84800a7ca535d"],["bower_components/px-app-nav/css/px-app-nav-subitem-styles.html","6ea99223d53c7f1de718409057e301d8"],["bower_components/px-app-nav/px-app-nav-behavior-measure-text.es6.js","341b2967abe61c0b23b9b48950f0f67a"],["bower_components/px-app-nav/px-app-nav-behavior-measure-text.html","ecb4cdfed0af2ad21dd97f622b628c63"],["bower_components/px-app-nav/px-app-nav-behaviors.es6.js","808ead95961854951b730ac283e31b77"],["bower_components/px-app-nav/px-app-nav-behaviors.html","49ffa72b585474c39a9ef87058bc3135"],["bower_components/px-app-nav/px-app-nav-group.html","a08fc790114bf6bab02f15ab029d0da4"],["bower_components/px-app-nav/px-app-nav-item.es6.js","3abc776855fcf82a88e592284994dd4c"],["bower_components/px-app-nav/px-app-nav-item.html","da92c48823fe0a712405dd84274ea91c"],["bower_components/px-app-nav/px-app-nav-subgroup.html","7ba976dad7ba1411482490a39c927e8e"],["bower_components/px-app-nav/px-app-nav-subitem.es6.js","543ba1cf512424731082f8ff99a1b776"],["bower_components/px-app-nav/px-app-nav-subitem.html","8e5e65dbcd0aa09a41557128bf96b5f5"],["bower_components/px-app-nav/px-app-nav.es6.js","10ba60ac6f2fc34cd4204bf0e5c7a8d2"],["bower_components/px-app-nav/px-app-nav.html","ef5d83659295a344006b5715b6dbebb3"],["bower_components/px-branding-bar/css/px-branding-bar-styles.html","fc3f09757b462f160856664bad365ccb"],["bower_components/px-branding-bar/css/px-ge-svg-logo-styles.html","5d43cabe03e9c89967a26b35414be11f"],["bower_components/px-branding-bar/dist/px-branding-bar.js","25cc53065f36e109ed26678324481f85"],["bower_components/px-branding-bar/predix-logo.html","b18f30ad7ed673b78b2f66efde973dba"],["bower_components/px-branding-bar/px-branding-bar.html","7752295f42f5e8dc3ffcbbb627030018"],["bower_components/px-branding-bar/px-ge-svg-logo.html","99f9ccba3ebccc7e21f73f87e8823240"],["bower_components/px-breadcrumbs/css/px-breadcrumbs-styles.html","5fcf7c1b6728cbd0b2277c0c975e6219"],["bower_components/px-breadcrumbs/px-breadcrumbs.es6.js","c649ad52ce794b3d70922d3bb6ad9312"],["bower_components/px-breadcrumbs/px-breadcrumbs.html","06714a29e33c4d17fbefabe28dc39735"],["bower_components/px-calendar-picker/css/px-calendar-picker-styles.html","6ce2f4d816b2c28c8acf60b1601eb5be"],["bower_components/px-calendar-picker/px-calendar-cell.html","6ba2a444a095c4d87dbeb456e9c30615"],["bower_components/px-calendar-picker/px-calendar-picker.html","1632e4f1cea1541e44550bafb46c641e"],["bower_components/px-card/css/px-card-styles.html","9d549cc8e1aaf9be295753115ae91217"],["bower_components/px-card/px-card.html","d80dcfe2c57b4193cfb7f1a3767038de"],["bower_components/px-context-browser/css/px-context-browser-animations-styles.html","52fc902bd4bf583b8c6eca169376ee9a"],["bower_components/px-context-browser/css/px-context-browser-columns-styles.html","a65ab4f0e94ceb161d6a08e921321c1c"],["bower_components/px-context-browser/css/px-context-browser-filter-styles.html","c9b7e392e58cb67294bd8a1d84f11b3f"],["bower_components/px-context-browser/css/px-context-browser-header-styles.html","3721970eebb4fedd6b36eff5c636c355"],["bower_components/px-context-browser/css/px-context-browser-item-styles.html","8b72cdc269ea41b81592d74acdedae26"],["bower_components/px-context-browser/css/px-context-browser-panel-styles.html","f3a5b72593f2a410ac7c5a70881efda6"],["bower_components/px-context-browser/css/px-context-browser-styles.html","deef93c27b8b65179779164617bd7a26"],["bower_components/px-context-browser/css/px-context-browser-trigger-styles.html","f6b194ec87fb61921f390bc11cb62043"],["bower_components/px-context-browser/px-context-browser-actions.html","5f45ea297a31bc957b69c0942f6e9a4a"],["bower_components/px-context-browser/px-context-browser-columns.html","f025b7f36bb09a5de52f6659e8f19839"],["bower_components/px-context-browser/px-context-browser-filter.html","52993fdb204d79de6743c637cc580252"],["bower_components/px-context-browser/px-context-browser-header.html","77b238df5b1491827e7adf6c94cd6da5"],["bower_components/px-context-browser/px-context-browser-item.html","e12d4b60ffc500c199ddde6a18825159"],["bower_components/px-context-browser/px-context-browser-panel.html","69386807397525335ab2199980aea00b"],["bower_components/px-context-browser/px-context-browser-trigger.html","9caf7430f07f39bc4b20b365f47d43f3"],["bower_components/px-context-browser/px-context-browser.html","59d7384dacff14b0048654406dceb860"],["bower_components/px-d3-imports/px-d3-imports-step-one.html","1e4b76389ffdb572af6636cc9edec448"],["bower_components/px-d3-imports/px-d3-imports.html","7b76091f9a4c669059a1d66d03f7ffef"],["bower_components/px-data-table/aha-table.html","06d9e4212fcb8ce4b5ebc8d602337ab6"],["bower_components/px-data-table/css/aha-table-styles.html","ffd723af3744602c2d14e2cf7e7d5219"],["bower_components/px-data-table/css/px-data-table-cell-styles.html","24134dcfda845da19cfa74ee9985610f"],["bower_components/px-data-table/css/px-data-table-highlight-styles.html","7cbafd5c9d003d194142987cc85eb834"],["bower_components/px-data-table/css/px-data-table-styles.html","1aacf1844e5127886a35232118c9aee2"],["bower_components/px-data-table/px-data-table-cell.html","a9242a23faf49a872fbf153b127eb20a"],["bower_components/px-data-table/px-data-table-column.html","b44310baeb7938631a479e60bdb62bad"],["bower_components/px-data-table/px-data-table-highlight.html","1842d7092190ba9883d4e96823cfe3c4"],["bower_components/px-data-table/px-data-table.html","b767af0e1585217eff9d075240a25cb8"],["bower_components/px-data-table/px-edit-cell.html","30927a35a246f9c794510dc91ceb1e73"],["bower_components/px-data-table/px-pagination.html","ff89ac4981d74d431051986a490e30e0"],["bower_components/px-datetime-common/css/px-datetime-buttons-styles.html","61c31ab91b4998065eab1dfb94e99a62"],["bower_components/px-datetime-common/css/px-datetime-entry-cell-styles.html","947a970727bc74fa6bee05721f7056a5"],["bower_components/px-datetime-common/css/px-datetime-entry-styles.html","4478ad444871a0e6195afe22cda0dd1a"],["bower_components/px-datetime-common/px-datetime-behavior.html","8adb79d3aa40c61c75b452654c0f3173"],["bower_components/px-datetime-common/px-datetime-button-behavior.html","7ccf0c7f2ec41223193fb19e2a524b93"],["bower_components/px-datetime-common/px-datetime-buttons.html","eab38781ac9d1e0a5182dc71cfb9509f"],["bower_components/px-datetime-common/px-datetime-entry-cell.html","319c83907bfd26665f1f420f7f903bd6"],["bower_components/px-datetime-common/px-datetime-entry.html","9d64985975a4109bcac2c9510e3b7cf9"],["bower_components/px-datetime-common/px-datetime-range-behavior.html","7cfdb7ec651f645a9e9af3cbe68b4efc"],["bower_components/px-datetime-common/px-datetime-shared-behavior.html","046e05377a713aa634a07c3ac7d8ae05"],["bower_components/px-datetime-common/validate.html","adc80814e3935f960f6f706b279410bb"],["bower_components/px-datetime-field/css/px-datetime-field-styles.html","9e5216875a03948123de1a518fcf935e"],["bower_components/px-datetime-field/px-datetime-field.html","81eaf8013632abe89921f39de4214bd6"],["bower_components/px-datetime-picker/css/px-datetime-picker-styles.html","ab116b0b4d14c4372b3c33039fbaa2d9"],["bower_components/px-datetime-picker/px-datetime-picker.html","bad260bad75f01d6b04fd8a58f4f4c3c"],["bower_components/px-dropdown/css/px-dropdown-styles.html","1d07f536ac8f8d685f0a165999e43aca"],["bower_components/px-dropdown/px-dropdown.html","edb81b7f48e3430a223b64b757a7bf21"],["bower_components/px-gauge/css/px-gauge-styles.html","fe29029e558b9a3c4a6b60e18971033a"],["bower_components/px-gauge/px-gauge.html","70bec103b682fff7c0fcc3327dde757b"],["bower_components/px-icon-set/px-icon-set-communication.html","0432b910578992034a95e0142dd798cd"],["bower_components/px-icon-set/px-icon-set-document.html","a9672dbb7183251314de2df31d648a0a"],["bower_components/px-icon-set/px-icon-set-feature.html","a6d9ca421d2642bd8a6817142346ea6d"],["bower_components/px-icon-set/px-icon-set-navigation.html","eb99f649caa88f5aec3cec37eab1d765"],["bower_components/px-icon-set/px-icon-set-object.html","7801a31f564a46637cd651ce07889d87"],["bower_components/px-icon-set/px-icon-set-utility.html","1edb04724acbd502caf9b51a5434d850"],["bower_components/px-icon-set/px-icon-set-vis.html","6a7044763559422c24c37dc058ba6b37"],["bower_components/px-icon-set/px-icon-set.html","aa1c7e05e8810fb13237972387a74ced"],["bower_components/px-icon-set/px-icon.html","fcb0e8bedce4f4072ea8c64449046ead"],["bower_components/px-inbox/css/px-inbox-styles.html","99e9bad6b51f7adc4d923fae68b877cd"],["bower_components/px-inbox/px-inbox.html","7bd2fe24d3ac0bddce6732cb7abb89fb"],["bower_components/px-key-value-pair/css/px-key-value-pair-styles.html","ce8502865e15857df914f7c325841efd"],["bower_components/px-key-value-pair/px-key-value-pair.html","750164a82dc0851e8f74f4b7278b3d75"],["bower_components/px-moment-imports/px-moment-imports-step-one.html","c3e729eb66322f30f1a4933a3ab92add"],["bower_components/px-moment-imports/px-moment-imports.html","f40182afee3fb3fa63a348b5f282ef15"],["bower_components/px-number-formatter/css/px-number-formatter-styles.html","096a4390eabaeba1f3270a539137c807"],["bower_components/px-number-formatter/numbro-import.html","f474647fe810220673ff39860d66a179"],["bower_components/px-number-formatter/px-number-formatter-behavior.html","3ecaa6ae87e1ce40e9fe6d2e3acd7e40"],["bower_components/px-number-formatter/px-number-formatter.html","66978983b986326b8b8a8df8a2c33c70"],["bower_components/px-simple-bar-chart/css/px-simple-bar-chart-styles.html","dc0a80b92cb820e906af2e48c9f323c3"],["bower_components/px-simple-bar-chart/px-simple-bar-chart.html","14c5fdad0358e7a1b096d394e2c554ff"],["bower_components/px-simple-chart-common-behavior/px-simple-chart-common-behavior-colors.html","c7871cb73bc40fbf4da0f6a771670c54"],["bower_components/px-simple-chart-common-behavior/px-simple-chart-common-behavior.html","3116c55ad6cf764289e60d7f703be746"],["bower_components/px-tabs/css/px-tab-styles.html","38ed514cea17c38e112ae41c24d4c035"],["bower_components/px-tabs/css/px-tabs-styles.html","4693013ca484969bed30848be7f35ad6"],["bower_components/px-tabs/px-tab.html","f85140139c80d885c841b67cf97d04bb"],["bower_components/px-tabs/px-tabs.html","3b96153574e8069bfb7250f87b41d3f4"],["bower_components/px-toggle/css/px-toggle-styles.html","f74ebcec2402e206be4c0fc0d0d81404"],["bower_components/px-toggle/dist/px-toggle.js","12d3610c5031e81a2ec5aceb92645ce5"],["bower_components/px-toggle/px-toggle.html","9cafd148d5d84383ec1a7c4f9b5849a1"],["bower_components/px-tooltip/css/px-tooltip-styles.html","4609073d64477493be4c808187303f01"],["bower_components/px-tooltip/px-tooltip.html","fceac176539f61e141f5ae3c2d0e8a09"],["bower_components/px-validation/px-validation.html","675ac5b06b98a38759d59fb385166f35"],["bower_components/px-validation/px-validator.html","525908f20184832cdd2f26fdb2096bd6"],["bower_components/px-vis-polar/css/px-vis-polar-styles.html","d0d8e9c9ff31d2b4a0b3195c523b022c"],["bower_components/px-vis-polar/px-vis-polar.html","6d3545715eb940efcc7bb26424c0743b"],["bower_components/px-vis-radar/css/px-vis-radar-styles.html","9240901bec7ea892bbcd3ca1852b2a70"],["bower_components/px-vis-radar/px-vis-radar.html","f2c9749fd886312eae1e06ee1abec126"],["bower_components/px-vis-timeseries/css/px-vis-timeseries-styles.html","1c56c3c2c008883f38e1dd58fd158256"],["bower_components/px-vis-timeseries/px-vis-timeseries.html","c8b1cd280ca538511e282dac70371d2a"],["bower_components/px-vis/css/px-vis-dynamic-menu-styles.html","b6fe52c878ecd4466325c976e70a3df1"],["bower_components/px-vis/css/px-vis-register-styles.html","2f690907d78e942f9db37c6cbeb217d8"],["bower_components/px-vis/css/px-vis-styles.html","41a1746d429e6347eef66afcf7b52649"],["bower_components/px-vis/css/px-vis-svg-canvas-styles.html","a072de189adaa2d781c16fd949a8e634"],["bower_components/px-vis/css/px-vis-toolbar-styles.html","e29ab1376d0df08dbccbc5f96255c03f"],["bower_components/px-vis/css/px-vis-tooltip-styles.html","bfce59c0e73d750a70f10ad0b0b72a56"],["bower_components/px-vis/px-vis-axis-interaction-space.html","4c558d1a8c9d579104471657b81fbb25"],["bower_components/px-vis/px-vis-axis.html","933d3981944786576d67d628d136314b"],["bower_components/px-vis/px-vis-behavior-axis-drag.html","ee87460638ff9dc47e2c21399723848f"],["bower_components/px-vis/px-vis-behavior-chart.html","f6a046b999ff1d4f374a36df39c71fcb"],["bower_components/px-vis/px-vis-behavior-colors.html","b6ea5a12785ae698dca496d7ae1d1297"],["bower_components/px-vis/px-vis-behavior-common.html","0069b148cf0085b4aaacf6aa357118c2"],["bower_components/px-vis/px-vis-behavior-d3.html","26a1170c59946dc677645dcbdfe5dd25"],["bower_components/px-vis/px-vis-behavior-datetime.html","59e374ac018ed1def90d06b06f047275"],["bower_components/px-vis/px-vis-behavior-register.html","b4186ece81c289cd73d334c894d5da55"],["bower_components/px-vis/px-vis-behavior-renderer.html","d4745b431bd6e68f9d6fb04bd5c34a7d"],["bower_components/px-vis/px-vis-behavior-scale-radar.html","2c5574749112af8a9bf23acae7e7ee53"],["bower_components/px-vis/px-vis-behavior-scale-radial.html","df0ae926ebafb998e362238902602607"],["bower_components/px-vis/px-vis-behavior-scale.html","ce719f1b9fca6ac4da6373e3cc8de114"],["bower_components/px-vis/px-vis-brush.html","b8f6139e80616b478ba3a08de55a10c8"],["bower_components/px-vis/px-vis-canvas.html","daff0f6292ac75e93895ada02bad9551"],["bower_components/px-vis/px-vis-chart-navigator.html","3bbd76b8b9b6192fc5a0ef6cf803f667"],["bower_components/px-vis/px-vis-clip-path-complex-area.html","87786f0150ff74371e617902fffe8b4a"],["bower_components/px-vis/px-vis-clip-path.html","89c95b2223c741bc61ae83b0b50a2721"],["bower_components/px-vis/px-vis-cursor-line.html","79614dd03481d7bfba4d12e2c9a7bb55"],["bower_components/px-vis/px-vis-cursor.html","deadfd2021030d5fac5a4b1d139cec7f"],["bower_components/px-vis/px-vis-dynamic-menu.html","e016aa590e5a9ab8d2a013f9a35cdb5e"],["bower_components/px-vis/px-vis-event.html","c8e6b6b6f9940993383fa03211cb4cd7"],["bower_components/px-vis/px-vis-gridlines.html","93d4b241872e6a7e7d2370de04eb3dfd"],["bower_components/px-vis/px-vis-highlight-line-canvas.html","b71e3231eb8330cd0dbb8a9d3ac1944d"],["bower_components/px-vis/px-vis-highlight-line.html","47c155e703c06822426b9f476a7d2503"],["bower_components/px-vis/px-vis-highlight-point-canvas.html","b89d65ad1310f9597fb057a90d3371d9"],["bower_components/px-vis/px-vis-highlight-point.html","777e81befaffd6d3b120413adee45d8c"],["bower_components/px-vis/px-vis-imports.html","6614d28d7de1968095d52d36b546da3a"],["bower_components/px-vis/px-vis-interaction-space.html","8ed0cca59c79e17cde28fe1df93bf3da"],["bower_components/px-vis/px-vis-interactive-axis.html","edfcc601c46a24ccee1904d57dee9be6"],["bower_components/px-vis/px-vis-line-canvas.html","63832cc723a9e2a9cfed07cf43e85441"],["bower_components/px-vis/px-vis-line-svg.html","0a12e99e4bbc2bb1ed6fde6ec604a3e8"],["bower_components/px-vis/px-vis-markers.html","64549c2e369d3d353feceed1c9ac9a82"],["bower_components/px-vis/px-vis-multi-axis.html","7ffc86075168348c1088d4f2b13140e6"],["bower_components/px-vis/px-vis-polyfills.html","b80997747aba9b6c9ae5196b7d0a7c16"],["bower_components/px-vis/px-vis-radar-grid.html","555bcf705f650f1eacd9ff803eb27b5b"],["bower_components/px-vis/px-vis-radial-gridlines.html","a888655dc856a23e45307d757e705210"],["bower_components/px-vis/px-vis-register-datetime.html","7db3124561a2cca634ab57434f07ac4e"],["bower_components/px-vis/px-vis-register-item-pie.html","a431621184abc235a805072708b034b8"],["bower_components/px-vis/px-vis-register-item.html","543589ae480459ba3ba5961f262c3e6f"],["bower_components/px-vis/px-vis-register.html","4435adc9082f1a6431cdfbbd285c8841"],["bower_components/px-vis/px-vis-scatter-canvas.html","de2a195031b27d9afae5c0cfc65034bf"],["bower_components/px-vis/px-vis-scatter.html","eb47da829780f61652f2a3eea431c01e"],["bower_components/px-vis/px-vis-scheduler.html","e5b1d745bf5abca6ac096de4b0cc4020"],["bower_components/px-vis/px-vis-striping.html","eaf6f60e012c46fb51a0c0b9c8816cda"],["bower_components/px-vis/px-vis-svg-canvas.html","fbd0e6a4b7e09d452ab644593a28720c"],["bower_components/px-vis/px-vis-svg.html","f1cdc5bb18bcad598c17a9ec1bbdd867"],["bower_components/px-vis/px-vis-threshold.html","3ee4c9b1230caa0afdf5a663bb1937d5"],["bower_components/px-vis/px-vis-toolbar.html","c6a9bd81b08d25775af86610ee1d4d4a"],["bower_components/px-vis/px-vis-tooltip.html","5fa7ccd24192201b659355b959f72220"],["bower_components/px/dist/px.min.js","7e98c0f62d73a576c5b16f838b83ce9a"],["bower_components/pxd3/d3.min.js","897061c6cde2a3a62e3d22019726114a"],["bower_components/pxmoment-timezone/builds/moment-timezone-with-data.min.js","8416e93b08e3e1613f38157b530f8944"],["bower_components/web-animations-js/web-animations-next-lite.min.html","dc4a970b1dcdb30424a28ad2b9392790"],["bower_components/web-animations-js/web-animations-next-lite.min.js","fa336dd9110f3e62dd0f6663cc910b3a"],["css/px-sample-app-styles.html","56ccc26bd880dbe8cadc44210e512b88"],["index.html","45099d55cd1092c4388ac0fe387f2ffe"],["src/px-sample-app.es6.js","f1829963b7eb07d899e9bea600816670"],["src/px-sample-app.html","aca485fc28d895544e6b7a67196b303a"],["src/px-sample-dashboard.html","943ea9c64babd32e1e15f48d1468db5d"],["src/px-sample-dashboard.js","63c5175e8f37f12726dea426aeacc09f"],["src/px-sample-inbox.html","6e58be119da8461ed202e0ebceb8bbcf"],["src/px-sample-inbox.js","a76c6bd896e6ebaf5490c0c15f1a85c7"],["src/px-sample-layout.html","e910778701a4123b7e895d17309d6456"],["src/px-sample-layout.js","32baba74b292c855239ece2c0a860b8e"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







