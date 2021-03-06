(function ensightenInit() {
  var ensightenOptions = {
    client: "sperry",
    clientId: 1931,
    publishPath: "prod",
    isPublic: 1,
    serverComponentLocation: "nexus.ensighten.com/sperry/prod/serverComponent.php",
    staticJavascriptPath: "nexus.ensighten.com/sperry/prod/code/",
    ns: 'Bootstrapper',
    nexus: "nexus.ensighten.com",
    scUseCacheBuster: "true",
    enableTagAuditBeacon: "true",
    enablePagePerfBeacon: "true",
    registryNs: "ensBootstraps",
    generatedOn: "Thu Jul 13 16:28:37 GMT 2017",
    beaconSamplingSeedValue: 11
  };
  if (!window[ensightenOptions.ns]) {
    window[ensightenOptions.ns] || (window[ensightenOptions.registryNs] || (window[ensightenOptions.registryNs] = {}), window[ensightenOptions.registryNs][ensightenOptions.ns] = window[ensightenOptions.ns] = function (g) {
      function m(a) {
        this.name = "DependencyNotAvailableException";
        this.message = "Dependency with id " + a + "is missing"
      }

      function n(a) {
        this.name = "BeaconException";
        this.message = "There was an error durring beacon initialization";
        a = a || {};
        this.lineNumber = a.lineNumber || a.line;
        this.fileName = a.fileName
      }

      function p() {
        for (var a =
          b.dataDefinitionIds.length, d = !0, e = 0; e < a; e++) {
          var c = b.dataDefinitions[b.dataDefinitionIds[e]];
          if (!c || null == c.endRegistration) {
            d = !1;
            break
          }
        }
        d && b.callOnDataDefintionComplete()
      }

      var c = {}, b = {};
      b.ensightenOptions = ensightenOptions;
      b.scDataObj = {};
      c.version = "1.26.0";
      c.nexus = g.nexus || "nexus.ensighten.com";
      c.rand = -1;
      c.currSec = (new Date).getSeconds();
      c.options = {
        interval: g.interval || 100,
        erLoc: g.errorLocation || c.nexus + "/error/e.gif",
        scLoc: g.serverComponentLocation || c.nexus + "/" + g.client + "/serverComponent.php",
        sjPath: g.staticJavascriptPath ||
        c.nexus + "/" + g.client + "/code/",
        alLoc: g.alertLocation || c.nexus + "/alerts/a.gif",
        publishPath: g.publishPath,
        isPublic: g.isPublic,
        client: g.client,
        clientId: g.clientId,
        enableTagAuditBeacon: g.enableTagAuditBeacon,
        scUseCacheBuster: g.scUseCacheBuster,
        beaconSamplingSeedValue: g.beaconSamplingSeedValue || -1
      };
      c.ruleList = [];
      c.allDeploymentIds = [];
      c.runDeploymentIds = [];
      c.runRuleIds = [];
      c.exceptionList = [];
      c.ensightenVariables = {};
      c.test = function (a) {
        if (!(a.executionData.hasRun || a.executionData.runTime && 0 < a.executionData.runTime.length)) {
          for (var d =
            0; d < a.dependencies.length; d++) if (!1 === a.dependencies[d]()) return;
          a.execute()
        }
      };
      m.prototype = Error();
      m.prototype || (m.prototype = {});
      m.prototype.constructor = m;
      c.DependencyNotAvailableException = m;
      n.prototype = Error();
      n.prototype || (n.prototype = {});
      n.prototype.constructor = n;
      c.BeaconException = n;
      c.checkForInvalidDependencies = function (a, d, e, l) {
        for (a = 0; a < e.length; a++) if ("DEPENDENCYNEVERAVAILABLE" === e[a]) return b.currentRuleId = this.id, b.currentDeploymentId = this.deploymentId, b.reportException(new c.DependencyNotAvailableException(l[a])),
        d && -1 !== d && c.allDeploymentIds.push(d), !0;
        return !1
      };
      b.currentRuleId = -1;
      b.currentDeploymentId = -1;
      b.reportedErrors = [];
      b.reportedAlerts = [];
      b.AF = [];
      b._serverTime = "";
      b._clientIP = "";
      b.sampleBeacon = function () {
        var a = !1;
        try {
          var d = (c.currSec || 0) % 20, b = c.options.beaconSamplingSeedValue;
          -1 === b ? a = !0 : 0 !== d && 0 === b % d && (a = !0)
        } catch (l) {
        }
        return a
      };
      b.getServerComponent = function (a) {
        b.callOnGetServerComponent();
        b.insertScript(window.location.protocol + "//" + c.options.scLoc, !1, a || !0, c.options.scUseCacheBuster)
      };
      b.setVariable =
        function (a, b) {
          c.ensightenVariables[a] = b
        };
      b.getVariable = function (a) {
        return a in c.ensightenVariables ? c.ensightenVariables[a] : null
      };
      b.testAll = function () {
        for (var a = 0; a < c.ruleList.length; a++) c.test(c.ruleList[a])
      };
      b.executionState = {
        DOMParsed: !1,
        DOMLoaded: !1,
        dataDefinitionComplete: !1,
        conditionalRules: !1,
        readyForServerComponent: !1
      };
      b.reportException = function (a) {
        a.timestamp = (new Date).getTime();
        c.exceptionList.push(a);
        a = window.location.protocol + "//" + c.options.erLoc + "?msg=" + encodeURIComponent(a.message ||
          "") + "&lnn=" + encodeURIComponent(a.lineNumber || a.line || -1) + "&fn=" + encodeURIComponent(a.fileName || "") + "&cid=" + encodeURIComponent(c.options.clientId || -1) + "&client=" + encodeURIComponent(c.options.client || "") + "&publishPath=" + encodeURIComponent(c.options.publishPath || "") + "&rid=" + encodeURIComponent(b.currentRuleId || -1) + "&did=" + encodeURIComponent(b.currentDeploymentId || -1) + "&errorName=" + encodeURIComponent(a.name || "");
        a = b.imageRequest(a);
        a.timestamp = (new Date).getTime();
        this.reportedErrors.push(a)
      };
      b.Rule = function (a) {
        this.execute =
          function () {
            this.executionData.runTime.push(new Date);
            b.currentRuleId = this.id;
            b.currentDeploymentId = this.deploymentId;
            try {
              this.code()
            } catch (d) {
              window[ensightenOptions.ns].reportException(d)
            } finally {
              this.executionData.hasRun = !0, -1 !== this.deploymentId && (c.runDeploymentIds.push(this.deploymentId), c.runRuleIds.push(this.id)), b.testAll()
            }
          };
        this.id = a.id;
        this.deploymentId = a.deploymentId;
        this.dependencies = a.dependencies || [];
        this.code = a.code;
        this.executionData = {hasRun: !1, runTime: []}
      };
      b.registerRule = function (a) {
        if (b.getRule(a.id) &&
          -1 !== a.id) return !1;
        c.ruleList.push(a);
        -1 !== a.deploymentId && c.allDeploymentIds.push(a.deploymentId);
        b.testAll();
        return !0
      };
      b.getRule = function (a) {
        for (var b = 0; b < c.ruleList.length; b++) if (c.ruleList[b].id === a) return c.ruleList[b];
        return !1
      };

      b.getAllDeploymentIds = function () {
        return c.allDeploymentIds
      };
      b.getRunRuleIds = function () {
        return c.runRuleIds
      };
      b.getRunDeploymentIds = function () {
        return c.runDeploymentIds
      };
      b.hasRuleRun =
        function (a) {
          return (a = b.getRule(a)) ? a.executionData.hasRun : !1
        };
      c.toTwoChar = function (a) {
        return (2 === a.toString().length ? "" : "0") + a
      };
      b.Alert = function (a) {
        var b = new Date,
          b = b.getFullYear() + "-" + c.toTwoChar(b.getMonth()) + "-" + c.toTwoChar(b.getDate()) + " " + c.toTwoChar(b.getHours()) + ":" + c.toTwoChar(b.getMinutes()) + ":" + c.toTwoChar(b.getSeconds());
        this.severity = a.severity || 1;
        this.subject = a.subject || "";
        this.type = a.type || 1;
        this.ruleId = a.ruleId || -1;
        this.severity = encodeURIComponent(this.severity);
        this.date = encodeURIComponent(b);
        this.subject = encodeURIComponent(this.subject);
        this.type = encodeURIComponent(this.type)
      };
      b.generateAlert = function (a) {
        a = b.imageRequest(window.location.protocol + "//" + c.options.alLoc + "?d=" + a.date + "&su=" + a.subject + "&se=" + a.severity + "&t=" + a.type + "&cid=" + c.options.clientId + "&client=" + c.options.client + "&publishPath=" + c.options.publishPath + "&rid=" + b.currentRuleId + "&did=" + b.currentDeploymentId);
        a.timestamp = (new Date).getTime();
        this.reportedAlerts.push(a)
      };
      b.imageRequest = function (a) {
        var b = new Image(0, 0);
        b.src =
          a;
        return b
      };
      b.insertScript = function (a, d, e, l) {
        var h, f = document.getElementsByTagName("script");
        l = void 0 !== l ? l : !0;
        if (void 0 !== d ? d : 1) for (h = 0; h < f.length; h++) if (f[h].src === a && f[h].readyState && /loaded|complete/.test(f[h].readyState)) return;
        if (e) {
          e = 1 == e && "object" == typeof b.scDataObj ? b.scDataObj : e;
          c.rand = Math.random() * ("1E" + (10 * Math.random()).toFixed(0));
          d = window.location.href;
          "object" === typeof e && e.PageID && (d = e.PageID, delete e.PageID);
          if ("object" === typeof e) for (h in e) {
            h = ~d.indexOf("#") ? d.slice(d.indexOf("#"),
              d.length) : "";
            d = d.slice(0, h.length ? d.length - h.length : d.length);
            d += ~d.indexOf("?") ? "&" : "?";
            for (k in e) d += k + "=" + e[k] + "&";
            d = d.slice(0, -1) + h;
            break
          }
          a += "?";
          l && (a += "r=" + c.rand + "&");
          a += "ClientID=" + encodeURIComponent(c.options.clientId) + "&PageID=" + encodeURIComponent(d)
        }
        (function (a, b, d) {
          var e = b.head || b.getElementsByTagName("head");
          setTimeout(function () {
            if ("item" in e) {
              if (!e[0]) {
                setTimeout(arguments.callee, 25);
                return
              }
              e = e[0]
            }
            var a = b.createElement("script");
            a.src = d;
            a.onload = a.onerror = function () {
              this.addEventListener &&
              (this.readyState = "loaded")
            };
            e.insertBefore(a, e.firstChild)
          }, 0)
        })(window, document, a)
      };
      b.loadScriptCallback = function (a, b, e) {
        var d = document.getElementsByTagName("script"), c;
        e = d[0];
        for (c = 0; c < d.length; c++) if (d[c].src === a && d[c].readyState && /loaded|complete/.test(d[c].readyState)) try {
          b()
        } catch (f) {
          window[ensightenOptions.ns].reportException(f)
        } finally {
          return
        }
        d = document.createElement("script");
        d.type = "text/javascript";
        d.async = !0;
        d.src = a;
        d.onerror = function () {
          this.addEventListener && (this.readyState = "loaded")
        };
        d.onload = d.onreadystatechange = function () {
          if (!this.readyState || "complete" === this.readyState || "loaded" === this.readyState) {
            this.onload = this.onreadystatechange = null;
            this.addEventListener && (this.readyState = "loaded");
            try {
              b.call(this)
            } catch (f) {
              window[ensightenOptions.ns].reportException(f)
            }
          }
        };
        e.parentNode.insertBefore(d, e)
      };
      b.unobtrusiveAddEvent = function (a, b, e) {
        try {
          var d = a[b] ? a[b] : function () {
          };
          a[b] = function () {
            e.apply(this, arguments);
            return d.apply(this, arguments)
          }
        } catch (h) {
          window[ensightenOptions.ns].reportException(h)
        }
      };
      b.anonymous = function (a, d) {
        return function () {
          try {
            b.currentRuleId = d ? d : "anonymous", a()
          } catch (e) {
            window[ensightenOptions.ns].reportException(e)
          }
        }
      };
      b.setCurrentRuleId = function (a) {
        b.currentRuleId = a
      };
      b.setCurrentDeploymentId = function (a) {
        b.currentDeploymentId = a
      };
      b.bindImmediate = function (a, d, e) {
        if ("function" === typeof a) a = new b.Rule({
          id: d || -1,
          deploymentId: e || -1,
          dependencies: [],
          code: a
        }); else if ("object" !== typeof a) return !1;
        b.registerRule(a)
      };
      b.bindDOMParsed = function (a, d, e) {
        if ("function" === typeof a) a = new b.Rule({
          id: d ||
          -1, deploymentId: e || -1, dependencies: [function () {
            return window[ensightenOptions.ns].executionState.DOMParsed
          }], code: a
        }); else if ("object" !== typeof a) return !1;
        b.registerRule(a)
      };
      b.bindDOMLoaded = function (a, d, e) {
        if ("function" === typeof a) a = new b.Rule({
          id: d || -1,
          deploymentId: e || -1,
          dependencies: [function () {
            return window[ensightenOptions.ns].executionState.DOMLoaded
          }],
          code: a
        }); else if ("object" !== typeof a) return !1;
        b.registerRule(a)
      };
      b.bindPageSpecificCompletion = function (a, d, e) {
        if ("function" === typeof a) a = new b.Rule({
          id: d ||
          -1, deploymentId: e || -1, dependencies: [function () {
            return window[ensightenOptions.ns].executionState.conditionalRules
          }], code: a
        }); else if ("object" !== typeof a) return !1;
        b.registerRule(a)
      };
      b.bindOnGetServerComponent = function (a, d, e) {
        if ("function" === typeof a) a = new b.Rule({
          id: d || -1,
          deploymentId: e || -1,
          dependencies: [function () {
            return window[ensightenOptions.ns].executionState.readyForServerComponent
          }],
          code: a
        }); else if ("object" !== typeof a) return !1;
        b.registerRule(a)
      };
      b.bindDataDefinitionComplete = function (a, d, e) {
        if ("function" ===
          typeof a) a = new b.Rule({
          id: d || -1, deploymentId: e || -1, dependencies: [function () {
            return window[ensightenOptions.ns].executionState.dataDefinitionComplete
          }], code: a
        }); else if ("object" !== typeof a) return !1;
        b.registerRule(a)
      };
      b.checkHasRun = function (a) {
        if (0 === a.length) return !0;
        for (var d, e = 0; e < a.length; ++e) if (d = b.getRule(parseInt(a[e], 10)), !d || !d.executionData.hasRun) return !1;
        return !0
      };
      b.bindDependencyImmediate = function (a, d, e, l, h) {
        var f = [];
        if (!c.checkForInvalidDependencies(d, l, e, h)) {
          f.push(function () {
            return window[ensightenOptions.ns].checkHasRun(e)
          });
          if ("function" === typeof a) a = new b.Rule({
            id: d || -1,
            deploymentId: l || -1,
            dependencies: f,
            code: a
          }); else if ("object" !== typeof a) return !1;
          b.registerRule(a)
        }
      };
      b.bindDependencyDOMLoaded = function (a, d, e, l, h) {
        var f = [];
        if (!c.checkForInvalidDependencies(d, l, e, h)) {
          f.push(function () {
            return window[ensightenOptions.ns].executionState.DOMLoaded
          });
          f.push(function () {
            return window[ensightenOptions.ns].checkHasRun(e)
          });
          if ("function" === typeof a) a = new b.Rule({
            id: d || -1,
            deploymentId: l || -1,
            dependencies: f,
            code: a
          }); else if ("object" !==
            typeof a) return !1;
          b.registerRule(a)
        }
      };
      b.bindDependencyDOMParsed = function (a, d, e, l, h) {
        var f = [];
        if (!c.checkForInvalidDependencies(d, l, e, h)) {
          f.push(function () {
            return window[ensightenOptions.ns].executionState.DOMParsed
          });
          f.push(function () {
            return window[ensightenOptions.ns].checkHasRun(e)
          });
          if ("function" === typeof a) a = new b.Rule({
            id: d || -1,
            deploymentId: l || -1,
            dependencies: f,
            code: a
          }); else if ("object" !== typeof a) return !1;
          b.registerRule(a)
        }
      };
      b.bindDependencyPageSpecificCompletion = function (a, d, e, l, h) {
        var f = [];
        if (!c.checkForInvalidDependencies(d, l, e, h)) {
          f.push(function () {
            return window[ensightenOptions.ns].executionState.conditionalRules
          });
          f.push(function () {
            return window[ensightenOptions.ns].checkHasRun(e)
          });
          if ("function" === typeof a) a = new b.Rule({
            id: d || -1,
            deploymentId: l || -1,
            dependencies: f,
            code: a
          }); else if ("object" !== typeof a) return !1;
          b.registerRule(a)
        }
      };
      b.bindDependencyOnGetServerComponent = function (a, d, e, l, h) {
        var f = [];
        if (!c.checkForInvalidDependencies(d, l, e, h)) {
          f.push(function () {
            return window[ensightenOptions.ns].executionState.readyForServerComponent
          });
          f.push(function () {
            return window[ensightenOptions.ns].checkHasRun(e)
          });
          if ("function" === typeof a) a = new b.Rule({
            id: d || -1,
            deploymentId: l || -1,
            dependencies: f,
            code: a
          }); else if ("object" !== typeof a) return !1;
          b.registerRule(a)
        }
      };
      b.bindDependencyPageSpecificCompletion = function (a, d, e, l, h) {
        var f = [];
        if (!c.checkForInvalidDependencies(d, l, e, h)) {
          f.push(function () {
            return window[ensightenOptions.ns].executionState.dataDefinitionComplete
          });
          f.push(function () {
            return window[ensightenOptions.ns].checkHasRun(e)
          });
          if ("function" ===
            typeof a) a = new b.Rule({
            id: d || -1,
            deploymentId: l || -1,
            dependencies: f,
            code: a
          }); else if ("object" !== typeof a) return !1;
          b.registerRule(a)
        }
      };
      b.dataDefintionIds = [];
      b.dataDefinitions = [];
      b.pageSpecificDataDefinitionsSet = !1;
      b.setPageSpecificDataDefinitionIds = function (a) {
        for (var d = a.length, e = 0; e < d; e++) {
          var c = a[e];
          if (Array.prototype.indexOf) -1 == b.dataDefinitionIds.indexOf(c) && b.dataDefinitionIds.push(c); else {
            for (var h = !1, f = b.dataDefinitionIds.length, g = 0; g < f; g++) if (b.dataDefinitionIds[g] === c) {
              h = !0;
              break
            }
            h || b.dataDefinitionIds.push(c)
          }
        }
        b.pageSpecificDataDefinitionsSet =
          !0;
        p()
      };
      b.DataDefinition = function (a, b) {
        this.id = a;
        this.registrationFn = b;
        this.endRegistrationTime = this.startRegistrationTime = null;
        this.startRegistration = function () {
          this.startRegistrationTime = new Date
        };
        this.endRegistration = function () {
          this.endRegistrationTime = new Date
        }
      };
      b.registerDataDefinition = function (a, d) {
        var e = b.dataDefinitions[d];
        e || (e = new b.DataDefinition(d, a), b.dataDefinitions[d] = e);
        e.startRegistrationTime || (e.startRegistration(), e.registrationFn(), e.endRegistration());
        b.pageSpecificDataDefinitionsSet &&
        p()
      };
      b.callOnDataDefintionComplete = function () {
        b.executionState.dataDefinitionComplete = !0;
        b.testAll()
      };
      b.callOnDOMParsed = function () {
        window[ensightenOptions.ns].executionState.DOMParsed = !0;
        window[ensightenOptions.ns].testAll()
      };
      b.callOnDOMLoaded = function () {
        window[ensightenOptions.ns].executionState.DOMParsed = !0;
        window[ensightenOptions.ns].executionState.DOMLoaded = !0;
        window[ensightenOptions.ns].testAll()
      };
      b.callOnPageSpecificCompletion = function () {
        for (var a = document.getElementsByTagName("script"), b = 0,
               e = a.length; b < e; b++) if (a[b].src && a[b].src.match(/\.ensighten\.com\/(.+?)\/code\/.*/i) && "loaded" != a[b].readyState && "complete" != a[b].readyState) {
          setTimeout(window[ensightenOptions.ns].callOnPageSpecificCompletion, 50);
          return
        }
        setTimeout(function () {
          window[ensightenOptions.ns].executionState.conditionalRules = !0;
          window[ensightenOptions.ns].testAll()
        }, 1)
      };
      b.callOnGetServerComponent = function () {
        window[ensightenOptions.ns].executionState.readyForServerComponent = !0;
        window[ensightenOptions.ns].testAll()
      };
      b.hasDOMParsed =
        function () {
          return window[ensightenOptions.ns].executionState.DOMParsed
        };
      b.hasDOMLoaded = function () {
        return window[ensightenOptions.ns].executionState.DOMLoaded
      };
      b.hasPageSpecificCompletion = function () {
        return window[ensightenOptions.ns].executionState.conditionalRules
      };
      var r = function () {
        var a = [], b = !1, e = !1;
        return {
          add: function (d) {
            b && !e ? d() : "function" == typeof d && (a[a.length] = d)
          }, exec: function () {
            e = !0;
            do {
              var d = a;
              a = [];
              b = !0;
              for (var c = 0; c < d.length; c++) try {
                d[c].call(window)
              } catch (f) {
                window[ensightenOptions.ns].reportException(f)
              }
            } while (0 <
            a.length);
            e = !1
          }, haveRun: function () {
            return b
          }
        }
      };
      b.new_fArray = function () {
        return r()
      };
      c.timer = null;
      (function () {
        function a(a, b) {
          return function () {
            a.apply(b, arguments)
          }
        }

        window.console || (window.console = {});
        var b = window.console;
        if (!b.log) if (window.log4javascript) {
          var c = log4javascript.getDefaultLogger();
          b.log = a(c.info, c);
          b.debug = a(c.debug, c);
          b.info = a(c.info, c);
          b.warn = a(c.warn, c);
          b.error = a(c.error, c)
        } else b.log = function () {
        };
        b.debug || (b.debug = b.log);
        b.info || (b.info = b.log);
        b.warn || (b.warn = b.log);
        b.error || (b.error =
          b.log)
      })();
      document.addEventListener ? (-1 < navigator.userAgent.indexOf("AppleWebKit/") ? c.timer = window.setInterval(function () {
        /loaded|interactive|complete/.test(document.readyState) && (clearInterval(c.timer), b.callOnDOMParsed())
      }, 50) : document.addEventListener("DOMContentLoaded", b.callOnDOMParsed, !1), window.addEventListener("load", b.callOnDOMLoaded, !1)) : (setTimeout(function () {
        var a = window.document;
        (function () {
          try {
            if (!document.body) throw"continue";
            a.documentElement.doScroll("left")
          } catch (d) {
            setTimeout(arguments.callee,
              15);
            return
          }
          window[ensightenOptions.ns].callOnDOMParsed()
        })()
      }, 1), window.attachEvent("onload", function () {
        window[ensightenOptions.ns].callOnDOMLoaded()
      }));
      "true" === c.options.enableTagAuditBeacon && b.sampleBeacon() && window.setTimeout(function () {
        if (window[ensightenOptions.ns] && !window[ensightenOptions.ns].mobilePlatform) try {
          for (var a = [], d, e, l, h, f = 0; f < c.ruleList.length; ++f) e = c.ruleList[f], l = e.executionData.hasRun ? "1" : "0", h = e.deploymentId.toString() + "|" + e.id.toString() + "|" + l, a.push(h);
          d = "[" + a.join(";") +
            "]";
          var m = window.location.protocol + "//" + c.nexus + "/" + encodeURIComponent(g.client) + "/" + encodeURIComponent(g.publishPath) + "/TagAuditBeacon.rnc?cid=" + encodeURIComponent(g.clientId) + "&data=" + d + "&idx=0&r=" + c.rand;
          b.imageRequest(m)
        } catch (q) {
          b.currentRuleId = -1, b.currentDeploymentId = -1, a = new c.BeaconException(q), window[ensightenOptions.ns].reportException(a)
        }
      }, 3E3);
      window.setInterval(b.testAll, c.options.interval);
      return b
    }(ensightenOptions), "true" === ensightenOptions.enablePagePerfBeacon && window[ensightenOptions.ns] &&
    window[ensightenOptions.ns].sampleBeacon() && window[ensightenOptions.ns].bindDOMParsed(function () {
      if (!window[ensightenOptions.ns].mobilePlatform) {
        var g = window.performance;
        if (g) {
          var g = g.timing || {}, m = g.navigationStart || 0, n = {
            connectEnd: "ce",
            connectStart: "cs",
            domComplete: "dc",
            domContentLoadedEventEnd: "dclee",
            domContentLoadedEventStart: "dcles",
            domInteractive: "di",
            domLoading: "dl",
            domainLookupEnd: "dle",
            domainLookupStart: "dls",
            fetchStart: "fs",
            loadEventEnd: "lee",
            loadEventStart: "les",
            redirectEnd: "rede",
            redirectStart: "reds",
            requestStart: "reqs",
            responseStart: "resps",
            responseEnd: "respe",
            secureConnectionStart: "scs",
            unloadEventStart: "ues",
            unloadEventEnd: "uee"
          };
          var p = "&ns=" + encodeURIComponent(g.navigationStart);
          for (var c in n) if (void 0 !== g[c]) {
            var b = g[c] - m;
            p += "&" + n[c] + "=" + (0 < b ? encodeURIComponent(b) : 0)
          } else p += "&" + n[c] + "=-1";
          window[ensightenOptions.ns].timing = p;
          c = ensightenOptions.nexus || "nexus.ensighten.com";
          g = ensightenOptions.staticJavascriptPath || "";
          p = g.indexOf(".com/");
          m = g.indexOf("/code/");
          g = g.substring(p + 4, m) + "/perf.rnc";
          g += "?cid=" + encodeURIComponent(ensightenOptions.clientId) + window[ensightenOptions.ns].timing;
          window[ensightenOptions.ns].imageRequest("//" + c + g)
        }
      }
    }));

    if (!window[ensightenOptions.ns].data) {
      /*
 MIT License (c) copyright 2011-2013 original author or authors  MIT License (c) copyright 2013 original author or authors */
      window.JSON && "object" === typeof JSON || (window[ensightenOptions.ns].JSON = {});
      (function () {
        function c(a) {
          return 10 > a ? "0" + a : a
        }

        function m(a) {
          h.lastIndex = 0;
          return h.test(a) ? '"' + a.replace(h, function (a) {
            var d = g[a];
            return "string" === typeof d ? d : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
          }) + '"' : '"' + a + '"'
        }

        function l(g, d) {
          var c, b, e, p, h = k, u, t = d[g];
          t && "object" === typeof t && "function" === typeof t.toJSON && (t = t.toJSON(g));
          "function" === typeof f && (t = f.call(d, g, t));
          switch (typeof t) {
            case "string":
              return m(t);
            case "number":
              return isFinite(t) ? String(t) : "null";
            case "boolean":
            case "null":
              return String(t);
            case "object":
              if (!t) return "null";
              k += a;
              u = [];
              if ("[object Array]" === Object.prototype.toString.apply(t)) {
                p = t.length;
                for (c = 0; c < p; c += 1) u[c] = l(c, t) || "null";
                e = 0 === u.length ? "[]" : k ? "[\n" + k + u.join(",\n" + k) + "\n" + h + "]" : "[" + u.join(",") + "]";
                k = h;
                return e
              }
              if (f && "object" === typeof f) for (p = f.length, c = 0; c < p; c += 1) "string" === typeof f[c] && (b = f[c], (e = l(b, t)) && u.push(m(b) + (k ? ": " : ":") + e)); else for (b in t) Object.prototype.hasOwnProperty.call(t, b) && (e = l(b, t)) && u.push(m(b) + (k ? ": " : ":") + e);
              e = 0 === u.length ? "{}" : k ? "{\n" + k + u.join(",\n" +
                k) + "\n" + h + "}" : "{" + u.join(",") + "}";
              k = h;
              return e
          }
        }

        var b = window.JSON ? window.JSON : window[ensightenOptions.ns].JSON;
        "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
          return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + c(this.getUTCMonth() + 1) + "-" + c(this.getUTCDate()) + "T" + c(this.getUTCHours()) + ":" + c(this.getUTCMinutes()) + ":" + c(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
          return this.valueOf()
        });
        var e =
            /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          h = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          k, a,
          g = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"},
          f;
        "function" !== typeof b.stringify && (b.stringify = function (c, d, b) {
          var g;
          a = k = "";
          if ("number" === typeof b) for (g = 0; g < b; g += 1) a += " "; else "string" === typeof b && (a = b);
          if ((f = d) && "function" !== typeof d &&
            ("object" !== typeof d || "number" !== typeof d.length)) throw Error("JSON.stringify");
          return l("", {"": c})
        });
        "function" !== typeof b.parse && (b.parse = function (a, d) {
          function c(a, b) {
            var g, f, e = a[b];
            if (e && "object" === typeof e) for (g in e) Object.prototype.hasOwnProperty.call(e, g) && (f = c(e, g), void 0 !== f ? e[g] = f : delete e[g]);
            return d.call(a, b, e)
          }

          var b;
          a = String(a);
          e.lastIndex = 0;
          e.test(a) && (a = a.replace(e, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
          }));
          if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return b = eval("(" + a + ")"), "function" === typeof d ? c({"": b}, "") : b;
          throw new SyntaxError("JSON.parse");
        })
      })();
      window[ensightenOptions.ns].when = function () {
        function c(a, d, b, c) {
          return l(a).then(d, b, c)
        }

        function m(a) {
          this.then = a
        }

        function l(a) {
          return b(function (d) {
            d(a)
          })
        }

        function b(d) {
          function c(a) {
            r && (p = e(a), g(r, p), r = w)
          }

          function f(a) {
            c(k(a))
          }

          function n(d) {
            r && g(r, a(d))
          }

          var p, r = [];
          try {
            d(c, f, n)
          } catch (H) {
            f(H)
          }
          return new m(function (a, d, c) {
            return b(function (b, f, g) {
              r ? r.push(function (e) {
                e.then(a, d, c).then(b, f, g)
              }) : q(function () {
                p.then(a, d, c).then(b, f, g)
              })
            })
          })
        }

        function e(a) {
          return a instanceof m ? a : a !== Object(a) ? h(a) : b(function (d,
                                                                           c, b) {
            q(function () {
              try {
                var f = a.then;
                "function" === typeof f ? B(f, a, d, c, b) : d(h(a))
              } catch (A) {
                c(A)
              }
            })
          })
        }

        function h(a) {
          var d = new m(function (c) {
            try {
              return "function" == typeof c ? e(c(a)) : d
            } catch (G) {
              return k(G)
            }
          });
          return d
        }

        function k(a) {
          var d = new m(function (c, b) {
            try {
              return "function" == typeof b ? e(b(a)) : d
            } catch (I) {
              return k(I)
            }
          });
          return d
        }

        function a(d) {
          var c = new m(function (b, f, g) {
            try {
              return "function" == typeof g ? a(g(d)) : c
            } catch (A) {
              return a(A)
            }
          });
          return c
        }

        function g(a, d) {
          q(function () {
            for (var c, b = 0; c = a[b++];) c(d)
          })
        }

        function f(a,
                   d, f, g, e) {
          r(2, arguments);
          return c(a, function (a) {
            return b(function (b, f, g) {
              function e(a) {
                k(a)
              }

              function q(a) {
                h(a)
              }

              var n, p, r, t, h, k, l, z;
              l = a.length >>> 0;
              n = Math.max(0, Math.min(d, l));
              r = [];
              p = l - n + 1;
              t = [];
              if (n) for (k = function (a) {
                t.push(a);
                --p || (h = k = v, f(t))
              }, h = function (a) {
                r.push(a);
                --n || (h = k = v, b(r))
              }, z = 0; z < l; ++z) z in a && c(a[z], q, e, g); else b(r)
            }).then(f, g, e)
          })
        }

        function p(a, c, b, f) {
          r(1, arguments);
          return d(a, E).then(c, b, f)
        }

        function d(a, d) {
          return c(a, function (a) {
            return b(function (b, f, g) {
              var e, q, n, p, r;
              n = q = a.length >>> 0;
              e = [];
              if (n) for (p = function (a, q) {
                c(a, d).then(function (a) {
                  e[q] = a;
                  --n || b(e)
                }, f, g)
              }, r = 0; r < q; r++) r in a ? p(a[r], r) : --n; else b(e)
            })
          })
        }

        function q(a) {
          1 === x.push(a) && C(n)
        }

        function n() {
          for (var a, d = 0; a = x[d++];) a();
          x = []
        }

        function r(a, d) {
          for (var c, b = d.length; b > a;) if (c = d[--b], null != c && "function" != typeof c) throw Error("arg " + b + " must be a function");
        }

        function v() {
        }

        function E(a) {
          return a
        }

        c.defer = function () {
          var a, d, c;
          a = {promise: w, resolve: w, reject: w, notify: w, resolver: {resolve: w, reject: w, notify: w}};
          a.promise = d = b(function (b,
                                      f, g) {
            a.resolve = a.resolver.resolve = function (a) {
              if (c) return l(a);
              c = !0;
              b(a);
              return d
            };
            a.reject = a.resolver.reject = function (a) {
              if (c) return l(k(a));
              c = !0;
              f(a);
              return d
            };
            a.notify = a.resolver.notify = function (a) {
              g(a);
              return a
            }
          });
          return a
        };
        c.resolve = l;
        c.reject = function (a) {
          return c(a, k)
        };
        c.join = function () {
          return d(arguments, E)
        };
        c.all = p;
        c.map = d;
        c.reduce = function (a, d) {
          var b = B(t, arguments, 1);
          return c(a, function (a) {
            var f;
            f = a.length;
            b[0] = function (a, b, g) {
              return c(a, function (a) {
                return c(b, function (b) {
                  return d(a, b, g,
                    f)
                })
              })
            };
            return u.apply(a, b)
          })
        };
        c.any = function (a, d, b, c) {
          return f(a, 1, function (a) {
            return d ? d(a[0]) : a[0]
          }, b, c)
        };
        c.some = f;
        c.isPromise = function (a) {
          return a && "function" === typeof a.then
        };
        m.prototype = {
          otherwise: function (a) {
            return this.then(w, a)
          }, ensure: function (a) {
            function d() {
              return l(a())
            }

            return this.then(d, d).yield(this)
          }, yield: function (a) {
            return this.then(function () {
              return a
            })
          }, spread: function (a) {
            return this.then(function (d) {
              return p(d, function (d) {
                return a.apply(w, d)
              })
            })
          }, always: function (a, d) {
            return this.then(a,
              a, d)
          }
        };
        var u, t, B, C, x, F, y, D, w;
        x = [];
        F = setTimeout;
        C = "function" === typeof setImmediate ? "undefined" === typeof window ? setImmediate : setImmediate.bind(window) : "object" === typeof process && process.nextTick ? process.nextTick : function (a) {
          F(a, 0)
        };
        y = Function.prototype;
        D = y.call;
        B = y.bind ? D.bind(D) : function (a, d) {
          return a.apply(d, t.call(arguments, 2))
        };
        y = [];
        t = y.slice;
        u = y.reduce || function (a) {
          var d, b, c, f;
          f = 0;
          d = Object(this);
          c = d.length >>> 0;
          b = arguments;
          if (1 >= b.length) for (; ;) {
            if (f in d) {
              b = d[f++];
              break
            }
            if (++f >= c) throw new TypeError;
          } else b = b[1];
          for (; f < c; ++f) f in d && (b = a(b, d[f], f, d));
          return b
        };
        return c
      }();
      (function () {
        function c(b, c) {
          return l.all(c || [], function (c) {
            return b.apply(null, c)
          })
        }

        function m(e) {
          var h = b.call(arguments, 1);
          return function () {
            return c(e, h.concat(b.call(arguments)))
          }
        }

        var l, b;
        l = window[ensightenOptions.ns].when;
        b = [].slice;
        l.apply = c;
        l.call = function (e) {
          return c(e, b.call(arguments, 1))
        };
        l.lift = m;
        l.bind = m;
        l.compose = function (e) {
          var h = b.call(arguments, 1);
          return function () {
            var k = b.call(arguments), k = c(e, k);
            return l.reduce(h, function (a, b) {
              return b(a)
            }, k)
          }
        }
      })();
      window[ensightenOptions.ns].data = function (c, m) {
        function l(a, b) {
          this.name = "DataDefinitionException";
          this.message = b || "Data definitions cannot be resolved as there are invalid id(s): " + a
        }

        var b = {
          engines: {
            memory: {
              get: function (a) {
                if (e.utils.isArray(a)) {
                  for (var g = [], f = 0; f < a.length; f++) g.push(b.data[a[f]]);
                  return c[ensightenOptions.ns].when.resolve(g)
                }
                g = b.dataDefinitions[a] || {
                  storage: {
                    get: function () {
                    }
                  }
                };
                g = g.storage.get(g);
                b.data[a] = g;
                return c[ensightenOptions.ns].when.resolve(b.data[a])
              }, set: function (a, g) {
                if (e.utils.isArray(a)) for (var f in a) b.data[a[f]] =
                  g[f]; else b.data[a] = g;
                return c[ensightenOptions.ns].when.resolve(!0)
              }, remove: function (a) {
                if (e.utils.isArray(a)) for (var g in a) delete b.data[a[g]]; else delete b.data[a];
                return c[ensightenOptions.ns].when.resolve(!0)
              }, clear: function (a) {
                b.data = {};
                b.definitions = {};
                return c[ensightenOptions.ns].when.resolve(!0)
              }, all: function () {
                return c[ensightenOptions.ns].when.resolve(b.data)
              }
            }
          }, normalizeInputArgs: function (a, b) {
            var c = {key: [], val: m}, g;
            if (e.utils.isPlainObject(a)) for (g in c.val = [], a) c.key.push(g), c.val.push(a[g]);
            else e.utils.isArray(a), c.key = a, c.val = b;
            return c
          }, definitions: {}, data: {}
        }, e = {
          utils: {
            isPlainObject: function (a) {
              return !!a && "[object Object]" === Object.prototype.toString.call(a)
            }, isArray: function (a) {
              return "[object Array]" === Object.prototype.toString.call(a)
            }, escapeRegEx: function (a) {
              try {
                return a.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1")
              } catch (g) {
                return a
              }
            }
          }
        }, h = function () {
          return c[ensightenOptions.ns].when.reject("Not Implemented.")
        };
        l.prototype = Error();
        l.prototype || (l.prototype = {});
        l.prototype.constructor =
          l;
        b.DataDefinitionException = l;
        b.checkForInvalidDataDefinitions = function (a) {
          e.utils.isArray(a) || (a = [a]);
          return a && 0 < a.length && (a = a.join(","), -1 < a.indexOf("invalid_id")) ? (c[ensightenOptions.ns].reportException(new b.DataDefinitionException(a)), !0) : !1
        };
        b.collectAvailableDataDefinitions = function (a) {
          for (var g = [], f = 0; f < a.length; f++) {
            var p = parseInt(a[f], 10), d = c[ensightenOptions.ns].dataDefinitions[p];
            if (null === d || d === m) if (d = e.storage.session.get({id: p}), null !== d && d !== m) e.set(p, d), b.dataDefinitions[p] = {
              id: p,
              load: "visitor", storage: e.storage.visitor, missingDDFromCache: !0
            }, g.push(c[ensightenOptions.ns].data.get("" + p)); else return c[ensightenOptions.ns].reportException(new b.DataDefinitionException(a, "Invalid data definition used: " + p)), {
              promises: [],
              isInvalid: !0
            }; else g.push(c[ensightenOptions.ns].data.get(a[f]))
          }
          return {promises: g, isInvalid: !1}
        };
        b.getSync = function (a) {
          function g(a) {
            var b = a.extract || p, c = a.transform || d, g = !1, e = null, q = null;
            try {
              e = b()
            } catch (x) {
              e = null, g = !0
            }
            try {
              q = c(e)
            } catch (x) {
              q = null, g = !0
            }
            g && f.push(a.id);
            return q
          }

          var f = [], p = function () {
            return document
          }, d = function (a) {
            return null !== a && a !== m ? a.toString() : null
          }, q = parseInt(a);
          a = "string" === typeof a ? a.split(".") : [];
          var n = {}, r = "";
          isNaN(q) ? 3 == a.length && (n = e.getDataDefinitionBySourceCollectionName(a[0], a[1], a[2])) : n = e.getDataDefinitionById(q);
          r = n.load && n.load.match(/(session|visitor)/i) && n.storage && n.storage.get ? n.storage.get(n) : g(n);
          0 < f.length && c[ensightenOptions.ns].reportException(new b.DataDefinitionException(f, "Error resolving data definitions synchronously: " +
            f));
          return r
        };
        b.dataDefinitions = {};
        b.dataDefinitionsBySourceCollName = {};
        e.defineEngine = function (a, g) {
          var f, e = ["get", "set", "remove", "clear", "all"];
          b.engines[a] = g;
          if (!g.returnsPromise) for (f = 0; f < e.length; f++) {
            var d = e[f];
            g[d] = c[ensightenOptions.ns].when.lift(g[d])
          }
        };
        e.storage = {
          instance: {
            set: function (a, b) {
            }, get: function (a) {
              return b.getSync(a.id)
            }
          }, page: {
            set: function (a, b) {
            }, get: function (a) {
              return b.data[a.id]
            }
          }, session: {
            set: function (a, b) {
              var f = e.storage.session.get({id: a}), g = new Date, d = g.getTime();
              g.setTime(d +
                18E5);
              null != f && (b = f);
              c[ensightenOptions.ns].data.cookie.utils.set(a, b, {expires: g.toGMTString()});
              f = {expires: g.getTime(), value: b};
              c[ensightenOptions.ns].data.local.utils.set(a, f)
            }, get: function (a) {
              var b = c[ensightenOptions.ns].data.cookie.utils.get(a.id),
                f = c.JSON && c.JSON.stringify ? c.JSON : c[ensightenOptions.ns].JSON, f = f || {}, e,
                d = new Date, d = d.getTime();
              if (null === b) {
                try {
                  e = f.parse(c[ensightenOptions.ns].data.local.utils.get(a.id))
                } catch (q) {
                  e = null
                }
                null != e && (e.expires = +e.expires, d <= e.expires ? b = e.value : "" ==
                e.expires && e.value != m ? b = e.value : c[ensightenOptions.ns].data.local.utils.remove(a.id))
              }
              return b
            }
          }, visitor: {
            set: function (a, b) {
              var f = e.storage.session.get({id: a});
              null != f && (b = f);
              c[ensightenOptions.ns].data.cookie.utils.set(a, b);
              c[ensightenOptions.ns].data.local.utils.set(a, {expires: "", value: b})
            }, get: function (a) {
              return e.storage.session.get(a)
            }
          }
        };
        e.getEngine = e.engine = function (a) {
          return a ? b.engines[a] || {get: h, set: h, remove: h, clear: h, all: h} : b.engines
        };
        e.all = function (a) {
          return c[ensightenOptions.ns].data.engine(a ||
            "memory").all()
        };
        e.get = function (a, e, f) {
          e = e || "memory";
          f = f || {};
          -1 < a.indexOf(",") && (a = a.split(","));
          a = b.normalizeInputArgs(a);
          return f.wait ? b.getWait(a.key, c[ensightenOptions.ns].data.engine(e), f) : b.data && b.data.hasOwnProperty(a.key) ? c[ensightenOptions.ns].data.engine(e).get(a.key) : b.getWaitForKey(a.key, c[ensightenOptions.ns].data.engine(e), f)
        };
        b.getWait = function (a, b, f) {
          var g = +new Date, d = c[ensightenOptions.ns].when.defer(), q = function () {
            var c = b.get(a);
            if (-1 === f.wait) return c;
            c.then(function (a) {
              f.setCheck(a) ?
                d.resolve(a) : setTimeout(n, f.interval)
            }, function (a) {
              setTimeout(n, f.interval)
            })
          }, n = function () {
            var a = +new Date - g;
            -1 !== f.wait && a < f.wait ? q() : d.reject("Timeout")
          };
          f.interval = f.interval || 500;
          f.wait = f.wait || 5E3;
          e.utils.isArray(a) ? f.setCheck = f.setCheck || function (a) {
            for (var b = !0, d = 0; d < a.length; d++) b = b && !!a[d];
            return b
          } : f.setCheck = f.setCheck || function (a) {
            return !!a
          };
          q();
          return d.promise
        };
        b.getWaitForKey = function (a, e, f) {
          var g = c[ensightenOptions.ns].when.defer(), d = function () {
            if (b.data && b.data.hasOwnProperty(a)) {
              var d =
                e.get(a);
              if (-1 === f.wait) return d;
              d.then(function (a) {
                g.resolve(a)
              }, function (a) {
                g.reject(a)
              })
            } else setTimeout(q, f.interval)
          }, q = function () {
            d()
          };
          f.interval = f.interval || 100;
          f.wait = f.wait || 1;
          d();
          return g.promise
        };
        e.set = function (a, e, f) {
          var g = b.normalizeInputArgs(a, e);
          Array.prototype.slice.call(arguments);
          return c[ensightenOptions.ns].data.engine(f || "memory").set(g.key, g.val)
        };
        e.remove = function (a, b) {
          return c[ensightenOptions.ns].data.engine(b || "memory").remove(a)
        };
        e.clear = function (a) {
          return c[ensightenOptions.ns].data.engine(a ||
            "memory").clear()
        };
        e.define = function (a, g) {
          g && (a.name = g.id || g.name);
          if (!a.name) return c[ensightenOptions.ns].when.reject(Error("Invalid parameters: missing 'name'"));
          a.id = a.name;
          var f = a.load || "page";
          a.load = a.load || "javascript";
          a.load = -1 < a.load.indexOf("javascript") ? a.load : a.load + ",javascript";
          a.trigger = a.trigger || function () {
            return c[ensightenOptions.ns].when.resolve()
          };
          a.priv = a.priv || !1;
          a.collection = a.collection || "Data Layer";
          a.persist = c[ensightenOptions.ns].data.engine("memory");
          a.storage = e.storage[f.toLowerCase()] ||
            e.storage.page;
          var h = a.extract || function () {
            return document
          }, d = a.transform || function (a) {
            return a
          }, q = function (b, d) {
            var e = [];
            e.push(a.persist.set(b, d));
            a.storage.set(a.id, d);
            "object" == typeof c[ensightenOptions.ns].data.dataExport && c[ensightenOptions.ns].data.dataExport(b, d, a.collection);
            c[ensightenOptions.ns].when.all(e).then(function (a) {
              n.resolve(a)
            }, function (a) {
              n.reject(a)
            })
          }, n = c[ensightenOptions.ns].when.defer(), r;
          try {
            r = a.trigger()
          } catch (v) {
            c[ensightenOptions.ns].reportException(new b.DataDefinitionException(null,
              '"' + v + '" error caught in Data Definition trigger: ' + a.dataDefName + ", ID:" + a.id + ". Using bottom of body trigger.")), r = c[ensightenOptions.ns].data.bottomOfBodyTrigger()
          }
          r.then(function () {
            n.resolve(c[ensightenOptions.ns].when.reduce([function () {
              try {
                return h()
              } catch (v) {
                return c[ensightenOptions.ns].reportException(new b.DataDefinitionException(null, '"' + v + '" error caught in Data Definition extractor: ' + a.dataDefName + ", ID:" + a.id + ".")), null
              }
            }(), function () {
              try {
                return d.apply(this, arguments)
              } catch (v) {
                return c[ensightenOptions.ns].reportException(new b.DataDefinitionException(null,
                  '"' + v + '" error caught in Data Definition transformer: ' + a.dataDefName + ", ID " + a.id + ".")), null
              }
            }, q], function (b, d, c, e) {
              if (1 == c) return d(b);
              2 == c && d(a.name, b)
            }))
          }, function (a) {
            n.reject(a)
          });
          b.dataDefinitions[a.id] = a;
          b.dataDefinitionsBySourceCollName["" + a.source + "." + a.collection + "." + a.dataDefName] = a;
          return n.promise
        };
        e.checkConditions = function (a) {
          var g, f = {
            lt: function (a, e) {
              var d = +a, f = +e;
              return isNaN(d) || isNaN(f) ? (c[ensightenOptions.ns].reportException(new b.DataDefinitionException(null, "Value(s) cannot be converted to number: compareWith: " +
                a + ", compareTo: " + e)), !1) : d < f
            }, gt: function (a, e) {
              var d = +a, f = +e;
              return isNaN(d) || isNaN(f) ? (c[ensightenOptions.ns].reportException(new b.DataDefinitionException(null, "Value(s) cannot be converted to number: compareWith: " + a + ", compareTo: " + e)), !1) : d > f
            }, eql: function (a, b) {
              return a == b
            }, exists: function (a, b) {
              return null == a || a == m || "" == a ? !1 : !0
            }, re: function (a, b, c) {
              b = new RegExp(b, c ? "i" : "");
              try {
                return a.match(b)
              } catch (r) {
                return !1
              }
            }, starts: function (a, b, c) {
              b = e.utils.escapeRegEx(b);
              return f.re(a, "^" + b, c)
            }, ends: function (a,
                               b, c) {
              b = e.utils.escapeRegEx(b);
              return f.re(a, b + "$", c)
            }, contains: function (a, b, c) {
              b = e.utils.escapeRegEx(b);
              return f.re(a, ".*" + b + ".*", c)
            }
          };
          f.is = f.eql;
          f["starts with"] = f.starts;
          f["ends with"] = f.ends;
          f["is greater than"] = f.gt;
          f["is less than"] = f.lt;
          f.matches = f.re;
          for (g = 0; g < a.values.length; g++) {
            var h = (a.customComparator ? a.customComparator[g] ? a.customComparator[g] : f[a.comparators[g]] : f[a.comparators[g]])(a.values[g], a.compareTo[g], a.caseInsensitive ? a.caseInsensitive[g] || !1 : !1);
            a.not[g] && (h = !h);
            if (!h) return !1
          }
          return !0
        };
        e.triggerPromise = function (a, b, e) {
          e = e || 5E3;
          var f = +new Date, d = c[ensightenOptions.ns].when.defer();
          (function () {
            var c = a();
            c != b ? d.resolve(c) : +new Date - f < e ? setTimeout(arguments.callee, 200) : d.reject("timed out")
          })();
          return d.promise
        };
        e.timeoutPromise = function (a, b) {
          var e = c[ensightenOptions.ns].when.defer();
          b = b || 800;
          a.then(e.resolve, e.reject);
          setTimeout(function () {
            e.reject(Error("timed out"))
          }, b);
          return e.promise
        };
        e.delayTrigger = function (a) {
          a = a || 10;
          var b = c[ensightenOptions.ns].when.defer();
          setTimeout(function () {
              b.resolve()
            },
            a);
          return b.promise
        };
        e.delayUntilTrigger = function (a, b, e, h) {
          e = e || null;
          h = h || 200;
          var d = +new Date, f = c[ensightenOptions.ns].when.defer();
          (function () {
            var c = a();
            c != b ? f.resolve(c) : e ? +new Date - d < e ? setTimeout(arguments.callee, h) : f.reject("timed out") : setTimeout(arguments.callee, h)
          })();
          return f.promise
        };
        b.applyTrigger = function (a) {
          var b = c[ensightenOptions.ns].when.defer();
          a(function () {
            b.resolve(!0)
          });
          return b.promise
        };
        e.immediateTrigger = function () {
          return b.applyTrigger(c[ensightenOptions.ns].bindImmediate)
        };
        e.bottomOfBodyTrigger = function () {
          return b.applyTrigger(c[ensightenOptions.ns].bindDOMParsed)
        };
        e.whenValueExistsTrigger = function () {
          return c[ensightenOptions.ns].when.resolve(this.extract())
        };
        e.afterEnsightenCompleteTrigger = function () {
          return b.applyTrigger(c[ensightenOptions.ns].bindPageSpecificCompletion)
        };
        e.afterElementsDownloadedTrigger = function () {
          return b.applyTrigger(c[ensightenOptions.ns].bindDOMLoaded)
        };
        e.getAllDataDefinitionsOnCurrentPage = function () {
          return b.dataDefinitions
        };
        e.getAllDataDefinitionsOnCurrentPage_S_C_N =
          function () {
            return b.dataDefinitionsBySourceCollName
          };
        e.getDataDefinitionById = function (a) {
          return b.dataDefinitions[a || -1] || {}
        };
        e.getDataDefinitionBySourceCollectionName = function (a, c, e) {
          return b.dataDefinitionsBySourceCollName["" + a + "." + c + "." + e] || {}
        };
        e.getDataDefinitionByPercentSyntax = function (a) {
          a = ("" + a).split("_");
          return 1 > a.length ? {} : b.dataDefinitions[a[1]] || {}
        };
        e.resolve = function (a, g) {
          var f = this, h = null;
          if (!b.checkForInvalidDataDefinitions(a)) if (g) c[ensightenOptions.ns].bindDataDefinitionComplete(function () {
            var d =
              b.collectAvailableDataDefinitions(a);
            d.isInvalid || c[ensightenOptions.ns].when.all(d.promises).then(function (d) {
              try {
                g.apply(f, d)
              } catch (v) {
                c[ensightenOptions.ns].reportException(new b.DataDefinitionException(a, "Error resolving data definitions: " + a + ". Details: " + v))
              }
            }, function (d) {
              c[ensightenOptions.ns].reportException(new b.DataDefinitionException(a, "Error resolving data definitions: " + a + ". Details: " + d))
            })
          }); else {
            var h = [], d = a;
            e.utils.isArray(a) || (d = [a]);
            for (var q = 0; q < d.length; q++) h.push(b.getSync(d[q]));
            return h = e.utils.isArray(a) ? h : h[0]
          }
        };
        e.extract = function (a, b) {
          var e = "", g = function (a, b) {
            var c = ~b.indexOf("#") ? b.split("#")[1] : "",
              d = c ? 0 : ~b.indexOf("[") ? parseInt(b.match(/\[(\d+)\]/)[1]) : 0,
              e = (c ? b.split("#")[0] : d ? b.split("[")[0] : b).toLowerCase();
            if (a == document && "html" == e && 0 == d) return document.getElementsByTagName("html")[0];
            if (~b.indexOf("#")) return document.getElementById(b.split("#")[1]);
            var f = a.firstChild;
            if (!f) return null;
            for (var g = 0, d = 0 != d ? d - 1 : d; f;) {
              if (1 == f.nodeType) {
                if (f.tagName.toLowerCase() == e &&
                  "" != c && f.id == c || f.tagName.toLowerCase() == e && g == d && "" == c) return f;
                f.tagName.toLowerCase() == e && g++
              }
              f = f.nextSibling
            }
          }, d = function (a, b) {
            a = a.split("/");
            for (var c = g(b || document, a[1]), d = 2; d < a.length; d++) {
              if (null == c) return null;
              c = g(c, a[d])
            }
            return c
          }, q = function () {
            for (var a = {}, b = c.document.getElementsByTagName("META") || [], d = 0, e = b.length; d < e; d++) {
              var f = b[d].name || b[d].getAttribute("property") || "";
              0 !== f.length && (a[f] = b[d].content)
            }
            return a
          }(), n = function (a) {
            var b = q[a];
            if (b) return b;
            for (var b = c.document.getElementsByTagName("META") ||
              [], d = 0, e = b.length; d < e; d++) {
              var f = b[d].name || b[d].getAttribute("property") || "";
              if (a == f) return b[d].content
            }
          }, h = function (a) {
            return (val = (new RegExp("&" + a + "=([^&]*)")).exec(c.location.search.replace(/^\?/, "&"))) ? val[0].split("=")[1] : ""
          }, k = function (a) {
            return (val = (new RegExp("^" + a + "=.*|;\\s*" + a + "=.*")).exec(c.document.cookie)) ? val[0].split("=")[1].split(";")[0] : ""
          }, l = function (a) {
            (a = m(a)) && a.nodeType && 1 == a.nodeType && (a = a.value || a.innerHTML || "");
            return a.toString().replace(/\n|\r|\s\s+/g, "") || ""
          }, m = function (a) {
            var b =
              "";
            if (0 == a.indexOf("/HTML/BODY")) b = d(a); else try {
              b = eval(a)
            } catch (C) {
              b = ""
            }
            return b
          };
          try {
            return b ? "meta" == b ? e = n(a) : "cookie" == b ? e = k(a) : "param" == b ? e = h(a) : "content" == b ? e = l(a) : "event" == b ? e = m(a) : "var" == b && (e = c[a]) : e = n(a) || k(a) || h(a) || l(a) || m(a) || c[a] || "", e || ""
          } catch (t) {
            return ""
          }
        };
        if ("undefined" == typeof k) var k = {exports: {}};
        return e
      }(window);
      window[ensightenOptions.ns].data.defineEngine("store", function () {
        var c = {}, m = window, l = m.document, b, e, h = Array.isArray || function (a) {
          return "[object Array]" === Object.prototype.toString.call(a)
        };
        c.set = function (a, b) {
        };
        c.get = function (a) {
        };
        c.remove = function (a) {
        };
        c.clear = function () {
        };
        try {
          if ("localStorage" in m && m.localStorage) b = m.localStorage, c.set = function (a, c) {
            var d, e,
              f = window.JSON && window.JSON.stringify ? window.JSON : window[ensightenOptions.ns].JSON;
            if (h(a)) for (d = 0, e = a.length; d < e; d++) b.setItem(a[d], "string" ===
            typeof c[d] ? c[d] : f.stringify(c[d])); else b.setItem(a, "string" === typeof c ? c : f.stringify(c))
          }, c.get = function (a) {
            if (h(a)) {
              var c = {}, d, e;
              d = 0;
              for (e = a.length; d < e; d++) c[a[d]] = b.getItem(a[d]);
              return c
            }
            return b.getItem(a)
          }, c.remove = function (a) {
            if (h(a)) {
              var c, d;
              c = 0;
              for (d = a.length; c < d; c++) b.removeItem(a[c])
            } else b.removeItem(a)
          }, c.clear = function () {
            b.clear()
          }, c.all = function () {
            return b
          }; else if ("globalStorage" in m && m.globalStorage) b = m.globalStorage[m.location.hostname], c.set = function (a, c) {
            if (h(a)) {
              var d, e;
              d = 0;
              for (e = a.length; d < e; d++) b[a[d]] = c[d]
            } else b[a] = c
          }, c.get = function (a) {
            if (h(a)) {
              var c = {}, d, e;
              d = 0;
              for (e = a.length; d < e; d++) c[a[d]] = b[a[d]] && b[a[d]].value;
              return c
            }
            return b[a] && b[a].value
          }, c.remove = function (a) {
            if (h(a)) {
              var c, d;
              c = 0;
              for (d = a.length; c < d; c++) delete b[a[c]]
            } else delete b[a]
          }, c.clear = function () {
            for (var a in b) delete b[a]
          }, c.all = function () {
            return b
          }; else if (l.documentElement.addBehavior) {
            var k = function (a) {
              return a.replace(f, "___")
            }, m = function (c) {
              return function () {
                var d = Array.prototype.slice.call(arguments,
                  0);
                d.unshift(b);
                a.appendChild(b);
                b.addBehavior("#default#userData");
                b.load("localStorage");
                d = c.apply(store, d);
                a.removeChild(b);
                return d
              }
            }, a, g;
            try {
              g = new ActiveXObject("htmlfile"), g.open(), g.write('<script>document.w=window\x3c/script><iframe src="/favicon.ico"></frame>'), g.close(), a = g.w.frames[0].document, b = a.createElement("div")
            } catch (d) {
              b = l.createElement("div"), a = l.body
            }
            var f = RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
            c.set = m(function (a, b, e) {
              if (h(b)) {
                var d, f;
                d = 0;
                for (f = b.length; d < f; d++) {
                  fixedKey =
                    k(b[d]);
                  if (void 0 === e[d]) return c.remove(fixedKey);
                  a.setAttribute(fixedKey, e[d]);
                  a.save("localStorage")
                }
              } else {
                fixedKey = k(b);
                if (void 0 === e) return c.remove(fixedKey);
                a.setAttribute(fixedKey, e);
                a.save("localStorage")
              }
            });
            c.get = m(function (a, b) {
              if (h(b)) {
                var c = {}, d, e, f;
                e = 0;
                for (f = b.length; e < f; e++) d = k(b[e]), c[b[e]] = a.getAttribute(d);
                return c
              }
              b = k(b);
              return a.getAttribute(b)
            });
            c.remove = m(function (a, b) {
              if (h(b)) {
                var c, e;
                c = 0;
                for (e = b.length; c < e; c++) a.removeAttribute(k(b[c])), a.save("localStorage")
              } else b = k(b), a.removeAttribute(b),
                a.save("localStorage")
            });
            c.clear = m(function (a) {
              var b = a.XMLDocument.documentElement.attributes;
              a.load("localStorage");
              for (var c = 0, e; e = b[c]; c++) a.removeAttribute(e.name);
              a.save("localStorage")
            });
            c.all = m(function (a) {
              for (var b = a.XMLDocument.documentElement.attributes, c = {}, e = 0, d; d = b[e]; ++e) {
                var f = k(d.name);
                c[d.name] = a.getAttribute(f)
              }
              return c
            })
          }
        } catch (d) {
        }
        var p = {};
        for (e in c) p[e] = c[e];
        p.testStorage = function () {
          try {
            var a = "tk_" + Math.ceil(5E7 * Math.random());
            p.set(a, "test");
            if ("test" === p.get(a)) return p.remove(a),
              !0
          } catch (q) {
          }
          return !1
        };
        c.utils = p;
        return window[ensightenOptions.ns].data.local = c
      }());
      window[ensightenOptions.ns].data.defineEngine("cookie", function (c, m) {
        var l = function () {
          return l.get.apply(l, arguments)
        }, b = l.utils = {
          isArray: Array.isArray || function (b) {
            return "[object Array]" === Object.prototype.toString.call(b)
          }, isPlainObject: window[ensightenOptions.ns].data.utils.isPlainObject, toArray: function (b) {
            return Array.prototype.slice.call(b)
          }, getKeys: Object.keys || function (b) {
            var c = [], e = "";
            for (e in b) b.hasOwnProperty(e) && c.push(e);
            return c
          }, escape: function (b) {
            return String(b).replace(/[,;"\\=\s%]/g,
              function (b) {
                return encodeURIComponent(b)
              })
          }, retrieve: function (b, c) {
            return null == b ? c : b
          }, getAllCookies: function () {
            if ("" === c.cookie) return {};
            for (var b = c.cookie.split("; "), h = {}, k = 0, a = b.length; k < a; k++) {
              var g = b[k].split("=");
              h[decodeURIComponent(g[0])] = decodeURIComponent(g[1])
            }
            return h
          }, set: function (e, h, k) {
            k = k || -1;
            if (b.isPlainObject(e)) for (var a in e) e.hasOwnProperty(a) && l.set(a, e[a], h); else if (b.isArray(e)) {
              var g;
              a = 0;
              for (g = e.length; a < g; a++) l.set(e[a], h[a], k)
            } else {
              a = k.expires !== m ? k.expires : l.defaults.expires ||
                "";
              "number" === typeof a && (a = new Date(a));
              a = b.isPlainObject(a) && "toGMTString" in a ? ";expires=" + a.toGMTString() : b.isPlainObject(a) && a instanceof Date ? ";expires=" + a.toUTCString() : ";expires=" + a;
              g = (g = k.path || l.defaults.path) ? ";path=" + g : "";
              var f = k.domain || l.defaults.domain, f = f ? ";domain=" + f : "";
              k = k.secure || l.defaults.secure ? ";secure" : "";
              c.cookie = b.escape(e) + "=" + b.escape(h) + a + g + f + k
            }
          }, get: function (c, h) {
            h = h || m;
            var e = b.getAllCookies();
            if (b.isArray(c)) {
              for (var a = {}, g = 0, f = c.length; g < f; g++) a[c[g]] = b.retrieve(e[c[g]],
                h), a[c[g]] === m && (a[c[g]] = null);
              return a
            }
            a = b.retrieve(e[c], h);
            return a === m ? null : a
          }, getGMTString: function (b) {
            var c = new Date;
            c.setTime(c.getTime() + 864E5 * b);
            return c.toGMTString()
          }
        };
        l.defaults = {path: "/", expires: b.getGMTString(90)};
        l.set = function (c, h) {
          b.set(c, h)
        };
        l.remove = function (c) {
          c = b.isArray(c) ? c : b.toArray(arguments);
          for (var e = 0, k = c.length; e < k; e++) b.set(c[e], "", {expires: -1})
        };
        l.clear = function () {
          return l.remove(b.getKeys(b.getAllCookies()))
        };
        l.get = function (c, h) {
          return b.get(c, h)
        };
        l.all = function () {
          return b.getAllCookies()
        };
        l.utils = b;
        return window[ensightenOptions.ns].data.cookie = l
      }(document));

    }

    window[ensightenOptions.ns].ensEvent || (window[ensightenOptions.ns].ensEvent = function (q, w) {
      var h = {
        queue: {}, pollQueue: {}, pushTrigger: function (a, c) {
          if ("[object Array]" === Object.prototype.toString.call(a)) {
            for (var g = 0; g < a.length; g++) h.pushTrigger(a[g], c);
            return !0
          }
          if ("string" != typeof a) return !1;
          this.queue[a] = this.queue[a] || {fn: []};
          "function" == typeof c && this.queue[a].fn.push(c);
          return !0
        }, callTrigger: function (a, c, g) {
          if ("string" != typeof a) return !1;
          a = h.queue[a];
          if ("object" == typeof a && a.fn && a.fn.length && (0 !=
            a.fireOnFirstSet && c == w || c != w && 0 != a.fireOnUpdate)) for (c = 0; c < a.fn.length; c++) a.fn[c].call(this)
        }, setPollOptions: function (a, c, g) {
          this.queue[a] = this.queue[a] || {fn: []};
          this.queue[a].fireOnFirstSet = c;
          this.queue[a].fireOnUpdate = g
        }, callPoll: function (a, c, g, q, r) {
          if ("string" == typeof a && c && c.length && !(1 > c.length)) {
            for (var n = 0; n < c.length; n++) h.setPollOptions(c[n], q, r);
            h.pushWatch(a, c, g)
          }
        }, pushWatch: function (a, c, g) {
          this.pollQueue[a] || (this.pollQueue[a] = {previousVal: w, eventArr: [], valueFn: g});
          this.pollQueue[a].eventArr =
            this.pollQueue[a].eventArr.concat(c);
          this.pollQueue[a].valueFn = g
        }, globalWatch: function () {
          setInterval(function () {
            for (var a in h.pollQueue) {
              var c = h.pollQueue[a], g = c.valueFn(a);
              if (c.previousVal !== g) {
                for (var n = 0; n < c.eventArr.length; n++) h.callTrigger.call(q, c.eventArr[n], c.previousVal, g);
                h.pollQueue[a].previousVal = g
              }
            }
          }, 500)
        }
      };
      h.globalWatch();
      return {
        add: function (a, c) {
          return h.pushTrigger(a, c)
        }, get: function (a) {
          return h.queue[a]
        }, trigger: function (a, c) {
          return h.callTrigger.call(c || q, a)
        }, poll: function (a, c,
                           g, n, r) {
          r = r || q[ensightenOptions.ns].data.resolve;
          return h.callPoll(a, c, r, g, n)
        }
      }
    }(window), function (q, w, h) {
      w[q] = h()
    }("qwery", window[ensightenOptions.ns], function () {
      function q() {
        this.c = {}
      }

      function w(b) {
        return H.g(b) || H.s(b, "(^|\\s+)" + b + "(\\s+|$)", 1)
      }

      function h(b, d) {
        for (var e = 0, f = b.length; e < f; e++) d(b[e])
      }

      function a(b) {
        for (var d = [], e = 0, f = b.length; e < f; ++e) k(b[e]) ? d = d.concat(b[e]) : d[d.length] = b[e];
        return d
      }

      function c(b) {
        for (var d = 0, e = b.length, f = []; d < e; d++) f[d] = b[d];
        return f
      }

      function g(b) {
        for (; (b = b.previousSibling) &&
               1 != b.nodeType;) ;
        return b
      }

      function n(b, d, e, f, a, l, k, c, g, h, t) {
        var I, B, m;
        if (1 !== this.nodeType || d && "*" !== d && this.tagName && this.tagName.toLowerCase() !== d || e && (I = e.match(Q)) && I[1] !== this.id) return !1;
        if (e && (m = e.match(R))) for (b = m.length; b--;) if (!w(m[b].slice(1)).test(this.className)) return !1;
        if (g && u.pseudos[g] && !u.pseudos[g](this, t)) return !1;
        if (f && !k) for (B in g = this.attributes, g) if (Object.prototype.hasOwnProperty.call(g, B) && (g[B].name || B) == a) return this;
        return f && !y(l, S(this, a) || "", k) ? !1 : this
      }

      function r(b) {
        return J.g(b) ||
          J.s(b, b.replace(T, "\\$1"))
      }

      function y(b, d, e) {
        switch (b) {
          case "=":
            return d == e;
          case "^=":
            return d.match(x.g("^=" + e) || x.s("^=" + e, "^" + r(e), 1));
          case "$=":
            return d.match(x.g("$=" + e) || x.s("$=" + e, r(e) + "$", 1));
          case "*=":
            return d.match(x.g(e) || x.s(e, r(e), 1));
          case "~=":
            return d.match(x.g("~=" + e) || x.s("~=" + e, "(?:^|\\s+)" + r(e) + "(?:\\s+|$)", 1));
          case "|=":
            return d.match(x.g("|=" + e) || x.s("|=" + e, "^" + r(e) + "(-|$)", 1))
        }
        return 0
      }

      function p(b, d) {
        var e = [], f = [], a, l, k, c, g, m = d, t = C.g(b) || C.s(b, b.split(K)), u = b.match(L);
        if (!t.length) return e;
        l = (t = t.slice(0)).pop();
        t.length && (a = t[t.length - 1].match(M)) && (m = N(d, a[1]));
        if (!m) return e;
        c = l.match(E);
        k = m !== d && 9 !== m.nodeType && u && /^[+~]$/.test(u[u.length - 1]) ? function (b) {
          for (; m = m.nextSibling;) 1 == m.nodeType && (c[1] ? c[1] == m.tagName.toLowerCase() : 1) && (b[b.length] = m);
          return b
        }([]) : m.getElementsByTagName(c[1] || "*");
        a = 0;
        for (l = k.length; a < l; a++) if (g = n.apply(k[a], c)) e[e.length] = g;
        if (!t.length) return e;
        h(e, function (b) {
          v(b, t, u) && (f[f.length] = b)
        });
        return f
      }

      function v(b, d, e, a) {
        function l(b, a, c) {
          for (; c = U[e[a]](c,
            b);) if (f(c) && n.apply(c, d[a].match(E))) if (a) {
            if (k = l(c, a - 1, c)) return k
          } else return c
        }

        var k;
        return (k = l(b, d.length - 1, b)) && (!a || z(k, a))
      }

      function f(b, d) {
        return b && "object" === typeof b && (d = b.nodeType) && (1 == d || 9 == d)
      }

      function l(b) {
        var d = [], e, f;
        e = 0;
        a:for (; e < b.length; ++e) {
          for (f = 0; f < d.length; ++f) if (d[f] == b[e]) continue a;
          d[d.length] = b[e]
        }
        return d
      }

      function k(b) {
        return "object" === typeof b && isFinite(b.length)
      }

      function N(b, d, e) {
        return 9 === b.nodeType ? b.getElementById(d) : b.ownerDocument && ((e = b.ownerDocument.getElementById(d)) &&
          z(e, b) && e || !z(b, b.ownerDocument) && F('[id="' + d + '"]', b)[0])
      }

      function u(b, d) {
        var e, l, g;
        g = d ? "string" == typeof d ? u(d)[0] : !d.nodeType && k(d) ? d[0] : d : m;
        if (!g || !b) return [];
        if (b === window || f(b)) return !d || b !== window && f(g) && z(b, g) ? [b] : [];
        if (b && k(b)) return a(b);
        if (e = b.match(V)) {
          if (e[1]) return (l = N(g, e[1])) ? [l] : [];
          if (e[2]) return c(g.getElementsByTagName(e[2]));
          if (W && e[3]) return c(g.getElementsByClassName(e[3]))
        }
        return F(b, g)
      }

      function t(b, d) {
        return function (e) {
          var f, a;
          O.test(e) ? 9 !== b.nodeType && ((a = f = b.getAttribute("id")) ||
          b.setAttribute("id", a = "__qwerymeupscotty"), d(b.parentNode || b, '[id="' + a + '"]' + e, !0), f || b.removeAttribute("id")) : e.length && d(b, e, !1)
        }
      }

      var m = document, D = m.documentElement, F, Q = /#([\w\-]+)/, R = /\.[\w\-]+/g, M = /^#([\w\-]+)$/,
        X = /^([\w]+)?\.([\w\-]+)$/, O = /(^|,)\s*[>~+]/, Y = /^\s+|\s*([,\s\+\~>]|$)\s*/g,
        A = /[\s\>\+\~]/, P = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/,
        T = /([.*+?\^=!:${}()|\[\]\/\\])/g,
        V = new RegExp(M.source + "|" + /^([\w\-]+)$/.source + "|" + /^\.([\w\-]+)$/.source),
        L = new RegExp("(" + A.source +
          ")" + P.source, "g"), K = new RegExp(A.source + P.source),
        E = new RegExp(/^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/.source + "(" + /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/.source + ")?(" + /:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/.source + ")?"),
        U = {
          " ": function (b) {
            return b && b !== D && b.parentNode
          }, ">": function (b, d) {
            return b && b.parentNode == d.parentNode && b.parentNode
          }, "~": function (b) {
            return b && b.previousSibling
          }, "+": function (b, d, e, f) {
            return b ? (e = g(b)) && (f = g(d)) && e == f && e : !1
          }
        };
      q.prototype = {
        g: function (b) {
          return this.c[b] || void 0
        }, s: function (b, d, e) {
          d = e ? new RegExp(d) : d;
          return this.c[b] = d
        }
      };
      var H = new q, J = new q, x = new q, C = new q, z = "compareDocumentPosition" in D ? function (b, d) {
        return 16 == (d.compareDocumentPosition(b) & 16)
      } : "contains" in D ? function (b, d) {
        d = 9 === d.nodeType || d == window ? D : d;
        return d !== b && d.contains(b)
      } : function (b, d) {
        for (; b = b.parentNode;) if (b === d) return 1;
        return 0
      }, S = function () {
        var b = m.createElement("p");
        return (b.innerHTML = '<a href="#x">x</a>', "#x" != b.firstChild.getAttribute("href")) ?
          function (b, e) {
            return "class" === e ? b.className : "href" === e || "src" === e ? b.getAttribute(e, 2) : b.getAttribute(e)
          } : function (b, e) {
            return b.getAttribute(e)
          }
      }(), W = !!m.getElementsByClassName, Z = m.querySelector && m.querySelectorAll, aa = function (b, d) {
        var e = [], f, a;
        try {
          if (9 === d.nodeType || !O.test(b)) return c(d.querySelectorAll(b));
          h(f = b.split(","), t(d, function (b, d) {
            a = b.querySelectorAll(d);
            1 == a.length ? e[e.length] = a.item(0) : a.length && (e = e.concat(c(a)))
          }));
          return 1 < f.length && 1 < e.length ? l(e) : e
        } catch (ba) {
        }
        return G(b, d)
      }, G =
        function (b, d) {
          var e = [], f, a, c, k;
          b = b.replace(Y, "$1");
          if (f = b.match(X)) {
            k = w(f[2]);
            f = d.getElementsByTagName(f[1] || "*");
            a = 0;
            for (c = f.length; a < c; a++) k.test(f[a].className) && (e[e.length] = f[a]);
            return e
          }
          h(f = b.split(","), t(d, function (b, f, l) {
            k = p(f, b);
            a = 0;
            for (c = k.length; a < c; a++) if (9 === b.nodeType || l || z(k[a], d)) e[e.length] = k[a]
          }));
          return 1 < f.length && 1 < e.length ? l(e) : e
        }, A = function (b) {
        "undefined" !== typeof b.useNativeQSA && (F = b.useNativeQSA ? Z ? aa : G : G)
      };
      A({useNativeQSA: !0});
      u.configure = A;
      u.uniq = l;
      u.is = function (b, d, e) {
        if (f(d)) return b ==
          d;
        if (k(d)) return !!~a(d).indexOf(b);
        for (var l = d.split(","), c; d = l.pop();) if (c = C.g(d) || C.s(d, d.split(K)), d = d.match(L), c = c.slice(0), n.apply(b, c.pop().match(E)) && (!c.length || v(b, c, d, e))) return !0;
        return !1
      };
      u.pseudos = {};
      return u
    }), function () {
      function q(f, a, c) {
        var l;
        n || (n = window[ensightenOptions.ns].qwery);
        l = n;
        if ((l = l.call(c, a, c)) && 0 < l.length) {
          if ("_root" == a) f = c; else if (f === c) f = void 0; else {
            b:{
              for (var k = l.length, g = 0; g < k; g++) if (f === l[g]) {
                l = !0;
                break b
              }
              l = !1
            }
            l || (f.parentNode ? (r++, f = q(f.parentNode, a, c)) : f = void 0)
          }
          return f
        }
        return !1
      }

      function w(f, a, c, g) {
        p[f.id] || (p[f.id] = {});
        p[f.id][a] || (p[f.id][a] = {});
        p[f.id][a][c] || (p[f.id][a][c] = []);
        p[f.id][a][c].push(g)
      }

      function h(a, c, g, h) {
        if (h || g) if (h) for (var f = 0; f < p[a.id][c][g].length; f++) {
          if (p[a.id][c][g][f] === h) {
            p[a.id][c][g].pop(f, 1);
            break
          }
        } else delete p[a.id][c][g]; else p[a.id][c] = {}
      }

      function a(a, c, k) {
        if (p[a][k]) {
          var f = c.target || c.srcElement, l, h, m = {}, n = h = 0;
          r = 0;
          for (l in p[a][k]) p[a][k].hasOwnProperty(l) && (h = q(f, l, v[a].element)) && g.matchesEvent(k, v[a].element, h, "_root" == l, c) && (r++, p[a][k][l].match =
            h, m[r] = p[a][k][l]);
          c.stopPropagation = function () {
            c.cancelBubble = !0
          };
          for (h = 0; h <= r; h++) if (m[h]) for (n = 0; n < m[h].length; n++) {
            if (!1 === m[h][n].call(m[h].match, c)) {
              g.cancel(c);
              return
            }
            if (c.cancelBubble) return
          }
        }
      }

      function c(f, c, k, n) {
        function l(c) {
          return function (f) {
            a(t, f, c)
          }
        }

        f instanceof Array || (f = [f]);
        k || "function" != typeof c || (k = c, c = "_root");
        var t = this.id, m;
        for (m = 0; m < f.length; m++) p[t] && p[t][f[m]] || g.addEvent(this, f[m], l(f[m])), n ? h(this, f[m], c, k) : w(this, f[m], c, k);
        return this
      }

      function g(a, c, k, h) {
        if ("string" ==
          typeof a && "function" == typeof c || "string" == typeof c) g(document).on(a, c, k, h || !1);
        if (!(this instanceof g)) {
          for (var f in v) if (v[f].element === a) return v[f];
          y++;
          v[y] = new g(a, y);
          v[y]._on = v[y].on;
          v[y].on = function (a, c, f, g) {
            var h = "function" == typeof c ? c : f;
            if ("function" == typeof c ? f : g) a = [a], "string" == typeof c && a.push(c), a.push(function (a) {
              return function (c) {
                c.defaultPrevented || window[ensightenOptions.ns].Delegate.load(this);
                if (this.nodeName && "a" != this.nodeName.toLowerCase()) return a.call(this);
                "undefined" != typeof c.preventDefault ?
                  c.preventDefault() : c.returnValue = !1;
                a.call(this)
              }
            }(h)), this._on.apply(this, a); else return this._on.call(this, a, c, f)
          };
          return v[y]
        }
        this.element = a;
        this.id = c
      }

      var n, r = 0, y = 0, p = {}, v = {};
      g.prototype.on = function (a, g, h) {
        return c.call(this, a, g, h)
      };
      g.prototype.off = function (a, g, h) {
        return c.call(this, a, g, h, !0)
      };
      g.cancel = function (a) {
        a.preventDefault();
        a.stopPropagation()
      };
      g.addEvent = function (a, c, g) {
        a.element.addEventListener(c, g, "blur" == c || "focus" == c)
      };
      g.matchesEvent = function () {
        return !0
      };
      g.load = function (a) {
        setTimeout(function (a,
                             c) {
          return function () {
            if (a.nodeName && "a" == a.nodeName.toLowerCase()) {
              if (c && /^javascript\s*\:/.test(c)) return (new Function(unescape(c))).call(window);
              c && (window.location.href = c)
            }
          }
        }(a, a.href || ""), 750)
      };
      window[ensightenOptions.ns].Delegate = g
    }(), function (q) {
      var w = q.addEvent;
      q.addEvent = function (h, a, c) {
        if (h.element.addEventListener) return w(h, a, c);
        "focus" == a && (a = "focusin");
        "blur" == a && (a = "focusout");
        h.element.attachEvent("on" + a, c)
      };
      q.cancel = function (h) {
        h.preventDefault && h.preventDefault();
        h.stopPropagation &&
        h.stopPropagation();
        h.returnValue = !1;
        h.cancelBubble = !0
      }
    }(window[ensightenOptions.ns].Delegate), window[ensightenOptions.ns].on = window[ensightenOptions.ns].Delegate);
    Bootstrapper.dataDefinitionIds = [16919];
    Bootstrapper.bindImmediate(function () {
      var Bootstrapper = window["Bootstrapper"];
      var ensightenOptions = Bootstrapper.ensightenOptions;
      Bootstrapper.registerDataDefinition(function () {
        Bootstrapper.data.define({
          extract: function () {
            var campaigns = [];
            var modelResults = (((window.Bootstrapper || {}).attribution || {}).conversionData || {}).modelResults || [];
            for (var i in modelResults) if (modelResults.hasOwnProperty(i)) {
              var modelResult = modelResults[i];
              if (!modelResult.campaignId) throw new Error("Invalid model results - missing Campaign ID at result " +
                i + ".");
              campaigns.push(modelResult.campaignId)
            }
            return "|" + campaigns.join("|") + "|"
          },
          load: "page",
          trigger: Bootstrapper.data.bottomOfBodyTrigger,
          dataDefName: "Attribution Winning Campaign IDs - Do Not Modify",
          collection: "Attribution",
          source: "Attribution",
          priv: "false"
        }, {id: "16919"})
      }, 16919)
    }, -1, -1);
    Bootstrapper.getServerComponent(Bootstrapper.getExtraParams ? Bootstrapper.getExtraParams() : undefined);
  }
})();