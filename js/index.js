!(function (t) {
  var r = {};
  function n(e) {
    if (r[e]) return r[e].exports;
    var o = (r[e] = { i: e, l: !1, exports: {} });
    return t[e].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = t),
    (n.c = r),
    (n.d = function (t, r, e) {
      n.o(t, r) || Object.defineProperty(t, r, { enumerable: !0, get: e });
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function (t, r) {
      if ((1 & r && (t = n(t)), 8 & r)) return t;
      if (4 & r && "object" == typeof t && t && t.__esModule) return t;
      var e = Object.create(null);
      if (
        (n.r(e),
        Object.defineProperty(e, "default", { enumerable: !0, value: t }),
        2 & r && "string" != typeof t)
      )
        for (var o in t)
          n.d(
            e,
            o,
            function (r) {
              return t[r];
            }.bind(null, o),
          );
      return e;
    }),
    (n.n = function (t) {
      var r =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(r, "a", r), r;
    }),
    (n.o = function (t, r) {
      return Object.prototype.hasOwnProperty.call(t, r);
    }),
    (n.p = "."),
    n((n.s = 2));
})([
  function (t, r, n) {
    window,
      (t.exports = (function (t) {
        var r = {};
        function n(e) {
          if (r[e]) return r[e].exports;
          var o = (r[e] = { i: e, l: !1, exports: {} });
          return t[e].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
        }
        return (
          (n.m = t),
          (n.c = r),
          (n.d = function (t, r, e) {
            n.o(t, r) ||
              Object.defineProperty(t, r, { enumerable: !0, get: e });
          }),
          (n.r = function (t) {
            "undefined" != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(t, "__esModule", { value: !0 });
          }),
          (n.t = function (t, r) {
            if ((1 & r && (t = n(t)), 8 & r)) return t;
            if (4 & r && "object" == typeof t && t && t.__esModule) return t;
            var e = Object.create(null);
            if (
              (n.r(e),
              Object.defineProperty(e, "default", { enumerable: !0, value: t }),
              2 & r && "string" != typeof t)
            )
              for (var o in t)
                n.d(
                  e,
                  o,
                  function (r) {
                    return t[r];
                  }.bind(null, o),
                );
            return e;
          }),
          (n.n = function (t) {
            var r =
              t && t.__esModule
                ? function () {
                    return t.default;
                  }
                : function () {
                    return t;
                  };
            return n.d(r, "a", r), r;
          }),
          (n.o = function (t, r) {
            return Object.prototype.hasOwnProperty.call(t, r);
          }),
          (n.p = "/"),
          n((n.s = 1))
        );
      })([
        function (t, r, n) {
          "use strict";
          function e(t) {
            return (e =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  })(t);
          }
          n.r(r),
            n.d(r, "g", function () {
              return u;
            });
          var o = function (t) {
              return null !== t && "object" === e(t);
            },
            u = function () {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "div";
              return function () {
                var n = document.createElement(r),
                  e = o(t) ? t : { class: t };
                Object.keys(e).forEach(function (t) {
                  var r = e[t];
                  void 0 !== r &&
                    (/^data/.test(t)
                      ? n.setAttribute("data-" + t.slice(4), r)
                      : "style" === t && o(r)
                        ? n.setAttribute(
                            "style",
                            Object.keys(r)
                              .map(function (t) {
                                return "".concat(t, ":").concat(r[t], "px;");
                              })
                              .join(""),
                          )
                        : n.setAttribute(t, r));
                });
                for (
                  var u = arguments.length, i = new Array(u), a = 0;
                  a < u;
                  a++
                )
                  i[a] = arguments[a];
                return (
                  i.forEach(function (t) {
                    !(function (t) {
                      return t instanceof HTMLElement && 1 === t.nodeType;
                    })(t)
                      ? "img" === r.toLowerCase() &&
                        (function (t) {
                          return "string" == typeof t || t instanceof String;
                        })(t)
                        ? n.setAttribute("src", t)
                        : (n.innerText = t)
                      : n.appendChild(t);
                  }),
                  n
                );
              };
            };
        },
        function (t, r, n) {
          t.exports = n(0);
        },
      ]));
  },
  function (t, r) {
    t.exports = (function (t) {
      var r = {};
      function n(e) {
        if (r[e]) return r[e].exports;
        var o = (r[e] = { i: e, l: !1, exports: {} });
        return t[e].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
      }
      return (
        (n.m = t),
        (n.c = r),
        (n.d = function (t, r, e) {
          n.o(t, r) || Object.defineProperty(t, r, { enumerable: !0, get: e });
        }),
        (n.r = function (t) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (n.t = function (t, r) {
          if ((1 & r && (t = n(t)), 8 & r)) return t;
          if (4 & r && "object" == typeof t && t && t.__esModule) return t;
          var e = Object.create(null);
          if (
            (n.r(e),
            Object.defineProperty(e, "default", { enumerable: !0, value: t }),
            2 & r && "string" != typeof t)
          )
            for (var o in t)
              n.d(
                e,
                o,
                function (r) {
                  return t[r];
                }.bind(null, o),
              );
          return e;
        }),
        (n.n = function (t) {
          var r =
            t && t.__esModule
              ? function () {
                  return t.default;
                }
              : function () {
                  return t;
                };
          return n.d(r, "a", r), r;
        }),
        (n.o = function (t, r) {
          return Object.prototype.hasOwnProperty.call(t, r);
        }),
        (n.p = ""),
        n((n.s = 0))
      );
    })([
      function (t, r, n) {
        t.exports = n(1);
      },
      function (t, r, n) {
        "use strict";
        Object.defineProperty(r, "__esModule", { value: !0 }),
          (r.default = void 0),
          (r.default = function (t) {
            var r = (function (t) {
              return (function (t) {
                return (
                  (function (t) {
                    if (Array.isArray(t)) {
                      for (
                        var r = 0, n = new Array(t.length);
                        r < t.length;
                        r++
                      )
                        n[r] = t[r];
                      return n;
                    }
                  })(t) ||
                  (function (t) {
                    if (
                      Symbol.iterator in Object(t) ||
                      "[object Arguments]" === Object.prototype.toString.call(t)
                    )
                      return Array.from(t);
                  })(t) ||
                  (function () {
                    throw new TypeError(
                      "Invalid attempt to spread non-iterable instance",
                    );
                  })()
                );
              })(t).sort(function (t, r) {
                return t.length - r.length;
              });
            })(t);
            return (function n(e, o) {
              var u = (function (t) {
                var r = {};
                return (
                  e.forEach(function (t) {
                    for (var n = 0, e = t.wordStr.length; n < e; n += 1) {
                      var o = t.wordStr[n];
                      r[o] || (r[o] = []),
                        r[o].push({
                          x: t.xNum + (t.isHorizon ? n : 0),
                          y: t.yNum + (t.isHorizon ? 0 : n),
                        });
                    }
                  }),
                  r
                );
              })();
              if (!o)
                return (function (r) {
                  var n = 0,
                    e = 0,
                    o = 0,
                    u = 0;
                  r.forEach(function (t) {
                    var r = t.wordStr.length,
                      i = t.isHorizon,
                      a = t.xNum,
                      c = t.yNum,
                      f = a + r * (i ? 1 : 0),
                      l = c + r * (i ? 0 : 1);
                    f > o && (o = f),
                      l > u && (u = l),
                      a < n && (n = a),
                      c < e && (e = c);
                  });
                  var i = t.reduce(function (t, r, n) {
                      return (t[r] = n), t;
                    }, {}),
                    a = r
                      .map(function (t) {
                        var r = t;
                        return (r.xNum -= n), (r.yNum -= e), r;
                      })
                      .sort(function (t, r) {
                        return i[t.wordStr] - i[r.wordStr];
                      }),
                    c = u - e,
                    f = o - n,
                    l = new Array(c).fill(0).map(function () {
                      return new Array(f);
                    });
                  return (
                    a.forEach(function (t, r) {
                      var n = t.wordStr.split(""),
                        e = t.isHorizon,
                        o = t.yNum,
                        u = t.xNum;
                      n.forEach(function (t, n) {
                        var i = u + (e ? n : 0),
                          a = o + (e ? 0 : n),
                          c = { letter: t },
                          f = e ? "h" : "v",
                          d = l[a][i] || c;
                        (d[f] = r),
                          (d[f + "Idx"] = n),
                          l[a][i] || (l[a][i] = c);
                      });
                    }),
                    { height: c, width: f, positionObjArr: a, ownerMap: l }
                  );
                })(e);
              var i = (function (t) {
                var r = t.letterMap,
                  n = t.wordStr,
                  e = (function (t) {
                    var r = [];
                    return (
                      Object.keys(t).forEach(function (n) {
                        t[n].forEach(function (t) {
                          var e = t.y,
                            o = t.x;
                          r[e] || (r[e] = {}), (r[e][o] = n);
                        });
                      }),
                      r
                    );
                  })(r);
                if (!n) return [];
                for (
                  var o = [],
                    u = n.length,
                    i = function (t) {
                      var i = n[t];
                      if (!r[i]) return "continue";
                      r[i].forEach(function (r) {
                        var i = r.x,
                          a = r.y,
                          c = void 0 === e[a][i + 1];
                        if (c) {
                          if (void 0 !== e[a][i - t - 1]) return;
                          if (void 0 !== e[a][i - t + u]) return;
                          for (var f = 0; f < u; f += 1)
                            if (t !== f) {
                              if (e[a - 1] && void 0 !== e[a - 1][i - t + f])
                                return;
                              if (void 0 !== e[a][i - t + f]) return;
                              if (e[a + 1] && void 0 !== e[a + 1][i - t + f])
                                return;
                            }
                        } else {
                          if (e[a - t - 1] && void 0 !== e[a - t - 1][i])
                            return;
                          if (e[a - t + u] && void 0 !== e[a - t + u][i])
                            return;
                          for (var l = 0; l < u; l += 1)
                            if (t !== l && void 0 !== e[a - t + l]) {
                              if (void 0 !== e[a - t + l][i - 1]) return;
                              if (void 0 !== e[a - t + l][i]) return;
                              if (void 0 !== e[a - t + l][i + 1]) return;
                            }
                        }
                        o.push({
                          wordStr: n,
                          xNum: r.x - (c ? t : 0),
                          yNum: r.y - (c ? 0 : t),
                          isHorizon: c,
                        });
                      });
                    },
                    a = 0;
                  a < u;
                  a += 1
                )
                  i(a);
                return o;
              })({ wordStr: o, letterMap: u });
              if (i.length) {
                for (
                  var a = (function (t) {
                      for (var r = t.length - 1; r > 0; r--) {
                        var n = Math.floor(Math.random() * (r + 1)),
                          e = t[r];
                        (t[r] = t[n]), (t[n] = e);
                      }
                      return t;
                    })(i),
                    c = r.pop(),
                    f = 0;
                  f < i.length;
                  f += 1
                ) {
                  var l = a[f],
                    d = n(e.concat(l), c);
                  if (d) return e.push(l), r.push(c), d;
                }
                return r.push(c), !1;
              }
              return !1;
            })(
              [{ wordStr: r.pop(), xNum: 0, yNum: 0, isHorizon: !0 }],
              r.pop(),
            );
          });
      },
    ]);
  },
  function (t, r, n) {
    t.exports = n(3);
  },
  function (t, r, n) {
    "use strict";
    n.r(r);
    var e = n(1),
      o = n.n(e),
      u = n(0),
      i =
        (n(4),
        function (t) {
          return document.getElementById(t);
        });

    var crosswordGenerated = false;
    i("gen").onclick = function () {
      // Sembunyikan wrapper jumlah pertanyaan dan tampilkan tombol export
      document.getElementById('questionCountWrapper').style.display = 'none';
      document.getElementById('export').style.display = 'inline-block';
      i("gen").style.display = "none";
    
      // Ambil data input
      var t = i("key")
          .value.split("\n")
          .map(function (t) {
            return t.trim();
          })
          .filter(function (t) {
            return t !== "";
          });
      var r = i("val")
          .value.split("\n")
          .map(function (t) {
            return t.trim();
          })
          .filter(function (t) {
            return t !== "";
          });
    
      // Validasi jumlah kata
      if (t.length < 2) {
        showModal("Crossword generation requires at least two words to create intersections.");
        // Jika sudah ada teka-teki silang di localStorage, tampilkan kembali
        if (crosswordGenerated && localStorage.getItem("crosswordData")) {
          var storedCrosswordData = localStorage.getItem("crosswordData");
          var crosswords = JSON.parse(storedCrosswordData);
          renderCrossword(crosswords, r);
        }
        return;
      }
    
      // Hapus elemen ctnr dan hint jika ada
      if (i("ctnr")) {
        document.getElementById("crosswordsDiv").removeChild(i("ctnr"));
        document.getElementById("crosswordsDiv").removeChild(i("hint"));
      }
    
      try {
        var n = o()(t); // Generate crossword
        crosswordGenerated = true;
        renderCrossword(n, r);
        localStorage.setItem("crosswordData", JSON.stringify(n));
        console.log("Crossword data:", n);
      } catch (e) {
        showModal("Crossword generation failed because of the answer tile cannot find intersection of the words");
        // Jika gagal, coba pulihkan teka-teki silang sebelumnya jika ada
        if (crosswordGenerated && localStorage.getItem("crosswordData")) {
          var storedCrosswordData = localStorage.getItem("crosswordData");
          var crosswords = JSON.parse(storedCrosswordData);
          renderCrossword(crosswords, r);
        }
        return;
      }
    };
    
    // Fungsi untuk merender teka-teki silang
    function renderCrossword(crosswords, clues) {
      var e = Object(u.g)({
        id: "ctnr",
        style: { height: 30 * crosswords.height + 4, width: 30 * crosswords.width + 4 },
      })();
      var a = Object(u.g)({ id: "hint" })();
      document.getElementById("crosswordsDiv").appendChild(e);
      document.getElementById("crosswordsDiv").appendChild(a);
    
      var c = 0;
      crosswords.ownerMap.forEach(function (t, r) {
        t.forEach(function (t, n) {
          if (t) {
            e.appendChild(
              Object(u.g)(
                {
                  id: n + "" + r,
                  dataletter: t.letter,
                  datav: t.v,
                  datah: t.h,
                  datax: n,
                  datay: r,
                  datavidx: t.vIdx,
                  datahidx: t.hIdx,
                  maxlength: 1,
                  autocomplete: "disabled",
                  style: { left: 30 * n, top: 30 * r },
                },
                "input"
              )()
            );
            c += 1;
          }
        });
      });
    
      var f = null;
      e.addEventListener(
        "focus",
        function (t) {
          var n = t.target,
            e = n.dataset.h,
            o = n.dataset.v;
          a.innerHTML =
            (e ? "Across: " + clues[e] : "") + (o ? "<br>Down: " + clues[o] : "<br>");
        },
        !0
      );
    
      e.addEventListener("click", function (t) {
        var r = t.target;
        if ("INPUT" !== r.nodeName) return (a.innerHTML = "");
        var n = +r.dataset.x,
          e = +r.dataset.y;
        f =
          !!i("".concat(n).concat(e + 1)) ||
          (!i("".concat(n + 1).concat(e)) && null);
      });
    
      e.addEventListener("input", function (t) {
        var r = t.target,
          n = +r.dataset.x,
          e = +r.dataset.y;
        if (null !== t.data) {
          if (t.data.toUpperCase() === r.dataset.letter.toUpperCase()) {
            r.disabled = true;
            r.style.color = "black";
            r.style.backgroundColor = "green";
            c -= 1;
            if (c === 0) {
              setTimeout(function () {
                var modal = document.getElementById('crosswordFinished');
                var cancelBtn = document.getElementById('okayButton');
                modal.style.display = 'block';
                cancelBtn.onclick = function () {
                  modal.style.display = 'none';
                };
                window.onclick = function (event) {
                  if (event.target == modal) {
                    modal.style.display = 'none';
                  }
                };
              }, 4);
            }
          }
          var o = (function t(n, e, o) {
            var u = i("".concat(n + !o).concat(e + o));
            return u ? (u.value ? t(n + !o, e + o, o) : u) : r.blur();
          })(n, e, f);
          o && o.focus();
        }
      });
    

      crosswordGenerated = true;
      var t = i("key")
          .value.split("\n")
          .map(function (t) {
            return t.trim();
          }),
        r = i("val")
          .value.split("\n")
          .map(function (t) {
            return t.trim();
          });
      i("ctnr") &&
        (document.getElementById("crosswordsDiv").removeChild(i("ctnr")),
        document.getElementById("crosswordsDiv").removeChild(i("hint")));
        try{
          var n = o()(t),
        e = Object(u.g)({
          id: "ctnr",
          style: { height: 30 * n.height + 4, width: 30 * n.width + 4 },
        })(),
        a = Object(u.g)({ id: "hint" })();
      document.getElementById("crosswordsDiv").appendChild(e), document.getElementById("crosswordsDiv").appendChild(a);
      var c = 0;
      n.ownerMap.forEach(function (t, r) {
        t.forEach(function (t, n) {
          e.appendChild(
            Object(u.g)(
              {
                id: n + "" + r,
                dataletter: t.letter,
                datav: t.v,
                datah: t.h,
                datax: n,
                datay: r,
                datavidx: t.vIdx,
                datahidx: t.hIdx,
                maxlength: 1,
                autocomplete: "disabled",
                style: { left: 30 * n, top: 30 * r },
              },
              "input",
            )(),
          ),
            (c += 1);
        });
      });
        } catch (e) {
          showModal("Crossword generation failed because of the answer tile cannot find intersection of the words");
          function showModal(errorMessage) {
            var modal = document.getElementById("errorModal");
            var errorMessageElement = document.getElementById("errorMessage");
        
            // Set the error message
            errorMessageElement.textContent = errorMessage;
        
            // Display the modal
            modal.style.display = "block";
        
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
          }
        }
      var f = null;
      e.addEventListener(
        "focus",
        function (t) {
          var n = t.target,
            e = n.dataset.h,
            o = n.dataset.v;
          a.innerHTML =
            (e ? "Across：" + r[e] : "") + (o ? "<br>Down：" + r[o] : "<br>");
        },
        !0,
      ),
        e.addEventListener("click", function (t) {
          var r = t.target;
          if ("INPUT" !== r.nodeName) return (a.innerHTML = "");
          var n = +r.dataset.x,
            e = +r.dataset.y;
          f =
            !!i("".concat(n).concat(e + 1)) ||
            (!i("".concat(n + 1).concat(e)) && null);
        }),
        e.addEventListener("input", function (t) {
          var r = t.target,
            n = +r.dataset.x,
            e = +r.dataset.y;
          if (null !== t.data) {
            if (t.data === r.dataset.letter) {
              r.disabled = true;
              r.style.color = "black";
              r.style.backgroundColor = "green";

                c -= 1;
                if (c === 0) {
                    setTimeout(function () {
                      var modal = document.getElementById('crosswordFinished');
                      var cancelBtn = document.getElementById('okayButton');
                      modal.style.display = 'block';
                      cancelBtn.onclick = function () {
                          modal.style.display = 'none';
                      };
                      window.onclick = function (event) {
                          if (event.target == modal) {
                              modal.style.display = 'none';
                          }
                      };
                    }, 4);
                }
            }
            var o = (function t(n, e, o) {
              var u = i("".concat(n + !o).concat(e + o));
              return u ? (u.value ? t(n + !o, e + o, o) : u) : r.blur();
            })(n, e, f);
            o && o.focus();
          }
        });
        localStorage.setItem("crosswordData", JSON.stringify(n));
        console.log("Crossword data:", n);

        var storedCrosswordData = localStorage.getItem("crosswordData");
        var crosswordData = JSON.parse(storedCrosswordData);

        console.log("Fetched crossword data:", crosswordData);
    };
  },
  function (t, r, n) {},
]);
function closeErrorModal() {
  var modal = document.getElementById("errorModal");
  modal.style.display = "none";
}

// Existing showModal function
function showModal(errorMessage) {
  var modal = document.getElementById("errorModal");
  var errorMessageElement = document.getElementById("errorMessage");

  // Set the error message
  errorMessageElement.textContent = errorMessage;

  // Display the modal
  modal.style.display = "block";

  // Close the modal when clicking outside
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  };
}

