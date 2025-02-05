(function (modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports;
    var module = (installedModules[moduleId] = {
      exports: {},
      id: moduleId,
      loaded: false,
    });
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    module.loaded = true;
    return module.exports;
  }
  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;
  __webpack_require__.p = "/scripts/dist/";
  return __webpack_require__(0);
})([
  function (module, exports, __webpack_require__) {
    "use strict";
    var _getBaseUrl = __webpack_require__(2);
    var _getBaseUrl2 = _interopRequireDefault(_getBaseUrl);
    var _createWidgets = __webpack_require__(19);
    var _createWidgets2 = _interopRequireDefault(_createWidgets);
    var _WidgetAnalyticsProvider = __webpack_require__(31);
    var _WidgetAnalyticsProvider2 = _interopRequireDefault(
      _WidgetAnalyticsProvider
    );
    var _mergeQueryParams = __webpack_require__(49);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      } else {
        return Array.from(arr);
      }
    }
    var ANALYTICS_INITIALIZED = "BZ_WIDGET_ANALYTICS_PROVIDER_INITIALIZED";
    if (!window[ANALYTICS_INITIALIZED]) {
      new _WidgetAnalyticsProvider2.default({ window: window });
      window[ANALYTICS_INITIALIZED] = true;
    }
    var baseUrl = (0, _getBaseUrl2.default)({ project: "accounts" });
    (0, _createWidgets2.default)(
      [
        ".bizzabo-tickets-widget",
        "#bizzabo-tickets-widget",
        '[name="bizzabo-tickets-widget"]',
      ],
      function (element) {
        var eventId = element.getAttribute("data-event-id");
        var dataParams = element.getAttribute("data-params");
        var dashboardUrl = element.getAttribute("data-dashboard-url");
        var dataBZQueryString =
          element.getAttribute("data-bz-query-string") || "";
        var locationQueryString = window.location.search;
        var mergedQueryParams = (0, _mergeQueryParams.mergeQueryParams)(
          locationQueryString,
          dataBZQueryString
        );
        var hash = window.location.hash;
        var params = void 0;
        if (hash && hash.indexOf("?") > hash.indexOf("#")) {
          params = hash.substring(hash.indexOf("?") + 1);
        } else {
          params = mergedQueryParams;
        }
        var paramArr = [];
        if (params) {
          paramArr.push(params);
        }
        if (dataParams) {
          paramArr.push(dataParams);
        }
        paramArr.push("widget=true");
        return {
          label: "tickets",
          src: encodeURI(
            (baseUrl || dashboardUrl) +
              "/widgets/tickets/" +
              eventId +
              "?" +
              paramArr.join("&")
          ),
          attrs: {
            scrolling: "no",
            frameborder: "0",
            allowtransparency: "true",
            width: "100%",
            allow: "camera",
          },
          styles: {
            width: "100%",
            height: "1000px",
            overflow: "hidden",
            backgroundColor: "transparent",
          },
          afterScroll: function afterScroll() {
            return window.scrollBy(0, -100);
          },
          messageCallback: function messageCallback(message) {
            console.log(message);
          },
          onMessage: function onMessage(_ref) {
            var frame = _ref.frame,
              _ref$message = _ref.message;
            _ref$message = _ref$message === undefined ? {} : _ref$message;
            var type = _ref$message.type,
              payload = _ref$message.payload;
            if (
              localStorage &&
              localStorage.getItem("debugWidget") === "true"
            ) {
              var _console;
              console.log("going to send message", type, payload, window.ga);
              (_console = console).log.apply(
                _console,
                ["going to send payload"].concat(_toConsumableArray(payload))
              );
            }
            if (type === "bzsdk.analyticsEvent") {
              if (window.ga) {
                var _window;
                (_window = window).ga.apply(
                  _window,
                  _toConsumableArray(payload)
                );
              } else {
                console.warn("Unable to send GA event:", payload);
              }
            }
          },
        };
      }
    );
  },
  ,
  function (module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var findScriptDefault = function findScriptDefault() {
      return document.currentScript;
    };
    var findScriptBySrc = function findScriptBySrc() {
      return document.querySelector(
        'script[src*="organizer.bizzabo.com/widgets"]'
      );
    };
    var findCurrentScript = function findCurrentScript() {
      return findScriptDefault() || findScriptBySrc();
    };
    var getEnvironmentFromScript = function getEnvironmentFromScript(
      project,
      script
    ) {
      var src = script.getAttribute("src");
      var parts = src.match(/^http(s?):\/\/((\w+)-)?organizer\.bizzabo\.com\b/);
      if (parts) {
        var prefix = parts[3] ? parts[3] + "-" : "";
        var envPart = parts ? prefix : null;
        return "https://" + envPart + project + ".bizzabo.com";
      } else {
        var partsKube = src.match(
          /^http(s?):\/\/((.+)-)?organizer(\.[\w]+)\.dev\.bizzabo\.com\b/
        );
        var _prefix = partsKube[3] ? partsKube[3] + "-" : "";
        var _envPart = partsKube ? _prefix : null;
        var extPart = partsKube[4];
        return "https://" + _envPart + project + extPart + ".dev.bizzabo.com";
      }
    };
    var getEnvironment = function getEnvironment(project) {
      var script = findCurrentScript();
      if (!script) {
        return null;
      }
      return getEnvironmentFromScript(project, script) || null;
    };
    var getBaseUrl = function getBaseUrl(_ref) {
      var project = _ref.project;
      return getEnvironment(project);
    };
    exports.default = getBaseUrl;
  },
  ,
  ,
  ,
  ,
  ,
  ,
  function (module, exports) {
    module.exports = function (module) {
      if (!module.webpackPolyfill) {
        module.deprecate = function () {};
        module.paths = [];
        module.children = [];
        module.webpackPolyfill = 1;
      }
      return module;
    };
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _extends =
      Object.assign ||
      function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
    var _iframeResizer = __webpack_require__(20);
    var _iframeResizer2 = _interopRequireDefault(_iframeResizer);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var uid = function uid() {
      return Math.floor(Math.random() * 1e9).toString(36);
    };
    var createMessageCallback = function createMessageCallback(_ref) {
      var element = _ref.element,
        afterScroll = _ref.afterScroll,
        onMessage = _ref.onMessage;
      return function (messageData) {
        if (messageData.message === "scrollToTop") {
          setTimeout(function () {
            element && element.scrollIntoView(true);
            afterScroll && afterScroll();
          }, 0);
          return;
        }
        var _ref2 = messageData || {},
          _ref2$iframe = _ref2.iframe;
        _ref2$iframe = _ref2$iframe === undefined ? {} : _ref2$iframe;
        var _ref2$iframe$style = _ref2$iframe.style,
          style = _ref2$iframe$style === undefined ? {} : _ref2$iframe$style,
          _ref2$iframe$iFrameRe = _ref2$iframe.iFrameResizer,
          iFrameResizer =
            _ref2$iframe$iFrameRe === undefined ? {} : _ref2$iframe$iFrameRe;
        if (messageData.message === "communityIframeShouldResize") {
          style.height = "700px";
          style["max-height"] = "100vh";
          iFrameResizer.resize();
          return;
        } else if (
          messageData.message === "communityIframeShouldResizeToDefault"
        ) {
          style["max-height"] = "";
          iFrameResizer.resize();
        }
        onMessage && onMessage(messageData);
      };
    };
    var attachWidgetIframe = function attachWidgetIframe(_ref3) {
      var src = _ref3.src,
        element = _ref3.element,
        _ref3$resizer = _ref3.resizer,
        resizer = _ref3$resizer === undefined ? {} : _ref3$resizer,
        _ref3$label = _ref3.label,
        label = _ref3$label === undefined ? null : _ref3$label,
        afterScroll = _ref3.afterScroll,
        _ref3$attrs = _ref3.attrs,
        attrs = _ref3$attrs === undefined ? {} : _ref3$attrs,
        _ref3$styles = _ref3.styles,
        styles = _ref3$styles === undefined ? {} : _ref3$styles,
        _ref3$onMessage = _ref3.onMessage,
        onMessage = _ref3$onMessage === undefined ? null : _ref3$onMessage,
        _ref3$doNotStyleConta = _ref3.doNotStyleContainerElement,
        doNotStyleContainerElement =
          _ref3$doNotStyleConta === undefined ? false : _ref3$doNotStyleConta;
      element.setAttribute("data-done", "done");
      if (!doNotStyleContainerElement) {
        element.style.width = "100%";
        element.style.overflow = "hidden";
      }
      var iframe = document.createElement("IFRAME");
      Object.keys(attrs).forEach(function (key) {
        return iframe.setAttribute(key, attrs[key]);
      });
      Object.keys(styles).forEach(function (key) {
        return (iframe.style[key] = styles[key]);
      });
      iframe.setAttribute("src", src);
      element.appendChild(iframe);
      var id = "Bizzabo-iFrameResizer-" + (label ? label + "-" : "") + uid();
      var isIframeResizerEnabled =
        resizer.enabled == null || resizer.enabled !== "false";
      isIframeResizerEnabled &&
        (0, _iframeResizer2.default)(
          _extends(
            {
              id: id,
              messageCallback: createMessageCallback({
                element: element,
                afterScroll: afterScroll,
                onMessage: onMessage,
              }),
              checkOrigin: false,
            },
            resizer
          ),
          iframe
        );
      return iframe;
    };
    var createWidgets = function createWidgets(selectors, configCreator) {
      var doNotStyleContainerElement =
        arguments.length > 2 && arguments[2] !== undefined
          ? arguments[2]
          : false;
      selectors = typeof selectors === "string" ? [selectors] : selectors;
      for (var i = 0; i < selectors.length; i++) {
        var selector = selectors[i];
        var elements = document.querySelectorAll(
          selector + ":not([data-done])"
        );
        for (var _i = 0; _i < elements.length; _i++) {
          var element = elements[_i];
          var iframeConfig = configCreator(element);
          attachWidgetIframe(
            _extends({}, iframeConfig, {
              element: element,
              doNotStyleContainerElement: doNotStyleContainerElement,
            })
          );
        }
      }
    };
    exports.default = createWidgets;
  },
  function (module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_FACTORY__,
      __WEBPACK_AMD_DEFINE_ARRAY__,
      __WEBPACK_AMD_DEFINE_RESULT__;
    (function (undefined) {
      "use strict";
      if (typeof window === "undefined") return;
      var count = 0,
        logEnabled = false,
        hiddenCheckEnabled = false,
        msgHeader = "message",
        msgHeaderLen = msgHeader.length,
        msgId = "[iFrameSizer]",
        msgIdLen = msgId.length,
        pagePosition = null,
        requestAnimationFrame = window.requestAnimationFrame,
        resetRequiredMethods = {
          max: 1,
          scroll: 1,
          bodyScroll: 1,
          documentElementScroll: 1,
        },
        settings = {},
        timer = null,
        logId = "Host Page",
        defaults = {
          autoResize: true,
          bodyBackground: null,
          bodyMargin: null,
          bodyMarginV1: 8,
          bodyPadding: null,
          checkOrigin: true,
          inPageLinks: false,
          enablePublicMethods: true,
          heightCalculationMethod: "bodyOffset",
          id: "iFrameResizer",
          interval: 32,
          log: false,
          maxHeight: Infinity,
          maxWidth: Infinity,
          minHeight: 0,
          minWidth: 0,
          resizeFrom: "parent",
          scrolling: false,
          sizeHeight: true,
          sizeWidth: false,
          warningTimeout: 5e3,
          tolerance: 0,
          widthCalculationMethod: "scroll",
          closedCallback: function () {},
          initCallback: function () {},
          messageCallback: function () {
            warn("MessageCallback function not defined");
          },
          resizedCallback: function () {},
          scrollCallback: function () {
            return true;
          },
        };
      function addEventListener(obj, evt, func) {
        if ("addEventListener" in window) {
          obj.addEventListener(evt, func, false);
        } else if ("attachEvent" in window) {
          obj.attachEvent("on" + evt, func);
        }
      }
      function removeEventListener(el, evt, func) {
        if ("removeEventListener" in window) {
          el.removeEventListener(evt, func, false);
        } else if ("detachEvent" in window) {
          el.detachEvent("on" + evt, func);
        }
      }
      function setupRequestAnimationFrame() {
        var vendors = ["moz", "webkit", "o", "ms"],
          x;
        for (x = 0; x < vendors.length && !requestAnimationFrame; x += 1) {
          requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        }
        if (!requestAnimationFrame) {
          log("setup", "RequestAnimationFrame not supported");
        }
      }
      function getMyID(iframeId) {
        var retStr = "Host page: " + iframeId;
        if (window.top !== window.self) {
          if (window.parentIFrame && window.parentIFrame.getId) {
            retStr = window.parentIFrame.getId() + ": " + iframeId;
          } else {
            retStr = "Nested host page: " + iframeId;
          }
        }
        return retStr;
      }
      function formatLogHeader(iframeId) {
        return msgId + "[" + getMyID(iframeId) + "]";
      }
      function isLogEnabled(iframeId) {
        return settings[iframeId] ? settings[iframeId].log : logEnabled;
      }
      function log(iframeId, msg) {
        output("log", iframeId, msg, isLogEnabled(iframeId));
      }
      function info(iframeId, msg) {
        output("info", iframeId, msg, isLogEnabled(iframeId));
      }
      function warn(iframeId, msg) {
        output("warn", iframeId, msg, true);
      }
      function output(type, iframeId, msg, enabled) {
        if (true === enabled && "object" === typeof window.console) {
          console[type](formatLogHeader(iframeId), msg);
        }
      }
      function iFrameListener(event) {
        function resizeIFrame() {
          function resize() {
            setSize(messageData);
            setPagePosition(iframeId);
            callback("resizedCallback", messageData);
          }
          ensureInRange("Height");
          ensureInRange("Width");
          syncResize(resize, messageData, "init");
        }
        function processMsg() {
          var data = msg.substr(msgIdLen).split(":");
          return {
            iframe: settings[data[0]] && settings[data[0]].iframe,
            id: data[0],
            height: data[1],
            width: data[2],
            type: data[3],
          };
        }
        function ensureInRange(Dimension) {
          var max = Number(settings[iframeId]["max" + Dimension]),
            min = Number(settings[iframeId]["min" + Dimension]),
            dimension = Dimension.toLowerCase(),
            size = Number(messageData[dimension]);
          log(
            iframeId,
            "Checking " + dimension + " is in range " + min + "-" + max
          );
          if (size < min) {
            size = min;
            log(iframeId, "Set " + dimension + " to min value");
          }
          if (size > max) {
            size = max;
            log(iframeId, "Set " + dimension + " to max value");
          }
          messageData[dimension] = "" + size;
        }
        function isMessageFromIFrame() {
          function checkAllowedOrigin() {
            function checkList() {
              var i = 0,
                retCode = false;
              log(
                iframeId,
                "Checking connection is from allowed list of origins: " +
                  checkOrigin
              );
              for (; i < checkOrigin.length; i++) {
                if (checkOrigin[i] === origin) {
                  retCode = true;
                  break;
                }
              }
              return retCode;
            }
            function checkSingle() {
              var remoteHost =
                settings[iframeId] && settings[iframeId].remoteHost;
              log(iframeId, "Checking connection is from: " + remoteHost);
              return origin === remoteHost;
            }
            return checkOrigin.constructor === Array
              ? checkList()
              : checkSingle();
          }
          var origin = event.origin,
            checkOrigin = settings[iframeId] && settings[iframeId].checkOrigin;
          if (checkOrigin && "" + origin !== "null" && !checkAllowedOrigin()) {
            throw new Error(
              "Unexpected message received from: " +
                origin +
                " for " +
                messageData.iframe.id +
                ". Message was: " +
                event.data +
                ". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains."
            );
          }
          return true;
        }
        function isMessageForUs() {
          return (
            msgId === ("" + msg).substr(0, msgIdLen) &&
            msg.substr(msgIdLen).split(":")[0] in settings
          );
        }
        function isMessageFromMetaParent() {
          var retCode = messageData.type in { true: 1, false: 1, undefined: 1 };
          if (retCode) {
            log(iframeId, "Ignoring init message from meta parent page");
          }
          return retCode;
        }
        function getMsgBody(offset) {
          return msg.substr(msg.indexOf(":") + msgHeaderLen + offset);
        }
        function forwardMsgFromIFrame(msgBody) {
          log(
            iframeId,
            "MessageCallback passed: {iframe: " +
              messageData.iframe.id +
              ", message: " +
              msgBody +
              "}"
          );
          callback("messageCallback", {
            iframe: messageData.iframe,
            message: JSON.parse(msgBody),
          });
          log(iframeId, "--");
        }
        function getPageInfo() {
          var bodyPosition = document.body.getBoundingClientRect(),
            iFramePosition = messageData.iframe.getBoundingClientRect();
          return JSON.stringify({
            iframeHeight: iFramePosition.height,
            iframeWidth: iFramePosition.width,
            clientHeight: Math.max(
              document.documentElement.clientHeight,
              window.innerHeight || 0
            ),
            clientWidth: Math.max(
              document.documentElement.clientWidth,
              window.innerWidth || 0
            ),
            offsetTop: parseInt(iFramePosition.top - bodyPosition.top, 10),
            offsetLeft: parseInt(iFramePosition.left - bodyPosition.left, 10),
            scrollTop: window.pageYOffset,
            scrollLeft: window.pageXOffset,
          });
        }
        function sendPageInfoToIframe(iframe, iframeId) {
          function debouncedTrigger() {
            trigger(
              "Send Page Info",
              "pageInfo:" + getPageInfo(),
              iframe,
              iframeId
            );
          }
          debouce(debouncedTrigger, 32);
        }
        function startPageInfoMonitor() {
          function setListener(type, func) {
            function sendPageInfo() {
              if (settings[id]) {
                sendPageInfoToIframe(settings[id].iframe, id);
              } else {
                stop();
              }
            }
            ["scroll", "resize"].forEach(function (evt) {
              log(id, type + evt + " listener for sendPageInfo");
              func(window, evt, sendPageInfo);
            });
          }
          function stop() {
            setListener("Remove ", removeEventListener);
          }
          function start() {
            setListener("Add ", addEventListener);
          }
          var id = iframeId;
          start();
          if (settings[id]) {
            settings[id].stopPageInfo = stop;
          }
        }
        function stopPageInfoMonitor() {
          if (settings[iframeId] && settings[iframeId].stopPageInfo) {
            settings[iframeId].stopPageInfo();
            delete settings[iframeId].stopPageInfo;
          }
        }
        function checkIFrameExists() {
          var retBool = true;
          if (null === messageData.iframe) {
            warn(iframeId, "IFrame (" + messageData.id + ") not found");
            retBool = false;
          }
          return retBool;
        }
        function getElementPosition(target) {
          var iFramePosition = target.getBoundingClientRect();
          getPagePosition(iframeId);
          return {
            x: Math.floor(Number(iFramePosition.left) + Number(pagePosition.x)),
            y: Math.floor(Number(iFramePosition.top) + Number(pagePosition.y)),
          };
        }
        function scrollRequestFromChild(addOffset) {
          function reposition() {
            pagePosition = newPosition;
            scrollTo();
            log(iframeId, "--");
          }
          function calcOffset() {
            return {
              x: Number(messageData.width) + offset.x,
              y: Number(messageData.height) + offset.y,
            };
          }
          function scrollParent() {
            if (window.parentIFrame) {
              window.parentIFrame["scrollTo" + (addOffset ? "Offset" : "")](
                newPosition.x,
                newPosition.y
              );
            } else {
              warn(
                iframeId,
                "Unable to scroll to requested position, window.parentIFrame not found"
              );
            }
          }
          var offset = addOffset
              ? getElementPosition(messageData.iframe)
              : { x: 0, y: 0 },
            newPosition = calcOffset();
          log(
            iframeId,
            "Reposition requested from iFrame (offset x:" +
              offset.x +
              " y:" +
              offset.y +
              ")"
          );
          if (window.top !== window.self) {
            scrollParent();
          } else {
            reposition();
          }
        }
        function scrollTo() {
          if (false !== callback("scrollCallback", pagePosition)) {
            setPagePosition(iframeId);
          } else {
            unsetPagePosition();
          }
        }
        function findTarget(location) {
          function jumpToTarget() {
            var jumpPosition = getElementPosition(target);
            log(
              iframeId,
              "Moving to in page link (#" +
                hash +
                ") at x: " +
                jumpPosition.x +
                " y: " +
                jumpPosition.y
            );
            pagePosition = { x: jumpPosition.x, y: jumpPosition.y };
            scrollTo();
            log(iframeId, "--");
          }
          function jumpToParent() {
            if (window.parentIFrame) {
              window.parentIFrame.moveToAnchor(hash);
            } else {
              log(
                iframeId,
                "In page link #" +
                  hash +
                  " not found and window.parentIFrame not found"
              );
            }
          }
          var hash = location.split("#")[1] || "",
            hashData = decodeURIComponent(hash),
            target =
              document.getElementById(hashData) ||
              document.getElementsByName(hashData)[0];
          if (target) {
            jumpToTarget();
          } else if (window.top !== window.self) {
            jumpToParent();
          } else {
            log(iframeId, "In page link #" + hash + " not found");
          }
        }
        function callback(funcName, val) {
          return chkCallback(iframeId, funcName, val);
        }
        function actionMsg() {
          if (settings[iframeId] && settings[iframeId].firstRun) firstRun();
          switch (messageData.type) {
            case "close":
              if (settings[iframeId].closeRequestCallback)
                chkCallback(
                  iframeId,
                  "closeRequestCallback",
                  settings[iframeId].iframe
                );
              else closeIFrame(messageData.iframe);
              break;
            case "message":
              forwardMsgFromIFrame(getMsgBody(6));
              break;
            case "scrollTo":
              scrollRequestFromChild(false);
              break;
            case "scrollToOffset":
              scrollRequestFromChild(true);
              break;
            case "pageInfo":
              sendPageInfoToIframe(
                settings[iframeId] && settings[iframeId].iframe,
                iframeId
              );
              startPageInfoMonitor();
              break;
            case "pageInfoStop":
              stopPageInfoMonitor();
              break;
            case "inPageLink":
              findTarget(getMsgBody(9));
              break;
            case "reset":
              resetIFrame(messageData);
              break;
            case "init":
              resizeIFrame();
              callback("initCallback", messageData.iframe);
              break;
            default:
              resizeIFrame();
          }
        }
        function hasSettings(iframeId) {
          var retBool = true;
          if (!settings[iframeId]) {
            retBool = false;
            warn(
              messageData.type +
                " No settings for " +
                iframeId +
                ". Message was: " +
                msg
            );
          }
          return retBool;
        }
        function iFrameReadyMsgReceived() {
          for (var iframeId in settings) {
            trigger(
              "iFrame requested init",
              createOutgoingMsg(iframeId),
              document.getElementById(iframeId),
              iframeId
            );
          }
        }
        function firstRun() {
          if (settings[iframeId]) {
            settings[iframeId].firstRun = false;
          }
        }
        function clearWarningTimeout() {
          if (settings[iframeId]) {
            clearTimeout(settings[iframeId].msgTimeout);
            settings[iframeId].warningTimeout = 0;
          }
        }
        var msg = event.data,
          messageData = {},
          iframeId = null;
        if ("[iFrameResizerChild]Ready" === msg) {
          iFrameReadyMsgReceived();
        } else if (isMessageForUs()) {
          messageData = processMsg();
          iframeId = logId = messageData.id;
          if (settings[iframeId]) {
            settings[iframeId].loaded = true;
          }
          if (!isMessageFromMetaParent() && hasSettings(iframeId)) {
            log(iframeId, "Received: " + msg);
            if (checkIFrameExists() && isMessageFromIFrame()) {
              actionMsg();
            }
          }
        } else {
          info(iframeId, "Ignored: " + msg);
        }
      }
      function chkCallback(iframeId, funcName, val) {
        var func = null,
          retVal = null;
        if (settings[iframeId]) {
          func = settings[iframeId][funcName];
          if ("function" === typeof func) {
            retVal = func(val);
          } else {
            throw new TypeError(
              funcName + " on iFrame[" + iframeId + "] is not a function"
            );
          }
        }
        return retVal;
      }
      function closeIFrame(iframe) {
        var iframeId = iframe.id;
        log(iframeId, "Removing iFrame: " + iframeId);
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
        chkCallback(iframeId, "closedCallback", iframeId);
        log(iframeId, "--");
        delete settings[iframeId];
      }
      function getPagePosition(iframeId) {
        if (null === pagePosition) {
          pagePosition = {
            x:
              window.pageXOffset !== undefined
                ? window.pageXOffset
                : document.documentElement.scrollLeft,
            y:
              window.pageYOffset !== undefined
                ? window.pageYOffset
                : document.documentElement.scrollTop,
          };
          log(
            iframeId,
            "Get page position: " + pagePosition.x + "," + pagePosition.y
          );
        }
      }
      function setPagePosition(iframeId) {
        if (null !== pagePosition) {
          window.scrollTo(pagePosition.x, pagePosition.y);
          log(
            iframeId,
            "Set page position: " + pagePosition.x + "," + pagePosition.y
          );
          unsetPagePosition();
        }
      }
      function unsetPagePosition() {
        pagePosition = null;
      }
      function resetIFrame(messageData) {
        function reset() {
          setSize(messageData);
          trigger("reset", "reset", messageData.iframe, messageData.id);
        }
        log(
          messageData.id,
          "Size reset requested by " +
            ("init" === messageData.type ? "host page" : "iFrame")
        );
        getPagePosition(messageData.id);
        syncResize(reset, messageData, "reset");
      }
      function setSize(messageData) {
        function setDimension(dimension) {
          messageData.iframe.style[dimension] = messageData[dimension] + "px";
          log(
            messageData.id,
            "IFrame (" +
              iframeId +
              ") " +
              dimension +
              " set to " +
              messageData[dimension] +
              "px"
          );
        }
        function chkZero(dimension) {
          if (!hiddenCheckEnabled && "0" === messageData[dimension]) {
            hiddenCheckEnabled = true;
            log(
              iframeId,
              "Hidden iFrame detected, creating visibility listener"
            );
            fixHiddenIFrames();
          }
        }
        function processDimension(dimension) {
          setDimension(dimension);
          chkZero(dimension);
        }
        var iframeId = messageData.iframe.id;
        if (settings[iframeId]) {
          if (settings[iframeId].sizeHeight) {
            processDimension("height");
          }
          if (settings[iframeId].sizeWidth) {
            processDimension("width");
          }
        }
      }
      function syncResize(func, messageData, doNotSync) {
        if (doNotSync !== messageData.type && requestAnimationFrame) {
          log(messageData.id, "Requesting animation frame");
          requestAnimationFrame(func);
        } else {
          func();
        }
      }
      function trigger(calleeMsg, msg, iframe, id, noResponseWarning) {
        function postMessageToIFrame() {
          var target = settings[id] && settings[id].targetOrigin;
          log(
            id,
            "[" +
              calleeMsg +
              "] Sending msg to iframe[" +
              id +
              "] (" +
              msg +
              ") targetOrigin: " +
              target
          );
          iframe.contentWindow.postMessage(msgId + msg, target);
        }
        function iFrameNotFound() {
          warn(id, "[" + calleeMsg + "] IFrame(" + id + ") not found");
        }
        function chkAndSend() {
          if (
            iframe &&
            "contentWindow" in iframe &&
            null !== iframe.contentWindow
          ) {
            postMessageToIFrame();
          } else {
            iFrameNotFound();
          }
        }
        function warnOnNoResponse() {
          function warning() {
            if (settings[id] && !settings[id].loaded && !errorShown) {
              errorShown = true;
              warn(
                id,
                "IFrame has not responded within " +
                  settings[id].warningTimeout / 1e3 +
                  " seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ingored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."
              );
            }
          }
          if (
            !!noResponseWarning &&
            settings[id] &&
            !!settings[id].warningTimeout
          ) {
            settings[id].msgTimeout = setTimeout(
              warning,
              settings[id].warningTimeout
            );
          }
        }
        var errorShown = false;
        id = id || iframe.id;
        if (settings[id]) {
          chkAndSend();
          warnOnNoResponse();
        }
      }
      function createOutgoingMsg(iframeId) {
        return (
          iframeId +
          ":" +
          settings[iframeId].bodyMarginV1 +
          ":" +
          settings[iframeId].sizeWidth +
          ":" +
          settings[iframeId].log +
          ":" +
          settings[iframeId].interval +
          ":" +
          settings[iframeId].enablePublicMethods +
          ":" +
          settings[iframeId].autoResize +
          ":" +
          settings[iframeId].bodyMargin +
          ":" +
          settings[iframeId].heightCalculationMethod +
          ":" +
          settings[iframeId].bodyBackground +
          ":" +
          settings[iframeId].bodyPadding +
          ":" +
          settings[iframeId].tolerance +
          ":" +
          settings[iframeId].inPageLinks +
          ":" +
          settings[iframeId].resizeFrom +
          ":" +
          settings[iframeId].widthCalculationMethod
        );
      }
      function setupIFrame(iframe, options) {
        function setLimits() {
          function addStyle(style) {
            if (
              Infinity !== settings[iframeId][style] &&
              0 !== settings[iframeId][style]
            ) {
              iframe.style[style] = settings[iframeId][style] + "px";
              log(
                iframeId,
                "Set " + style + " = " + settings[iframeId][style] + "px"
              );
            }
          }
          function chkMinMax(dimension) {
            if (
              settings[iframeId]["min" + dimension] >
              settings[iframeId]["max" + dimension]
            ) {
              throw new Error(
                "Value for min" +
                  dimension +
                  " can not be greater than max" +
                  dimension
              );
            }
          }
          chkMinMax("Height");
          chkMinMax("Width");
          addStyle("maxHeight");
          addStyle("minHeight");
          addStyle("maxWidth");
          addStyle("minWidth");
        }
        function newId() {
          var id = (options && options.id) || defaults.id + count++;
          if (null !== document.getElementById(id)) {
            id = id + count++;
          }
          return id;
        }
        function ensureHasId(iframeId) {
          logId = iframeId;
          if ("" === iframeId) {
            iframe.id = iframeId = newId();
            logEnabled = (options || {}).log;
            logId = iframeId;
            log(
              iframeId,
              "Added missing iframe ID: " + iframeId + " (" + iframe.src + ")"
            );
          }
          return iframeId;
        }
        function setScrolling() {
          log(
            iframeId,
            "IFrame scrolling " +
              (settings[iframeId] && settings[iframeId].scrolling
                ? "enabled"
                : "disabled") +
              " for " +
              iframeId
          );
          iframe.style.overflow =
            false === (settings[iframeId] && settings[iframeId].scrolling)
              ? "hidden"
              : "auto";
          switch (settings[iframeId] && settings[iframeId].scrolling) {
            case true:
              iframe.scrolling = "yes";
              break;
            case false:
              iframe.scrolling = "no";
              break;
            default:
              iframe.scrolling = settings[iframeId]
                ? settings[iframeId].scrolling
                : "no";
          }
        }
        function setupBodyMarginValues() {
          if (
            "number" ===
              typeof (settings[iframeId] && settings[iframeId].bodyMargin) ||
            "0" === (settings[iframeId] && settings[iframeId].bodyMargin)
          ) {
            settings[iframeId].bodyMarginV1 = settings[iframeId].bodyMargin;
            settings[iframeId].bodyMargin =
              "" + settings[iframeId].bodyMargin + "px";
          }
        }
        function checkReset() {
          var firstRun = settings[iframeId] && settings[iframeId].firstRun,
            resetRequertMethod =
              settings[iframeId] &&
              settings[iframeId].heightCalculationMethod in
                resetRequiredMethods;
          if (!firstRun && resetRequertMethod) {
            resetIFrame({ iframe: iframe, height: 0, width: 0, type: "init" });
          }
        }
        function setupIFrameObject() {
          if (Function.prototype.bind && settings[iframeId]) {
            settings[iframeId].iframe.iFrameResizer = {
              close: closeIFrame.bind(null, settings[iframeId].iframe),
              resize: trigger.bind(
                null,
                "Window resize",
                "resize",
                settings[iframeId].iframe
              ),
              moveToAnchor: function (anchor) {
                trigger(
                  "Move to anchor",
                  "moveToAnchor:" + anchor,
                  settings[iframeId].iframe,
                  iframeId
                );
              },
              sendMessage: function (message) {
                message = JSON.stringify(message);
                trigger(
                  "Send Message",
                  "message:" + message,
                  settings[iframeId].iframe,
                  iframeId
                );
              },
            };
          }
        }
        function init(msg) {
          function iFrameLoaded() {
            trigger("iFrame.onload", msg, iframe, undefined, true);
            checkReset();
          }
          addEventListener(iframe, "load", iFrameLoaded);
          trigger("init", msg, iframe, undefined, true);
        }
        function checkOptions(options) {
          if ("object" !== typeof options) {
            throw new TypeError("Options is not an object");
          }
        }
        function copyOptions(options) {
          for (var option in defaults) {
            if (defaults.hasOwnProperty(option)) {
              settings[iframeId][option] = options.hasOwnProperty(option)
                ? options[option]
                : defaults[option];
            }
          }
        }
        function getTargetOrigin(remoteHost) {
          return "" === remoteHost || "file://" === remoteHost
            ? "*"
            : remoteHost;
        }
        function processOptions(options) {
          options = options || {};
          settings[iframeId] = {
            firstRun: true,
            iframe: iframe,
            remoteHost: iframe.src.split("/").slice(0, 3).join("/"),
          };
          checkOptions(options);
          copyOptions(options);
          if (settings[iframeId]) {
            settings[iframeId].targetOrigin =
              true === settings[iframeId].checkOrigin
                ? getTargetOrigin(settings[iframeId].remoteHost)
                : "*";
          }
        }
        function beenHere() {
          return iframeId in settings && "iFrameResizer" in iframe;
        }
        var iframeId = ensureHasId(iframe.id);
        if (!beenHere()) {
          processOptions(options);
          setScrolling();
          setLimits();
          setupBodyMarginValues();
          init(createOutgoingMsg(iframeId));
          setupIFrameObject();
        } else {
          warn(iframeId, "Ignored iFrame, already setup.");
        }
      }
      function debouce(fn, time) {
        if (null === timer) {
          timer = setTimeout(function () {
            timer = null;
            fn();
          }, time);
        }
      }
      function fixHiddenIFrames() {
        function checkIFrames() {
          function checkIFrame(settingId) {
            function chkDimension(dimension) {
              return (
                "0px" ===
                (settings[settingId] &&
                  settings[settingId].iframe.style[dimension])
              );
            }
            function isVisible(el) {
              return null !== el.offsetParent;
            }
            if (
              settings[settingId] &&
              isVisible(settings[settingId].iframe) &&
              (chkDimension("height") || chkDimension("width"))
            ) {
              trigger(
                "Visibility change",
                "resize",
                settings[settingId].iframe,
                settingId
              );
            }
          }
          for (var settingId in settings) {
            checkIFrame(settingId);
          }
        }
        function mutationObserved(mutations) {
          log(
            "window",
            "Mutation observed: " +
              mutations[0].target +
              " " +
              mutations[0].type
          );
          debouce(checkIFrames, 16);
        }
        function createMutationObserver() {
          var target = document.querySelector("body"),
            config = {
              attributes: true,
              attributeOldValue: false,
              characterData: true,
              characterDataOldValue: false,
              childList: true,
              subtree: true,
            },
            observer = new MutationObserver(mutationObserved);
          observer.observe(target, config);
        }
        var MutationObserver =
          window.MutationObserver || window.WebKitMutationObserver;
        if (MutationObserver) createMutationObserver();
      }
      function resizeIFrames(event) {
        function resize() {
          sendTriggerMsg("Window " + event, "resize");
        }
        log("window", "Trigger event: " + event);
        debouce(resize, 16);
      }
      function tabVisible() {
        function resize() {
          sendTriggerMsg("Tab Visable", "resize");
        }
        if ("hidden" !== document.visibilityState) {
          log("document", "Trigger event: Visiblity change");
          debouce(resize, 16);
        }
      }
      function sendTriggerMsg(eventName, event) {
        function isIFrameResizeEnabled(iframeId) {
          return (
            settings[iframeId] &&
            "parent" === settings[iframeId].resizeFrom &&
            settings[iframeId].autoResize &&
            !settings[iframeId].firstRun
          );
        }
        for (var iframeId in settings) {
          if (isIFrameResizeEnabled(iframeId)) {
            trigger(
              eventName,
              event,
              document.getElementById(iframeId),
              iframeId
            );
          }
        }
      }
      function setupEventListeners() {
        addEventListener(window, "message", iFrameListener);
        addEventListener(window, "resize", function () {
          resizeIFrames("resize");
        });
        addEventListener(document, "visibilitychange", tabVisible);
        addEventListener(document, "-webkit-visibilitychange", tabVisible);
        addEventListener(window, "focusin", function () {
          resizeIFrames("focus");
        });
        addEventListener(window, "focus", function () {
          resizeIFrames("focus");
        });
      }
      function factory() {
        function init(options, element) {
          function chkType() {
            if (!element.tagName) {
              throw new TypeError("Object is not a valid DOM element");
            } else if ("IFRAME" !== element.tagName.toUpperCase()) {
              throw new TypeError(
                "Expected <IFRAME> tag, found <" + element.tagName + ">"
              );
            }
          }
          if (element) {
            chkType();
            setupIFrame(element, options);
            iFrames.push(element);
          }
        }
        function warnDeprecatedOptions(options) {
          if (options && options.enablePublicMethods) {
            warn(
              "enablePublicMethods option has been removed, public methods are now always available in the iFrame"
            );
          }
        }
        var iFrames;
        setupRequestAnimationFrame();
        setupEventListeners();
        return function iFrameResizeF(options, target) {
          iFrames = [];
          warnDeprecatedOptions(options);
          switch (typeof target) {
            case "undefined":
            case "string":
              Array.prototype.forEach.call(
                document.querySelectorAll(target || "iframe"),
                init.bind(undefined, options)
              );
              break;
            case "object":
              init(options, target);
              break;
            default:
              throw new TypeError(
                "Unexpected data type (" + typeof target + ")"
              );
          }
          return iFrames;
        };
      }
      function createJQueryPublicMethod($) {
        if (!$.fn) {
          info("", "Unable to bind to jQuery, it is not fully loaded.");
        } else if (!$.fn.iFrameResize) {
          $.fn.iFrameResize = function $iFrameResizeF(options) {
            function init(index, element) {
              setupIFrame(element, options);
            }
            return this.filter("iframe").each(init).end();
          };
        }
      }
      if (window.jQuery) {
        createJQueryPublicMethod(window.jQuery);
      }
      if (true) {
        !((__WEBPACK_AMD_DEFINE_ARRAY__ = []),
        (__WEBPACK_AMD_DEFINE_FACTORY__ = factory),
        (__WEBPACK_AMD_DEFINE_RESULT__ =
          typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
            ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                exports,
                __WEBPACK_AMD_DEFINE_ARRAY__
              )
            : __WEBPACK_AMD_DEFINE_FACTORY__),
        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
          (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      } else if (
        typeof module === "object" &&
        typeof module.exports === "object"
      ) {
        module.exports = factory();
      } else {
        window.iFrameResize = window.iFrameResize || factory();
      }
    })();
  },
  ,
  ,
  ,
  ,
  ,
  function (module, exports, __webpack_require__) {
    "use strict";
    const strictUriEncode = __webpack_require__(27);
    const decodeComponent = __webpack_require__(28);
    const splitOnFirst = __webpack_require__(29);
    const filterObject = __webpack_require__(30);
    const isNullOrUndefined = (value) => value === null || value === undefined;
    const encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
    function encoderForArrayFormat(options) {
      switch (options.arrayFormat) {
        case "index":
          return (key) => (result, value) => {
            const index = result.length;
            if (
              value === undefined ||
              (options.skipNull && value === null) ||
              (options.skipEmptyString && value === "")
            ) {
              return result;
            }
            if (value === null) {
              return [
                ...result,
                [encode(key, options), "[", index, "]"].join(""),
              ];
            }
            return [
              ...result,
              [
                encode(key, options),
                "[",
                encode(index, options),
                "]=",
                encode(value, options),
              ].join(""),
            ];
          };
        case "bracket":
          return (key) => (result, value) => {
            if (
              value === undefined ||
              (options.skipNull && value === null) ||
              (options.skipEmptyString && value === "")
            ) {
              return result;
            }
            if (value === null) {
              return [...result, [encode(key, options), "[]"].join("")];
            }
            return [
              ...result,
              [encode(key, options), "[]=", encode(value, options)].join(""),
            ];
          };
        case "colon-list-separator":
          return (key) => (result, value) => {
            if (
              value === undefined ||
              (options.skipNull && value === null) ||
              (options.skipEmptyString && value === "")
            ) {
              return result;
            }
            if (value === null) {
              return [...result, [encode(key, options), ":list="].join("")];
            }
            return [
              ...result,
              [encode(key, options), ":list=", encode(value, options)].join(""),
            ];
          };
        case "comma":
        case "separator":
        case "bracket-separator": {
          const keyValueSep =
            options.arrayFormat === "bracket-separator" ? "[]=" : "=";
          return (key) => (result, value) => {
            if (
              value === undefined ||
              (options.skipNull && value === null) ||
              (options.skipEmptyString && value === "")
            ) {
              return result;
            }
            value = value === null ? "" : value;
            if (result.length === 0) {
              return [
                [
                  encode(key, options),
                  keyValueSep,
                  encode(value, options),
                ].join(""),
              ];
            }
            return [
              [result, encode(value, options)].join(
                options.arrayFormatSeparator
              ),
            ];
          };
        }
        default:
          return (key) => (result, value) => {
            if (
              value === undefined ||
              (options.skipNull && value === null) ||
              (options.skipEmptyString && value === "")
            ) {
              return result;
            }
            if (value === null) {
              return [...result, encode(key, options)];
            }
            return [
              ...result,
              [encode(key, options), "=", encode(value, options)].join(""),
            ];
          };
      }
    }
    function parserForArrayFormat(options) {
      let result;
      switch (options.arrayFormat) {
        case "index":
          return (key, value, accumulator) => {
            result = /\[(\d*)\]$/.exec(key);
            key = key.replace(/\[\d*\]$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === undefined) {
              accumulator[key] = {};
            }
            accumulator[key][result[1]] = value;
          };
        case "bracket":
          return (key, value, accumulator) => {
            result = /(\[\])$/.exec(key);
            key = key.replace(/\[\]$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === undefined) {
              accumulator[key] = [value];
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
        case "colon-list-separator":
          return (key, value, accumulator) => {
            result = /(:list)$/.exec(key);
            key = key.replace(/:list$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === undefined) {
              accumulator[key] = [value];
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
        case "comma":
        case "separator":
          return (key, value, accumulator) => {
            const isArray =
              typeof value === "string" &&
              value.includes(options.arrayFormatSeparator);
            const isEncodedArray =
              typeof value === "string" &&
              !isArray &&
              decode(value, options).includes(options.arrayFormatSeparator);
            value = isEncodedArray ? decode(value, options) : value;
            const newValue =
              isArray || isEncodedArray
                ? value
                    .split(options.arrayFormatSeparator)
                    .map((item) => decode(item, options))
                : value === null
                ? value
                : decode(value, options);
            accumulator[key] = newValue;
          };
        case "bracket-separator":
          return (key, value, accumulator) => {
            const isArray = /(\[\])$/.test(key);
            key = key.replace(/\[\]$/, "");
            if (!isArray) {
              accumulator[key] = value ? decode(value, options) : value;
              return;
            }
            const arrayValue =
              value === null
                ? []
                : value
                    .split(options.arrayFormatSeparator)
                    .map((item) => decode(item, options));
            if (accumulator[key] === undefined) {
              accumulator[key] = arrayValue;
              return;
            }
            accumulator[key] = [].concat(accumulator[key], arrayValue);
          };
        default:
          return (key, value, accumulator) => {
            if (accumulator[key] === undefined) {
              accumulator[key] = value;
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
      }
    }
    function validateArrayFormatSeparator(value) {
      if (typeof value !== "string" || value.length !== 1) {
        throw new TypeError(
          "arrayFormatSeparator must be single character string"
        );
      }
    }
    function encode(value, options) {
      if (options.encode) {
        return options.strict
          ? strictUriEncode(value)
          : encodeURIComponent(value);
      }
      return value;
    }
    function decode(value, options) {
      if (options.decode) {
        return decodeComponent(value);
      }
      return value;
    }
    function keysSorter(input) {
      if (Array.isArray(input)) {
        return input.sort();
      }
      if (typeof input === "object") {
        return keysSorter(Object.keys(input))
          .sort((a, b) => Number(a) - Number(b))
          .map((key) => input[key]);
      }
      return input;
    }
    function removeHash(input) {
      const hashStart = input.indexOf("#");
      if (hashStart !== -1) {
        input = input.slice(0, hashStart);
      }
      return input;
    }
    function getHash(url) {
      let hash = "";
      const hashStart = url.indexOf("#");
      if (hashStart !== -1) {
        hash = url.slice(hashStart);
      }
      return hash;
    }
    function extract(input) {
      input = removeHash(input);
      const queryStart = input.indexOf("?");
      if (queryStart === -1) {
        return "";
      }
      return input.slice(queryStart + 1);
    }
    function parseValue(value, options) {
      if (
        options.parseNumbers &&
        !Number.isNaN(Number(value)) &&
        typeof value === "string" &&
        value.trim() !== ""
      ) {
        value = Number(value);
      } else if (
        options.parseBooleans &&
        value !== null &&
        (value.toLowerCase() === "true" || value.toLowerCase() === "false")
      ) {
        value = value.toLowerCase() === "true";
      }
      return value;
    }
    function parse(query, options) {
      options = Object.assign(
        {
          decode: true,
          sort: true,
          arrayFormat: "none",
          arrayFormatSeparator: ",",
          parseNumbers: false,
          parseBooleans: false,
        },
        options
      );
      validateArrayFormatSeparator(options.arrayFormatSeparator);
      const formatter = parserForArrayFormat(options);
      const ret = Object.create(null);
      if (typeof query !== "string") {
        return ret;
      }
      query = query.trim().replace(/^[?#&]/, "");
      if (!query) {
        return ret;
      }
      for (const param of query.split("&")) {
        if (param === "") {
          continue;
        }
        let [key, value] = splitOnFirst(
          options.decode ? param.replace(/\+/g, " ") : param,
          "="
        );
        value =
          value === undefined
            ? null
            : ["comma", "separator", "bracket-separator"].includes(
                options.arrayFormat
              )
            ? value
            : decode(value, options);
        formatter(decode(key, options), value, ret);
      }
      for (const key of Object.keys(ret)) {
        const value = ret[key];
        if (typeof value === "object" && value !== null) {
          for (const k of Object.keys(value)) {
            value[k] = parseValue(value[k], options);
          }
        } else {
          ret[key] = parseValue(value, options);
        }
      }
      if (options.sort === false) {
        return ret;
      }
      return (
        options.sort === true
          ? Object.keys(ret).sort()
          : Object.keys(ret).sort(options.sort)
      ).reduce((result, key) => {
        const value = ret[key];
        if (
          Boolean(value) &&
          typeof value === "object" &&
          !Array.isArray(value)
        ) {
          result[key] = keysSorter(value);
        } else {
          result[key] = value;
        }
        return result;
      }, Object.create(null));
    }
    exports.extract = extract;
    exports.parse = parse;
    exports.stringify = (object, options) => {
      if (!object) {
        return "";
      }
      options = Object.assign(
        {
          encode: true,
          strict: true,
          arrayFormat: "none",
          arrayFormatSeparator: ",",
        },
        options
      );
      validateArrayFormatSeparator(options.arrayFormatSeparator);
      const shouldFilter = (key) =>
        (options.skipNull && isNullOrUndefined(object[key])) ||
        (options.skipEmptyString && object[key] === "");
      const formatter = encoderForArrayFormat(options);
      const objectCopy = {};
      for (const key of Object.keys(object)) {
        if (!shouldFilter(key)) {
          objectCopy[key] = object[key];
        }
      }
      const keys = Object.keys(objectCopy);
      if (options.sort !== false) {
        keys.sort(options.sort);
      }
      return keys
        .map((key) => {
          const value = object[key];
          if (value === undefined) {
            return "";
          }
          if (value === null) {
            return encode(key, options);
          }
          if (Array.isArray(value)) {
            if (
              value.length === 0 &&
              options.arrayFormat === "bracket-separator"
            ) {
              return encode(key, options) + "[]";
            }
            return value.reduce(formatter(key), []).join("&");
          }
          return encode(key, options) + "=" + encode(value, options);
        })
        .filter((x) => x.length > 0)
        .join("&");
    };
    exports.parseUrl = (url, options) => {
      options = Object.assign({ decode: true }, options);
      const [url_, hash] = splitOnFirst(url, "#");
      return Object.assign(
        { url: url_.split("?")[0] || "", query: parse(extract(url), options) },
        options && options.parseFragmentIdentifier && hash
          ? { fragmentIdentifier: decode(hash, options) }
          : {}
      );
    };
    exports.stringifyUrl = (object, options) => {
      options = Object.assign(
        { encode: true, strict: true, [encodeFragmentIdentifier]: true },
        options
      );
      const url = removeHash(object.url).split("?")[0] || "";
      const queryFromUrl = exports.extract(object.url);
      const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
      const query = Object.assign(parsedQueryFromUrl, object.query);
      let queryString = exports.stringify(query, options);
      if (queryString) {
        queryString = `?${queryString}`;
      }
      let hash = getHash(object.url);
      if (object.fragmentIdentifier) {
        hash = `#${
          options[encodeFragmentIdentifier]
            ? encode(object.fragmentIdentifier, options)
            : object.fragmentIdentifier
        }`;
      }
      return `${url}${queryString}${hash}`;
    };
    exports.pick = (input, filter, options) => {
      options = Object.assign(
        { parseFragmentIdentifier: true, [encodeFragmentIdentifier]: false },
        options
      );
      const { url, query, fragmentIdentifier } = exports.parseUrl(
        input,
        options
      );
      return exports.stringifyUrl(
        {
          url: url,
          query: filterObject(query, filter),
          fragmentIdentifier: fragmentIdentifier,
        },
        options
      );
    };
    exports.exclude = (input, filter, options) => {
      const exclusionFilter = Array.isArray(filter)
        ? (key) => !filter.includes(key)
        : (key, value) => !filter(key, value);
      return exports.pick(input, exclusionFilter, options);
    };
  },
  function (module, exports) {
    "use strict";
    module.exports = (str) =>
      encodeURIComponent(str).replace(
        /[!'()*]/g,
        (x) => `%${x.charCodeAt(0).toString(16).toUpperCase()}`
      );
  },
  function (module, exports) {
    "use strict";
    var token = "%[a-f0-9]{2}";
    var singleMatcher = new RegExp(token, "gi");
    var multiMatcher = new RegExp("(" + token + ")+", "gi");
    function decodeComponents(components, split) {
      try {
        return decodeURIComponent(components.join(""));
      } catch (err) {}
      if (components.length === 1) {
        return components;
      }
      split = split || 1;
      var left = components.slice(0, split);
      var right = components.slice(split);
      return Array.prototype.concat.call(
        [],
        decodeComponents(left),
        decodeComponents(right)
      );
    }
    function decode(input) {
      try {
        return decodeURIComponent(input);
      } catch (err) {
        var tokens = input.match(singleMatcher);
        for (var i = 1; i < tokens.length; i++) {
          input = decodeComponents(tokens, i).join("");
          tokens = input.match(singleMatcher);
        }
        return input;
      }
    }
    function customDecodeURIComponent(input) {
      var replaceMap = { "%FE%FF": "��", "%FF%FE": "��" };
      var match = multiMatcher.exec(input);
      while (match) {
        try {
          replaceMap[match[0]] = decodeURIComponent(match[0]);
        } catch (err) {
          var result = decode(match[0]);
          if (result !== match[0]) {
            replaceMap[match[0]] = result;
          }
        }
        match = multiMatcher.exec(input);
      }
      replaceMap["%C2"] = "�";
      var entries = Object.keys(replaceMap);
      for (var i = 0; i < entries.length; i++) {
        var key = entries[i];
        input = input.replace(new RegExp(key, "g"), replaceMap[key]);
      }
      return input;
    }
    module.exports = function (encodedURI) {
      if (typeof encodedURI !== "string") {
        throw new TypeError(
          "Expected `encodedURI` to be of type `string`, got `" +
            typeof encodedURI +
            "`"
        );
      }
      try {
        encodedURI = encodedURI.replace(/\+/g, " ");
        return decodeURIComponent(encodedURI);
      } catch (err) {
        return customDecodeURIComponent(encodedURI);
      }
    };
  },
  function (module, exports) {
    "use strict";
    module.exports = (string, separator) => {
      if (!(typeof string === "string" && typeof separator === "string")) {
        throw new TypeError("Expected the arguments to be of type `string`");
      }
      if (separator === "") {
        return [string];
      }
      const separatorIndex = string.indexOf(separator);
      if (separatorIndex === -1) {
        return [string];
      }
      return [
        string.slice(0, separatorIndex),
        string.slice(separatorIndex + separator.length),
      ];
    };
  },
  function (module, exports) {
    "use strict";
    module.exports = function (obj, predicate) {
      var ret = {};
      var keys = Object.keys(obj);
      var isArr = Array.isArray(predicate);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var val = obj[key];
        if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
          ret[key] = val;
        }
      }
      return ret;
    };
  },
  function (module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = void 0;
    var _debug = _interopRequireDefault(__webpack_require__(32));
    var _constants = __webpack_require__(36);
    var _SchemasHelper = __webpack_require__(37);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var debug = (0, _debug.default)("widget-analytics:provider");
    var GA = "GA";
    var GTAG = "GTAG";
    var CUSTOM_HANDLER_EVENT = "__bzAnalyticsOnEvent";
    var CUSTOM_HANDLER_PAGEVIEW = "__bzAnalyticsOnPageview";
    var WidgetAnalyticsProvider = (function () {
      function WidgetAnalyticsProvider(_ref) {
        var _this = this;
        var window = _ref.window;
        _classCallCheck(this, WidgetAnalyticsProvider);
        _defineProperty(this, "onMessage", function (event) {
          var source = event.source,
            _event$data = event.data;
          _event$data = _event$data === void 0 ? {} : _event$data;
          var type = _event$data.type,
            _event$data$meta = _event$data.meta;
          _event$data$meta =
            _event$data$meta === void 0 ? {} : _event$data$meta;
          var id = _event$data$meta.id,
            payload = _event$data.payload;
          var respond = function respond(success) {
            _this.sendAcknowledge({ source: source, id: id, success: success });
          };
          switch (type) {
            case _constants.MESSAGE_TYPE_ANALYTICS_EVENT: {
              debug("received event", payload);
              var result = _this.handleAnalyticsEvent(payload);
              respond(result);
              break;
            }
            case _constants.MESSAGE_TYPE_ANALYTICS_GTM_DATA: {
              debug("received GTM data", payload);
              var _result = _this.handleGTMData(payload);
              respond(_result);
              break;
            }
            case _constants.MESSAGE_TYPE_ANALYTICS_PAGEVIEW: {
              debug("received pageview", payload);
              var _result2 = _this.handleAnalyticsPageView(payload);
              respond(_result2);
              break;
            }
            case _constants.MESSAGE_TYPE_SNOWPLOW_EVENT: {
              debug("received snowplow", payload);
              var _result3 = _this.handleSnowplowEvent(payload);
              respond(_result3);
              break;
            }
            default:
              break;
          }
        });
        this.options = { window: window };
        this.options.window.addEventListener("message", this.onMessage);
      }
      _createClass(WidgetAnalyticsProvider, [
        { key: "setOnMessage", value: function setOnMessage() {} },
        {
          key: "sendAcknowledge",
          value: function sendAcknowledge(_ref2) {
            var source = _ref2.source,
              id = _ref2.id,
              success = _ref2.success;
            debug("sending acknowledge", {
              source: source,
              id: id,
              success: success,
            });
            var message = {
              type: _constants.MESSAGE_TYPE_ANALYTICS_ACKNOWLEDGE,
              payload: { success: success },
              meta: { id: id },
            };
            source.postMessage(message, "*");
          },
        },
        {
          key: "detectGoogleClient",
          value: function detectGoogleClient() {
            var w = this.options.window;
            if (typeof w.gtag === "function") {
              return GTAG;
            }
            if (typeof w.ga === "function") {
              return GA;
            }
          },
        },
        {
          key: "handleAnalyticsEvent",
          value: function handleAnalyticsEvent(_ref3) {
            var category = _ref3.category,
              action = _ref3.action,
              label = _ref3.label,
              value = _ref3.value;
            var w = this.options.window;
            if (typeof w[CUSTOM_HANDLER_EVENT] === "function") {
              var data = {
                hitType: "event",
                eventCategory: category,
                eventAction: action,
                eventLabel: label,
                eventValue: value,
              };
              debug("sending event using ".concat(CUSTOM_HANDLER_EVENT), data);
              try {
                w[CUSTOM_HANDLER_EVENT](data);
                return true;
              } catch (e) {
                return false;
              }
            }
            switch (this.detectGoogleClient()) {
              case GA: {
                var _data = {
                  hitType: "event",
                  eventCategory: category,
                  eventAction: action,
                  eventLabel: label,
                  eventValue: value,
                };
                var checkAvailableClientTrackers =
                  function checkAvailableClientTrackers() {
                    var trackers = (w.ga && w.ga.getAll()) || [];
                    var clientTrackers = trackers.filter(function (tracker) {
                      return tracker.get("name") === "clientTracker";
                    });
                    return !!clientTrackers.length;
                  };
                if (!checkAvailableClientTrackers()) {
                  return false;
                }
                debug("sending event using GA", _data);
                w.ga("send", _data);
                w.ga("clientTracker.send", _data);
                return true;
              }
              case GTAG: {
                var _data2 = {
                  event_category: category,
                  event_label: label,
                  value: value,
                };
                debug("sending event using GTAG", action, _data2);
                w.gtag("event", action, _data2);
                return true;
              }
              default:
                return false;
            }
          },
        },
        {
          key: "handleGTMData",
          value: function handleGTMData(_ref4) {
            var dataLayerObject = _ref4.dataLayerObject;
            debug("sending GTM data", dataLayerObject);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(dataLayerObject);
          },
        },
        {
          key: "handleAnalyticsPageView",
          value: function handleAnalyticsPageView(_ref5) {
            var page = _ref5.page;
            var w = this.options.window;
            if (typeof w[CUSTOM_HANDLER_PAGEVIEW] === "function") {
              try {
                var data = { hitType: "pageview", page: page };
                debug(
                  "sending pageview using ".concat(CUSTOM_HANDLER_PAGEVIEW),
                  data
                );
                w[CUSTOM_HANDLER_PAGEVIEW](data);
                return true;
              } catch (e) {
                return false;
              }
            }
            switch (this.detectGoogleClient()) {
              case GA: {
                var _data3 = { hitType: "pageview", page: page };
                debug("sending pageview using GA", _data3);
                w.ga("send", _data3);
                w.ga("clientTracker.send", _data3);
                return true;
              }
              case GTAG: {
                debug("sending pageview using GTAG is not implemented");
                return false;
              }
              default:
                return false;
            }
          },
        },
        {
          key: "handleSnowplowEvent",
          value: function handleSnowplowEvent(payload) {
            var _window$BizzaboSnowpl, _window$BizzaboSnowpl2;
            var eventEntity = {};
            if (payload.type === "BUTTON_CLICK") {
              eventEntity = (0, _SchemasHelper.getClickEventEntity)(
                payload.eventData
              );
            }
            if (payload.type === "SYSTEM_INFO") {
              eventEntity = (0, _SchemasHelper.getSystemInfoEventEntity)(
                payload.eventData
              );
            }
            (_window$BizzaboSnowpl = window.BizzaboSnowplowTracker) === null ||
            _window$BizzaboSnowpl === void 0
              ? void 0
              : (_window$BizzaboSnowpl2 =
                  _window$BizzaboSnowpl.trackSelfDescribingEvent) === null ||
                _window$BizzaboSnowpl2 === void 0
              ? void 0
              : _window$BizzaboSnowpl2.call(_window$BizzaboSnowpl, eventEntity);
            return true;
          },
        },
      ]);
      return WidgetAnalyticsProvider;
    })();
    exports.default = WidgetAnalyticsProvider;
  },
  function (module, exports, __webpack_require__) {
    (function (process) {
      "use strict";
      function _typeof(obj) {
        if (
          typeof Symbol === "function" &&
          typeof Symbol.iterator === "symbol"
        ) {
          _typeof = function _typeof(obj) {
            return typeof obj;
          };
        } else {
          _typeof = function _typeof(obj) {
            return obj &&
              typeof Symbol === "function" &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          };
        }
        return _typeof(obj);
      }
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33",
      ];
      function useColors() {
        if (
          typeof window !== "undefined" &&
          window.process &&
          (window.process.type === "renderer" || window.process.__nwjs)
        ) {
          return true;
        }
        if (
          typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
        ) {
          return false;
        }
        return (
          (typeof document !== "undefined" &&
            document.documentElement &&
            document.documentElement.style &&
            document.documentElement.style.WebkitAppearance) ||
          (typeof window !== "undefined" &&
            window.console &&
            (window.console.firebug ||
              (window.console.exception && window.console.table))) ||
          (typeof navigator !== "undefined" &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
            parseInt(RegExp.$1, 10) >= 31) ||
          (typeof navigator !== "undefined" &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        );
      }
      function formatArgs(args) {
        args[0] =
          (this.useColors ? "%c" : "") +
          this.namespace +
          (this.useColors ? " %c" : " ") +
          args[0] +
          (this.useColors ? "%c " : " ") +
          "+" +
          module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        var c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        var index = 0;
        var lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, function (match) {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      function log() {
        var _console;
        return (
          (typeof console === "undefined" ? "undefined" : _typeof(console)) ===
            "object" &&
          console.log &&
          (_console = console).log.apply(_console, arguments)
        );
      }
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error) {}
      }
      function load() {
        var r;
        try {
          r = exports.storage.getItem("debug");
        } catch (error) {}
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = { NODE_ENV: "development" }.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {}
      }
      module.exports = __webpack_require__(34)(exports);
      var formatters = module.exports.formatters;
      formatters.j = function (v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }).call(exports, __webpack_require__(33));
  },
  function (module, exports) {
    var process = (module.exports = {});
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function () {
      try {
        if (typeof setTimeout === "function") {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === "function") {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
      }
      if (
        (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
        setTimeout
      ) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
      }
      if (
        (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
        clearTimeout
      ) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }
    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function (name) {
      return [];
    };
    process.binding = function (name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function () {
      return "/";
    };
    process.chdir = function (dir) {
      throw new Error("process.chdir is not supported");
    };
    process.umask = function () {
      return 0;
    };
  },
  function (module, exports, __webpack_require__) {
    "use strict";
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = __webpack_require__(35);
      Object.keys(env).forEach(function (key) {
        createDebug[key] = env[key];
      });
      createDebug.instances = [];
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        var hash = 0;
        for (var i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        var prevTime;
        function debug() {
          if (!debug.enabled) {
            return;
          }
          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key];
          }
          var self = debug;
          var curr = Number(new Date());
          var ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          var index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
            if (match === "%%") {
              return match;
            }
            index++;
            var formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              var val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          var logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.enabled = createDebug.enabled(namespace);
        debug.useColors = createDebug.useColors();
        debug.color = selectColor(namespace);
        debug.destroy = destroy;
        debug.extend = extend;
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        createDebug.instances.push(debug);
        return debug;
      }
      function destroy() {
        var index = createDebug.instances.indexOf(this);
        if (index !== -1) {
          createDebug.instances.splice(index, 1);
          return true;
        }
        return false;
      }
      function extend(namespace, delimiter) {
        return createDebug(
          this.namespace +
            (typeof delimiter === "undefined" ? ":" : delimiter) +
            namespace
        );
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.names = [];
        createDebug.skips = [];
        var i;
        var split = (typeof namespaces === "string" ? namespaces : "").split(
          /[\s,]+/
        );
        var len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(
              new RegExp("^" + namespaces.substr(1) + "$")
            );
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
        for (i = 0; i < createDebug.instances.length; i++) {
          var instance = createDebug.instances[i];
          instance.enabled = createDebug.enabled(instance.namespace);
        }
      }
      function disable() {
        createDebug.enable("");
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        var i;
        var len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  },
  function (module, exports) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function (val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" +
          JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return undefined;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  },
  function (module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MESSAGE_TYPE_SNOWPLOW_EVENT =
      exports.MESSAGE_TYPE_ANALYTICS_ACKNOWLEDGE =
      exports.MESSAGE_TYPE_ANALYTICS_GTM_DATA =
      exports.MESSAGE_TYPE_ANALYTICS_PAGEVIEW =
      exports.MESSAGE_TYPE_ANALYTICS_EVENT =
        void 0;
    var MESSAGE_TYPE_ANALYTICS_EVENT = "bzsdk.analytics.event";
    exports.MESSAGE_TYPE_ANALYTICS_EVENT = MESSAGE_TYPE_ANALYTICS_EVENT;
    var MESSAGE_TYPE_ANALYTICS_PAGEVIEW = "bzsdk.analytics.pageview";
    exports.MESSAGE_TYPE_ANALYTICS_PAGEVIEW = MESSAGE_TYPE_ANALYTICS_PAGEVIEW;
    var MESSAGE_TYPE_ANALYTICS_GTM_DATA = "bzsdk.analytics.gtmData";
    exports.MESSAGE_TYPE_ANALYTICS_GTM_DATA = MESSAGE_TYPE_ANALYTICS_GTM_DATA;
    var MESSAGE_TYPE_ANALYTICS_ACKNOWLEDGE = "bzsdk.analytics.acknowledge";
    exports.MESSAGE_TYPE_ANALYTICS_ACKNOWLEDGE =
      MESSAGE_TYPE_ANALYTICS_ACKNOWLEDGE;
    var MESSAGE_TYPE_SNOWPLOW_EVENT = "bzsdk.analytics.snowplow";
    exports.MESSAGE_TYPE_SNOWPLOW_EVENT = MESSAGE_TYPE_SNOWPLOW_EVENT;
  },
  function (module, exports, __webpack_require__) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? "symbol"
            : typeof obj;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSystemInfoEventEntity =
      exports.getClickEventEntity =
      exports.getTicketEntity =
      exports.getSessionAttendanceEntity =
      exports.getSessionEventEntity =
      exports.getSessionEntity =
      exports.getAccountEntity =
      exports.getEventEntity =
      exports.getUserEntity =
        void 0;
    var schemaNames = _interopRequireWildcard(__webpack_require__(38));
    var _moment = _interopRequireDefault(__webpack_require__(39));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function") return null;
      var cache = new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (
        obj === null ||
        (_typeof(obj) !== "object" && typeof obj !== "function")
      ) {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor =
        Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor
            ? Object.getOwnPropertyDescriptor(obj, key)
            : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var getUserEntity = function getUserEntity(user) {
      var _user$id$toString,
        _user$id,
        _user$primaryEmail,
        _user$firstName,
        _user$lastName,
        _user$company;
      return {
        schema: schemaNames.userSchemaName,
        data: {
          id:
            (_user$id$toString =
              (_user$id = user.id) === null || _user$id === void 0
                ? void 0
                : _user$id.toString()) !== null && _user$id$toString !== void 0
              ? _user$id$toString
              : "0",
          email:
            (_user$primaryEmail = user.primaryEmail) !== null &&
            _user$primaryEmail !== void 0
              ? _user$primaryEmail
              : null,
          name_first:
            (_user$firstName = user.firstName) !== null &&
            _user$firstName !== void 0
              ? _user$firstName
              : null,
          name_last:
            (_user$lastName = user.lastName) !== null &&
            _user$lastName !== void 0
              ? _user$lastName
              : null,
          company_id: null,
          company_name:
            (_user$company = user.company) !== null && _user$company !== void 0
              ? _user$company
              : null,
          type: null,
          ticket_id: null,
        },
      };
    };
    exports.getUserEntity = getUserEntity;
    var getEventEntity = function getEventEntity(event) {
      return {
        schema: schemaNames.eventSchemaName,
        data: {
          id: event.id.toString(),
          name: event.name,
          created_epoch_date: event.created.toString(),
          local_start_date: event["local-start-date"],
          local_end_date: event["local-end-date"],
          time_zone: event["time-zone-id"],
          website_type: event.websiteType,
        },
      };
    };
    exports.getEventEntity = getEventEntity;
    var getAccountEntity = function getAccountEntity(event) {
      return {
        schema: schemaNames.accountSchemaName,
        data: { id: event["account-id"].toString(), name: null },
      };
    };
    exports.getAccountEntity = getAccountEntity;
    var getSessionEntity = function getSessionEntity(session) {
      var _session$title;
      return {
        schema: schemaNames.sessionSchemaName,
        data: {
          id: session.id.toString(),
          name:
            (_session$title = session.title) !== null &&
            _session$title !== void 0
              ? _session$title
              : "",
          is_virtual: session.enableVirtualSession ? 1 : 0,
          start_date_utc: "".concat(
            getTimeZoneDate(session.startDate, session.startMinute)
          ),
          end_date_utc: "".concat(
            getTimeZoneDate(session.endDate, session.endMinute)
          ),
        },
      };
    };
    exports.getSessionEntity = getSessionEntity;
    var getSessionEventEntity = function getSessionEventEntity() {
      return {
        schema: schemaNames.sessionEventSchemaName,
        data: { time_stamp: new Date().toISOString() },
      };
    };
    exports.getSessionEventEntity = getSessionEventEntity;
    var getSessionAttendanceEntity = function getSessionAttendanceEntity() {
      var status =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return {
        schema: schemaNames.sessionAttendanceSchemaName,
        data: { attendance_status: status },
      };
    };
    exports.getSessionAttendanceEntity = getSessionAttendanceEntity;
    var getTicketEntity = function getTicketEntity(data) {
      var _data$created;
      return {
        schema: schemaNames.ticketSchemaName,
        data: {
          id: data.id,
          created:
            (_data$created = data.created) === null || _data$created === void 0
              ? void 0
              : _data$created.toString(),
          ticket_type_id: data.ticketId,
          ticket_type_name: data.ticketName,
          order_id: data.orderId,
          validity: data.validity,
          charge_usd: data.chargeUsd,
          currency: data.currency,
        },
      };
    };
    exports.getTicketEntity = getTicketEntity;
    var getClickEventEntity = function getClickEventEntity(data) {
      return {
        schema: schemaNames.buttonClickSchemaName,
        data: {
          button_type: data.buttonType,
          sub_category: data.subCategory,
          pos_x: data.positionX,
          pos_y: data.positionY,
        },
      };
    };
    exports.getClickEventEntity = getClickEventEntity;
    var getSystemInfoEventEntity = function getSystemInfoEventEntity(data) {
      return {
        schema: schemaNames.systemInfoSchemaName,
        data: {
          sys_action_name: data.systemName,
          sys_action_description:
            (data === null || data === void 0
              ? void 0
              : data.actionDescription) || null,
        },
      };
    };
    exports.getSystemInfoEventEntity = getSystemInfoEventEntity;
    var DATE_FORMAT = "YYYY MM DD";
    var timeStampToDateString = function timeStampToDateString(date, timezone) {
      return (0, _moment.default)(date).tz(timezone).format(DATE_FORMAT);
    };
    var dateStringToUtcTimestamp = function dateStringToUtcTimestamp(
      stringDate
    ) {
      return _moment.default.tz(stringDate, DATE_FORMAT, "UTC");
    };
    var utcStart = function utcStart(date, timezone) {
      return timezone
        ? dateStringToUtcTimestamp(timeStampToDateString(date, timezone))
        : (0, _moment.default)(date).utc().startOf("day");
    };
    var getTimeZoneDate = function getTimeZoneDate(date, minutes, timeZone) {
      var startDate = utcStart(date);
      if (timeZone) {
        return _moment.default
          .tz(startDate.format("YYYY-MM-DD"), timeZone)
          .minutes(minutes);
      }
      return startDate.minutes(minutes);
    };
  },
  function (module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PROD_ENV =
      exports.systemInfoSchemaName =
      exports.buttonClickSchemaName =
      exports.ticketSchemaName =
      exports.sessionAttendanceSchemaName =
      exports.sessionEventSchemaName =
      exports.accountSchemaName =
      exports.sessionSchemaName =
      exports.eventSchemaName =
      exports.userSchemaName =
      exports.DEV_PREFIX =
      exports.SNOWPLOW_TRACKING =
        void 0;
    var SNOWPLOW_TRACKING = "snowplowTracking";
    exports.SNOWPLOW_TRACKING = SNOWPLOW_TRACKING;
    var DEV_PREFIX = "-test";
    exports.DEV_PREFIX = DEV_PREFIX;
    var userSchemaName = "iglu:com.bizzabo/user/jsonschema/1-0-4",
      eventSchemaName = "iglu:com.bizzabo/event/jsonschema/1-0-0",
      sessionSchemaName = "iglu:com.bizzabo/session/jsonschema/1-0-0",
      accountSchemaName = "iglu:com.bizzabo/account/jsonschema/1-0-1",
      sessionEventSchemaName = "iglu:com.bizzabo/session_ping/jsonschema/1-0-0",
      sessionAttendanceSchemaName =
        "iglu:com.bizzabo/session_attendance/jsonschema/1-0-0",
      ticketSchemaName = "iglu:com.bizzabo/ticket/jsonschema/1-0-0",
      buttonClickSchemaName = "iglu:com.bizzabo/button_click/jsonschema/1-0-2",
      systemInfoSchemaName = "iglu:com.bizzabo/system_info/jsonschema/1-0-0";
    exports.systemInfoSchemaName = systemInfoSchemaName;
    exports.buttonClickSchemaName = buttonClickSchemaName;
    exports.ticketSchemaName = ticketSchemaName;
    exports.sessionAttendanceSchemaName = sessionAttendanceSchemaName;
    exports.sessionEventSchemaName = sessionEventSchemaName;
    exports.accountSchemaName = accountSchemaName;
    exports.sessionSchemaName = sessionSchemaName;
    exports.eventSchemaName = eventSchemaName;
    exports.userSchemaName = userSchemaName;
    var PROD_ENV = "prod";
    exports.PROD_ENV = PROD_ENV;
  },
  function (module, exports, __webpack_require__) {
    var require;
    (function (module) {
      (function (global, factory) {
        true
          ? (module.exports = factory())
          : typeof define === "function" && define.amd
          ? define(factory)
          : (global.moment = factory());
      })(this, function () {
        "use strict";
        var hookCallback;
        function hooks() {
          return hookCallback.apply(null, arguments);
        }
        function setHookCallback(callback) {
          hookCallback = callback;
        }
        function isArray(input) {
          return (
            input instanceof Array ||
            Object.prototype.toString.call(input) === "[object Array]"
          );
        }
        function isObject(input) {
          return (
            input != null &&
            Object.prototype.toString.call(input) === "[object Object]"
          );
        }
        function hasOwnProp(a, b) {
          return Object.prototype.hasOwnProperty.call(a, b);
        }
        function isObjectEmpty(obj) {
          if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
          } else {
            var k;
            for (k in obj) {
              if (hasOwnProp(obj, k)) {
                return false;
              }
            }
            return true;
          }
        }
        function isUndefined(input) {
          return input === void 0;
        }
        function isNumber(input) {
          return (
            typeof input === "number" ||
            Object.prototype.toString.call(input) === "[object Number]"
          );
        }
        function isDate(input) {
          return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === "[object Date]"
          );
        }
        function map(arr, fn) {
          var res = [],
            i;
          for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
          }
          return res;
        }
        function extend(a, b) {
          for (var i in b) {
            if (hasOwnProp(b, i)) {
              a[i] = b[i];
            }
          }
          if (hasOwnProp(b, "toString")) {
            a.toString = b.toString;
          }
          if (hasOwnProp(b, "valueOf")) {
            a.valueOf = b.valueOf;
          }
          return a;
        }
        function createUTC(input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, true).utc();
        }
        function defaultParsingFlags() {
          return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false,
          };
        }
        function getParsingFlags(m) {
          if (m._pf == null) {
            m._pf = defaultParsingFlags();
          }
          return m._pf;
        }
        var some;
        if (Array.prototype.some) {
          some = Array.prototype.some;
        } else {
          some = function (fun) {
            var t = Object(this),
              len = t.length >>> 0,
              i;
            for (i = 0; i < len; i++) {
              if (i in t && fun.call(this, t[i], i, t)) {
                return true;
              }
            }
            return false;
          };
        }
        function isValid(m) {
          if (m._isValid == null) {
            var flags = getParsingFlags(m),
              parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
              }),
              isNowValid =
                !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidEra &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));
            if (m._strict) {
              isNowValid =
                isNowValid &&
                flags.charsLeftOver === 0 &&
                flags.unusedTokens.length === 0 &&
                flags.bigHour === undefined;
            }
            if (Object.isFrozen == null || !Object.isFrozen(m)) {
              m._isValid = isNowValid;
            } else {
              return isNowValid;
            }
          }
          return m._isValid;
        }
        function createInvalid(flags) {
          var m = createUTC(NaN);
          if (flags != null) {
            extend(getParsingFlags(m), flags);
          } else {
            getParsingFlags(m).userInvalidated = true;
          }
          return m;
        }
        var momentProperties = (hooks.momentProperties = []),
          updateInProgress = false;
        function copyConfig(to, from) {
          var i, prop, val;
          if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
          }
          if (!isUndefined(from._i)) {
            to._i = from._i;
          }
          if (!isUndefined(from._f)) {
            to._f = from._f;
          }
          if (!isUndefined(from._l)) {
            to._l = from._l;
          }
          if (!isUndefined(from._strict)) {
            to._strict = from._strict;
          }
          if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
          }
          if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
          }
          if (!isUndefined(from._offset)) {
            to._offset = from._offset;
          }
          if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
          }
          if (!isUndefined(from._locale)) {
            to._locale = from._locale;
          }
          if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
              prop = momentProperties[i];
              val = from[prop];
              if (!isUndefined(val)) {
                to[prop] = val;
              }
            }
          }
          return to;
        }
        function Moment(config) {
          copyConfig(this, config);
          this._d = new Date(config._d != null ? config._d.getTime() : NaN);
          if (!this.isValid()) {
            this._d = new Date(NaN);
          }
          if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
          }
        }
        function isMoment(obj) {
          return (
            obj instanceof Moment ||
            (obj != null && obj._isAMomentObject != null)
          );
        }
        function warn(msg) {
          if (
            hooks.suppressDeprecationWarnings === false &&
            typeof console !== "undefined" &&
            console.warn
          ) {
            console.warn("Deprecation warning: " + msg);
          }
        }
        function deprecate(msg, fn) {
          var firstTime = true;
          return extend(function () {
            if (hooks.deprecationHandler != null) {
              hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
              var args = [],
                arg,
                i,
                key;
              for (i = 0; i < arguments.length; i++) {
                arg = "";
                if (typeof arguments[i] === "object") {
                  arg += "\n[" + i + "] ";
                  for (key in arguments[0]) {
                    if (hasOwnProp(arguments[0], key)) {
                      arg += key + ": " + arguments[0][key] + ", ";
                    }
                  }
                  arg = arg.slice(0, -2);
                } else {
                  arg = arguments[i];
                }
                args.push(arg);
              }
              warn(
                msg +
                  "\nArguments: " +
                  Array.prototype.slice.call(args).join("") +
                  "\n" +
                  new Error().stack
              );
              firstTime = false;
            }
            return fn.apply(this, arguments);
          }, fn);
        }
        var deprecations = {};
        function deprecateSimple(name, msg) {
          if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
          }
          if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
          }
        }
        hooks.suppressDeprecationWarnings = false;
        hooks.deprecationHandler = null;
        function isFunction(input) {
          return (
            (typeof Function !== "undefined" && input instanceof Function) ||
            Object.prototype.toString.call(input) === "[object Function]"
          );
        }
        function set(config) {
          var prop, i;
          for (i in config) {
            if (hasOwnProp(config, i)) {
              prop = config[i];
              if (isFunction(prop)) {
                this[i] = prop;
              } else {
                this["_" + i] = prop;
              }
            }
          }
          this._config = config;
          this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
              "|" +
              /\d{1,2}/.source
          );
        }
        function mergeConfigs(parentConfig, childConfig) {
          var res = extend({}, parentConfig),
            prop;
          for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
              if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                res[prop] = {};
                extend(res[prop], parentConfig[prop]);
                extend(res[prop], childConfig[prop]);
              } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
              } else {
                delete res[prop];
              }
            }
          }
          for (prop in parentConfig) {
            if (
              hasOwnProp(parentConfig, prop) &&
              !hasOwnProp(childConfig, prop) &&
              isObject(parentConfig[prop])
            ) {
              res[prop] = extend({}, res[prop]);
            }
          }
          return res;
        }
        function Locale(config) {
          if (config != null) {
            this.set(config);
          }
        }
        var keys;
        if (Object.keys) {
          keys = Object.keys;
        } else {
          keys = function (obj) {
            var i,
              res = [];
            for (i in obj) {
              if (hasOwnProp(obj, i)) {
                res.push(i);
              }
            }
            return res;
          };
        }
        var defaultCalendar = {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L",
        };
        function calendar(key, mom, now) {
          var output = this._calendar[key] || this._calendar["sameElse"];
          return isFunction(output) ? output.call(mom, now) : output;
        }
        function zeroFill(number, targetLength, forceSign) {
          var absNumber = "" + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
          return (
            (sign ? (forceSign ? "+" : "") : "-") +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
            absNumber
          );
        }
        var formattingTokens =
            /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
          localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
          formatFunctions = {},
          formatTokenFunctions = {};
        function addFormatToken(token, padded, ordinal, callback) {
          var func = callback;
          if (typeof callback === "string") {
            func = function () {
              return this[callback]();
            };
          }
          if (token) {
            formatTokenFunctions[token] = func;
          }
          if (padded) {
            formatTokenFunctions[padded[0]] = function () {
              return zeroFill(
                func.apply(this, arguments),
                padded[1],
                padded[2]
              );
            };
          }
          if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
              return this.localeData().ordinal(
                func.apply(this, arguments),
                token
              );
            };
          }
        }
        function removeFormattingTokens(input) {
          if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
          }
          return input.replace(/\\/g, "");
        }
        function makeFormatFunction(format) {
          var array = format.match(formattingTokens),
            i,
            length;
          for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
              array[i] = formatTokenFunctions[array[i]];
            } else {
              array[i] = removeFormattingTokens(array[i]);
            }
          }
          return function (mom) {
            var output = "",
              i;
            for (i = 0; i < length; i++) {
              output += isFunction(array[i])
                ? array[i].call(mom, format)
                : array[i];
            }
            return output;
          };
        }
        function formatMoment(m, format) {
          if (!m.isValid()) {
            return m.localeData().invalidDate();
          }
          format = expandFormat(format, m.localeData());
          formatFunctions[format] =
            formatFunctions[format] || makeFormatFunction(format);
          return formatFunctions[format](m);
        }
        function expandFormat(format, locale) {
          var i = 5;
          function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
          }
          localFormattingTokens.lastIndex = 0;
          while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(
              localFormattingTokens,
              replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
          }
          return format;
        }
        var defaultLongDateFormat = {
          LTS: "h:mm:ss A",
          LT: "h:mm A",
          L: "MM/DD/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A",
        };
        function longDateFormat(key) {
          var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];
          if (format || !formatUpper) {
            return format;
          }
          this._longDateFormat[key] = formatUpper
            .match(formattingTokens)
            .map(function (tok) {
              if (
                tok === "MMMM" ||
                tok === "MM" ||
                tok === "DD" ||
                tok === "dddd"
              ) {
                return tok.slice(1);
              }
              return tok;
            })
            .join("");
          return this._longDateFormat[key];
        }
        var defaultInvalidDate = "Invalid date";
        function invalidDate() {
          return this._invalidDate;
        }
        var defaultOrdinal = "%d",
          defaultDayOfMonthOrdinalParse = /\d{1,2}/;
        function ordinal(number) {
          return this._ordinal.replace("%d", number);
        }
        var defaultRelativeTime = {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          w: "a week",
          ww: "%d weeks",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        };
        function relativeTime(number, withoutSuffix, string, isFuture) {
          var output = this._relativeTime[string];
          return isFunction(output)
            ? output(number, withoutSuffix, string, isFuture)
            : output.replace(/%d/i, number);
        }
        function pastFuture(diff, output) {
          var format = this._relativeTime[diff > 0 ? "future" : "past"];
          return isFunction(format)
            ? format(output)
            : format.replace(/%s/i, output);
        }
        var aliases = {};
        function addUnitAlias(unit, shorthand) {
          var lowerCase = unit.toLowerCase();
          aliases[lowerCase] =
            aliases[lowerCase + "s"] =
            aliases[shorthand] =
              unit;
        }
        function normalizeUnits(units) {
          return typeof units === "string"
            ? aliases[units] || aliases[units.toLowerCase()]
            : undefined;
        }
        function normalizeObjectUnits(inputObject) {
          var normalizedInput = {},
            normalizedProp,
            prop;
          for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
              normalizedProp = normalizeUnits(prop);
              if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
              }
            }
          }
          return normalizedInput;
        }
        var priorities = {};
        function addUnitPriority(unit, priority) {
          priorities[unit] = priority;
        }
        function getPrioritizedUnits(unitsObj) {
          var units = [],
            u;
          for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
              units.push({ unit: u, priority: priorities[u] });
            }
          }
          units.sort(function (a, b) {
            return a.priority - b.priority;
          });
          return units;
        }
        function isLeapYear(year) {
          return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        }
        function absFloor(number) {
          if (number < 0) {
            return Math.ceil(number) || 0;
          } else {
            return Math.floor(number);
          }
        }
        function toInt(argumentForCoercion) {
          var coercedNumber = +argumentForCoercion,
            value = 0;
          if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
          }
          return value;
        }
        function makeGetSet(unit, keepTime) {
          return function (value) {
            if (value != null) {
              set$1(this, unit, value);
              hooks.updateOffset(this, keepTime);
              return this;
            } else {
              return get(this, unit);
            }
          };
        }
        function get(mom, unit) {
          return mom.isValid()
            ? mom._d["get" + (mom._isUTC ? "UTC" : "") + unit]()
            : NaN;
        }
        function set$1(mom, unit, value) {
          if (mom.isValid() && !isNaN(value)) {
            if (
              unit === "FullYear" &&
              isLeapYear(mom.year()) &&
              mom.month() === 1 &&
              mom.date() === 29
            ) {
              value = toInt(value);
              mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](
                value,
                mom.month(),
                daysInMonth(value, mom.month())
              );
            } else {
              mom._d["set" + (mom._isUTC ? "UTC" : "") + unit](value);
            }
          }
        }
        function stringGet(units) {
          units = normalizeUnits(units);
          if (isFunction(this[units])) {
            return this[units]();
          }
          return this;
        }
        function stringSet(units, value) {
          if (typeof units === "object") {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units),
              i;
            for (i = 0; i < prioritized.length; i++) {
              this[prioritized[i].unit](units[prioritized[i].unit]);
            }
          } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
              return this[units](value);
            }
          }
          return this;
        }
        var match1 = /\d/,
          match2 = /\d\d/,
          match3 = /\d{3}/,
          match4 = /\d{4}/,
          match6 = /[+-]?\d{6}/,
          match1to2 = /\d\d?/,
          match3to4 = /\d\d\d\d?/,
          match5to6 = /\d\d\d\d\d\d?/,
          match1to3 = /\d{1,3}/,
          match1to4 = /\d{1,4}/,
          match1to6 = /[+-]?\d{1,6}/,
          matchUnsigned = /\d+/,
          matchSigned = /[+-]?\d+/,
          matchOffset = /Z|[+-]\d\d:?\d\d/gi,
          matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi,
          matchTimestamp = /[+-]?\d+(\.\d{1,3})?/,
          matchWord =
            /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
          regexes;
        regexes = {};
        function addRegexToken(token, regex, strictRegex) {
          regexes[token] = isFunction(regex)
            ? regex
            : function (isStrict, localeData) {
                return isStrict && strictRegex ? strictRegex : regex;
              };
        }
        function getParseRegexForToken(token, config) {
          if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
          }
          return regexes[token](config._strict, config._locale);
        }
        function unescapeFormat(s) {
          return regexEscape(
            s
              .replace("\\", "")
              .replace(
                /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                function (matched, p1, p2, p3, p4) {
                  return p1 || p2 || p3 || p4;
                }
              )
          );
        }
        function regexEscape(s) {
          return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        var tokens = {};
        function addParseToken(token, callback) {
          var i,
            func = callback;
          if (typeof token === "string") {
            token = [token];
          }
          if (isNumber(callback)) {
            func = function (input, array) {
              array[callback] = toInt(input);
            };
          }
          for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
          }
        }
        function addWeekParseToken(token, callback) {
          addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
          });
        }
        function addTimeToArrayFromToken(token, input, config) {
          if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
          }
        }
        var YEAR = 0,
          MONTH = 1,
          DATE = 2,
          HOUR = 3,
          MINUTE = 4,
          SECOND = 5,
          MILLISECOND = 6,
          WEEK = 7,
          WEEKDAY = 8;
        function mod(n, x) {
          return ((n % x) + x) % x;
        }
        var indexOf;
        if (Array.prototype.indexOf) {
          indexOf = Array.prototype.indexOf;
        } else {
          indexOf = function (o) {
            var i;
            for (i = 0; i < this.length; ++i) {
              if (this[i] === o) {
                return i;
              }
            }
            return -1;
          };
        }
        function daysInMonth(year, month) {
          if (isNaN(year) || isNaN(month)) {
            return NaN;
          }
          var modMonth = mod(month, 12);
          year += (month - modMonth) / 12;
          return modMonth === 1
            ? isLeapYear(year)
              ? 29
              : 28
            : 31 - ((modMonth % 7) % 2);
        }
        addFormatToken("M", ["MM", 2], "Mo", function () {
          return this.month() + 1;
        });
        addFormatToken("MMM", 0, 0, function (format) {
          return this.localeData().monthsShort(this, format);
        });
        addFormatToken("MMMM", 0, 0, function (format) {
          return this.localeData().months(this, format);
        });
        addUnitAlias("month", "M");
        addUnitPriority("month", 8);
        addRegexToken("M", match1to2);
        addRegexToken("MM", match1to2, match2);
        addRegexToken("MMM", function (isStrict, locale) {
          return locale.monthsShortRegex(isStrict);
        });
        addRegexToken("MMMM", function (isStrict, locale) {
          return locale.monthsRegex(isStrict);
        });
        addParseToken(["M", "MM"], function (input, array) {
          array[MONTH] = toInt(input) - 1;
        });
        addParseToken(["MMM", "MMMM"], function (input, array, config, token) {
          var month = config._locale.monthsParse(input, token, config._strict);
          if (month != null) {
            array[MONTH] = month;
          } else {
            getParsingFlags(config).invalidMonth = input;
          }
        });
        var defaultLocaleMonths =
            "January_February_March_April_May_June_July_August_September_October_November_December".split(
              "_"
            ),
          defaultLocaleMonthsShort =
            "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
          MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
          defaultMonthsShortRegex = matchWord,
          defaultMonthsRegex = matchWord;
        function localeMonths(m, format) {
          if (!m) {
            return isArray(this._months)
              ? this._months
              : this._months["standalone"];
          }
          return isArray(this._months)
            ? this._months[m.month()]
            : this._months[
                (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                  ? "format"
                  : "standalone"
              ][m.month()];
        }
        function localeMonthsShort(m, format) {
          if (!m) {
            return isArray(this._monthsShort)
              ? this._monthsShort
              : this._monthsShort["standalone"];
          }
          return isArray(this._monthsShort)
            ? this._monthsShort[m.month()]
            : this._monthsShort[
                MONTHS_IN_FORMAT.test(format) ? "format" : "standalone"
              ][m.month()];
        }
        function handleStrictParse(monthName, format, strict) {
          var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
              mom = createUTC([2e3, i]);
              this._shortMonthsParse[i] = this.monthsShort(
                mom,
                ""
              ).toLocaleLowerCase();
              this._longMonthsParse[i] = this.months(
                mom,
                ""
              ).toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format === "MMM") {
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format === "MMM") {
              ii = indexOf.call(this._shortMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._longMonthsParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._longMonthsParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortMonthsParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeMonthsParse(monthName, format, strict) {
          var i, mom, regex;
          if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
          }
          if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
          }
          for (i = 0; i < 12; i++) {
            mom = createUTC([2e3, i]);
            if (strict && !this._longMonthsParse[i]) {
              this._longMonthsParse[i] = new RegExp(
                "^" + this.months(mom, "").replace(".", "") + "$",
                "i"
              );
              this._shortMonthsParse[i] = new RegExp(
                "^" + this.monthsShort(mom, "").replace(".", "") + "$",
                "i"
              );
            }
            if (!strict && !this._monthsParse[i]) {
              regex =
                "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
              this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            if (
              strict &&
              format === "MMMM" &&
              this._longMonthsParse[i].test(monthName)
            ) {
              return i;
            } else if (
              strict &&
              format === "MMM" &&
              this._shortMonthsParse[i].test(monthName)
            ) {
              return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
              return i;
            }
          }
        }
        function setMonth(mom, value) {
          var dayOfMonth;
          if (!mom.isValid()) {
            return mom;
          }
          if (typeof value === "string") {
            if (/^\d+$/.test(value)) {
              value = toInt(value);
            } else {
              value = mom.localeData().monthsParse(value);
              if (!isNumber(value)) {
                return mom;
              }
            }
          }
          dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
          mom._d["set" + (mom._isUTC ? "UTC" : "") + "Month"](
            value,
            dayOfMonth
          );
          return mom;
        }
        function getSetMonth(value) {
          if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
          } else {
            return get(this, "Month");
          }
        }
        function getDaysInMonth() {
          return daysInMonth(this.year(), this.month());
        }
        function monthsShortRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsShortStrictRegex;
            } else {
              return this._monthsShortRegex;
            }
          } else {
            if (!hasOwnProp(this, "_monthsShortRegex")) {
              this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict
              ? this._monthsShortStrictRegex
              : this._monthsShortRegex;
          }
        }
        function monthsRegex(isStrict) {
          if (this._monthsParseExact) {
            if (!hasOwnProp(this, "_monthsRegex")) {
              computeMonthsParse.call(this);
            }
            if (isStrict) {
              return this._monthsStrictRegex;
            } else {
              return this._monthsRegex;
            }
          } else {
            if (!hasOwnProp(this, "_monthsRegex")) {
              this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict
              ? this._monthsStrictRegex
              : this._monthsRegex;
          }
        }
        function computeMonthsParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
          for (i = 0; i < 12; i++) {
            mom = createUTC([2e3, i]);
            shortPieces.push(this.monthsShort(mom, ""));
            longPieces.push(this.months(mom, ""));
            mixedPieces.push(this.months(mom, ""));
            mixedPieces.push(this.monthsShort(mom, ""));
          }
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
          }
          for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
          }
          this._monthsRegex = new RegExp(
            "^(" + mixedPieces.join("|") + ")",
            "i"
          );
          this._monthsShortRegex = this._monthsRegex;
          this._monthsStrictRegex = new RegExp(
            "^(" + longPieces.join("|") + ")",
            "i"
          );
          this._monthsShortStrictRegex = new RegExp(
            "^(" + shortPieces.join("|") + ")",
            "i"
          );
        }
        addFormatToken("Y", 0, 0, function () {
          var y = this.year();
          return y <= 9999 ? zeroFill(y, 4) : "+" + y;
        });
        addFormatToken(0, ["YY", 2], 0, function () {
          return this.year() % 100;
        });
        addFormatToken(0, ["YYYY", 4], 0, "year");
        addFormatToken(0, ["YYYYY", 5], 0, "year");
        addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
        addUnitAlias("year", "y");
        addUnitPriority("year", 1);
        addRegexToken("Y", matchSigned);
        addRegexToken("YY", match1to2, match2);
        addRegexToken("YYYY", match1to4, match4);
        addRegexToken("YYYYY", match1to6, match6);
        addRegexToken("YYYYYY", match1to6, match6);
        addParseToken(["YYYYY", "YYYYYY"], YEAR);
        addParseToken("YYYY", function (input, array) {
          array[YEAR] =
            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
        });
        addParseToken("YY", function (input, array) {
          array[YEAR] = hooks.parseTwoDigitYear(input);
        });
        addParseToken("Y", function (input, array) {
          array[YEAR] = parseInt(input, 10);
        });
        function daysInYear(year) {
          return isLeapYear(year) ? 366 : 365;
        }
        hooks.parseTwoDigitYear = function (input) {
          return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
        };
        var getSetYear = makeGetSet("FullYear", true);
        function getIsLeapYear() {
          return isLeapYear(this.year());
        }
        function createDate(y, m, d, h, M, s, ms) {
          var date;
          if (y < 100 && y >= 0) {
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
              date.setFullYear(y);
            }
          } else {
            date = new Date(y, m, d, h, M, s, ms);
          }
          return date;
        }
        function createUTCDate(y) {
          var date, args;
          if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
              date.setUTCFullYear(y);
            }
          } else {
            date = new Date(Date.UTC.apply(null, arguments));
          }
          return date;
        }
        function firstWeekOffset(year, dow, doy) {
          var fwd = 7 + dow - doy,
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
          return -fwdlw + fwd - 1;
        }
        function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
          var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;
          if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
          } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
          } else {
            resYear = year;
            resDayOfYear = dayOfYear;
          }
          return { year: resYear, dayOfYear: resDayOfYear };
        }
        function weekOfYear(mom, dow, doy) {
          var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;
          if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
          } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
          } else {
            resYear = mom.year();
            resWeek = week;
          }
          return { week: resWeek, year: resYear };
        }
        function weeksInYear(year, dow, doy) {
          var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
          return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
        }
        addFormatToken("w", ["ww", 2], "wo", "week");
        addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
        addUnitAlias("week", "w");
        addUnitAlias("isoWeek", "W");
        addUnitPriority("week", 5);
        addUnitPriority("isoWeek", 5);
        addRegexToken("w", match1to2);
        addRegexToken("ww", match1to2, match2);
        addRegexToken("W", match1to2);
        addRegexToken("WW", match1to2, match2);
        addWeekParseToken(
          ["w", "ww", "W", "WW"],
          function (input, week, config, token) {
            week[token.substr(0, 1)] = toInt(input);
          }
        );
        function localeWeek(mom) {
          return weekOfYear(mom, this._week.dow, this._week.doy).week;
        }
        var defaultLocaleWeek = { dow: 0, doy: 6 };
        function localeFirstDayOfWeek() {
          return this._week.dow;
        }
        function localeFirstDayOfYear() {
          return this._week.doy;
        }
        function getSetWeek(input) {
          var week = this.localeData().week(this);
          return input == null ? week : this.add((input - week) * 7, "d");
        }
        function getSetISOWeek(input) {
          var week = weekOfYear(this, 1, 4).week;
          return input == null ? week : this.add((input - week) * 7, "d");
        }
        addFormatToken("d", 0, "do", "day");
        addFormatToken("dd", 0, 0, function (format) {
          return this.localeData().weekdaysMin(this, format);
        });
        addFormatToken("ddd", 0, 0, function (format) {
          return this.localeData().weekdaysShort(this, format);
        });
        addFormatToken("dddd", 0, 0, function (format) {
          return this.localeData().weekdays(this, format);
        });
        addFormatToken("e", 0, 0, "weekday");
        addFormatToken("E", 0, 0, "isoWeekday");
        addUnitAlias("day", "d");
        addUnitAlias("weekday", "e");
        addUnitAlias("isoWeekday", "E");
        addUnitPriority("day", 11);
        addUnitPriority("weekday", 11);
        addUnitPriority("isoWeekday", 11);
        addRegexToken("d", match1to2);
        addRegexToken("e", match1to2);
        addRegexToken("E", match1to2);
        addRegexToken("dd", function (isStrict, locale) {
          return locale.weekdaysMinRegex(isStrict);
        });
        addRegexToken("ddd", function (isStrict, locale) {
          return locale.weekdaysShortRegex(isStrict);
        });
        addRegexToken("dddd", function (isStrict, locale) {
          return locale.weekdaysRegex(isStrict);
        });
        addWeekParseToken(
          ["dd", "ddd", "dddd"],
          function (input, week, config, token) {
            var weekday = config._locale.weekdaysParse(
              input,
              token,
              config._strict
            );
            if (weekday != null) {
              week.d = weekday;
            } else {
              getParsingFlags(config).invalidWeekday = input;
            }
          }
        );
        addWeekParseToken(
          ["d", "e", "E"],
          function (input, week, config, token) {
            week[token] = toInt(input);
          }
        );
        function parseWeekday(input, locale) {
          if (typeof input !== "string") {
            return input;
          }
          if (!isNaN(input)) {
            return parseInt(input, 10);
          }
          input = locale.weekdaysParse(input);
          if (typeof input === "number") {
            return input;
          }
          return null;
        }
        function parseIsoWeekday(input, locale) {
          if (typeof input === "string") {
            return locale.weekdaysParse(input) % 7 || 7;
          }
          return isNaN(input) ? null : input;
        }
        function shiftWeekdays(ws, n) {
          return ws.slice(n, 7).concat(ws.slice(0, n));
        }
        var defaultLocaleWeekdays =
            "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
              "_"
            ),
          defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
          defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
          defaultWeekdaysRegex = matchWord,
          defaultWeekdaysShortRegex = matchWord,
          defaultWeekdaysMinRegex = matchWord;
        function localeWeekdays(m, format) {
          var weekdays = isArray(this._weekdays)
            ? this._weekdays
            : this._weekdays[
                m && m !== true && this._weekdays.isFormat.test(format)
                  ? "format"
                  : "standalone"
              ];
          return m === true
            ? shiftWeekdays(weekdays, this._week.dow)
            : m
            ? weekdays[m.day()]
            : weekdays;
        }
        function localeWeekdaysShort(m) {
          return m === true
            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort[m.day()]
            : this._weekdaysShort;
        }
        function localeWeekdaysMin(m) {
          return m === true
            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin[m.day()]
            : this._weekdaysMin;
        }
        function handleStrictParse$1(weekdayName, format, strict) {
          var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];
            for (i = 0; i < 7; ++i) {
              mom = createUTC([2e3, 1]).day(i);
              this._minWeekdaysParse[i] = this.weekdaysMin(
                mom,
                ""
              ).toLocaleLowerCase();
              this._shortWeekdaysParse[i] = this.weekdaysShort(
                mom,
                ""
              ).toLocaleLowerCase();
              this._weekdaysParse[i] = this.weekdays(
                mom,
                ""
              ).toLocaleLowerCase();
            }
          }
          if (strict) {
            if (format === "dddd") {
              ii = indexOf.call(this._weekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format === "ddd") {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          } else {
            if (format === "dddd") {
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else if (format === "ddd") {
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._minWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            } else {
              ii = indexOf.call(this._minWeekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._weekdaysParse, llc);
              if (ii !== -1) {
                return ii;
              }
              ii = indexOf.call(this._shortWeekdaysParse, llc);
              return ii !== -1 ? ii : null;
            }
          }
        }
        function localeWeekdaysParse(weekdayName, format, strict) {
          var i, mom, regex;
          if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
          }
          if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
          }
          for (i = 0; i < 7; i++) {
            mom = createUTC([2e3, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
              this._fullWeekdaysParse[i] = new RegExp(
                "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
                "i"
              );
              this._shortWeekdaysParse[i] = new RegExp(
                "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
                "i"
              );
              this._minWeekdaysParse[i] = new RegExp(
                "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
                "i"
              );
            }
            if (!this._weekdaysParse[i]) {
              regex =
                "^" +
                this.weekdays(mom, "") +
                "|^" +
                this.weekdaysShort(mom, "") +
                "|^" +
                this.weekdaysMin(mom, "");
              this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
            }
            if (
              strict &&
              format === "dddd" &&
              this._fullWeekdaysParse[i].test(weekdayName)
            ) {
              return i;
            } else if (
              strict &&
              format === "ddd" &&
              this._shortWeekdaysParse[i].test(weekdayName)
            ) {
              return i;
            } else if (
              strict &&
              format === "dd" &&
              this._minWeekdaysParse[i].test(weekdayName)
            ) {
              return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
              return i;
            }
          }
        }
        function getSetDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
          if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, "d");
          } else {
            return day;
          }
        }
        function getSetLocaleDayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
          return input == null ? weekday : this.add(input - weekday, "d");
        }
        function getSetISODayOfWeek(input) {
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
          } else {
            return this.day() || 7;
          }
        }
        function weekdaysRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysStrictRegex;
            } else {
              return this._weekdaysRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict
              ? this._weekdaysStrictRegex
              : this._weekdaysRegex;
          }
        }
        function weekdaysShortRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysShortStrictRegex;
            } else {
              return this._weekdaysShortRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysShortRegex")) {
              this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict
              ? this._weekdaysShortStrictRegex
              : this._weekdaysShortRegex;
          }
        }
        function weekdaysMinRegex(isStrict) {
          if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, "_weekdaysRegex")) {
              computeWeekdaysParse.call(this);
            }
            if (isStrict) {
              return this._weekdaysMinStrictRegex;
            } else {
              return this._weekdaysMinRegex;
            }
          } else {
            if (!hasOwnProp(this, "_weekdaysMinRegex")) {
              this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict
              ? this._weekdaysMinStrictRegex
              : this._weekdaysMinRegex;
          }
        }
        function computeWeekdaysParse() {
          function cmpLenRev(a, b) {
            return b.length - a.length;
          }
          var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
          for (i = 0; i < 7; i++) {
            mom = createUTC([2e3, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ""));
            shortp = regexEscape(this.weekdaysShort(mom, ""));
            longp = regexEscape(this.weekdays(mom, ""));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
          }
          minPieces.sort(cmpLenRev);
          shortPieces.sort(cmpLenRev);
          longPieces.sort(cmpLenRev);
          mixedPieces.sort(cmpLenRev);
          this._weekdaysRegex = new RegExp(
            "^(" + mixedPieces.join("|") + ")",
            "i"
          );
          this._weekdaysShortRegex = this._weekdaysRegex;
          this._weekdaysMinRegex = this._weekdaysRegex;
          this._weekdaysStrictRegex = new RegExp(
            "^(" + longPieces.join("|") + ")",
            "i"
          );
          this._weekdaysShortStrictRegex = new RegExp(
            "^(" + shortPieces.join("|") + ")",
            "i"
          );
          this._weekdaysMinStrictRegex = new RegExp(
            "^(" + minPieces.join("|") + ")",
            "i"
          );
        }
        function hFormat() {
          return this.hours() % 12 || 12;
        }
        function kFormat() {
          return this.hours() || 24;
        }
        addFormatToken("H", ["HH", 2], 0, "hour");
        addFormatToken("h", ["hh", 2], 0, hFormat);
        addFormatToken("k", ["kk", 2], 0, kFormat);
        addFormatToken("hmm", 0, 0, function () {
          return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
        });
        addFormatToken("hmmss", 0, 0, function () {
          return (
            "" +
            hFormat.apply(this) +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
          );
        });
        addFormatToken("Hmm", 0, 0, function () {
          return "" + this.hours() + zeroFill(this.minutes(), 2);
        });
        addFormatToken("Hmmss", 0, 0, function () {
          return (
            "" +
            this.hours() +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
          );
        });
        function meridiem(token, lowercase) {
          addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(
              this.hours(),
              this.minutes(),
              lowercase
            );
          });
        }
        meridiem("a", true);
        meridiem("A", false);
        addUnitAlias("hour", "h");
        addUnitPriority("hour", 13);
        function matchMeridiem(isStrict, locale) {
          return locale._meridiemParse;
        }
        addRegexToken("a", matchMeridiem);
        addRegexToken("A", matchMeridiem);
        addRegexToken("H", match1to2);
        addRegexToken("h", match1to2);
        addRegexToken("k", match1to2);
        addRegexToken("HH", match1to2, match2);
        addRegexToken("hh", match1to2, match2);
        addRegexToken("kk", match1to2, match2);
        addRegexToken("hmm", match3to4);
        addRegexToken("hmmss", match5to6);
        addRegexToken("Hmm", match3to4);
        addRegexToken("Hmmss", match5to6);
        addParseToken(["H", "HH"], HOUR);
        addParseToken(["k", "kk"], function (input, array, config) {
          var kInput = toInt(input);
          array[HOUR] = kInput === 24 ? 0 : kInput;
        });
        addParseToken(["a", "A"], function (input, array, config) {
          config._isPm = config._locale.isPM(input);
          config._meridiem = input;
        });
        addParseToken(["h", "hh"], function (input, array, config) {
          array[HOUR] = toInt(input);
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("hmm", function (input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("hmmss", function (input, array, config) {
          var pos1 = input.length - 4,
            pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
          getParsingFlags(config).bigHour = true;
        });
        addParseToken("Hmm", function (input, array, config) {
          var pos = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos));
          array[MINUTE] = toInt(input.substr(pos));
        });
        addParseToken("Hmmss", function (input, array, config) {
          var pos1 = input.length - 4,
            pos2 = input.length - 2;
          array[HOUR] = toInt(input.substr(0, pos1));
          array[MINUTE] = toInt(input.substr(pos1, 2));
          array[SECOND] = toInt(input.substr(pos2));
        });
        function localeIsPM(input) {
          return (input + "").toLowerCase().charAt(0) === "p";
        }
        var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
          getSetHour = makeGetSet("Hours", true);
        function localeMeridiem(hours, minutes, isLower) {
          if (hours > 11) {
            return isLower ? "pm" : "PM";
          } else {
            return isLower ? "am" : "AM";
          }
        }
        var baseConfig = {
          calendar: defaultCalendar,
          longDateFormat: defaultLongDateFormat,
          invalidDate: defaultInvalidDate,
          ordinal: defaultOrdinal,
          dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
          relativeTime: defaultRelativeTime,
          months: defaultLocaleMonths,
          monthsShort: defaultLocaleMonthsShort,
          week: defaultLocaleWeek,
          weekdays: defaultLocaleWeekdays,
          weekdaysMin: defaultLocaleWeekdaysMin,
          weekdaysShort: defaultLocaleWeekdaysShort,
          meridiemParse: defaultLocaleMeridiemParse,
        };
        var locales = {},
          localeFamilies = {},
          globalLocale;
        function commonPrefix(arr1, arr2) {
          var i,
            minl = Math.min(arr1.length, arr2.length);
          for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
              return i;
            }
          }
          return minl;
        }
        function normalizeLocale(key) {
          return key ? key.toLowerCase().replace("_", "-") : key;
        }
        function chooseLocale(names) {
          var i = 0,
            j,
            next,
            locale,
            split;
          while (i < names.length) {
            split = normalizeLocale(names[i]).split("-");
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split("-") : null;
            while (j > 0) {
              locale = loadLocale(split.slice(0, j).join("-"));
              if (locale) {
                return locale;
              }
              if (
                next &&
                next.length >= j &&
                commonPrefix(split, next) >= j - 1
              ) {
                break;
              }
              j--;
            }
            i++;
          }
          return globalLocale;
        }
        function loadLocale(name) {
          var oldLocale = null,
            aliasedRequire;
          if (
            locales[name] === undefined &&
            typeof module !== "undefined" &&
            module &&
            module.exports
          ) {
            try {
              oldLocale = globalLocale._abbr;
              aliasedRequire = require;
              __webpack_require__(40)("./" + name);
              getSetGlobalLocale(oldLocale);
            } catch (e) {
              locales[name] = null;
            }
          }
          return locales[name];
        }
        function getSetGlobalLocale(key, values) {
          var data;
          if (key) {
            if (isUndefined(values)) {
              data = getLocale(key);
            } else {
              data = defineLocale(key, values);
            }
            if (data) {
              globalLocale = data;
            } else {
              if (typeof console !== "undefined" && console.warn) {
                console.warn(
                  "Locale " + key + " not found. Did you forget to load it?"
                );
              }
            }
          }
          return globalLocale._abbr;
        }
        function defineLocale(name, config) {
          if (config !== null) {
            var locale,
              parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
              deprecateSimple(
                "defineLocaleOverride",
                "use moment.updateLocale(localeName, config) to change " +
                  "an existing locale. moment.defineLocale(localeName, " +
                  "config) should only be used for creating a new locale " +
                  "See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
              );
              parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
              if (locales[config.parentLocale] != null) {
                parentConfig = locales[config.parentLocale]._config;
              } else {
                locale = loadLocale(config.parentLocale);
                if (locale != null) {
                  parentConfig = locale._config;
                } else {
                  if (!localeFamilies[config.parentLocale]) {
                    localeFamilies[config.parentLocale] = [];
                  }
                  localeFamilies[config.parentLocale].push({
                    name: name,
                    config: config,
                  });
                  return null;
                }
              }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));
            if (localeFamilies[name]) {
              localeFamilies[name].forEach(function (x) {
                defineLocale(x.name, x.config);
              });
            }
            getSetGlobalLocale(name);
            return locales[name];
          } else {
            delete locales[name];
            return null;
          }
        }
        function updateLocale(name, config) {
          if (config != null) {
            var locale,
              tmpLocale,
              parentConfig = baseConfig;
            if (locales[name] != null && locales[name].parentLocale != null) {
              locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
              tmpLocale = loadLocale(name);
              if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
              }
              config = mergeConfigs(parentConfig, config);
              if (tmpLocale == null) {
                config.abbr = name;
              }
              locale = new Locale(config);
              locale.parentLocale = locales[name];
              locales[name] = locale;
            }
            getSetGlobalLocale(name);
          } else {
            if (locales[name] != null) {
              if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
                if (name === getSetGlobalLocale()) {
                  getSetGlobalLocale(name);
                }
              } else if (locales[name] != null) {
                delete locales[name];
              }
            }
          }
          return locales[name];
        }
        function getLocale(key) {
          var locale;
          if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
          }
          if (!key) {
            return globalLocale;
          }
          if (!isArray(key)) {
            locale = loadLocale(key);
            if (locale) {
              return locale;
            }
            key = [key];
          }
          return chooseLocale(key);
        }
        function listLocales() {
          return keys(locales);
        }
        function checkOverflow(m) {
          var overflow,
            a = m._a;
          if (a && getParsingFlags(m).overflow === -2) {
            overflow =
              a[MONTH] < 0 || a[MONTH] > 11
                ? MONTH
                : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                ? DATE
                : a[HOUR] < 0 ||
                  a[HOUR] > 24 ||
                  (a[HOUR] === 24 &&
                    (a[MINUTE] !== 0 ||
                      a[SECOND] !== 0 ||
                      a[MILLISECOND] !== 0))
                ? HOUR
                : a[MINUTE] < 0 || a[MINUTE] > 59
                ? MINUTE
                : a[SECOND] < 0 || a[SECOND] > 59
                ? SECOND
                : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                ? MILLISECOND
                : -1;
            if (
              getParsingFlags(m)._overflowDayOfYear &&
              (overflow < YEAR || overflow > DATE)
            ) {
              overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
              overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
              overflow = WEEKDAY;
            }
            getParsingFlags(m).overflow = overflow;
          }
          return m;
        }
        var extendedIsoRegex =
            /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
          basicIsoRegex =
            /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
          tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
          isoDates = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
            ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
            ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
            ["YYYY-DDD", /\d{4}-\d{3}/],
            ["YYYY-MM", /\d{4}-\d\d/, false],
            ["YYYYYYMMDD", /[+-]\d{10}/],
            ["YYYYMMDD", /\d{8}/],
            ["GGGG[W]WWE", /\d{4}W\d{3}/],
            ["GGGG[W]WW", /\d{4}W\d{2}/, false],
            ["YYYYDDD", /\d{7}/],
            ["YYYYMM", /\d{6}/, false],
            ["YYYY", /\d{4}/, false],
          ],
          isoTimes = [
            ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
            ["HH:mm:ss", /\d\d:\d\d:\d\d/],
            ["HH:mm", /\d\d:\d\d/],
            ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
            ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
            ["HHmmss", /\d\d\d\d\d\d/],
            ["HHmm", /\d\d\d\d/],
            ["HH", /\d\d/],
          ],
          aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
          rfc2822 =
            /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
          obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
          };
        function configFromISO(config) {
          var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;
          if (match) {
            getParsingFlags(config).iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
              if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
              }
            }
            if (dateFormat == null) {
              config._isValid = false;
              return;
            }
            if (match[3]) {
              for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                  timeFormat = (match[2] || " ") + isoTimes[i][0];
                  break;
                }
              }
              if (timeFormat == null) {
                config._isValid = false;
                return;
              }
            }
            if (!allowTime && timeFormat != null) {
              config._isValid = false;
              return;
            }
            if (match[4]) {
              if (tzRegex.exec(match[4])) {
                tzFormat = "Z";
              } else {
                config._isValid = false;
                return;
              }
            }
            config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
            configFromStringAndFormat(config);
          } else {
            config._isValid = false;
          }
        }
        function extractFromRFC2822Strings(
          yearStr,
          monthStr,
          dayStr,
          hourStr,
          minuteStr,
          secondStr
        ) {
          var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10),
          ];
          if (secondStr) {
            result.push(parseInt(secondStr, 10));
          }
          return result;
        }
        function untruncateYear(yearStr) {
          var year = parseInt(yearStr, 10);
          if (year <= 49) {
            return 2e3 + year;
          } else if (year <= 999) {
            return 1900 + year;
          }
          return year;
        }
        function preprocessRFC2822(s) {
          return s
            .replace(/\([^)]*\)|[\n\t]/g, " ")
            .replace(/(\s\s+)/g, " ")
            .replace(/^\s\s*/, "")
            .replace(/\s\s*$/, "");
        }
        function checkWeekday(weekdayStr, parsedInput, config) {
          if (weekdayStr) {
            var weekdayProvided =
                defaultLocaleWeekdaysShort.indexOf(weekdayStr),
              weekdayActual = new Date(
                parsedInput[0],
                parsedInput[1],
                parsedInput[2]
              ).getDay();
            if (weekdayProvided !== weekdayActual) {
              getParsingFlags(config).weekdayMismatch = true;
              config._isValid = false;
              return false;
            }
          }
          return true;
        }
        function calculateOffset(obsOffset, militaryOffset, numOffset) {
          if (obsOffset) {
            return obsOffsets[obsOffset];
          } else if (militaryOffset) {
            return 0;
          } else {
            var hm = parseInt(numOffset, 10),
              m = hm % 100,
              h = (hm - m) / 100;
            return h * 60 + m;
          }
        }
        function configFromRFC2822(config) {
          var match = rfc2822.exec(preprocessRFC2822(config._i)),
            parsedArray;
          if (match) {
            parsedArray = extractFromRFC2822Strings(
              match[4],
              match[3],
              match[2],
              match[5],
              match[6],
              match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
              return;
            }
            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);
            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
            getParsingFlags(config).rfc2822 = true;
          } else {
            config._isValid = false;
          }
        }
        function configFromString(config) {
          var matched = aspNetJsonRegex.exec(config._i);
          if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
          }
          configFromISO(config);
          if (config._isValid === false) {
            delete config._isValid;
          } else {
            return;
          }
          configFromRFC2822(config);
          if (config._isValid === false) {
            delete config._isValid;
          } else {
            return;
          }
          if (config._strict) {
            config._isValid = false;
          } else {
            hooks.createFromInputFallback(config);
          }
        }
        hooks.createFromInputFallback = deprecate(
          "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), " +
            "which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are " +
            "discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
          function (config) {
            config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
          }
        );
        function defaults(a, b, c) {
          if (a != null) {
            return a;
          }
          if (b != null) {
            return b;
          }
          return c;
        }
        function currentDateArray(config) {
          var nowValue = new Date(hooks.now());
          if (config._useUTC) {
            return [
              nowValue.getUTCFullYear(),
              nowValue.getUTCMonth(),
              nowValue.getUTCDate(),
            ];
          }
          return [
            nowValue.getFullYear(),
            nowValue.getMonth(),
            nowValue.getDate(),
          ];
        }
        function configFromArray(config) {
          var i,
            date,
            input = [],
            currentDate,
            expectedWeekday,
            yearToUse;
          if (config._d) {
            return;
          }
          currentDate = currentDateArray(config);
          if (
            config._w &&
            config._a[DATE] == null &&
            config._a[MONTH] == null
          ) {
            dayOfYearFromWeekInfo(config);
          }
          if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
            if (
              config._dayOfYear > daysInYear(yearToUse) ||
              config._dayOfYear === 0
            ) {
              getParsingFlags(config)._overflowDayOfYear = true;
            }
            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
          }
          for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
          }
          for (; i < 7; i++) {
            config._a[i] = input[i] =
              config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
          }
          if (
            config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0
          ) {
            config._nextDay = true;
            config._a[HOUR] = 0;
          }
          config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
          );
          expectedWeekday = config._useUTC
            ? config._d.getUTCDay()
            : config._d.getDay();
          if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
          }
          if (config._nextDay) {
            config._a[HOUR] = 24;
          }
          if (
            config._w &&
            typeof config._w.d !== "undefined" &&
            config._w.d !== expectedWeekday
          ) {
            getParsingFlags(config).weekdayMismatch = true;
          }
        }
        function dayOfYearFromWeekInfo(config) {
          var w,
            weekYear,
            week,
            weekday,
            dow,
            doy,
            temp,
            weekdayOverflow,
            curWeek;
          w = config._w;
          if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;
            weekYear = defaults(
              w.GG,
              config._a[YEAR],
              weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
              weekdayOverflow = true;
            }
          } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;
            curWeek = weekOfYear(createLocal(), dow, doy);
            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
            week = defaults(w.w, curWeek.week);
            if (w.d != null) {
              weekday = w.d;
              if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
              }
            } else if (w.e != null) {
              weekday = w.e + dow;
              if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
              }
            } else {
              weekday = dow;
            }
          }
          if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
          } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
          } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
          }
        }
        hooks.ISO_8601 = function () {};
        hooks.RFC_2822 = function () {};
        function configFromStringAndFormat(config) {
          if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
          }
          if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
          }
          config._a = [];
          getParsingFlags(config).empty = true;
          var string = "" + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0,
            era;
          tokens =
            expandFormat(config._f, config._locale).match(formattingTokens) ||
            [];
          for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
              [])[0];
            if (parsedInput) {
              skipped = string.substr(0, string.indexOf(parsedInput));
              if (skipped.length > 0) {
                getParsingFlags(config).unusedInput.push(skipped);
              }
              string = string.slice(
                string.indexOf(parsedInput) + parsedInput.length
              );
              totalParsedInputLength += parsedInput.length;
            }
            if (formatTokenFunctions[token]) {
              if (parsedInput) {
                getParsingFlags(config).empty = false;
              } else {
                getParsingFlags(config).unusedTokens.push(token);
              }
              addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
              getParsingFlags(config).unusedTokens.push(token);
            }
          }
          getParsingFlags(config).charsLeftOver =
            stringLength - totalParsedInputLength;
          if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
          }
          if (
            config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0
          ) {
            getParsingFlags(config).bigHour = undefined;
          }
          getParsingFlags(config).parsedDateParts = config._a.slice(0);
          getParsingFlags(config).meridiem = config._meridiem;
          config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
          );
          era = getParsingFlags(config).era;
          if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(
              era,
              config._a[YEAR]
            );
          }
          configFromArray(config);
          checkOverflow(config);
        }
        function meridiemFixWrap(locale, hour, meridiem) {
          var isPm;
          if (meridiem == null) {
            return hour;
          }
          if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
          } else if (locale.isPM != null) {
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
              hour += 12;
            }
            if (!isPm && hour === 12) {
              hour = 0;
            }
            return hour;
          } else {
            return hour;
          }
        }
        function configFromStringAndArray(config) {
          var tempConfig,
            bestMoment,
            scoreToBeat,
            i,
            currentScore,
            validFormatFound,
            bestFormatIsValid = false;
          if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
          }
          for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
              tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);
            if (isValid(tempConfig)) {
              validFormatFound = true;
            }
            currentScore += getParsingFlags(tempConfig).charsLeftOver;
            currentScore +=
              getParsingFlags(tempConfig).unusedTokens.length * 10;
            getParsingFlags(tempConfig).score = currentScore;
            if (!bestFormatIsValid) {
              if (
                scoreToBeat == null ||
                currentScore < scoreToBeat ||
                validFormatFound
              ) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
                if (validFormatFound) {
                  bestFormatIsValid = true;
                }
              }
            } else {
              if (currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
              }
            }
          }
          extend(config, bestMoment || tempConfig);
        }
        function configFromObject(config) {
          if (config._d) {
            return;
          }
          var i = normalizeObjectUnits(config._i),
            dayOrDate = i.day === undefined ? i.date : i.day;
          config._a = map(
            [
              i.year,
              i.month,
              dayOrDate,
              i.hour,
              i.minute,
              i.second,
              i.millisecond,
            ],
            function (obj) {
              return obj && parseInt(obj, 10);
            }
          );
          configFromArray(config);
        }
        function createFromConfig(config) {
          var res = new Moment(checkOverflow(prepareConfig(config)));
          if (res._nextDay) {
            res.add(1, "d");
            res._nextDay = undefined;
          }
          return res;
        }
        function prepareConfig(config) {
          var input = config._i,
            format = config._f;
          config._locale = config._locale || getLocale(config._l);
          if (input === null || (format === undefined && input === "")) {
            return createInvalid({ nullInput: true });
          }
          if (typeof input === "string") {
            config._i = input = config._locale.preparse(input);
          }
          if (isMoment(input)) {
            return new Moment(checkOverflow(input));
          } else if (isDate(input)) {
            config._d = input;
          } else if (isArray(format)) {
            configFromStringAndArray(config);
          } else if (format) {
            configFromStringAndFormat(config);
          } else {
            configFromInput(config);
          }
          if (!isValid(config)) {
            config._d = null;
          }
          return config;
        }
        function configFromInput(config) {
          var input = config._i;
          if (isUndefined(input)) {
            config._d = new Date(hooks.now());
          } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
          } else if (typeof input === "string") {
            configFromString(config);
          } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
              return parseInt(obj, 10);
            });
            configFromArray(config);
          } else if (isObject(input)) {
            configFromObject(config);
          } else if (isNumber(input)) {
            config._d = new Date(input);
          } else {
            hooks.createFromInputFallback(config);
          }
        }
        function createLocalOrUTC(input, format, locale, strict, isUTC) {
          var c = {};
          if (format === true || format === false) {
            strict = format;
            format = undefined;
          }
          if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
          }
          if (
            (isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)
          ) {
            input = undefined;
          }
          c._isAMomentObject = true;
          c._useUTC = c._isUTC = isUTC;
          c._l = locale;
          c._i = input;
          c._f = format;
          c._strict = strict;
          return createFromConfig(c);
        }
        function createLocal(input, format, locale, strict) {
          return createLocalOrUTC(input, format, locale, strict, false);
        }
        var prototypeMin = deprecate(
            "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
            function () {
              var other = createLocal.apply(null, arguments);
              if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
              } else {
                return createInvalid();
              }
            }
          ),
          prototypeMax = deprecate(
            "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
            function () {
              var other = createLocal.apply(null, arguments);
              if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
              } else {
                return createInvalid();
              }
            }
          );
        function pickBy(fn, moments) {
          var res, i;
          if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
          }
          if (!moments.length) {
            return createLocal();
          }
          res = moments[0];
          for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
              res = moments[i];
            }
          }
          return res;
        }
        function min() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isBefore", args);
        }
        function max() {
          var args = [].slice.call(arguments, 0);
          return pickBy("isAfter", args);
        }
        var now = function () {
          return Date.now ? Date.now() : +new Date();
        };
        var ordering = [
          "year",
          "quarter",
          "month",
          "week",
          "day",
          "hour",
          "minute",
          "second",
          "millisecond",
        ];
        function isDurationValid(m) {
          var key,
            unitHasDecimal = false,
            i;
          for (key in m) {
            if (
              hasOwnProp(m, key) &&
              !(
                indexOf.call(ordering, key) !== -1 &&
                (m[key] == null || !isNaN(m[key]))
              )
            ) {
              return false;
            }
          }
          for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
              if (unitHasDecimal) {
                return false;
              }
              if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                unitHasDecimal = true;
              }
            }
          }
          return true;
        }
        function isValid$1() {
          return this._isValid;
        }
        function createInvalid$1() {
          return createDuration(NaN);
        }
        function Duration(duration) {
          var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;
          this._isValid = isDurationValid(normalizedInput);
          this._milliseconds =
            +milliseconds +
            seconds * 1e3 +
            minutes * 6e4 +
            hours * 1e3 * 60 * 60;
          this._days = +days + weeks * 7;
          this._months = +months + quarters * 3 + years * 12;
          this._data = {};
          this._locale = getLocale();
          this._bubble();
        }
        function isDuration(obj) {
          return obj instanceof Duration;
        }
        function absRound(number) {
          if (number < 0) {
            return Math.round(-1 * number) * -1;
          } else {
            return Math.round(number);
          }
        }
        function compareArrays(array1, array2, dontConvert) {
          var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
          for (i = 0; i < len; i++) {
            if (
              (dontConvert && array1[i] !== array2[i]) ||
              (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
            ) {
              diffs++;
            }
          }
          return diffs + lengthDiff;
        }
        function offset(token, separator) {
          addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(),
              sign = "+";
            if (offset < 0) {
              offset = -offset;
              sign = "-";
            }
            return (
              sign +
              zeroFill(~~(offset / 60), 2) +
              separator +
              zeroFill(~~offset % 60, 2)
            );
          });
        }
        offset("Z", ":");
        offset("ZZ", "");
        addRegexToken("Z", matchShortOffset);
        addRegexToken("ZZ", matchShortOffset);
        addParseToken(["Z", "ZZ"], function (input, array, config) {
          config._useUTC = true;
          config._tzm = offsetFromString(matchShortOffset, input);
        });
        var chunkOffset = /([\+\-]|\d\d)/gi;
        function offsetFromString(matcher, string) {
          var matches = (string || "").match(matcher),
            chunk,
            parts,
            minutes;
          if (matches === null) {
            return null;
          }
          chunk = matches[matches.length - 1] || [];
          parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
          minutes = +(parts[1] * 60) + toInt(parts[2]);
          return minutes === 0 ? 0 : parts[0] === "+" ? minutes : -minutes;
        }
        function cloneWithOffset(input, model) {
          var res, diff;
          if (model._isUTC) {
            res = model.clone();
            diff =
              (isMoment(input) || isDate(input)
                ? input.valueOf()
                : createLocal(input).valueOf()) - res.valueOf();
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
          } else {
            return createLocal(input).local();
          }
        }
        function getDateOffset(m) {
          return -Math.round(m._d.getTimezoneOffset());
        }
        hooks.updateOffset = function () {};
        function getSetOffset(input, keepLocalTime, keepMinutes) {
          var offset = this._offset || 0,
            localAdjust;
          if (!this.isValid()) {
            return input != null ? this : NaN;
          }
          if (input != null) {
            if (typeof input === "string") {
              input = offsetFromString(matchShortOffset, input);
              if (input === null) {
                return this;
              }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
              input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
              localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
              this.add(localAdjust, "m");
            }
            if (offset !== input) {
              if (!keepLocalTime || this._changeInProgress) {
                addSubtract(
                  this,
                  createDuration(input - offset, "m"),
                  1,
                  false
                );
              } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                hooks.updateOffset(this, true);
                this._changeInProgress = null;
              }
            }
            return this;
          } else {
            return this._isUTC ? offset : getDateOffset(this);
          }
        }
        function getSetZone(input, keepLocalTime) {
          if (input != null) {
            if (typeof input !== "string") {
              input = -input;
            }
            this.utcOffset(input, keepLocalTime);
            return this;
          } else {
            return -this.utcOffset();
          }
        }
        function setOffsetToUTC(keepLocalTime) {
          return this.utcOffset(0, keepLocalTime);
        }
        function setOffsetToLocal(keepLocalTime) {
          if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;
            if (keepLocalTime) {
              this.subtract(getDateOffset(this), "m");
            }
          }
          return this;
        }
        function setOffsetToParsedOffset() {
          if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
          } else if (typeof this._i === "string") {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
              this.utcOffset(tZone);
            } else {
              this.utcOffset(0, true);
            }
          }
          return this;
        }
        function hasAlignedHourOffset(input) {
          if (!this.isValid()) {
            return false;
          }
          input = input ? createLocal(input).utcOffset() : 0;
          return (this.utcOffset() - input) % 60 === 0;
        }
        function isDaylightSavingTime() {
          return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
          );
        }
        function isDaylightSavingTimeShifted() {
          if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
          }
          var c = {},
            other;
          copyConfig(c, this);
          c = prepareConfig(c);
          if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted =
              this.isValid() && compareArrays(c._a, other.toArray()) > 0;
          } else {
            this._isDSTShifted = false;
          }
          return this._isDSTShifted;
        }
        function isLocal() {
          return this.isValid() ? !this._isUTC : false;
        }
        function isUtcOffset() {
          return this.isValid() ? this._isUTC : false;
        }
        function isUtc() {
          return this.isValid() ? this._isUTC && this._offset === 0 : false;
        }
        var aspNetRegex =
            /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
          isoRegex =
            /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
        function createDuration(input, key) {
          var duration = input,
            match = null,
            sign,
            ret,
            diffRes;
          if (isDuration(input)) {
            duration = {
              ms: input._milliseconds,
              d: input._days,
              M: input._months,
            };
          } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
              duration[key] = +input;
            } else {
              duration.milliseconds = +input;
            }
          } else if ((match = aspNetRegex.exec(input))) {
            sign = match[1] === "-" ? -1 : 1;
            duration = {
              y: 0,
              d: toInt(match[DATE]) * sign,
              h: toInt(match[HOUR]) * sign,
              m: toInt(match[MINUTE]) * sign,
              s: toInt(match[SECOND]) * sign,
              ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign,
            };
          } else if ((match = isoRegex.exec(input))) {
            sign = match[1] === "-" ? -1 : 1;
            duration = {
              y: parseIso(match[2], sign),
              M: parseIso(match[3], sign),
              w: parseIso(match[4], sign),
              d: parseIso(match[5], sign),
              h: parseIso(match[6], sign),
              m: parseIso(match[7], sign),
              s: parseIso(match[8], sign),
            };
          } else if (duration == null) {
            duration = {};
          } else if (
            typeof duration === "object" &&
            ("from" in duration || "to" in duration)
          ) {
            diffRes = momentsDifference(
              createLocal(duration.from),
              createLocal(duration.to)
            );
            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
          }
          ret = new Duration(duration);
          if (isDuration(input) && hasOwnProp(input, "_locale")) {
            ret._locale = input._locale;
          }
          if (isDuration(input) && hasOwnProp(input, "_isValid")) {
            ret._isValid = input._isValid;
          }
          return ret;
        }
        createDuration.fn = Duration.prototype;
        createDuration.invalid = createInvalid$1;
        function parseIso(inp, sign) {
          var res = inp && parseFloat(inp.replace(",", "."));
          return (isNaN(res) ? 0 : res) * sign;
        }
        function positiveMomentsDifference(base, other) {
          var res = {};
          res.months =
            other.month() - base.month() + (other.year() - base.year()) * 12;
          if (base.clone().add(res.months, "M").isAfter(other)) {
            --res.months;
          }
          res.milliseconds = +other - +base.clone().add(res.months, "M");
          return res;
        }
        function momentsDifference(base, other) {
          var res;
          if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
          }
          other = cloneWithOffset(other, base);
          if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
          } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
          }
          return res;
        }
        function createAdder(direction, name) {
          return function (val, period) {
            var dur, tmp;
            if (period !== null && !isNaN(+period)) {
              deprecateSimple(
                name,
                "moment()." +
                  name +
                  "(period, number) is deprecated. Please use moment()." +
                  name +
                  "(number, period). " +
                  "See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
              );
              tmp = val;
              val = period;
              period = tmp;
            }
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
          };
        }
        function addSubtract(mom, duration, isAdding, updateOffset) {
          var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);
          if (!mom.isValid()) {
            return;
          }
          updateOffset = updateOffset == null ? true : updateOffset;
          if (months) {
            setMonth(mom, get(mom, "Month") + months * isAdding);
          }
          if (days) {
            set$1(mom, "Date", get(mom, "Date") + days * isAdding);
          }
          if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
          }
          if (updateOffset) {
            hooks.updateOffset(mom, days || months);
          }
        }
        var add = createAdder(1, "add"),
          subtract = createAdder(-1, "subtract");
        function isString(input) {
          return typeof input === "string" || input instanceof String;
        }
        function isMomentInput(input) {
          return (
            isMoment(input) ||
            isDate(input) ||
            isString(input) ||
            isNumber(input) ||
            isNumberOrStringArray(input) ||
            isMomentInputObject(input) ||
            input === null ||
            input === undefined
          );
        }
        function isMomentInputObject(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
              "years",
              "year",
              "y",
              "months",
              "month",
              "M",
              "days",
              "day",
              "d",
              "dates",
              "date",
              "D",
              "hours",
              "hour",
              "h",
              "minutes",
              "minute",
              "m",
              "seconds",
              "second",
              "s",
              "milliseconds",
              "millisecond",
              "ms",
            ],
            i,
            property;
          for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
          }
          return objectTest && propertyTest;
        }
        function isNumberOrStringArray(input) {
          var arrayTest = isArray(input),
            dataTypeTest = false;
          if (arrayTest) {
            dataTypeTest =
              input.filter(function (item) {
                return !isNumber(item) && isString(input);
              }).length === 0;
          }
          return arrayTest && dataTypeTest;
        }
        function isCalendarSpec(input) {
          var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
              "sameDay",
              "nextDay",
              "lastDay",
              "nextWeek",
              "lastWeek",
              "sameElse",
            ],
            i,
            property;
          for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
          }
          return objectTest && propertyTest;
        }
        function getCalendarFormat(myMoment, now) {
          var diff = myMoment.diff(now, "days", true);
          return diff < -6
            ? "sameElse"
            : diff < -1
            ? "lastWeek"
            : diff < 0
            ? "lastDay"
            : diff < 1
            ? "sameDay"
            : diff < 2
            ? "nextDay"
            : diff < 7
            ? "nextWeek"
            : "sameElse";
        }
        function calendar$1(time, formats) {
          if (arguments.length === 1) {
            if (!arguments[0]) {
              time = undefined;
              formats = undefined;
            } else if (isMomentInput(arguments[0])) {
              time = arguments[0];
              formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
              formats = arguments[0];
              time = undefined;
            }
          }
          var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf("day"),
            format = hooks.calendarFormat(this, sod) || "sameElse",
            output =
              formats &&
              (isFunction(formats[format])
                ? formats[format].call(this, now)
                : formats[format]);
          return this.format(
            output || this.localeData().calendar(format, this, createLocal(now))
          );
        }
        function clone() {
          return new Moment(this);
        }
        function isAfter(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() > localInput.valueOf();
          } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
          }
        }
        function isBefore(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input);
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() < localInput.valueOf();
          } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
          }
        }
        function isBetween(from, to, units, inclusivity) {
          var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
          if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
          }
          inclusivity = inclusivity || "()";
          return (
            (inclusivity[0] === "("
              ? this.isAfter(localFrom, units)
              : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ")"
              ? this.isBefore(localTo, units)
              : !this.isAfter(localTo, units))
          );
        }
        function isSame(input, units) {
          var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
          if (!(this.isValid() && localInput.isValid())) {
            return false;
          }
          units = normalizeUnits(units) || "millisecond";
          if (units === "millisecond") {
            return this.valueOf() === localInput.valueOf();
          } else {
            inputMs = localInput.valueOf();
            return (
              this.clone().startOf(units).valueOf() <= inputMs &&
              inputMs <= this.clone().endOf(units).valueOf()
            );
          }
        }
        function isSameOrAfter(input, units) {
          return this.isSame(input, units) || this.isAfter(input, units);
        }
        function isSameOrBefore(input, units) {
          return this.isSame(input, units) || this.isBefore(input, units);
        }
        function diff(input, units, asFloat) {
          var that, zoneDelta, output;
          if (!this.isValid()) {
            return NaN;
          }
          that = cloneWithOffset(input, this);
          if (!that.isValid()) {
            return NaN;
          }
          zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
          units = normalizeUnits(units);
          switch (units) {
            case "year":
              output = monthDiff(this, that) / 12;
              break;
            case "month":
              output = monthDiff(this, that);
              break;
            case "quarter":
              output = monthDiff(this, that) / 3;
              break;
            case "second":
              output = (this - that) / 1e3;
              break;
            case "minute":
              output = (this - that) / 6e4;
              break;
            case "hour":
              output = (this - that) / 36e5;
              break;
            case "day":
              output = (this - that - zoneDelta) / 864e5;
              break;
            case "week":
              output = (this - that - zoneDelta) / 6048e5;
              break;
            default:
              output = this - that;
          }
          return asFloat ? output : absFloor(output);
        }
        function monthDiff(a, b) {
          if (a.date() < b.date()) {
            return -monthDiff(b, a);
          }
          var wholeMonthDiff =
              (b.year() - a.year()) * 12 + (b.month() - a.month()),
            anchor = a.clone().add(wholeMonthDiff, "months"),
            anchor2,
            adjust;
          if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
            adjust = (b - anchor) / (anchor - anchor2);
          } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
            adjust = (b - anchor) / (anchor2 - anchor);
          }
          return -(wholeMonthDiff + adjust) || 0;
        }
        hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
        hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        function toString() {
          return this.clone()
            .locale("en")
            .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        }
        function toISOString(keepOffset) {
          if (!this.isValid()) {
            return null;
          }
          var utc = keepOffset !== true,
            m = utc ? this.clone().utc() : this;
          if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
              m,
              utc
                ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
                : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
            );
          }
          if (isFunction(Date.prototype.toISOString)) {
            if (utc) {
              return this.toDate().toISOString();
            } else {
              return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3)
                .toISOString()
                .replace("Z", formatMoment(m, "Z"));
            }
          }
          return formatMoment(
            m,
            utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
          );
        }
        function inspect() {
          if (!this.isValid()) {
            return "moment.invalid(/* " + this._i + " */)";
          }
          var func = "moment",
            zone = "",
            prefix,
            year,
            datetime,
            suffix;
          if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
            zone = "Z";
          }
          prefix = "[" + func + '("]';
          year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
          datetime = "-MM-DD[T]HH:mm:ss.SSS";
          suffix = zone + '[")]';
          return this.format(prefix + year + datetime + suffix);
        }
        function format(inputString) {
          if (!inputString) {
            inputString = this.isUtc()
              ? hooks.defaultFormatUtc
              : hooks.defaultFormat;
          }
          var output = formatMoment(this, inputString);
          return this.localeData().postformat(output);
        }
        function from(time, withoutSuffix) {
          if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
          ) {
            return createDuration({ to: this, from: time })
              .locale(this.locale())
              .humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function fromNow(withoutSuffix) {
          return this.from(createLocal(), withoutSuffix);
        }
        function to(time, withoutSuffix) {
          if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
          ) {
            return createDuration({ from: this, to: time })
              .locale(this.locale())
              .humanize(!withoutSuffix);
          } else {
            return this.localeData().invalidDate();
          }
        }
        function toNow(withoutSuffix) {
          return this.to(createLocal(), withoutSuffix);
        }
        function locale(key) {
          var newLocaleData;
          if (key === undefined) {
            return this._locale._abbr;
          } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
              this._locale = newLocaleData;
            }
            return this;
          }
        }
        var lang = deprecate(
          "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
          function (key) {
            if (key === undefined) {
              return this.localeData();
            } else {
              return this.locale(key);
            }
          }
        );
        function localeData() {
          return this._locale;
        }
        var MS_PER_SECOND = 1e3,
          MS_PER_MINUTE = 60 * MS_PER_SECOND,
          MS_PER_HOUR = 60 * MS_PER_MINUTE,
          MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
        function mod$1(dividend, divisor) {
          return ((dividend % divisor) + divisor) % divisor;
        }
        function localStartOfDate(y, m, d) {
          if (y < 100 && y >= 0) {
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
            return new Date(y, m, d).valueOf();
          }
        }
        function utcStartOfDate(y, m, d) {
          if (y < 100 && y >= 0) {
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
          } else {
            return Date.UTC(y, m, d);
          }
        }
        function startOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (
            units === undefined ||
            units === "millisecond" ||
            !this.isValid()
          ) {
            return this;
          }
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
          switch (units) {
            case "year":
              time = startOfDate(this.year(), 0, 1);
              break;
            case "quarter":
              time = startOfDate(
                this.year(),
                this.month() - (this.month() % 3),
                1
              );
              break;
            case "month":
              time = startOfDate(this.year(), this.month(), 1);
              break;
            case "week":
              time = startOfDate(
                this.year(),
                this.month(),
                this.date() - this.weekday()
              );
              break;
            case "isoWeek":
              time = startOfDate(
                this.year(),
                this.month(),
                this.date() - (this.isoWeekday() - 1)
              );
              break;
            case "day":
            case "date":
              time = startOfDate(this.year(), this.month(), this.date());
              break;
            case "hour":
              time = this._d.valueOf();
              time -= mod$1(
                time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                MS_PER_HOUR
              );
              break;
            case "minute":
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_MINUTE);
              break;
            case "second":
              time = this._d.valueOf();
              time -= mod$1(time, MS_PER_SECOND);
              break;
          }
          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
        }
        function endOf(units) {
          var time, startOfDate;
          units = normalizeUnits(units);
          if (
            units === undefined ||
            units === "millisecond" ||
            !this.isValid()
          ) {
            return this;
          }
          startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
          switch (units) {
            case "year":
              time = startOfDate(this.year() + 1, 0, 1) - 1;
              break;
            case "quarter":
              time =
                startOfDate(
                  this.year(),
                  this.month() - (this.month() % 3) + 3,
                  1
                ) - 1;
              break;
            case "month":
              time = startOfDate(this.year(), this.month() + 1, 1) - 1;
              break;
            case "week":
              time =
                startOfDate(
                  this.year(),
                  this.month(),
                  this.date() - this.weekday() + 7
                ) - 1;
              break;
            case "isoWeek":
              time =
                startOfDate(
                  this.year(),
                  this.month(),
                  this.date() - (this.isoWeekday() - 1) + 7
                ) - 1;
              break;
            case "day":
            case "date":
              time =
                startOfDate(this.year(), this.month(), this.date() + 1) - 1;
              break;
            case "hour":
              time = this._d.valueOf();
              time +=
                MS_PER_HOUR -
                mod$1(
                  time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                  MS_PER_HOUR
                ) -
                1;
              break;
            case "minute":
              time = this._d.valueOf();
              time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
              break;
            case "second":
              time = this._d.valueOf();
              time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
              break;
          }
          this._d.setTime(time);
          hooks.updateOffset(this, true);
          return this;
        }
        function valueOf() {
          return this._d.valueOf() - (this._offset || 0) * 6e4;
        }
        function unix() {
          return Math.floor(this.valueOf() / 1e3);
        }
        function toDate() {
          return new Date(this.valueOf());
        }
        function toArray() {
          var m = this;
          return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(),
          ];
        }
        function toObject() {
          var m = this;
          return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds(),
          };
        }
        function toJSON() {
          return this.isValid() ? this.toISOString() : null;
        }
        function isValid$2() {
          return isValid(this);
        }
        function parsingFlags() {
          return extend({}, getParsingFlags(this));
        }
        function invalidAt() {
          return getParsingFlags(this).overflow;
        }
        function creationData() {
          return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
          };
        }
        addFormatToken("N", 0, 0, "eraAbbr");
        addFormatToken("NN", 0, 0, "eraAbbr");
        addFormatToken("NNN", 0, 0, "eraAbbr");
        addFormatToken("NNNN", 0, 0, "eraName");
        addFormatToken("NNNNN", 0, 0, "eraNarrow");
        addFormatToken("y", ["y", 1], "yo", "eraYear");
        addFormatToken("y", ["yy", 2], 0, "eraYear");
        addFormatToken("y", ["yyy", 3], 0, "eraYear");
        addFormatToken("y", ["yyyy", 4], 0, "eraYear");
        addRegexToken("N", matchEraAbbr);
        addRegexToken("NN", matchEraAbbr);
        addRegexToken("NNN", matchEraAbbr);
        addRegexToken("NNNN", matchEraName);
        addRegexToken("NNNNN", matchEraNarrow);
        addParseToken(
          ["N", "NN", "NNN", "NNNN", "NNNNN"],
          function (input, array, config, token) {
            var era = config._locale.erasParse(input, token, config._strict);
            if (era) {
              getParsingFlags(config).era = era;
            } else {
              getParsingFlags(config).invalidEra = input;
            }
          }
        );
        addRegexToken("y", matchUnsigned);
        addRegexToken("yy", matchUnsigned);
        addRegexToken("yyy", matchUnsigned);
        addRegexToken("yyyy", matchUnsigned);
        addRegexToken("yo", matchEraYearOrdinal);
        addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
        addParseToken(["yo"], function (input, array, config, token) {
          var match;
          if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
          }
          if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
          } else {
            array[YEAR] = parseInt(input, 10);
          }
        });
        function localeEras(m, format) {
          var i,
            l,
            date,
            eras = this._eras || getLocale("en")._eras;
          for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
              case "string":
                date = hooks(eras[i].since).startOf("day");
                eras[i].since = date.valueOf();
                break;
            }
            switch (typeof eras[i].until) {
              case "undefined":
                eras[i].until = +Infinity;
                break;
              case "string":
                date = hooks(eras[i].until).startOf("day").valueOf();
                eras[i].until = date.valueOf();
                break;
            }
          }
          return eras;
        }
        function localeErasParse(eraName, format, strict) {
          var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
          eraName = eraName.toUpperCase();
          for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();
            if (strict) {
              switch (format) {
                case "N":
                case "NN":
                case "NNN":
                  if (abbr === eraName) {
                    return eras[i];
                  }
                  break;
                case "NNNN":
                  if (name === eraName) {
                    return eras[i];
                  }
                  break;
                case "NNNNN":
                  if (narrow === eraName) {
                    return eras[i];
                  }
                  break;
              }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
              return eras[i];
            }
          }
        }
        function localeErasConvertYear(era, year) {
          var dir = era.since <= era.until ? +1 : -1;
          if (year === undefined) {
            return hooks(era.since).year();
          } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
          }
        }
        function getEraName() {
          var i,
            l,
            val,
            eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].name;
            }
          }
          return "";
        }
        function getEraNarrow() {
          var i,
            l,
            val,
            eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].narrow;
            }
          }
          return "";
        }
        function getEraAbbr() {
          var i,
            l,
            val,
            eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            val = this.clone().startOf("day").valueOf();
            if (eras[i].since <= val && val <= eras[i].until) {
              return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
              return eras[i].abbr;
            }
          }
          return "";
        }
        function getEraYear() {
          var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;
            val = this.clone().startOf("day").valueOf();
            if (
              (eras[i].since <= val && val <= eras[i].until) ||
              (eras[i].until <= val && val <= eras[i].since)
            ) {
              return (
                (this.year() - hooks(eras[i].since).year()) * dir +
                eras[i].offset
              );
            }
          }
          return this.year();
        }
        function erasNameRegex(isStrict) {
          if (!hasOwnProp(this, "_erasNameRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasNameRegex : this._erasRegex;
        }
        function erasAbbrRegex(isStrict) {
          if (!hasOwnProp(this, "_erasAbbrRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasAbbrRegex : this._erasRegex;
        }
        function erasNarrowRegex(isStrict) {
          if (!hasOwnProp(this, "_erasNarrowRegex")) {
            computeErasParse.call(this);
          }
          return isStrict ? this._erasNarrowRegex : this._erasRegex;
        }
        function matchEraAbbr(isStrict, locale) {
          return locale.erasAbbrRegex(isStrict);
        }
        function matchEraName(isStrict, locale) {
          return locale.erasNameRegex(isStrict);
        }
        function matchEraNarrow(isStrict, locale) {
          return locale.erasNarrowRegex(isStrict);
        }
        function matchEraYearOrdinal(isStrict, locale) {
          return locale._eraYearOrdinalRegex || matchUnsigned;
        }
        function computeErasParse() {
          var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();
          for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));
            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
          }
          this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
          this._erasNameRegex = new RegExp(
            "^(" + namePieces.join("|") + ")",
            "i"
          );
          this._erasAbbrRegex = new RegExp(
            "^(" + abbrPieces.join("|") + ")",
            "i"
          );
          this._erasNarrowRegex = new RegExp(
            "^(" + narrowPieces.join("|") + ")",
            "i"
          );
        }
        addFormatToken(0, ["gg", 2], 0, function () {
          return this.weekYear() % 100;
        });
        addFormatToken(0, ["GG", 2], 0, function () {
          return this.isoWeekYear() % 100;
        });
        function addWeekYearFormatToken(token, getter) {
          addFormatToken(0, [token, token.length], 0, getter);
        }
        addWeekYearFormatToken("gggg", "weekYear");
        addWeekYearFormatToken("ggggg", "weekYear");
        addWeekYearFormatToken("GGGG", "isoWeekYear");
        addWeekYearFormatToken("GGGGG", "isoWeekYear");
        addUnitAlias("weekYear", "gg");
        addUnitAlias("isoWeekYear", "GG");
        addUnitPriority("weekYear", 1);
        addUnitPriority("isoWeekYear", 1);
        addRegexToken("G", matchSigned);
        addRegexToken("g", matchSigned);
        addRegexToken("GG", match1to2, match2);
        addRegexToken("gg", match1to2, match2);
        addRegexToken("GGGG", match1to4, match4);
        addRegexToken("gggg", match1to4, match4);
        addRegexToken("GGGGG", match1to6, match6);
        addRegexToken("ggggg", match1to6, match6);
        addWeekParseToken(
          ["gggg", "ggggg", "GGGG", "GGGGG"],
          function (input, week, config, token) {
            week[token.substr(0, 2)] = toInt(input);
          }
        );
        addWeekParseToken(["gg", "GG"], function (input, week, config, token) {
          week[token] = hooks.parseTwoDigitYear(input);
        });
        function getSetWeekYear(input) {
          return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
          );
        }
        function getSetISOWeekYear(input) {
          return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
          );
        }
        function getISOWeeksInYear() {
          return weeksInYear(this.year(), 1, 4);
        }
        function getISOWeeksInISOWeekYear() {
          return weeksInYear(this.isoWeekYear(), 1, 4);
        }
        function getWeeksInYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        }
        function getWeeksInWeekYear() {
          var weekInfo = this.localeData()._week;
          return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
        }
        function getSetWeekYearHelper(input, week, weekday, dow, doy) {
          var weeksTarget;
          if (input == null) {
            return weekOfYear(this, dow, doy).year;
          } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
              week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
          }
        }
        function setWeekAll(weekYear, week, weekday, dow, doy) {
          var dayOfYearData = dayOfYearFromWeeks(
              weekYear,
              week,
              weekday,
              dow,
              doy
            ),
            date = createUTCDate(
              dayOfYearData.year,
              0,
              dayOfYearData.dayOfYear
            );
          this.year(date.getUTCFullYear());
          this.month(date.getUTCMonth());
          this.date(date.getUTCDate());
          return this;
        }
        addFormatToken("Q", 0, "Qo", "quarter");
        addUnitAlias("quarter", "Q");
        addUnitPriority("quarter", 7);
        addRegexToken("Q", match1);
        addParseToken("Q", function (input, array) {
          array[MONTH] = (toInt(input) - 1) * 3;
        });
        function getSetQuarter(input) {
          return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
        }
        addFormatToken("D", ["DD", 2], "Do", "date");
        addUnitAlias("date", "D");
        addUnitPriority("date", 9);
        addRegexToken("D", match1to2);
        addRegexToken("DD", match1to2, match2);
        addRegexToken("Do", function (isStrict, locale) {
          return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
        });
        addParseToken(["D", "DD"], DATE);
        addParseToken("Do", function (input, array) {
          array[DATE] = toInt(input.match(match1to2)[0]);
        });
        var getSetDayOfMonth = makeGetSet("Date", true);
        addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
        addUnitAlias("dayOfYear", "DDD");
        addUnitPriority("dayOfYear", 4);
        addRegexToken("DDD", match1to3);
        addRegexToken("DDDD", match3);
        addParseToken(["DDD", "DDDD"], function (input, array, config) {
          config._dayOfYear = toInt(input);
        });
        function getSetDayOfYear(input) {
          var dayOfYear =
            Math.round(
              (this.clone().startOf("day") - this.clone().startOf("year")) /
                864e5
            ) + 1;
          return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
        }
        addFormatToken("m", ["mm", 2], 0, "minute");
        addUnitAlias("minute", "m");
        addUnitPriority("minute", 14);
        addRegexToken("m", match1to2);
        addRegexToken("mm", match1to2, match2);
        addParseToken(["m", "mm"], MINUTE);
        var getSetMinute = makeGetSet("Minutes", false);
        addFormatToken("s", ["ss", 2], 0, "second");
        addUnitAlias("second", "s");
        addUnitPriority("second", 15);
        addRegexToken("s", match1to2);
        addRegexToken("ss", match1to2, match2);
        addParseToken(["s", "ss"], SECOND);
        var getSetSecond = makeGetSet("Seconds", false);
        addFormatToken("S", 0, 0, function () {
          return ~~(this.millisecond() / 100);
        });
        addFormatToken(0, ["SS", 2], 0, function () {
          return ~~(this.millisecond() / 10);
        });
        addFormatToken(0, ["SSS", 3], 0, "millisecond");
        addFormatToken(0, ["SSSS", 4], 0, function () {
          return this.millisecond() * 10;
        });
        addFormatToken(0, ["SSSSS", 5], 0, function () {
          return this.millisecond() * 100;
        });
        addFormatToken(0, ["SSSSSS", 6], 0, function () {
          return this.millisecond() * 1e3;
        });
        addFormatToken(0, ["SSSSSSS", 7], 0, function () {
          return this.millisecond() * 1e4;
        });
        addFormatToken(0, ["SSSSSSSS", 8], 0, function () {
          return this.millisecond() * 1e5;
        });
        addFormatToken(0, ["SSSSSSSSS", 9], 0, function () {
          return this.millisecond() * 1e6;
        });
        addUnitAlias("millisecond", "ms");
        addUnitPriority("millisecond", 16);
        addRegexToken("S", match1to3, match1);
        addRegexToken("SS", match1to3, match2);
        addRegexToken("SSS", match1to3, match3);
        var token, getSetMillisecond;
        for (token = "SSSS"; token.length <= 9; token += "S") {
          addRegexToken(token, matchUnsigned);
        }
        function parseMs(input, array) {
          array[MILLISECOND] = toInt(("0." + input) * 1e3);
        }
        for (token = "S"; token.length <= 9; token += "S") {
          addParseToken(token, parseMs);
        }
        getSetMillisecond = makeGetSet("Milliseconds", false);
        addFormatToken("z", 0, 0, "zoneAbbr");
        addFormatToken("zz", 0, 0, "zoneName");
        function getZoneAbbr() {
          return this._isUTC ? "UTC" : "";
        }
        function getZoneName() {
          return this._isUTC ? "Coordinated Universal Time" : "";
        }
        var proto = Moment.prototype;
        proto.add = add;
        proto.calendar = calendar$1;
        proto.clone = clone;
        proto.diff = diff;
        proto.endOf = endOf;
        proto.format = format;
        proto.from = from;
        proto.fromNow = fromNow;
        proto.to = to;
        proto.toNow = toNow;
        proto.get = stringGet;
        proto.invalidAt = invalidAt;
        proto.isAfter = isAfter;
        proto.isBefore = isBefore;
        proto.isBetween = isBetween;
        proto.isSame = isSame;
        proto.isSameOrAfter = isSameOrAfter;
        proto.isSameOrBefore = isSameOrBefore;
        proto.isValid = isValid$2;
        proto.lang = lang;
        proto.locale = locale;
        proto.localeData = localeData;
        proto.max = prototypeMax;
        proto.min = prototypeMin;
        proto.parsingFlags = parsingFlags;
        proto.set = stringSet;
        proto.startOf = startOf;
        proto.subtract = subtract;
        proto.toArray = toArray;
        proto.toObject = toObject;
        proto.toDate = toDate;
        proto.toISOString = toISOString;
        proto.inspect = inspect;
        if (typeof Symbol !== "undefined" && Symbol.for != null) {
          proto[Symbol.for("nodejs.util.inspect.custom")] = function () {
            return "Moment<" + this.format() + ">";
          };
        }
        proto.toJSON = toJSON;
        proto.toString = toString;
        proto.unix = unix;
        proto.valueOf = valueOf;
        proto.creationData = creationData;
        proto.eraName = getEraName;
        proto.eraNarrow = getEraNarrow;
        proto.eraAbbr = getEraAbbr;
        proto.eraYear = getEraYear;
        proto.year = getSetYear;
        proto.isLeapYear = getIsLeapYear;
        proto.weekYear = getSetWeekYear;
        proto.isoWeekYear = getSetISOWeekYear;
        proto.quarter = proto.quarters = getSetQuarter;
        proto.month = getSetMonth;
        proto.daysInMonth = getDaysInMonth;
        proto.week = proto.weeks = getSetWeek;
        proto.isoWeek = proto.isoWeeks = getSetISOWeek;
        proto.weeksInYear = getWeeksInYear;
        proto.weeksInWeekYear = getWeeksInWeekYear;
        proto.isoWeeksInYear = getISOWeeksInYear;
        proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
        proto.date = getSetDayOfMonth;
        proto.day = proto.days = getSetDayOfWeek;
        proto.weekday = getSetLocaleDayOfWeek;
        proto.isoWeekday = getSetISODayOfWeek;
        proto.dayOfYear = getSetDayOfYear;
        proto.hour = proto.hours = getSetHour;
        proto.minute = proto.minutes = getSetMinute;
        proto.second = proto.seconds = getSetSecond;
        proto.millisecond = proto.milliseconds = getSetMillisecond;
        proto.utcOffset = getSetOffset;
        proto.utc = setOffsetToUTC;
        proto.local = setOffsetToLocal;
        proto.parseZone = setOffsetToParsedOffset;
        proto.hasAlignedHourOffset = hasAlignedHourOffset;
        proto.isDST = isDaylightSavingTime;
        proto.isLocal = isLocal;
        proto.isUtcOffset = isUtcOffset;
        proto.isUtc = isUtc;
        proto.isUTC = isUtc;
        proto.zoneAbbr = getZoneAbbr;
        proto.zoneName = getZoneName;
        proto.dates = deprecate(
          "dates accessor is deprecated. Use date instead.",
          getSetDayOfMonth
        );
        proto.months = deprecate(
          "months accessor is deprecated. Use month instead",
          getSetMonth
        );
        proto.years = deprecate(
          "years accessor is deprecated. Use year instead",
          getSetYear
        );
        proto.zone = deprecate(
          "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
          getSetZone
        );
        proto.isDSTShifted = deprecate(
          "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
          isDaylightSavingTimeShifted
        );
        function createUnix(input) {
          return createLocal(input * 1e3);
        }
        function createInZone() {
          return createLocal.apply(null, arguments).parseZone();
        }
        function preParsePostFormat(string) {
          return string;
        }
        var proto$1 = Locale.prototype;
        proto$1.calendar = calendar;
        proto$1.longDateFormat = longDateFormat;
        proto$1.invalidDate = invalidDate;
        proto$1.ordinal = ordinal;
        proto$1.preparse = preParsePostFormat;
        proto$1.postformat = preParsePostFormat;
        proto$1.relativeTime = relativeTime;
        proto$1.pastFuture = pastFuture;
        proto$1.set = set;
        proto$1.eras = localeEras;
        proto$1.erasParse = localeErasParse;
        proto$1.erasConvertYear = localeErasConvertYear;
        proto$1.erasAbbrRegex = erasAbbrRegex;
        proto$1.erasNameRegex = erasNameRegex;
        proto$1.erasNarrowRegex = erasNarrowRegex;
        proto$1.months = localeMonths;
        proto$1.monthsShort = localeMonthsShort;
        proto$1.monthsParse = localeMonthsParse;
        proto$1.monthsRegex = monthsRegex;
        proto$1.monthsShortRegex = monthsShortRegex;
        proto$1.week = localeWeek;
        proto$1.firstDayOfYear = localeFirstDayOfYear;
        proto$1.firstDayOfWeek = localeFirstDayOfWeek;
        proto$1.weekdays = localeWeekdays;
        proto$1.weekdaysMin = localeWeekdaysMin;
        proto$1.weekdaysShort = localeWeekdaysShort;
        proto$1.weekdaysParse = localeWeekdaysParse;
        proto$1.weekdaysRegex = weekdaysRegex;
        proto$1.weekdaysShortRegex = weekdaysShortRegex;
        proto$1.weekdaysMinRegex = weekdaysMinRegex;
        proto$1.isPM = localeIsPM;
        proto$1.meridiem = localeMeridiem;
        function get$1(format, index, field, setter) {
          var locale = getLocale(),
            utc = createUTC().set(setter, index);
          return locale[field](utc, format);
        }
        function listMonthsImpl(format, index, field) {
          if (isNumber(format)) {
            index = format;
            format = undefined;
          }
          format = format || "";
          if (index != null) {
            return get$1(format, index, field, "month");
          }
          var i,
            out = [];
          for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, "month");
          }
          return out;
        }
        function listWeekdaysImpl(localeSorted, format, index, field) {
          if (typeof localeSorted === "boolean") {
            if (isNumber(format)) {
              index = format;
              format = undefined;
            }
            format = format || "";
          } else {
            format = localeSorted;
            index = format;
            localeSorted = false;
            if (isNumber(format)) {
              index = format;
              format = undefined;
            }
            format = format || "";
          }
          var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];
          if (index != null) {
            return get$1(format, (index + shift) % 7, field, "day");
          }
          for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, "day");
          }
          return out;
        }
        function listMonths(format, index) {
          return listMonthsImpl(format, index, "months");
        }
        function listMonthsShort(format, index) {
          return listMonthsImpl(format, index, "monthsShort");
        }
        function listWeekdays(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, "weekdays");
        }
        function listWeekdaysShort(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, "weekdaysShort");
        }
        function listWeekdaysMin(localeSorted, format, index) {
          return listWeekdaysImpl(localeSorted, format, index, "weekdaysMin");
        }
        getSetGlobalLocale("en", {
          eras: [
            {
              since: "0001-01-01",
              until: +Infinity,
              offset: 1,
              name: "Anno Domini",
              narrow: "AD",
              abbr: "AD",
            },
            {
              since: "0000-12-31",
              until: -Infinity,
              offset: 1,
              name: "Before Christ",
              narrow: "BC",
              abbr: "BC",
            },
          ],
          dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal: function (number) {
            var b = number % 10,
              output =
                toInt((number % 100) / 10) === 1
                  ? "th"
                  : b === 1
                  ? "st"
                  : b === 2
                  ? "nd"
                  : b === 3
                  ? "rd"
                  : "th";
            return number + output;
          },
        });
        hooks.lang = deprecate(
          "moment.lang is deprecated. Use moment.locale instead.",
          getSetGlobalLocale
        );
        hooks.langData = deprecate(
          "moment.langData is deprecated. Use moment.localeData instead.",
          getLocale
        );
        var mathAbs = Math.abs;
        function abs() {
          var data = this._data;
          this._milliseconds = mathAbs(this._milliseconds);
          this._days = mathAbs(this._days);
          this._months = mathAbs(this._months);
          data.milliseconds = mathAbs(data.milliseconds);
          data.seconds = mathAbs(data.seconds);
          data.minutes = mathAbs(data.minutes);
          data.hours = mathAbs(data.hours);
          data.months = mathAbs(data.months);
          data.years = mathAbs(data.years);
          return this;
        }
        function addSubtract$1(duration, input, value, direction) {
          var other = createDuration(input, value);
          duration._milliseconds += direction * other._milliseconds;
          duration._days += direction * other._days;
          duration._months += direction * other._months;
          return duration._bubble();
        }
        function add$1(input, value) {
          return addSubtract$1(this, input, value, 1);
        }
        function subtract$1(input, value) {
          return addSubtract$1(this, input, value, -1);
        }
        function absCeil(number) {
          if (number < 0) {
            return Math.floor(number);
          } else {
            return Math.ceil(number);
          }
        }
        function bubble() {
          var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;
          if (
            !(
              (milliseconds >= 0 && days >= 0 && months >= 0) ||
              (milliseconds <= 0 && days <= 0 && months <= 0)
            )
          ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
          }
          data.milliseconds = milliseconds % 1e3;
          seconds = absFloor(milliseconds / 1e3);
          data.seconds = seconds % 60;
          minutes = absFloor(seconds / 60);
          data.minutes = minutes % 60;
          hours = absFloor(minutes / 60);
          data.hours = hours % 24;
          days += absFloor(hours / 24);
          monthsFromDays = absFloor(daysToMonths(days));
          months += monthsFromDays;
          days -= absCeil(monthsToDays(monthsFromDays));
          years = absFloor(months / 12);
          months %= 12;
          data.days = days;
          data.months = months;
          data.years = years;
          return this;
        }
        function daysToMonths(days) {
          return (days * 4800) / 146097;
        }
        function monthsToDays(months) {
          return (months * 146097) / 4800;
        }
        function as(units) {
          if (!this.isValid()) {
            return NaN;
          }
          var days,
            months,
            milliseconds = this._milliseconds;
          units = normalizeUnits(units);
          if (units === "month" || units === "quarter" || units === "year") {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
              case "month":
                return months;
              case "quarter":
                return months / 3;
              case "year":
                return months / 12;
            }
          } else {
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
              case "week":
                return days / 7 + milliseconds / 6048e5;
              case "day":
                return days + milliseconds / 864e5;
              case "hour":
                return days * 24 + milliseconds / 36e5;
              case "minute":
                return days * 1440 + milliseconds / 6e4;
              case "second":
                return days * 86400 + milliseconds / 1e3;
              case "millisecond":
                return Math.floor(days * 864e5) + milliseconds;
              default:
                throw new Error("Unknown unit " + units);
            }
          }
        }
        function valueOf$1() {
          if (!this.isValid()) {
            return NaN;
          }
          return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
          );
        }
        function makeAs(alias) {
          return function () {
            return this.as(alias);
          };
        }
        var asMilliseconds = makeAs("ms"),
          asSeconds = makeAs("s"),
          asMinutes = makeAs("m"),
          asHours = makeAs("h"),
          asDays = makeAs("d"),
          asWeeks = makeAs("w"),
          asMonths = makeAs("M"),
          asQuarters = makeAs("Q"),
          asYears = makeAs("y");
        function clone$1() {
          return createDuration(this);
        }
        function get$2(units) {
          units = normalizeUnits(units);
          return this.isValid() ? this[units + "s"]() : NaN;
        }
        function makeGetter(name) {
          return function () {
            return this.isValid() ? this._data[name] : NaN;
          };
        }
        var milliseconds = makeGetter("milliseconds"),
          seconds = makeGetter("seconds"),
          minutes = makeGetter("minutes"),
          hours = makeGetter("hours"),
          days = makeGetter("days"),
          months = makeGetter("months"),
          years = makeGetter("years");
        function weeks() {
          return absFloor(this.days() / 7);
        }
        var round = Math.round,
          thresholds = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
        function substituteTimeAgo(
          string,
          number,
          withoutSuffix,
          isFuture,
          locale
        ) {
          return locale.relativeTime(
            number || 1,
            !!withoutSuffix,
            string,
            isFuture
          );
        }
        function relativeTime$1(
          posNegDuration,
          withoutSuffix,
          thresholds,
          locale
        ) {
          var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as("s")),
            minutes = round(duration.as("m")),
            hours = round(duration.as("h")),
            days = round(duration.as("d")),
            months = round(duration.as("M")),
            weeks = round(duration.as("w")),
            years = round(duration.as("y")),
            a =
              (seconds <= thresholds.ss && ["s", seconds]) ||
              (seconds < thresholds.s && ["ss", seconds]) ||
              (minutes <= 1 && ["m"]) ||
              (minutes < thresholds.m && ["mm", minutes]) ||
              (hours <= 1 && ["h"]) ||
              (hours < thresholds.h && ["hh", hours]) ||
              (days <= 1 && ["d"]) ||
              (days < thresholds.d && ["dd", days]);
          if (thresholds.w != null) {
            a =
              a ||
              (weeks <= 1 && ["w"]) ||
              (weeks < thresholds.w && ["ww", weeks]);
          }
          a = a ||
            (months <= 1 && ["M"]) ||
            (months < thresholds.M && ["MM", months]) ||
            (years <= 1 && ["y"]) || ["yy", years];
          a[2] = withoutSuffix;
          a[3] = +posNegDuration > 0;
          a[4] = locale;
          return substituteTimeAgo.apply(null, a);
        }
        function getSetRelativeTimeRounding(roundingFunction) {
          if (roundingFunction === undefined) {
            return round;
          }
          if (typeof roundingFunction === "function") {
            round = roundingFunction;
            return true;
          }
          return false;
        }
        function getSetRelativeTimeThreshold(threshold, limit) {
          if (thresholds[threshold] === undefined) {
            return false;
          }
          if (limit === undefined) {
            return thresholds[threshold];
          }
          thresholds[threshold] = limit;
          if (threshold === "s") {
            thresholds.ss = limit - 1;
          }
          return true;
        }
        function humanize(argWithSuffix, argThresholds) {
          if (!this.isValid()) {
            return this.localeData().invalidDate();
          }
          var withSuffix = false,
            th = thresholds,
            locale,
            output;
          if (typeof argWithSuffix === "object") {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
          }
          if (typeof argWithSuffix === "boolean") {
            withSuffix = argWithSuffix;
          }
          if (typeof argThresholds === "object") {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
              th.ss = argThresholds.s - 1;
            }
          }
          locale = this.localeData();
          output = relativeTime$1(this, !withSuffix, th, locale);
          if (withSuffix) {
            output = locale.pastFuture(+this, output);
          }
          return locale.postformat(output);
        }
        var abs$1 = Math.abs;
        function sign(x) {
          return (x > 0) - (x < 0) || +x;
        }
        function toISOString$1() {
          if (!this.isValid()) {
            return this.localeData().invalidDate();
          }
          var seconds = abs$1(this._milliseconds) / 1e3,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;
          if (!total) {
            return "P0D";
          }
          minutes = absFloor(seconds / 60);
          hours = absFloor(minutes / 60);
          seconds %= 60;
          minutes %= 60;
          years = absFloor(months / 12);
          months %= 12;
          s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, "") : "";
          totalSign = total < 0 ? "-" : "";
          ymSign = sign(this._months) !== sign(total) ? "-" : "";
          daysSign = sign(this._days) !== sign(total) ? "-" : "";
          hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
          return (
            totalSign +
            "P" +
            (years ? ymSign + years + "Y" : "") +
            (months ? ymSign + months + "M" : "") +
            (days ? daysSign + days + "D" : "") +
            (hours || minutes || seconds ? "T" : "") +
            (hours ? hmsSign + hours + "H" : "") +
            (minutes ? hmsSign + minutes + "M" : "") +
            (seconds ? hmsSign + s + "S" : "")
          );
        }
        var proto$2 = Duration.prototype;
        proto$2.isValid = isValid$1;
        proto$2.abs = abs;
        proto$2.add = add$1;
        proto$2.subtract = subtract$1;
        proto$2.as = as;
        proto$2.asMilliseconds = asMilliseconds;
        proto$2.asSeconds = asSeconds;
        proto$2.asMinutes = asMinutes;
        proto$2.asHours = asHours;
        proto$2.asDays = asDays;
        proto$2.asWeeks = asWeeks;
        proto$2.asMonths = asMonths;
        proto$2.asQuarters = asQuarters;
        proto$2.asYears = asYears;
        proto$2.valueOf = valueOf$1;
        proto$2._bubble = bubble;
        proto$2.clone = clone$1;
        proto$2.get = get$2;
        proto$2.milliseconds = milliseconds;
        proto$2.seconds = seconds;
        proto$2.minutes = minutes;
        proto$2.hours = hours;
        proto$2.days = days;
        proto$2.weeks = weeks;
        proto$2.months = months;
        proto$2.years = years;
        proto$2.humanize = humanize;
        proto$2.toISOString = toISOString$1;
        proto$2.toString = toISOString$1;
        proto$2.toJSON = toISOString$1;
        proto$2.locale = locale;
        proto$2.localeData = localeData;
        proto$2.toIsoString = deprecate(
          "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
          toISOString$1
        );
        proto$2.lang = lang;
        addFormatToken("X", 0, 0, "unix");
        addFormatToken("x", 0, 0, "valueOf");
        addRegexToken("x", matchSigned);
        addRegexToken("X", matchTimestamp);
        addParseToken("X", function (input, array, config) {
          config._d = new Date(parseFloat(input) * 1e3);
        });
        addParseToken("x", function (input, array, config) {
          config._d = new Date(toInt(input));
        });
        hooks.version = "2.29.1";
        setHookCallback(createLocal);
        hooks.fn = proto;
        hooks.min = min;
        hooks.max = max;
        hooks.now = now;
        hooks.utc = createUTC;
        hooks.unix = createUnix;
        hooks.months = listMonths;
        hooks.isDate = isDate;
        hooks.locale = getSetGlobalLocale;
        hooks.invalid = createInvalid;
        hooks.duration = createDuration;
        hooks.isMoment = isMoment;
        hooks.weekdays = listWeekdays;
        hooks.parseZone = createInZone;
        hooks.localeData = getLocale;
        hooks.isDuration = isDuration;
        hooks.monthsShort = listMonthsShort;
        hooks.weekdaysMin = listWeekdaysMin;
        hooks.defineLocale = defineLocale;
        hooks.updateLocale = updateLocale;
        hooks.locales = listLocales;
        hooks.weekdaysShort = listWeekdaysShort;
        hooks.normalizeUnits = normalizeUnits;
        hooks.relativeTimeRounding = getSetRelativeTimeRounding;
        hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
        hooks.calendarFormat = getCalendarFormat;
        hooks.prototype = proto;
        hooks.HTML5_FMT = {
          DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
          DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
          DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
          DATE: "YYYY-MM-DD",
          TIME: "HH:mm",
          TIME_SECONDS: "HH:mm:ss",
          TIME_MS: "HH:mm:ss.SSS",
          WEEK: "GGGG-[W]WW",
          MONTH: "YYYY-MM",
        };
        return hooks;
      });
    }).call(exports, __webpack_require__(9)(module));
  },
  function (module, exports, __webpack_require__) {
    var map = {
      "./en-au": 41,
      "./en-au.js": 41,
      "./en-ca": 42,
      "./en-ca.js": 42,
      "./en-gb": 43,
      "./en-gb.js": 43,
      "./en-ie": 44,
      "./en-ie.js": 44,
      "./en-il": 45,
      "./en-il.js": 45,
      "./en-in": 46,
      "./en-in.js": 46,
      "./en-nz": 47,
      "./en-nz.js": 47,
      "./en-sg": 48,
      "./en-sg.js": 48,
    };
    function webpackContext(req) {
      return __webpack_require__(webpackContextResolve(req));
    }
    function webpackContextResolve(req) {
      return (
        map[req] ||
        (function () {
          throw new Error("Cannot find module '" + req + "'.");
        })()
      );
    }
    webpackContext.keys = function webpackContextKeys() {
      return Object.keys(map);
    };
    webpackContext.resolve = webpackContextResolve;
    module.exports = webpackContext;
    webpackContext.id = 40;
  },
  function (module, exports, __webpack_require__) {
    (function (global, factory) {
      true
        ? factory(__webpack_require__(39))
        : typeof define === "function" && define.amd
        ? define(["../moment"], factory)
        : factory(global.moment);
    })(this, function (moment) {
      "use strict";
      var enAu = moment.defineLocale("en-au", {
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
          "_"
        ),
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A",
        },
        calendar: {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L",
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
          var b = number % 10,
            output =
              ~~((number % 100) / 10) === 1
                ? "th"
                : b === 1
                ? "st"
                : b === 2
                ? "nd"
                : b === 3
                ? "rd"
                : "th";
          return number + output;
        },
        week: { dow: 0, doy: 4 },
      });
      return enAu;
    });
  },
  function (module, exports, __webpack_require__) {
    (function (global, factory) {
      true
        ? factory(__webpack_require__(39))
        : typeof define === "function" && define.amd
        ? define(["../moment"], factory)
        : factory(global.moment);
    })(this, function (moment) {
      "use strict";
      var enCa = moment.defineLocale("en-ca", {
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
          "_"
        ),
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "YYYY-MM-DD",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY h:mm A",
          LLLL: "dddd, MMMM D, YYYY h:mm A",
        },
        calendar: {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L",
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
          var b = number % 10,
            output =
              ~~((number % 100) / 10) === 1
                ? "th"
                : b === 1
                ? "st"
                : b === 2
                ? "nd"
                : b === 3
                ? "rd"
                : "th";
          return number + output;
        },
      });
      return enCa;
    });
  },
  function (module, exports, __webpack_require__) {
    (function (global, factory) {
      true
        ? factory(__webpack_require__(39))
        : typeof define === "function" && define.amd
        ? define(["../moment"], factory)
        : factory(global.moment);
    })(this, function (moment) {
      "use strict";
      var enGb = moment.defineLocale("en-gb", {
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
          "_"
        ),
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm",
        },
        calendar: {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L",
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
          var b = number % 10,
            output =
              ~~((number % 100) / 10) === 1
                ? "th"
                : b === 1
                ? "st"
                : b === 2
                ? "nd"
                : b === 3
                ? "rd"
                : "th";
          return number + output;
        },
        week: { dow: 1, doy: 4 },
      });
      return enGb;
    });
  },
  function (module, exports, __webpack_require__) {
    (function (global, factory) {
      true
        ? factory(__webpack_require__(39))
        : typeof define === "function" && define.amd
        ? define(["../moment"], factory)
        : factory(global.moment);
    })(this, function (moment) {
      "use strict";
      var enIe = moment.defineLocale("en-ie", {
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
          "_"
        ),
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm",
        },
        calendar: {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L",
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
          var b = number % 10,
            output =
              ~~((number % 100) / 10) === 1
                ? "th"
                : b === 1
                ? "st"
                : b === 2
                ? "nd"
                : b === 3
                ? "rd"
                : "th";
          return number + output;
        },
        week: { dow: 1, doy: 4 },
      });
      return enIe;
    });
  },
  function (module, exports, __webpack_require__) {
    (function (global, factory) {
      true
        ? factory(__webpack_require__(39))
        : typeof define === "function" && define.amd
        ? define(["../moment"], factory)
        : factory(global.moment);
    })(this, function (moment) {
      "use strict";
      var enIl = moment.defineLocale("en-il", {
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
          "_"
        ),
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm",
        },
        calendar: {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L",
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
          var b = number % 10,
            output =
              ~~((number % 100) / 10) === 1
                ? "th"
                : b === 1
                ? "st"
                : b === 2
                ? "nd"
                : b === 3
                ? "rd"
                : "th";
          return number + output;
        },
      });
      return enIl;
    });
  },
  function (module, exports, __webpack_require__) {
    (function (global, factory) {
      true
        ? factory(__webpack_require__(39))
        : typeof define === "function" && define.amd
        ? define(["../moment"], factory)
        : factory(global.moment);
    })(this, function (moment) {
      "use strict";
      var enIn = moment.defineLocale("en-in", {
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
          "_"
        ),
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A",
        },
        calendar: {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L",
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
          var b = number % 10,
            output =
              ~~((number % 100) / 10) === 1
                ? "th"
                : b === 1
                ? "st"
                : b === 2
                ? "nd"
                : b === 3
                ? "rd"
                : "th";
          return number + output;
        },
        week: { dow: 0, doy: 6 },
      });
      return enIn;
    });
  },
  function (module, exports, __webpack_require__) {
    (function (global, factory) {
      true
        ? factory(__webpack_require__(39))
        : typeof define === "function" && define.amd
        ? define(["../moment"], factory)
        : factory(global.moment);
    })(this, function (moment) {
      "use strict";
      var enNz = moment.defineLocale("en-nz", {
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
          "_"
        ),
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A",
        },
        calendar: {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L",
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
          var b = number % 10,
            output =
              ~~((number % 100) / 10) === 1
                ? "th"
                : b === 1
                ? "st"
                : b === 2
                ? "nd"
                : b === 3
                ? "rd"
                : "th";
          return number + output;
        },
        week: { dow: 1, doy: 4 },
      });
      return enNz;
    });
  },
  function (module, exports, __webpack_require__) {
    (function (global, factory) {
      true
        ? factory(__webpack_require__(39))
        : typeof define === "function" && define.amd
        ? define(["../moment"], factory)
        : factory(global.moment);
    })(this, function (moment) {
      "use strict";
      var enSg = moment.defineLocale("en-sg", {
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split(
          "_"
        ),
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        longDateFormat: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm",
        },
        calendar: {
          sameDay: "[Today at] LT",
          nextDay: "[Tomorrow at] LT",
          nextWeek: "dddd [at] LT",
          lastDay: "[Yesterday at] LT",
          lastWeek: "[Last] dddd [at] LT",
          sameElse: "L",
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          ss: "%d seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
        dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
        ordinal: function (number) {
          var b = number % 10,
            output =
              ~~((number % 100) / 10) === 1
                ? "th"
                : b === 1
                ? "st"
                : b === 2
                ? "nd"
                : b === 3
                ? "rd"
                : "th";
          return number + output;
        },
        week: { dow: 1, doy: 4 },
      });
      return enSg;
    });
  },
  function (module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mergeQueryParams = undefined;
    var _extends =
      Object.assign ||
      function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
    var _queryString = __webpack_require__(26);
    var _queryString2 = _interopRequireDefault(_queryString);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var mergeQueryParams = (exports.mergeQueryParams =
      function mergeQueryParams() {
        var locationQueryString =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : "";
        var sessionStorageQueryString =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : "";
        var parsedLocationQueryParams =
          _queryString2.default.parse(locationQueryString);
        var parsedSessionStorageParams = _queryString2.default.parse(
          sessionStorageQueryString
        );
        return _queryString2.default.stringify(
          _extends({}, parsedSessionStorageParams, parsedLocationQueryParams)
        );
      });
  },
]);
