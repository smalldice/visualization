/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /npm/earcut@2.2.2/dist/earcut.dev.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).earcut = e();
  }
})(function () {
  return (function () {
    return function e(n, t, r) {
      function x(u, f) {
        if (!t[u]) {
          if (!n[u]) {
            var o = "function" == typeof require && require;
            if (!f && o) return o(u, !0);
            if (i) return i(u, !0);
            var v = new Error("Cannot find module '" + u + "'");
            throw ((v.code = "MODULE_NOT_FOUND"), v);
          }
          var y = (t[u] = { exports: {} });
          n[u][0].call(
            y.exports,
            function (e) {
              return x(n[u][1][e] || e);
            },
            y,
            y.exports,
            e,
            n,
            t,
            r
          );
        }
        return t[u].exports;
      }
      for (
        var i = "function" == typeof require && require, u = 0;
        u < r.length;
        u++
      )
        x(r[u]);
      return x;
    };
  })()(
    {
      1: [
        function (e, n, t) {
          "use strict";
          function r(e, n, t) {
            t = t || 2;
            var r,
              f,
              o,
              v,
              y,
              a,
              h,
              s = n && n.length,
              d = s ? n[0] * t : e.length,
              Z = x(e, 0, d, t, !0),
              w = [];
            if (!Z || Z.next === Z.prev) return w;
            if (
              (s &&
                (Z = (function (e, n, t, r) {
                  var u,
                    f,
                    o,
                    v,
                    y,
                    a = [];
                  for (u = 0, f = n.length; u < f; u++)
                    (o = n[u] * r),
                      (v = u < f - 1 ? n[u + 1] * r : e.length),
                      (y = x(e, o, v, r, !1)) === y.next && (y.steiner = !0),
                      a.push(c(y));
                  for (a.sort(p), u = 0; u < a.length; u++)
                    l(a[u], t), (t = i(t, t.next));
                  return t;
                })(e, n, Z, t)),
              e.length > 80 * t)
            ) {
              (r = o = e[0]), (f = v = e[1]);
              for (var g = t; g < d; g += t)
                (y = e[g]) < r && (r = y),
                  (a = e[g + 1]) < f && (f = a),
                  y > o && (o = y),
                  a > v && (v = a);
              h = 0 !== (h = Math.max(o - r, v - f)) ? 1 / h : 0;
            }
            return u(Z, w, t, r, f, h), w;
          }
          function x(e, n, t, r, x) {
            var i, u;
            if (x === D(e, n, t, r) > 0)
              for (i = n; i < t; i += r) u = q(i, e[i], e[i + 1], u);
            else for (i = t - r; i >= n; i -= r) u = q(i, e[i], e[i + 1], u);
            return u && w(u, u.next) && (O(u), (u = u.next)), u;
          }
          function i(e, n) {
            if (!e) return e;
            n || (n = e);
            var t,
              r = e;
            do {
              if (
                ((t = !1),
                r.steiner || (!w(r, r.next) && 0 !== Z(r.prev, r, r.next)))
              )
                r = r.next;
              else {
                if ((O(r), (r = n = r.prev) === r.next)) break;
                t = !0;
              }
            } while (t || r !== n);
            return n;
          }
          function u(e, n, t, r, x, p, l) {
            if (e) {
              !l &&
                p &&
                (function (e, n, t, r) {
                  var x = e;
                  do {
                    null === x.z && (x.z = h(x.x, x.y, n, t, r)),
                      (x.prevZ = x.prev),
                      (x.nextZ = x.next),
                      (x = x.next);
                  } while (x !== e);
                  (x.prevZ.nextZ = null),
                    (x.prevZ = null),
                    (function (e) {
                      var n,
                        t,
                        r,
                        x,
                        i,
                        u,
                        f,
                        o,
                        v = 1;
                      do {
                        for (t = e, e = null, i = null, u = 0; t; ) {
                          for (
                            u++, r = t, f = 0, n = 0;
                            n < v && (f++, (r = r.nextZ));
                            n++
                          );
                          for (o = v; f > 0 || (o > 0 && r); )
                            0 !== f && (0 === o || !r || t.z <= r.z)
                              ? ((x = t), (t = t.nextZ), f--)
                              : ((x = r), (r = r.nextZ), o--),
                              i ? (i.nextZ = x) : (e = x),
                              (x.prevZ = i),
                              (i = x);
                          t = r;
                        }
                        (i.nextZ = null), (v *= 2);
                      } while (u > 1);
                    })(x);
                })(e, r, x, p);
              for (var a, c, s = e; e.prev !== e.next; )
                if (((a = e.prev), (c = e.next), p ? o(e, r, x, p) : f(e)))
                  n.push(a.i / t),
                    n.push(e.i / t),
                    n.push(c.i / t),
                    O(e),
                    (e = c.next),
                    (s = c.next);
                else if ((e = c) === s) {
                  l
                    ? 1 === l
                      ? u((e = v(i(e), n, t)), n, t, r, x, p, 2)
                      : 2 === l && y(e, n, t, r, x, p)
                    : u(i(e), n, t, r, x, p, 1);
                  break;
                }
            }
          }
          function f(e) {
            var n = e.prev,
              t = e,
              r = e.next;
            if (Z(n, t, r) >= 0) return !1;
            for (var x = e.next.next; x !== e.prev; ) {
              if (
                s(n.x, n.y, t.x, t.y, r.x, r.y, x.x, x.y) &&
                Z(x.prev, x, x.next) >= 0
              )
                return !1;
              x = x.next;
            }
            return !0;
          }
          function o(e, n, t, r) {
            var x = e.prev,
              i = e,
              u = e.next;
            if (Z(x, i, u) >= 0) return !1;
            for (
              var f =
                  x.x < i.x ? (x.x < u.x ? x.x : u.x) : i.x < u.x ? i.x : u.x,
                o = x.y < i.y ? (x.y < u.y ? x.y : u.y) : i.y < u.y ? i.y : u.y,
                v = x.x > i.x ? (x.x > u.x ? x.x : u.x) : i.x > u.x ? i.x : u.x,
                y = x.y > i.y ? (x.y > u.y ? x.y : u.y) : i.y > u.y ? i.y : u.y,
                p = h(f, o, n, t, r),
                l = h(v, y, n, t, r),
                a = e.prevZ,
                c = e.nextZ;
              a && a.z >= p && c && c.z <= l;

            ) {
              if (
                a !== e.prev &&
                a !== e.next &&
                s(x.x, x.y, i.x, i.y, u.x, u.y, a.x, a.y) &&
                Z(a.prev, a, a.next) >= 0
              )
                return !1;
              if (
                ((a = a.prevZ),
                c !== e.prev &&
                  c !== e.next &&
                  s(x.x, x.y, i.x, i.y, u.x, u.y, c.x, c.y) &&
                  Z(c.prev, c, c.next) >= 0)
              )
                return !1;
              c = c.nextZ;
            }
            for (; a && a.z >= p; ) {
              if (
                a !== e.prev &&
                a !== e.next &&
                s(x.x, x.y, i.x, i.y, u.x, u.y, a.x, a.y) &&
                Z(a.prev, a, a.next) >= 0
              )
                return !1;
              a = a.prevZ;
            }
            for (; c && c.z <= l; ) {
              if (
                c !== e.prev &&
                c !== e.next &&
                s(x.x, x.y, i.x, i.y, u.x, u.y, c.x, c.y) &&
                Z(c.prev, c, c.next) >= 0
              )
                return !1;
              c = c.nextZ;
            }
            return !0;
          }
          function v(e, n, t) {
            var r = e;
            do {
              var x = r.prev,
                u = r.next.next;
              !w(x, u) &&
                g(x, r, r.next, u) &&
                m(x, u) &&
                m(u, x) &&
                (n.push(x.i / t),
                n.push(r.i / t),
                n.push(u.i / t),
                O(r),
                O(r.next),
                (r = e = u)),
                (r = r.next);
            } while (r !== e);
            return i(r);
          }
          function y(e, n, t, r, x, f) {
            var o = e;
            do {
              for (var v = o.next.next; v !== o.prev; ) {
                if (o.i !== v.i && d(o, v)) {
                  var y = z(o, v);
                  return (
                    (o = i(o, o.next)),
                    (y = i(y, y.next)),
                    u(o, n, t, r, x, f),
                    void u(y, n, t, r, x, f)
                  );
                }
                v = v.next;
              }
              o = o.next;
            } while (o !== e);
          }
          function p(e, n) {
            return e.x - n.x;
          }
          function l(e, n) {
            if (
              (n = (function (e, n) {
                var t,
                  r = n,
                  x = e.x,
                  i = e.y,
                  u = -1 / 0;
                do {
                  if (i <= r.y && i >= r.next.y && r.next.y !== r.y) {
                    var f =
                      r.x + ((i - r.y) * (r.next.x - r.x)) / (r.next.y - r.y);
                    if (f <= x && f > u) {
                      if (((u = f), f === x)) {
                        if (i === r.y) return r;
                        if (i === r.next.y) return r.next;
                      }
                      t = r.x < r.next.x ? r : r.next;
                    }
                  }
                  r = r.next;
                } while (r !== n);
                if (!t) return null;
                if (x === u) return t;
                var o,
                  v = t,
                  y = t.x,
                  p = t.y,
                  l = 1 / 0;
                r = t;
                do {
                  x >= r.x &&
                    r.x >= y &&
                    x !== r.x &&
                    s(i < p ? x : u, i, y, p, i < p ? u : x, i, r.x, r.y) &&
                    ((o = Math.abs(i - r.y) / (x - r.x)),
                    m(r, e) &&
                      (o < l ||
                        (o === l && (r.x > t.x || (r.x === t.x && a(t, r))))) &&
                      ((t = r), (l = o))),
                    (r = r.next);
                } while (r !== v);
                return t;
              })(e, n))
            ) {
              var t = z(n, e);
              i(n, n.next), i(t, t.next);
            }
          }
          function a(e, n) {
            return Z(e.prev, e, n.prev) < 0 && Z(n.next, e, e.next) < 0;
          }
          function h(e, n, t, r, x) {
            return (
              (e =
                1431655765 &
                ((e =
                  858993459 &
                  ((e =
                    252645135 &
                    ((e = 16711935 & ((e = 32767 * (e - t) * x) | (e << 8))) |
                      (e << 4))) |
                    (e << 2))) |
                  (e << 1))) |
              ((n =
                1431655765 &
                ((n =
                  858993459 &
                  ((n =
                    252645135 &
                    ((n = 16711935 & ((n = 32767 * (n - r) * x) | (n << 8))) |
                      (n << 4))) |
                    (n << 2))) |
                  (n << 1))) <<
                1)
            );
          }
          function c(e) {
            var n = e,
              t = e;
            do {
              (n.x < t.x || (n.x === t.x && n.y < t.y)) && (t = n),
                (n = n.next);
            } while (n !== e);
            return t;
          }
          function s(e, n, t, r, x, i, u, f) {
            return (
              (x - u) * (n - f) - (e - u) * (i - f) >= 0 &&
              (e - u) * (r - f) - (t - u) * (n - f) >= 0 &&
              (t - u) * (i - f) - (x - u) * (r - f) >= 0
            );
          }
          function d(e, n) {
            return (
              e.next.i !== n.i &&
              e.prev.i !== n.i &&
              !(function (e, n) {
                var t = e;
                do {
                  if (
                    t.i !== e.i &&
                    t.next.i !== e.i &&
                    t.i !== n.i &&
                    t.next.i !== n.i &&
                    g(t, t.next, e, n)
                  )
                    return !0;
                  t = t.next;
                } while (t !== e);
                return !1;
              })(e, n) &&
              ((m(e, n) &&
                m(n, e) &&
                (function (e, n) {
                  var t = e,
                    r = !1,
                    x = (e.x + n.x) / 2,
                    i = (e.y + n.y) / 2;
                  do {
                    t.y > i != t.next.y > i &&
                      t.next.y !== t.y &&
                      x <
                        ((t.next.x - t.x) * (i - t.y)) / (t.next.y - t.y) +
                          t.x &&
                      (r = !r),
                      (t = t.next);
                  } while (t !== e);
                  return r;
                })(e, n) &&
                (Z(e.prev, e, n.prev) || Z(e, n.prev, n))) ||
                (w(e, n) &&
                  Z(e.prev, e, e.next) > 0 &&
                  Z(n.prev, n, n.next) > 0))
            );
          }
          function Z(e, n, t) {
            return (n.y - e.y) * (t.x - n.x) - (n.x - e.x) * (t.y - n.y);
          }
          function w(e, n) {
            return e.x === n.x && e.y === n.y;
          }
          function g(e, n, t, r) {
            var x = b(Z(e, n, t)),
              i = b(Z(e, n, r)),
              u = b(Z(t, r, e)),
              f = b(Z(t, r, n));
            return (
              (x !== i && u !== f) ||
              !(0 !== x || !M(e, t, n)) ||
              !(0 !== i || !M(e, r, n)) ||
              !(0 !== u || !M(t, e, r)) ||
              !(0 !== f || !M(t, n, r))
            );
          }
          function M(e, n, t) {
            return (
              n.x <= Math.max(e.x, t.x) &&
              n.x >= Math.min(e.x, t.x) &&
              n.y <= Math.max(e.y, t.y) &&
              n.y >= Math.min(e.y, t.y)
            );
          }
          function b(e) {
            return e > 0 ? 1 : e < 0 ? -1 : 0;
          }
          function m(e, n) {
            return Z(e.prev, e, e.next) < 0
              ? Z(e, n, e.next) >= 0 && Z(e, e.prev, n) >= 0
              : Z(e, n, e.prev) < 0 || Z(e, e.next, n) < 0;
          }
          function z(e, n) {
            var t = new k(e.i, e.x, e.y),
              r = new k(n.i, n.x, n.y),
              x = e.next,
              i = n.prev;
            return (
              (e.next = n),
              (n.prev = e),
              (t.next = x),
              (x.prev = t),
              (r.next = t),
              (t.prev = r),
              (i.next = r),
              (r.prev = i),
              r
            );
          }
          function q(e, n, t, r) {
            var x = new k(e, n, t);
            return (
              r
                ? ((x.next = r.next),
                  (x.prev = r),
                  (r.next.prev = x),
                  (r.next = x))
                : ((x.prev = x), (x.next = x)),
              x
            );
          }
          function O(e) {
            (e.next.prev = e.prev),
              (e.prev.next = e.next),
              e.prevZ && (e.prevZ.nextZ = e.nextZ),
              e.nextZ && (e.nextZ.prevZ = e.prevZ);
          }
          function k(e, n, t) {
            (this.i = e),
              (this.x = n),
              (this.y = t),
              (this.prev = null),
              (this.next = null),
              (this.z = null),
              (this.prevZ = null),
              (this.nextZ = null),
              (this.steiner = !1);
          }
          function D(e, n, t, r) {
            for (var x = 0, i = n, u = t - r; i < t; i += r)
              (x += (e[u] - e[i]) * (e[i + 1] + e[u + 1])), (u = i);
            return x;
          }
          (n.exports = r),
            (n.exports.default = r),
            (r.deviation = function (e, n, t, r) {
              var x = n && n.length,
                i = x ? n[0] * t : e.length,
                u = Math.abs(D(e, 0, i, t));
              if (x)
                for (var f = 0, o = n.length; f < o; f++) {
                  var v = n[f] * t,
                    y = f < o - 1 ? n[f + 1] * t : e.length;
                  u -= Math.abs(D(e, v, y, t));
                }
              var p = 0;
              for (f = 0; f < r.length; f += 3) {
                var l = r[f] * t,
                  a = r[f + 1] * t,
                  h = r[f + 2] * t;
                p += Math.abs(
                  (e[l] - e[h]) * (e[a + 1] - e[l + 1]) -
                    (e[l] - e[a]) * (e[h + 1] - e[l + 1])
                );
              }
              return 0 === u && 0 === p ? 0 : Math.abs((p - u) / u);
            }),
            (r.flatten = function (e) {
              for (
                var n = e[0][0].length,
                  t = { vertices: [], holes: [], dimensions: n },
                  r = 0,
                  x = 0;
                x < e.length;
                x++
              ) {
                for (var i = 0; i < e[x].length; i++)
                  for (var u = 0; u < n; u++) t.vertices.push(e[x][i][u]);
                x > 0 && ((r += e[x - 1].length), t.holes.push(r));
              }
              return t;
            });
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});
//# sourceMappingURL=/sm/8aac0ce84ea3b9f7a3ee8e2f770d1f43eb263755f0955ba42ceb3a19ae11eab3.map
