;(function () {
  const t = document.createElement("link").relList
  if (t && t.supports && t.supports("modulepreload")) return
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o)
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const l of s.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && r(l)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(o) {
    const s = {}
    return (
      o.integrity && (s.integrity = o.integrity),
      o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (s.credentials = "omit")
          : (s.credentials = "same-origin"),
      s
    )
  }
  function r(o) {
    if (o.ep) return
    o.ep = !0
    const s = n(o)
    fetch(o.href, s)
  }
})()
function Pr(e, t) {
  const n = new Set(e.split(","))
  return t ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r)
}
const ne = {},
  Ot = [],
  Re = () => {},
  _l = () => !1,
  On = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  Sr = (e) => e.startsWith("onUpdate:"),
  ue = Object.assign,
  Rr = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  wl = Object.prototype.hasOwnProperty,
  G = (e, t) => wl.call(e, t),
  U = Array.isArray,
  At = (e) => An(e) === "[object Map]",
  Xo = (e) => An(e) === "[object Set]",
  V = (e) => typeof e == "function",
  se = (e) => typeof e == "string",
  Ft = (e) => typeof e == "symbol",
  re = (e) => e !== null && typeof e == "object",
  Zo = (e) => (re(e) || V(e)) && V(e.then) && V(e.catch),
  es = Object.prototype.toString,
  An = (e) => es.call(e),
  El = (e) => An(e).slice(8, -1),
  ts = (e) => An(e) === "[object Object]",
  Cr = (e) =>
    se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  hn = Pr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  Tn = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  xl = /-(\w)/g,
  De = Tn((e) => e.replace(xl, (t, n) => (n ? n.toUpperCase() : ""))),
  Pl = /\B([A-Z])/g,
  Lt = Tn((e) => e.replace(Pl, "-$1").toLowerCase()),
  In = Tn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Gn = Tn((e) => (e ? `on${In(e)}` : "")),
  it = (e, t) => !Object.is(e, t),
  qn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  bn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  Sl = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let Zr
const ns = () =>
  Zr ||
  (Zr =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {})
function Or(e) {
  if (U(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = se(r) ? Al(r) : Or(r)
      if (o) for (const s in o) t[s] = o[s]
    }
    return t
  } else if (se(e) || re(e)) return e
}
const Rl = /;(?![^(]*\))/g,
  Cl = /:([^]+)/,
  Ol = /\/\*[^]*?\*\//g
function Al(e) {
  const t = {}
  return (
    e
      .replace(Ol, "")
      .split(Rl)
      .forEach((n) => {
        if (n) {
          const r = n.split(Cl)
          r.length > 1 && (t[r[0].trim()] = r[1].trim())
        }
      }),
    t
  )
}
function Ar(e) {
  let t = ""
  if (se(e)) t = e
  else if (U(e))
    for (let n = 0; n < e.length; n++) {
      const r = Ar(e[n])
      r && (t += r + " ")
    }
  else if (re(e)) for (const n in e) e[n] && (t += n + " ")
  return t.trim()
}
const Tl =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Il = Pr(Tl)
function rs(e) {
  return !!e || e === ""
}
const zn = (e) =>
    se(e)
      ? e
      : e == null
        ? ""
        : U(e) || (re(e) && (e.toString === es || !V(e.toString)))
          ? JSON.stringify(e, os, 2)
          : String(e),
  os = (e, t) =>
    t && t.__v_isRef
      ? os(e, t.value)
      : At(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [r, o], s) => ((n[Yn(r, s) + " =>"] = o), n),
              {},
            ),
          }
        : Xo(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Yn(n)) }
          : Ft(t)
            ? Yn(t)
            : re(t) && !U(t) && !ts(t)
              ? String(t)
              : t,
  Yn = (e, t = "") => {
    var n
    return Ft(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  }
let Ae
class Ml {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ae),
      !t && Ae && (this.index = (Ae.scopes || (Ae.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = Ae
      try {
        return (Ae = this), t()
      } finally {
        Ae = n
      }
    }
  }
  on() {
    Ae = this
  }
  off() {
    Ae = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, r
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop()
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]()
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0)
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop()
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function $l(e, t = Ae) {
  t && t.active && t.effects.push(e)
}
function Nl() {
  return Ae
}
let ht
class Tr {
  constructor(t, n, r, o) {
    ;(this.fn = t),
      (this.trigger = n),
      (this.scheduler = r),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 2),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      $l(this, o)
  }
  get dirty() {
    if (this._dirtyLevel === 1) {
      vt()
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t]
        if (n.computed && (Fl(n.computed), this._dirtyLevel >= 2)) break
      }
      this._dirtyLevel < 2 && (this._dirtyLevel = 0), yt()
    }
    return this._dirtyLevel >= 2
  }
  set dirty(t) {
    this._dirtyLevel = t ? 2 : 0
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn()
    let t = ot,
      n = ht
    try {
      return (ot = !0), (ht = this), this._runnings++, eo(this), this.fn()
    } finally {
      to(this), this._runnings--, (ht = n), (ot = t)
    }
  }
  stop() {
    var t
    this.active &&
      (eo(this),
      to(this),
      (t = this.onStop) == null || t.call(this),
      (this.active = !1))
  }
}
function Fl(e) {
  return e.value
}
function eo(e) {
  e._trackId++, (e._depsLength = 0)
}
function to(e) {
  if (e.deps && e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++) ss(e.deps[t], e)
    e.deps.length = e._depsLength
  }
}
function ss(e, t) {
  const n = e.get(t)
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup())
}
let ot = !0,
  lr = 0
const ls = []
function vt() {
  ls.push(ot), (ot = !1)
}
function yt() {
  const e = ls.pop()
  ot = e === void 0 ? !0 : e
}
function Ir() {
  lr++
}
function Mr() {
  for (lr--; !lr && ir.length; ) ir.shift()()
}
function is(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId)
    const r = e.deps[e._depsLength]
    r !== t ? (r && ss(r, e), (e.deps[e._depsLength++] = t)) : e._depsLength++
  }
}
const ir = []
function us(e, t, n) {
  Ir()
  for (const r of e.keys())
    if (r._dirtyLevel < t && e.get(r) === r._trackId) {
      const o = r._dirtyLevel
      ;(r._dirtyLevel = t), o === 0 && ((r._shouldSchedule = !0), r.trigger())
    }
  cs(e), Mr()
}
function cs(e) {
  for (const t of e.keys())
    t.scheduler &&
      t._shouldSchedule &&
      (!t._runnings || t.allowRecurse) &&
      e.get(t) === t._trackId &&
      ((t._shouldSchedule = !1), ir.push(t.scheduler))
}
const as = (e, t) => {
    const n = new Map()
    return (n.cleanup = e), (n.computed = t), n
  },
  ur = new WeakMap(),
  pt = Symbol(""),
  cr = Symbol("")
function we(e, t, n) {
  if (ot && ht) {
    let r = ur.get(e)
    r || ur.set(e, (r = new Map()))
    let o = r.get(n)
    o || r.set(n, (o = as(() => r.delete(n)))), is(ht, o)
  }
}
function qe(e, t, n, r, o, s) {
  const l = ur.get(e)
  if (!l) return
  let i = []
  if (t === "clear") i = [...l.values()]
  else if (n === "length" && U(e)) {
    const u = Number(r)
    l.forEach((f, c) => {
      ;(c === "length" || (!Ft(c) && c >= u)) && i.push(f)
    })
  } else
    switch ((n !== void 0 && i.push(l.get(n)), t)) {
      case "add":
        U(e)
          ? Cr(n) && i.push(l.get("length"))
          : (i.push(l.get(pt)), At(e) && i.push(l.get(cr)))
        break
      case "delete":
        U(e) || (i.push(l.get(pt)), At(e) && i.push(l.get(cr)))
        break
      case "set":
        At(e) && i.push(l.get(pt))
        break
    }
  Ir()
  for (const u of i) u && us(u, 2)
  Mr()
}
const Ll = Pr("__proto__,__v_isRef,__isVue"),
  fs = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Ft),
  ),
  no = jl()
function jl() {
  const e = {}
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = q(this)
        for (let s = 0, l = this.length; s < l; s++) we(r, "get", s + "")
        const o = r[t](...n)
        return o === -1 || o === !1 ? r[t](...n.map(q)) : o
      }
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        vt(), Ir()
        const r = q(this)[t].apply(this, n)
        return Mr(), yt(), r
      }
    }),
    e
  )
}
function kl(e) {
  const t = q(this)
  return we(t, "has", e), t.hasOwnProperty(e)
}
class ds {
  constructor(t = !1, n = !1) {
    ;(this._isReadonly = t), (this._shallow = n)
  }
  get(t, n, r) {
    const o = this._isReadonly,
      s = this._shallow
    if (n === "__v_isReactive") return !o
    if (n === "__v_isReadonly") return o
    if (n === "__v_isShallow") return s
    if (n === "__v_raw")
      return r === (o ? (s ? Jl : ms) : s ? gs : ps).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(r)
        ? t
        : void 0
    const l = U(t)
    if (!o) {
      if (l && G(no, n)) return Reflect.get(no, n, r)
      if (n === "hasOwnProperty") return kl
    }
    const i = Reflect.get(t, n, r)
    return (Ft(n) ? fs.has(n) : Ll(n)) || (o || we(t, "get", n), s)
      ? i
      : Ee(i)
        ? l && Cr(n)
          ? i
          : i.value
        : re(i)
          ? o
            ? ys(i)
            : en(i)
          : i
  }
}
class hs extends ds {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, r, o) {
    let s = t[n]
    if (!this._shallow) {
      const u = Mt(s)
      if (
        (!_n(r) && !Mt(r) && ((s = q(s)), (r = q(r))), !U(t) && Ee(s) && !Ee(r))
      )
        return u ? !1 : ((s.value = r), !0)
    }
    const l = U(t) && Cr(n) ? Number(n) < t.length : G(t, n),
      i = Reflect.set(t, n, r, o)
    return (
      t === q(o) && (l ? it(r, s) && qe(t, "set", n, r) : qe(t, "add", n, r)), i
    )
  }
  deleteProperty(t, n) {
    const r = G(t, n)
    t[n]
    const o = Reflect.deleteProperty(t, n)
    return o && r && qe(t, "delete", n, void 0), o
  }
  has(t, n) {
    const r = Reflect.has(t, n)
    return (!Ft(n) || !fs.has(n)) && we(t, "has", n), r
  }
  ownKeys(t) {
    return we(t, "iterate", U(t) ? "length" : pt), Reflect.ownKeys(t)
  }
}
class Hl extends ds {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const Bl = new hs(),
  Dl = new Hl(),
  Ul = new hs(!0),
  $r = (e) => e,
  Mn = (e) => Reflect.getPrototypeOf(e)
function on(e, t, n = !1, r = !1) {
  e = e.__v_raw
  const o = q(e),
    s = q(t)
  n || (it(t, s) && we(o, "get", t), we(o, "get", s))
  const { has: l } = Mn(o),
    i = r ? $r : n ? Lr : qt
  if (l.call(o, t)) return i(e.get(t))
  if (l.call(o, s)) return i(e.get(s))
  e !== o && e.get(t)
}
function sn(e, t = !1) {
  const n = this.__v_raw,
    r = q(n),
    o = q(e)
  return (
    t || (it(e, o) && we(r, "has", e), we(r, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  )
}
function ln(e, t = !1) {
  return (
    (e = e.__v_raw), !t && we(q(e), "iterate", pt), Reflect.get(e, "size", e)
  )
}
function ro(e) {
  e = q(e)
  const t = q(this)
  return Mn(t).has.call(t, e) || (t.add(e), qe(t, "add", e, e)), this
}
function oo(e, t) {
  t = q(t)
  const n = q(this),
    { has: r, get: o } = Mn(n)
  let s = r.call(n, e)
  s || ((e = q(e)), (s = r.call(n, e)))
  const l = o.call(n, e)
  return (
    n.set(e, t), s ? it(t, l) && qe(n, "set", e, t) : qe(n, "add", e, t), this
  )
}
function so(e) {
  const t = q(this),
    { has: n, get: r } = Mn(t)
  let o = n.call(t, e)
  o || ((e = q(e)), (o = n.call(t, e))), r && r.call(t, e)
  const s = t.delete(e)
  return o && qe(t, "delete", e, void 0), s
}
function lo() {
  const e = q(this),
    t = e.size !== 0,
    n = e.clear()
  return t && qe(e, "clear", void 0, void 0), n
}
function un(e, t) {
  return function (r, o) {
    const s = this,
      l = s.__v_raw,
      i = q(l),
      u = t ? $r : e ? Lr : qt
    return (
      !e && we(i, "iterate", pt), l.forEach((f, c) => r.call(o, u(f), u(c), s))
    )
  }
}
function cn(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      s = q(o),
      l = At(s),
      i = e === "entries" || (e === Symbol.iterator && l),
      u = e === "keys" && l,
      f = o[e](...r),
      c = n ? $r : t ? Lr : qt
    return (
      !t && we(s, "iterate", u ? cr : pt),
      {
        next() {
          const { value: h, done: p } = f.next()
          return p
            ? { value: h, done: p }
            : { value: i ? [c(h[0]), c(h[1])] : c(h), done: p }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function Je(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this
  }
}
function Kl() {
  const e = {
      get(s) {
        return on(this, s)
      },
      get size() {
        return ln(this)
      },
      has: sn,
      add: ro,
      set: oo,
      delete: so,
      clear: lo,
      forEach: un(!1, !1),
    },
    t = {
      get(s) {
        return on(this, s, !1, !0)
      },
      get size() {
        return ln(this)
      },
      has: sn,
      add: ro,
      set: oo,
      delete: so,
      clear: lo,
      forEach: un(!1, !0),
    },
    n = {
      get(s) {
        return on(this, s, !0)
      },
      get size() {
        return ln(this, !0)
      },
      has(s) {
        return sn.call(this, s, !0)
      },
      add: Je("add"),
      set: Je("set"),
      delete: Je("delete"),
      clear: Je("clear"),
      forEach: un(!0, !1),
    },
    r = {
      get(s) {
        return on(this, s, !0, !0)
      },
      get size() {
        return ln(this, !0)
      },
      has(s) {
        return sn.call(this, s, !0)
      },
      add: Je("add"),
      set: Je("set"),
      delete: Je("delete"),
      clear: Je("clear"),
      forEach: un(!0, !0),
    }
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      ;(e[s] = cn(s, !1, !1)),
        (n[s] = cn(s, !0, !1)),
        (t[s] = cn(s, !1, !0)),
        (r[s] = cn(s, !0, !0))
    }),
    [e, n, t, r]
  )
}
const [Vl, Wl, Gl, ql] = Kl()
function Nr(e, t) {
  const n = t ? (e ? ql : Gl) : e ? Wl : Vl
  return (r, o, s) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
        ? e
        : o === "__v_raw"
          ? r
          : Reflect.get(G(n, o) && o in r ? n : r, o, s)
}
const zl = { get: Nr(!1, !1) },
  Yl = { get: Nr(!1, !0) },
  Ql = { get: Nr(!0, !1) },
  ps = new WeakMap(),
  gs = new WeakMap(),
  ms = new WeakMap(),
  Jl = new WeakMap()
function Xl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2
    default:
      return 0
  }
}
function Zl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Xl(El(e))
}
function en(e) {
  return Mt(e) ? e : Fr(e, !1, Bl, zl, ps)
}
function vs(e) {
  return Fr(e, !1, Ul, Yl, gs)
}
function ys(e) {
  return Fr(e, !0, Dl, Ql, ms)
}
function Fr(e, t, n, r, o) {
  if (!re(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const s = o.get(e)
  if (s) return s
  const l = Zl(e)
  if (l === 0) return e
  const i = new Proxy(e, l === 2 ? r : n)
  return o.set(e, i), i
}
function Tt(e) {
  return Mt(e) ? Tt(e.__v_raw) : !!(e && e.__v_isReactive)
}
function Mt(e) {
  return !!(e && e.__v_isReadonly)
}
function _n(e) {
  return !!(e && e.__v_isShallow)
}
function bs(e) {
  return Tt(e) || Mt(e)
}
function q(e) {
  const t = e && e.__v_raw
  return t ? q(t) : e
}
function _s(e) {
  return bn(e, "__v_skip", !0), e
}
const qt = (e) => (re(e) ? en(e) : e),
  Lr = (e) => (re(e) ? ys(e) : e)
class ws {
  constructor(t, n, r, o) {
    ;(this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new Tr(
        () => t(this._value),
        () => pn(this, 1),
        () => this.dep && cs(this.dep),
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r)
  }
  get value() {
    const t = q(this)
    return (
      (!t._cacheable || t.effect.dirty) &&
        it(t._value, (t._value = t.effect.run())) &&
        pn(t, 2),
      Es(t),
      t.effect._dirtyLevel >= 1 && pn(t, 1),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
  get _dirty() {
    return this.effect.dirty
  }
  set _dirty(t) {
    this.effect.dirty = t
  }
}
function ei(e, t, n = !1) {
  let r, o
  const s = V(e)
  return (
    s ? ((r = e), (o = Re)) : ((r = e.get), (o = e.set)),
    new ws(r, o, s || !o, n)
  )
}
function Es(e) {
  ot &&
    ht &&
    ((e = q(e)),
    is(
      ht,
      e.dep ||
        (e.dep = as(() => (e.dep = void 0), e instanceof ws ? e : void 0)),
    ))
}
function pn(e, t = 2, n) {
  e = q(e)
  const r = e.dep
  r && us(r, t)
}
function Ee(e) {
  return !!(e && e.__v_isRef === !0)
}
function ae(e) {
  return xs(e, !1)
}
function ti(e) {
  return xs(e, !0)
}
function xs(e, t) {
  return Ee(e) ? e : new ni(e, t)
}
class ni {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : q(t)),
      (this._value = n ? t : qt(t))
  }
  get value() {
    return Es(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || _n(t) || Mt(t)
    ;(t = n ? t : q(t)),
      it(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : qt(t)), pn(this, 2))
  }
}
function Te(e) {
  return Ee(e) ? e.value : e
}
const ri = {
  get: (e, t, n) => Te(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t]
    return Ee(o) && !Ee(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r)
  },
}
function Ps(e) {
  return Tt(e) ? e : new Proxy(e, ri)
}
function st(e, t, n, r) {
  let o
  try {
    o = r ? e(...r) : e()
  } catch (s) {
    $n(s, t, n)
  }
  return o
}
function $e(e, t, n, r) {
  if (V(e)) {
    const s = st(e, t, n, r)
    return (
      s &&
        Zo(s) &&
        s.catch((l) => {
          $n(l, t, n)
        }),
      s
    )
  }
  const o = []
  for (let s = 0; s < e.length; s++) o.push($e(e[s], t, n, r))
  return o
}
function $n(e, t, n, r = !0) {
  const o = t ? t.vnode : null
  if (t) {
    let s = t.parent
    const l = t.proxy,
      i = `https://vuejs.org/error-reference/#runtime-${n}`
    for (; s; ) {
      const f = s.ec
      if (f) {
        for (let c = 0; c < f.length; c++) if (f[c](e, l, i) === !1) return
      }
      s = s.parent
    }
    const u = t.appContext.config.errorHandler
    if (u) {
      st(u, null, 10, [e, l, i])
      return
    }
  }
  oi(e, n, o, r)
}
function oi(e, t, n, r = !0) {
  console.error(e)
}
let zt = !1,
  ar = !1
const fe = []
let Be = 0
const It = []
let Ze = null,
  at = 0
const Ss = Promise.resolve()
let jr = null
function Rs(e) {
  const t = jr || Ss
  return e ? t.then(this ? e.bind(this) : e) : t
}
function si(e) {
  let t = Be + 1,
    n = fe.length
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      o = fe[r],
      s = Yt(o)
    s < e || (s === e && o.pre) ? (t = r + 1) : (n = r)
  }
  return t
}
function kr(e) {
  ;(!fe.length || !fe.includes(e, zt && e.allowRecurse ? Be + 1 : Be)) &&
    (e.id == null ? fe.push(e) : fe.splice(si(e.id), 0, e), Cs())
}
function Cs() {
  !zt && !ar && ((ar = !0), (jr = Ss.then(As)))
}
function li(e) {
  const t = fe.indexOf(e)
  t > Be && fe.splice(t, 1)
}
function ii(e) {
  U(e)
    ? It.push(...e)
    : (!Ze || !Ze.includes(e, e.allowRecurse ? at + 1 : at)) && It.push(e),
    Cs()
}
function io(e, t, n = zt ? Be + 1 : 0) {
  for (; n < fe.length; n++) {
    const r = fe[n]
    if (r && r.pre) {
      if (e && r.id !== e.uid) continue
      fe.splice(n, 1), n--, r()
    }
  }
}
function Os(e) {
  if (It.length) {
    const t = [...new Set(It)].sort((n, r) => Yt(n) - Yt(r))
    if (((It.length = 0), Ze)) {
      Ze.push(...t)
      return
    }
    for (Ze = t, at = 0; at < Ze.length; at++) Ze[at]()
    ;(Ze = null), (at = 0)
  }
}
const Yt = (e) => (e.id == null ? 1 / 0 : e.id),
  ui = (e, t) => {
    const n = Yt(e) - Yt(t)
    if (n === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return n
  }
function As(e) {
  ;(ar = !1), (zt = !0), fe.sort(ui)
  try {
    for (Be = 0; Be < fe.length; Be++) {
      const t = fe[Be]
      t && t.active !== !1 && st(t, null, 14)
    }
  } finally {
    ;(Be = 0),
      (fe.length = 0),
      Os(),
      (zt = !1),
      (jr = null),
      (fe.length || It.length) && As()
  }
}
function ci(e, t, ...n) {
  if (e.isUnmounted) return
  const r = e.vnode.props || ne
  let o = n
  const s = t.startsWith("update:"),
    l = s && t.slice(7)
  if (l && l in r) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`,
      { number: h, trim: p } = r[c] || ne
    p && (o = n.map((m) => (se(m) ? m.trim() : m))), h && (o = n.map(Sl))
  }
  let i,
    u = r[(i = Gn(t))] || r[(i = Gn(De(t)))]
  !u && s && (u = r[(i = Gn(Lt(t)))]), u && $e(u, e, 6, o)
  const f = r[i + "Once"]
  if (f) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[i]) return
    ;(e.emitted[i] = !0), $e(f, e, 6, o)
  }
}
function Ts(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e)
  if (o !== void 0) return o
  const s = e.emits
  let l = {},
    i = !1
  if (!V(e)) {
    const u = (f) => {
      const c = Ts(f, t, !0)
      c && ((i = !0), ue(l, c))
    }
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u)
  }
  return !s && !i
    ? (re(e) && r.set(e, null), null)
    : (U(s) ? s.forEach((u) => (l[u] = null)) : ue(l, s),
      re(e) && r.set(e, l),
      l)
}
function Nn(e, t) {
  return !e || !On(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      G(e, t[0].toLowerCase() + t.slice(1)) || G(e, Lt(t)) || G(e, t))
}
let Ie = null,
  Is = null
function wn(e) {
  const t = Ie
  return (Ie = e), (Is = (e && e.type.__scopeId) || null), t
}
function gn(e, t = Ie, n) {
  if (!t || e._n) return e
  const r = (...o) => {
    r._d && _o(-1)
    const s = wn(t)
    let l
    try {
      l = e(...o)
    } finally {
      wn(s), r._d && _o(1)
    }
    return l
  }
  return (r._n = !0), (r._c = !0), (r._d = !0), r
}
function Qn(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: s,
    propsOptions: [l],
    slots: i,
    attrs: u,
    emit: f,
    render: c,
    renderCache: h,
    data: p,
    setupState: m,
    ctx: x,
    inheritAttrs: C,
  } = e
  let O, R
  const M = wn(e)
  try {
    if (n.shapeFlag & 4) {
      const k = o || r,
        F = k
      ;(O = He(c.call(F, k, h, s, m, p, x))), (R = u)
    } else {
      const k = t
      ;(O = He(
        k.length > 1 ? k(s, { attrs: u, slots: i, emit: f }) : k(s, null),
      )),
        (R = t.props ? u : ai(u))
    }
  } catch (k) {
    ;(Kt.length = 0), $n(k, e, 1), (O = me(gt))
  }
  let P = O
  if (R && C !== !1) {
    const k = Object.keys(R),
      { shapeFlag: F } = P
    k.length && F & 7 && (l && k.some(Sr) && (R = fi(R, l)), (P = mt(P, R)))
  }
  return (
    n.dirs && ((P = mt(P)), (P.dirs = P.dirs ? P.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (P.transition = n.transition),
    (O = P),
    wn(M),
    O
  )
}
const ai = (e) => {
    let t
    for (const n in e)
      (n === "class" || n === "style" || On(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  fi = (e, t) => {
    const n = {}
    for (const r in e) (!Sr(r) || !(r.slice(9) in t)) && (n[r] = e[r])
    return n
  }
function di(e, t, n) {
  const { props: r, children: o, component: s } = e,
    { props: l, children: i, patchFlag: u } = t,
    f = s.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && u >= 0) {
    if (u & 1024) return !0
    if (u & 16) return r ? uo(r, l, f) : !!l
    if (u & 8) {
      const c = t.dynamicProps
      for (let h = 0; h < c.length; h++) {
        const p = c[h]
        if (l[p] !== r[p] && !Nn(f, p)) return !0
      }
    }
  } else
    return (o || i) && (!i || !i.$stable)
      ? !0
      : r === l
        ? !1
        : r
          ? l
            ? uo(r, l, f)
            : !0
          : !!l
  return !1
}
function uo(e, t, n) {
  const r = Object.keys(t)
  if (r.length !== Object.keys(e).length) return !0
  for (let o = 0; o < r.length; o++) {
    const s = r[o]
    if (t[s] !== e[s] && !Nn(n, s)) return !0
  }
  return !1
}
function hi({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const r = t.subTree
    if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e))
      ((e = t.vnode).el = n), (t = t.parent)
    else break
  }
}
const Hr = "components"
function pi(e, t) {
  return $s(Hr, e, !0, t) || e
}
const Ms = Symbol.for("v-ndc")
function gi(e) {
  return se(e) ? $s(Hr, e, !1) || e : e || Ms
}
function $s(e, t, n = !0, r = !1) {
  const o = Ie || de
  if (o) {
    const s = o.type
    if (e === Hr) {
      const i = uu(s, !1)
      if (i && (i === t || i === De(t) || i === In(De(t)))) return s
    }
    const l = co(o[e] || s[e], t) || co(o.appContext[e], t)
    return !l && r ? s : l
  }
}
function co(e, t) {
  return e && (e[t] || e[De(t)] || e[In(De(t))])
}
const mi = (e) => e.__isSuspense
function vi(e, t) {
  t && t.pendingBranch
    ? U(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : ii(e)
}
const yi = Symbol.for("v-scx"),
  bi = () => ve(yi)
function bt(e, t) {
  return Br(e, null, t)
}
const an = {}
function mn(e, t, n) {
  return Br(e, t, n)
}
function Br(
  e,
  t,
  { immediate: n, deep: r, flush: o, once: s, onTrack: l, onTrigger: i } = ne,
) {
  if (t && s) {
    const I = t
    t = (...K) => {
      I(...K), F()
    }
  }
  const u = de,
    f = (I) => (r === !0 ? I : Ct(I, r === !1 ? 1 : void 0))
  let c,
    h = !1,
    p = !1
  if (
    (Ee(e)
      ? ((c = () => e.value), (h = _n(e)))
      : Tt(e)
        ? ((c = () => f(e)), (h = !0))
        : U(e)
          ? ((p = !0),
            (h = e.some((I) => Tt(I) || _n(I))),
            (c = () =>
              e.map((I) => {
                if (Ee(I)) return I.value
                if (Tt(I)) return f(I)
                if (V(I)) return st(I, u, 2)
              })))
          : V(e)
            ? t
              ? (c = () => st(e, u, 2))
              : (c = () => (m && m(), $e(e, u, 3, [x])))
            : (c = Re),
    t && r)
  ) {
    const I = c
    c = () => Ct(I())
  }
  let m,
    x = (I) => {
      m = P.onStop = () => {
        st(I, u, 4), (m = P.onStop = void 0)
      }
    },
    C
  if (Bn)
    if (
      ((x = Re),
      t ? n && $e(t, u, 3, [c(), p ? [] : void 0, x]) : c(),
      o === "sync")
    ) {
      const I = bi()
      C = I.__watcherHandles || (I.__watcherHandles = [])
    } else return Re
  let O = p ? new Array(e.length).fill(an) : an
  const R = () => {
    if (!(!P.active || !P.dirty))
      if (t) {
        const I = P.run()
        ;(r || h || (p ? I.some((K, Z) => it(K, O[Z])) : it(I, O))) &&
          (m && m(),
          $e(t, u, 3, [I, O === an ? void 0 : p && O[0] === an ? [] : O, x]),
          (O = I))
      } else P.run()
  }
  R.allowRecurse = !!t
  let M
  o === "sync"
    ? (M = R)
    : o === "post"
      ? (M = () => be(R, u && u.suspense))
      : ((R.pre = !0), u && (R.id = u.uid), (M = () => kr(R)))
  const P = new Tr(c, Re, M),
    k = Nl(),
    F = () => {
      P.stop(), k && Rr(k.effects, P)
    }
  return (
    t
      ? n
        ? R()
        : (O = P.run())
      : o === "post"
        ? be(P.run.bind(P), u && u.suspense)
        : P.run(),
    C && C.push(F),
    F
  )
}
function _i(e, t, n) {
  const r = this.proxy,
    o = se(e) ? (e.includes(".") ? Ns(r, e) : () => r[e]) : e.bind(r, r)
  let s
  V(t) ? (s = t) : ((s = t.handler), (n = t))
  const l = tn(this),
    i = Br(o, s.bind(r), n)
  return l(), i
}
function Ns(e, t) {
  const n = t.split(".")
  return () => {
    let r = e
    for (let o = 0; o < n.length && r; o++) r = r[n[o]]
    return r
  }
}
function Ct(e, t, n = 0, r) {
  if (!re(e) || e.__v_skip) return e
  if (t && t > 0) {
    if (n >= t) return e
    n++
  }
  if (((r = r || new Set()), r.has(e))) return e
  if ((r.add(e), Ee(e))) Ct(e.value, t, n, r)
  else if (U(e)) for (let o = 0; o < e.length; o++) Ct(e[o], t, n, r)
  else if (Xo(e) || At(e))
    e.forEach((o) => {
      Ct(o, t, n, r)
    })
  else if (ts(e)) for (const o in e) Ct(e[o], t, n, r)
  return e
}
function ut(e, t, n, r) {
  const o = e.dirs,
    s = t && t.dirs
  for (let l = 0; l < o.length; l++) {
    const i = o[l]
    s && (i.oldValue = s[l].value)
    let u = i.dir[r]
    u && (vt(), $e(u, n, 8, [e.el, i, e, t]), yt())
  }
}
function _t(e, t) {
  return V(e) ? ue({ name: e.name }, t, { setup: e }) : e
}
const vn = (e) => !!e.type.__asyncLoader,
  Fs = (e) => e.type.__isKeepAlive
function wi(e, t) {
  Ls(e, "a", t)
}
function Ei(e, t) {
  Ls(e, "da", t)
}
function Ls(e, t, n = de) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n
      for (; o; ) {
        if (o.isDeactivated) return
        o = o.parent
      }
      return e()
    })
  if ((Fn(t, r, n), n)) {
    let o = n.parent
    for (; o && o.parent; ) Fs(o.parent.vnode) && xi(r, t, n, o), (o = o.parent)
  }
}
function xi(e, t, n, r) {
  const o = Fn(t, e, r, !0)
  jn(() => {
    Rr(r[t], o)
  }, n)
}
function Fn(e, t, n = de, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      s =
        t.__weh ||
        (t.__weh = (...l) => {
          if (n.isUnmounted) return
          vt()
          const i = tn(n),
            u = $e(t, n, e, l)
          return i(), yt(), u
        })
    return r ? o.unshift(s) : o.push(s), s
  }
}
const Ye =
    (e) =>
    (t, n = de) =>
      (!Bn || e === "sp") && Fn(e, (...r) => t(...r), n),
  Pi = Ye("bm"),
  Ln = Ye("m"),
  Si = Ye("bu"),
  Ri = Ye("u"),
  Ci = Ye("bum"),
  jn = Ye("um"),
  Oi = Ye("sp"),
  Ai = Ye("rtg"),
  Ti = Ye("rtc")
function Ii(e, t = de) {
  Fn("ec", e, t)
}
function ao(e, t, n, r) {
  let o
  const s = n && n[r]
  if (U(e) || se(e)) {
    o = new Array(e.length)
    for (let l = 0, i = e.length; l < i; l++)
      o[l] = t(e[l], l, void 0, s && s[l])
  } else if (typeof e == "number") {
    o = new Array(e)
    for (let l = 0; l < e; l++) o[l] = t(l + 1, l, void 0, s && s[l])
  } else if (re(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (l, i) => t(l, i, void 0, s && s[i]))
    else {
      const l = Object.keys(e)
      o = new Array(l.length)
      for (let i = 0, u = l.length; i < u; i++) {
        const f = l[i]
        o[i] = t(e[f], f, i, s && s[i])
      }
    }
  else o = []
  return n && (n[r] = o), o
}
const fr = (e) => (e ? (Ys(e) ? Wr(e) || e.proxy : fr(e.parent)) : null),
  Ut = ue(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => fr(e.parent),
    $root: (e) => fr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Dr(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        ;(e.effect.dirty = !0), kr(e.update)
      }),
    $nextTick: (e) => e.n || (e.n = Rs.bind(e.proxy)),
    $watch: (e) => _i.bind(e),
  }),
  Jn = (e, t) => e !== ne && !e.__isScriptSetup && G(e, t),
  Mi = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: s,
        accessCache: l,
        type: i,
        appContext: u,
      } = e
      let f
      if (t[0] !== "$") {
        const m = l[t]
        if (m !== void 0)
          switch (m) {
            case 1:
              return r[t]
            case 2:
              return o[t]
            case 4:
              return n[t]
            case 3:
              return s[t]
          }
        else {
          if (Jn(r, t)) return (l[t] = 1), r[t]
          if (o !== ne && G(o, t)) return (l[t] = 2), o[t]
          if ((f = e.propsOptions[0]) && G(f, t)) return (l[t] = 3), s[t]
          if (n !== ne && G(n, t)) return (l[t] = 4), n[t]
          dr && (l[t] = 0)
        }
      }
      const c = Ut[t]
      let h, p
      if (c) return t === "$attrs" && we(e, "get", t), c(e)
      if ((h = i.__cssModules) && (h = h[t])) return h
      if (n !== ne && G(n, t)) return (l[t] = 4), n[t]
      if (((p = u.config.globalProperties), G(p, t))) return p[t]
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: s } = e
      return Jn(o, t)
        ? ((o[t] = n), !0)
        : r !== ne && G(r, t)
          ? ((r[t] = n), !0)
          : G(e.props, t) || (t[0] === "$" && t.slice(1) in e)
            ? !1
            : ((s[t] = n), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: s,
        },
      },
      l,
    ) {
      let i
      return (
        !!n[l] ||
        (e !== ne && G(e, l)) ||
        Jn(t, l) ||
        ((i = s[0]) && G(i, l)) ||
        G(r, l) ||
        G(Ut, l) ||
        G(o.config.globalProperties, l)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : G(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    },
  }
function fo(e) {
  return U(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let dr = !0
function $i(e) {
  const t = Dr(e),
    n = e.proxy,
    r = e.ctx
  ;(dr = !1), t.beforeCreate && ho(t.beforeCreate, e, "bc")
  const {
    data: o,
    computed: s,
    methods: l,
    watch: i,
    provide: u,
    inject: f,
    created: c,
    beforeMount: h,
    mounted: p,
    beforeUpdate: m,
    updated: x,
    activated: C,
    deactivated: O,
    beforeDestroy: R,
    beforeUnmount: M,
    destroyed: P,
    unmounted: k,
    render: F,
    renderTracked: I,
    renderTriggered: K,
    errorCaptured: Z,
    serverPrefetch: Ce,
    expose: Se,
    inheritAttrs: Fe,
    components: Ue,
    directives: he,
    filters: jt,
  } = t
  if ((f && Ni(f, r, null), l))
    for (const J in l) {
      const z = l[J]
      V(z) && (r[J] = z.bind(n))
    }
  if (o) {
    const J = o.call(n, n)
    re(J) && (e.data = en(J))
  }
  if (((dr = !0), s))
    for (const J in s) {
      const z = s[J],
        Ke = V(z) ? z.bind(n, n) : V(z.get) ? z.get.bind(n, n) : Re,
        Qe = !V(z) && V(z.set) ? z.set.bind(n) : Re,
        Le = oe({ get: Ke, set: Qe })
      Object.defineProperty(r, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Le.value,
        set: (ye) => (Le.value = ye),
      })
    }
  if (i) for (const J in i) js(i[J], r, n, J)
  if (u) {
    const J = V(u) ? u.call(n) : u
    Reflect.ownKeys(J).forEach((z) => {
      lt(z, J[z])
    })
  }
  c && ho(c, e, "c")
  function le(J, z) {
    U(z) ? z.forEach((Ke) => J(Ke.bind(n))) : z && J(z.bind(n))
  }
  if (
    (le(Pi, h),
    le(Ln, p),
    le(Si, m),
    le(Ri, x),
    le(wi, C),
    le(Ei, O),
    le(Ii, Z),
    le(Ti, I),
    le(Ai, K),
    le(Ci, M),
    le(jn, k),
    le(Oi, Ce),
    U(Se))
  )
    if (Se.length) {
      const J = e.exposed || (e.exposed = {})
      Se.forEach((z) => {
        Object.defineProperty(J, z, {
          get: () => n[z],
          set: (Ke) => (n[z] = Ke),
        })
      })
    } else e.exposed || (e.exposed = {})
  F && e.render === Re && (e.render = F),
    Fe != null && (e.inheritAttrs = Fe),
    Ue && (e.components = Ue),
    he && (e.directives = he)
}
function Ni(e, t, n = Re) {
  U(e) && (e = hr(e))
  for (const r in e) {
    const o = e[r]
    let s
    re(o)
      ? "default" in o
        ? (s = ve(o.from || r, o.default, !0))
        : (s = ve(o.from || r))
      : (s = ve(o)),
      Ee(s)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => s.value,
            set: (l) => (s.value = l),
          })
        : (t[r] = s)
  }
}
function ho(e, t, n) {
  $e(U(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function js(e, t, n, r) {
  const o = r.includes(".") ? Ns(n, r) : () => n[r]
  if (se(e)) {
    const s = t[e]
    V(s) && mn(o, s)
  } else if (V(e)) mn(o, e.bind(n))
  else if (re(e))
    if (U(e)) e.forEach((s) => js(s, t, n, r))
    else {
      const s = V(e.handler) ? e.handler.bind(n) : t[e.handler]
      V(s) && mn(o, s, e)
    }
}
function Dr(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: s,
      config: { optionMergeStrategies: l },
    } = e.appContext,
    i = s.get(t)
  let u
  return (
    i
      ? (u = i)
      : !o.length && !n && !r
        ? (u = t)
        : ((u = {}),
          o.length && o.forEach((f) => En(u, f, l, !0)),
          En(u, t, l)),
    re(t) && s.set(t, u),
    u
  )
}
function En(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t
  s && En(e, s, n, !0), o && o.forEach((l) => En(e, l, n, !0))
  for (const l in t)
    if (!(r && l === "expose")) {
      const i = Fi[l] || (n && n[l])
      e[l] = i ? i(e[l], t[l]) : t[l]
    }
  return e
}
const Fi = {
  data: po,
  props: go,
  emits: go,
  methods: Dt,
  computed: Dt,
  beforeCreate: pe,
  created: pe,
  beforeMount: pe,
  mounted: pe,
  beforeUpdate: pe,
  updated: pe,
  beforeDestroy: pe,
  beforeUnmount: pe,
  destroyed: pe,
  unmounted: pe,
  activated: pe,
  deactivated: pe,
  errorCaptured: pe,
  serverPrefetch: pe,
  components: Dt,
  directives: Dt,
  watch: ji,
  provide: po,
  inject: Li,
}
function po(e, t) {
  return t
    ? e
      ? function () {
          return ue(
            V(e) ? e.call(this, this) : e,
            V(t) ? t.call(this, this) : t,
          )
        }
      : t
    : e
}
function Li(e, t) {
  return Dt(hr(e), hr(t))
}
function hr(e) {
  if (U(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Dt(e, t) {
  return e ? ue(Object.create(null), e, t) : t
}
function go(e, t) {
  return e
    ? U(e) && U(t)
      ? [...new Set([...e, ...t])]
      : ue(Object.create(null), fo(e), fo(t ?? {}))
    : t
}
function ji(e, t) {
  if (!e) return t
  if (!t) return e
  const n = ue(Object.create(null), e)
  for (const r in t) n[r] = pe(e[r], t[r])
  return n
}
function ks() {
  return {
    app: null,
    config: {
      isNativeTag: _l,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let ki = 0
function Hi(e, t) {
  return function (r, o = null) {
    V(r) || (r = ue({}, r)), o != null && !re(o) && (o = null)
    const s = ks(),
      l = new WeakSet()
    let i = !1
    const u = (s.app = {
      _uid: ki++,
      _component: r,
      _props: o,
      _container: null,
      _context: s,
      _instance: null,
      version: au,
      get config() {
        return s.config
      },
      set config(f) {},
      use(f, ...c) {
        return (
          l.has(f) ||
            (f && V(f.install)
              ? (l.add(f), f.install(u, ...c))
              : V(f) && (l.add(f), f(u, ...c))),
          u
        )
      },
      mixin(f) {
        return s.mixins.includes(f) || s.mixins.push(f), u
      },
      component(f, c) {
        return c ? ((s.components[f] = c), u) : s.components[f]
      },
      directive(f, c) {
        return c ? ((s.directives[f] = c), u) : s.directives[f]
      },
      mount(f, c, h) {
        if (!i) {
          const p = me(r, o)
          return (
            (p.appContext = s),
            h === !0 ? (h = "svg") : h === !1 && (h = void 0),
            c && t ? t(p, f) : e(p, f, h),
            (i = !0),
            (u._container = f),
            (f.__vue_app__ = u),
            Wr(p.component) || p.component.proxy
          )
        }
      },
      unmount() {
        i && (e(null, u._container), delete u._container.__vue_app__)
      },
      provide(f, c) {
        return (s.provides[f] = c), u
      },
      runWithContext(f) {
        xn = u
        try {
          return f()
        } finally {
          xn = null
        }
      },
    })
    return u
  }
}
let xn = null
function lt(e, t) {
  if (de) {
    let n = de.provides
    const r = de.parent && de.parent.provides
    r === n && (n = de.provides = Object.create(r)), (n[e] = t)
  }
}
function ve(e, t, n = !1) {
  const r = de || Ie
  if (r || xn) {
    const o = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : xn._context.provides
    if (o && e in o) return o[e]
    if (arguments.length > 1) return n && V(t) ? t.call(r && r.proxy) : t
  }
}
function Bi(e, t, n, r = !1) {
  const o = {},
    s = {}
  bn(s, Hn, 1), (e.propsDefaults = Object.create(null)), Hs(e, t, o, s)
  for (const l in e.propsOptions[0]) l in o || (o[l] = void 0)
  n ? (e.props = r ? o : vs(o)) : e.type.props ? (e.props = o) : (e.props = s),
    (e.attrs = s)
}
function Di(e, t, n, r) {
  const {
      props: o,
      attrs: s,
      vnode: { patchFlag: l },
    } = e,
    i = q(o),
    [u] = e.propsOptions
  let f = !1
  if ((r || l > 0) && !(l & 16)) {
    if (l & 8) {
      const c = e.vnode.dynamicProps
      for (let h = 0; h < c.length; h++) {
        let p = c[h]
        if (Nn(e.emitsOptions, p)) continue
        const m = t[p]
        if (u)
          if (G(s, p)) m !== s[p] && ((s[p] = m), (f = !0))
          else {
            const x = De(p)
            o[x] = pr(u, i, x, m, e, !1)
          }
        else m !== s[p] && ((s[p] = m), (f = !0))
      }
    }
  } else {
    Hs(e, t, o, s) && (f = !0)
    let c
    for (const h in i)
      (!t || (!G(t, h) && ((c = Lt(h)) === h || !G(t, c)))) &&
        (u
          ? n &&
            (n[h] !== void 0 || n[c] !== void 0) &&
            (o[h] = pr(u, i, h, void 0, e, !0))
          : delete o[h])
    if (s !== i) for (const h in s) (!t || !G(t, h)) && (delete s[h], (f = !0))
  }
  f && qe(e, "set", "$attrs")
}
function Hs(e, t, n, r) {
  const [o, s] = e.propsOptions
  let l = !1,
    i
  if (t)
    for (let u in t) {
      if (hn(u)) continue
      const f = t[u]
      let c
      o && G(o, (c = De(u)))
        ? !s || !s.includes(c)
          ? (n[c] = f)
          : ((i || (i = {}))[c] = f)
        : Nn(e.emitsOptions, u) ||
          ((!(u in r) || f !== r[u]) && ((r[u] = f), (l = !0)))
    }
  if (s) {
    const u = q(n),
      f = i || ne
    for (let c = 0; c < s.length; c++) {
      const h = s[c]
      n[h] = pr(o, u, h, f[h], e, !G(f, h))
    }
  }
  return l
}
function pr(e, t, n, r, o, s) {
  const l = e[n]
  if (l != null) {
    const i = G(l, "default")
    if (i && r === void 0) {
      const u = l.default
      if (l.type !== Function && !l.skipFactory && V(u)) {
        const { propsDefaults: f } = o
        if (n in f) r = f[n]
        else {
          const c = tn(o)
          ;(r = f[n] = u.call(null, t)), c()
        }
      } else r = u
    }
    l[0] && (s && !i ? (r = !1) : l[1] && (r === "" || r === Lt(n)) && (r = !0))
  }
  return r
}
function Bs(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e)
  if (o) return o
  const s = e.props,
    l = {},
    i = []
  let u = !1
  if (!V(e)) {
    const c = (h) => {
      u = !0
      const [p, m] = Bs(h, t, !0)
      ue(l, p), m && i.push(...m)
    }
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c)
  }
  if (!s && !u) return re(e) && r.set(e, Ot), Ot
  if (U(s))
    for (let c = 0; c < s.length; c++) {
      const h = De(s[c])
      mo(h) && (l[h] = ne)
    }
  else if (s)
    for (const c in s) {
      const h = De(c)
      if (mo(h)) {
        const p = s[c],
          m = (l[h] = U(p) || V(p) ? { type: p } : ue({}, p))
        if (m) {
          const x = bo(Boolean, m.type),
            C = bo(String, m.type)
          ;(m[0] = x > -1),
            (m[1] = C < 0 || x < C),
            (x > -1 || G(m, "default")) && i.push(h)
        }
      }
    }
  const f = [l, i]
  return re(e) && r.set(e, f), f
}
function mo(e) {
  return e[0] !== "$"
}
function vo(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/)
  return t ? t[2] : e === null ? "null" : ""
}
function yo(e, t) {
  return vo(e) === vo(t)
}
function bo(e, t) {
  return U(t) ? t.findIndex((n) => yo(n, e)) : V(t) && yo(t, e) ? 0 : -1
}
const Ds = (e) => e[0] === "_" || e === "$stable",
  Ur = (e) => (U(e) ? e.map(He) : [He(e)]),
  Ui = (e, t, n) => {
    if (t._n) return t
    const r = gn((...o) => Ur(t(...o)), n)
    return (r._c = !1), r
  },
  Us = (e, t, n) => {
    const r = e._ctx
    for (const o in e) {
      if (Ds(o)) continue
      const s = e[o]
      if (V(s)) t[o] = Ui(o, s, r)
      else if (s != null) {
        const l = Ur(s)
        t[o] = () => l
      }
    }
  },
  Ks = (e, t) => {
    const n = Ur(t)
    e.slots.default = () => n
  },
  Ki = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._
      n ? ((e.slots = q(t)), bn(t, "_", n)) : Us(t, (e.slots = {}))
    } else (e.slots = {}), t && Ks(e, t)
    bn(e.slots, Hn, 1)
  },
  Vi = (e, t, n) => {
    const { vnode: r, slots: o } = e
    let s = !0,
      l = ne
    if (r.shapeFlag & 32) {
      const i = t._
      i
        ? n && i === 1
          ? (s = !1)
          : (ue(o, t), !n && i === 1 && delete o._)
        : ((s = !t.$stable), Us(t, o)),
        (l = t)
    } else t && (Ks(e, t), (l = { default: 1 }))
    if (s) for (const i in o) !Ds(i) && l[i] == null && delete o[i]
  }
function gr(e, t, n, r, o = !1) {
  if (U(e)) {
    e.forEach((p, m) => gr(p, t && (U(t) ? t[m] : t), n, r, o))
    return
  }
  if (vn(r) && !o) return
  const s = r.shapeFlag & 4 ? Wr(r.component) || r.component.proxy : r.el,
    l = o ? null : s,
    { i, r: u } = e,
    f = t && t.r,
    c = i.refs === ne ? (i.refs = {}) : i.refs,
    h = i.setupState
  if (
    (f != null &&
      f !== u &&
      (se(f)
        ? ((c[f] = null), G(h, f) && (h[f] = null))
        : Ee(f) && (f.value = null)),
    V(u))
  )
    st(u, i, 12, [l, c])
  else {
    const p = se(u),
      m = Ee(u),
      x = e.f
    if (p || m) {
      const C = () => {
        if (x) {
          const O = p ? (G(h, u) ? h[u] : c[u]) : u.value
          o
            ? U(O) && Rr(O, s)
            : U(O)
              ? O.includes(s) || O.push(s)
              : p
                ? ((c[u] = [s]), G(h, u) && (h[u] = c[u]))
                : ((u.value = [s]), e.k && (c[e.k] = u.value))
        } else
          p
            ? ((c[u] = l), G(h, u) && (h[u] = l))
            : m && ((u.value = l), e.k && (c[e.k] = l))
      }
      o || x ? C() : ((C.id = -1), be(C, n))
    }
  }
}
const be = vi
function Wi(e) {
  return Gi(e)
}
function Gi(e, t) {
  const n = ns()
  n.__VUE__ = !0
  const {
      insert: r,
      remove: o,
      patchProp: s,
      createElement: l,
      createText: i,
      createComment: u,
      setText: f,
      setElementText: c,
      parentNode: h,
      nextSibling: p,
      setScopeId: m = Re,
      insertStaticContent: x,
    } = e,
    C = (
      a,
      d,
      g,
      b = null,
      v = null,
      E = null,
      T = void 0,
      w = null,
      S = !!d.dynamicChildren,
    ) => {
      if (a === d) return
      a && !Ht(a, d) && ((b = y(a)), ye(a, v, E, !0), (a = null)),
        d.patchFlag === -2 && ((S = !1), (d.dynamicChildren = null))
      const { type: _, ref: N, shapeFlag: H } = d
      switch (_) {
        case kn:
          O(a, d, g, b)
          break
        case gt:
          R(a, d, g, b)
          break
        case Zn:
          a == null && M(d, g, b, T)
          break
        case ge:
          Ue(a, d, g, b, v, E, T, w, S)
          break
        default:
          H & 1
            ? F(a, d, g, b, v, E, T, w, S)
            : H & 6
              ? he(a, d, g, b, v, E, T, w, S)
              : (H & 64 || H & 128) && _.process(a, d, g, b, v, E, T, w, S, L)
      }
      N != null && v && gr(N, a && a.ref, E, d || a, !d)
    },
    O = (a, d, g, b) => {
      if (a == null) r((d.el = i(d.children)), g, b)
      else {
        const v = (d.el = a.el)
        d.children !== a.children && f(v, d.children)
      }
    },
    R = (a, d, g, b) => {
      a == null ? r((d.el = u(d.children || "")), g, b) : (d.el = a.el)
    },
    M = (a, d, g, b) => {
      ;[a.el, a.anchor] = x(a.children, d, g, b, a.el, a.anchor)
    },
    P = ({ el: a, anchor: d }, g, b) => {
      let v
      for (; a && a !== d; ) (v = p(a)), r(a, g, b), (a = v)
      r(d, g, b)
    },
    k = ({ el: a, anchor: d }) => {
      let g
      for (; a && a !== d; ) (g = p(a)), o(a), (a = g)
      o(d)
    },
    F = (a, d, g, b, v, E, T, w, S) => {
      d.type === "svg" ? (T = "svg") : d.type === "math" && (T = "mathml"),
        a == null ? I(d, g, b, v, E, T, w, S) : Ce(a, d, v, E, T, w, S)
    },
    I = (a, d, g, b, v, E, T, w) => {
      let S, _
      const { props: N, shapeFlag: H, transition: j, dirs: D } = a
      if (
        ((S = a.el = l(a.type, E, N && N.is, N)),
        H & 8
          ? c(S, a.children)
          : H & 16 && Z(a.children, S, null, b, v, Xn(a, E), T, w),
        D && ut(a, null, b, "created"),
        K(S, a, a.scopeId, T, b),
        N)
      ) {
        for (const X in N)
          X !== "value" &&
            !hn(X) &&
            s(S, X, null, N[X], E, a.children, b, v, ce)
        "value" in N && s(S, "value", null, N.value, E),
          (_ = N.onVnodeBeforeMount) && ke(_, b, a)
      }
      D && ut(a, null, b, "beforeMount")
      const W = qi(v, j)
      W && j.beforeEnter(S),
        r(S, d, g),
        ((_ = N && N.onVnodeMounted) || W || D) &&
          be(() => {
            _ && ke(_, b, a), W && j.enter(S), D && ut(a, null, b, "mounted")
          }, v)
    },
    K = (a, d, g, b, v) => {
      if ((g && m(a, g), b)) for (let E = 0; E < b.length; E++) m(a, b[E])
      if (v) {
        let E = v.subTree
        if (d === E) {
          const T = v.vnode
          K(a, T, T.scopeId, T.slotScopeIds, v.parent)
        }
      }
    },
    Z = (a, d, g, b, v, E, T, w, S = 0) => {
      for (let _ = S; _ < a.length; _++) {
        const N = (a[_] = w ? et(a[_]) : He(a[_]))
        C(null, N, d, g, b, v, E, T, w)
      }
    },
    Ce = (a, d, g, b, v, E, T) => {
      const w = (d.el = a.el)
      let { patchFlag: S, dynamicChildren: _, dirs: N } = d
      S |= a.patchFlag & 16
      const H = a.props || ne,
        j = d.props || ne
      let D
      if (
        (g && ct(g, !1),
        (D = j.onVnodeBeforeUpdate) && ke(D, g, d, a),
        N && ut(d, a, g, "beforeUpdate"),
        g && ct(g, !0),
        _
          ? Se(a.dynamicChildren, _, w, g, b, Xn(d, v), E)
          : T || z(a, d, w, null, g, b, Xn(d, v), E, !1),
        S > 0)
      ) {
        if (S & 16) Fe(w, d, H, j, g, b, v)
        else if (
          (S & 2 && H.class !== j.class && s(w, "class", null, j.class, v),
          S & 4 && s(w, "style", H.style, j.style, v),
          S & 8)
        ) {
          const W = d.dynamicProps
          for (let X = 0; X < W.length; X++) {
            const te = W[X],
              ie = H[te],
              Oe = j[te]
            ;(Oe !== ie || te === "value") &&
              s(w, te, ie, Oe, v, a.children, g, b, ce)
          }
        }
        S & 1 && a.children !== d.children && c(w, d.children)
      } else !T && _ == null && Fe(w, d, H, j, g, b, v)
      ;((D = j.onVnodeUpdated) || N) &&
        be(() => {
          D && ke(D, g, d, a), N && ut(d, a, g, "updated")
        }, b)
    },
    Se = (a, d, g, b, v, E, T) => {
      for (let w = 0; w < d.length; w++) {
        const S = a[w],
          _ = d[w],
          N =
            S.el && (S.type === ge || !Ht(S, _) || S.shapeFlag & 70)
              ? h(S.el)
              : g
        C(S, _, N, null, b, v, E, T, !0)
      }
    },
    Fe = (a, d, g, b, v, E, T) => {
      if (g !== b) {
        if (g !== ne)
          for (const w in g)
            !hn(w) && !(w in b) && s(a, w, g[w], null, T, d.children, v, E, ce)
        for (const w in b) {
          if (hn(w)) continue
          const S = b[w],
            _ = g[w]
          S !== _ && w !== "value" && s(a, w, _, S, T, d.children, v, E, ce)
        }
        "value" in b && s(a, "value", g.value, b.value, T)
      }
    },
    Ue = (a, d, g, b, v, E, T, w, S) => {
      const _ = (d.el = a ? a.el : i("")),
        N = (d.anchor = a ? a.anchor : i(""))
      let { patchFlag: H, dynamicChildren: j, slotScopeIds: D } = d
      D && (w = w ? w.concat(D) : D),
        a == null
          ? (r(_, g, b), r(N, g, b), Z(d.children || [], g, N, v, E, T, w, S))
          : H > 0 && H & 64 && j && a.dynamicChildren
            ? (Se(a.dynamicChildren, j, g, v, E, T, w),
              (d.key != null || (v && d === v.subTree)) && Vs(a, d, !0))
            : z(a, d, g, N, v, E, T, w, S)
    },
    he = (a, d, g, b, v, E, T, w, S) => {
      ;(d.slotScopeIds = w),
        a == null
          ? d.shapeFlag & 512
            ? v.ctx.activate(d, g, b, T, S)
            : jt(d, g, b, v, E, T, S)
          : wt(a, d, S)
    },
    jt = (a, d, g, b, v, E, T) => {
      const w = (a.component = ru(a, b, v))
      if ((Fs(a) && (w.ctx.renderer = L), ou(w), w.asyncDep)) {
        if ((v && v.registerDep(w, le), !a.el)) {
          const S = (w.subTree = me(gt))
          R(null, S, d, g)
        }
      } else le(w, a, d, g, v, E, T)
    },
    wt = (a, d, g) => {
      const b = (d.component = a.component)
      if (di(a, d, g))
        if (b.asyncDep && !b.asyncResolved) {
          J(b, d, g)
          return
        } else (b.next = d), li(b.update), (b.effect.dirty = !0), b.update()
      else (d.el = a.el), (b.vnode = d)
    },
    le = (a, d, g, b, v, E, T) => {
      const w = () => {
          if (a.isMounted) {
            let { next: N, bu: H, u: j, parent: D, vnode: W } = a
            {
              const Pt = Ws(a)
              if (Pt) {
                N && ((N.el = W.el), J(a, N, T)),
                  Pt.asyncDep.then(() => {
                    a.isUnmounted || w()
                  })
                return
              }
            }
            let X = N,
              te
            ct(a, !1),
              N ? ((N.el = W.el), J(a, N, T)) : (N = W),
              H && qn(H),
              (te = N.props && N.props.onVnodeBeforeUpdate) && ke(te, D, N, W),
              ct(a, !0)
            const ie = Qn(a),
              Oe = a.subTree
            ;(a.subTree = ie),
              C(Oe, ie, h(Oe.el), y(Oe), a, v, E),
              (N.el = ie.el),
              X === null && hi(a, ie.el),
              j && be(j, v),
              (te = N.props && N.props.onVnodeUpdated) &&
                be(() => ke(te, D, N, W), v)
          } else {
            let N
            const { el: H, props: j } = d,
              { bm: D, m: W, parent: X } = a,
              te = vn(d)
            if (
              (ct(a, !1),
              D && qn(D),
              !te && (N = j && j.onVnodeBeforeMount) && ke(N, X, d),
              ct(a, !0),
              H && ee)
            ) {
              const ie = () => {
                ;(a.subTree = Qn(a)), ee(H, a.subTree, a, v, null)
              }
              te
                ? d.type.__asyncLoader().then(() => !a.isUnmounted && ie())
                : ie()
            } else {
              const ie = (a.subTree = Qn(a))
              C(null, ie, g, b, a, v, E), (d.el = ie.el)
            }
            if ((W && be(W, v), !te && (N = j && j.onVnodeMounted))) {
              const ie = d
              be(() => ke(N, X, ie), v)
            }
            ;(d.shapeFlag & 256 ||
              (X && vn(X.vnode) && X.vnode.shapeFlag & 256)) &&
              a.a &&
              be(a.a, v),
              (a.isMounted = !0),
              (d = g = b = null)
          }
        },
        S = (a.effect = new Tr(w, Re, () => kr(_), a.scope)),
        _ = (a.update = () => {
          S.dirty && S.run()
        })
      ;(_.id = a.uid), ct(a, !0), _()
    },
    J = (a, d, g) => {
      d.component = a
      const b = a.vnode.props
      ;(a.vnode = d),
        (a.next = null),
        Di(a, d.props, b, g),
        Vi(a, d.children, g),
        vt(),
        io(a),
        yt()
    },
    z = (a, d, g, b, v, E, T, w, S = !1) => {
      const _ = a && a.children,
        N = a ? a.shapeFlag : 0,
        H = d.children,
        { patchFlag: j, shapeFlag: D } = d
      if (j > 0) {
        if (j & 128) {
          Qe(_, H, g, b, v, E, T, w, S)
          return
        } else if (j & 256) {
          Ke(_, H, g, b, v, E, T, w, S)
          return
        }
      }
      D & 8
        ? (N & 16 && ce(_, v, E), H !== _ && c(g, H))
        : N & 16
          ? D & 16
            ? Qe(_, H, g, b, v, E, T, w, S)
            : ce(_, v, E, !0)
          : (N & 8 && c(g, ""), D & 16 && Z(H, g, b, v, E, T, w, S))
    },
    Ke = (a, d, g, b, v, E, T, w, S) => {
      ;(a = a || Ot), (d = d || Ot)
      const _ = a.length,
        N = d.length,
        H = Math.min(_, N)
      let j
      for (j = 0; j < H; j++) {
        const D = (d[j] = S ? et(d[j]) : He(d[j]))
        C(a[j], D, g, null, v, E, T, w, S)
      }
      _ > N ? ce(a, v, E, !0, !1, H) : Z(d, g, b, v, E, T, w, S, H)
    },
    Qe = (a, d, g, b, v, E, T, w, S) => {
      let _ = 0
      const N = d.length
      let H = a.length - 1,
        j = N - 1
      for (; _ <= H && _ <= j; ) {
        const D = a[_],
          W = (d[_] = S ? et(d[_]) : He(d[_]))
        if (Ht(D, W)) C(D, W, g, null, v, E, T, w, S)
        else break
        _++
      }
      for (; _ <= H && _ <= j; ) {
        const D = a[H],
          W = (d[j] = S ? et(d[j]) : He(d[j]))
        if (Ht(D, W)) C(D, W, g, null, v, E, T, w, S)
        else break
        H--, j--
      }
      if (_ > H) {
        if (_ <= j) {
          const D = j + 1,
            W = D < N ? d[D].el : b
          for (; _ <= j; )
            C(null, (d[_] = S ? et(d[_]) : He(d[_])), g, W, v, E, T, w, S), _++
        }
      } else if (_ > j) for (; _ <= H; ) ye(a[_], v, E, !0), _++
      else {
        const D = _,
          W = _,
          X = new Map()
        for (_ = W; _ <= j; _++) {
          const xe = (d[_] = S ? et(d[_]) : He(d[_]))
          xe.key != null && X.set(xe.key, _)
        }
        let te,
          ie = 0
        const Oe = j - W + 1
        let Pt = !1,
          Qr = 0
        const kt = new Array(Oe)
        for (_ = 0; _ < Oe; _++) kt[_] = 0
        for (_ = D; _ <= H; _++) {
          const xe = a[_]
          if (ie >= Oe) {
            ye(xe, v, E, !0)
            continue
          }
          let je
          if (xe.key != null) je = X.get(xe.key)
          else
            for (te = W; te <= j; te++)
              if (kt[te - W] === 0 && Ht(xe, d[te])) {
                je = te
                break
              }
          je === void 0
            ? ye(xe, v, E, !0)
            : ((kt[je - W] = _ + 1),
              je >= Qr ? (Qr = je) : (Pt = !0),
              C(xe, d[je], g, null, v, E, T, w, S),
              ie++)
        }
        const Jr = Pt ? zi(kt) : Ot
        for (te = Jr.length - 1, _ = Oe - 1; _ >= 0; _--) {
          const xe = W + _,
            je = d[xe],
            Xr = xe + 1 < N ? d[xe + 1].el : b
          kt[_] === 0
            ? C(null, je, g, Xr, v, E, T, w, S)
            : Pt && (te < 0 || _ !== Jr[te] ? Le(je, g, Xr, 2) : te--)
        }
      }
    },
    Le = (a, d, g, b, v = null) => {
      const { el: E, type: T, transition: w, children: S, shapeFlag: _ } = a
      if (_ & 6) {
        Le(a.component.subTree, d, g, b)
        return
      }
      if (_ & 128) {
        a.suspense.move(d, g, b)
        return
      }
      if (_ & 64) {
        T.move(a, d, g, L)
        return
      }
      if (T === ge) {
        r(E, d, g)
        for (let H = 0; H < S.length; H++) Le(S[H], d, g, b)
        r(a.anchor, d, g)
        return
      }
      if (T === Zn) {
        P(a, d, g)
        return
      }
      if (b !== 2 && _ & 1 && w)
        if (b === 0) w.beforeEnter(E), r(E, d, g), be(() => w.enter(E), v)
        else {
          const { leave: H, delayLeave: j, afterLeave: D } = w,
            W = () => r(E, d, g),
            X = () => {
              H(E, () => {
                W(), D && D()
              })
            }
          j ? j(E, W, X) : X()
        }
      else r(E, d, g)
    },
    ye = (a, d, g, b = !1, v = !1) => {
      const {
        type: E,
        props: T,
        ref: w,
        children: S,
        dynamicChildren: _,
        shapeFlag: N,
        patchFlag: H,
        dirs: j,
      } = a
      if ((w != null && gr(w, null, g, a, !0), N & 256)) {
        d.ctx.deactivate(a)
        return
      }
      const D = N & 1 && j,
        W = !vn(a)
      let X
      if ((W && (X = T && T.onVnodeBeforeUnmount) && ke(X, d, a), N & 6))
        rn(a.component, g, b)
      else {
        if (N & 128) {
          a.suspense.unmount(g, b)
          return
        }
        D && ut(a, null, d, "beforeUnmount"),
          N & 64
            ? a.type.remove(a, d, g, v, L, b)
            : _ && (E !== ge || (H > 0 && H & 64))
              ? ce(_, d, g, !1, !0)
              : ((E === ge && H & 384) || (!v && N & 16)) && ce(S, d, g),
          b && Et(a)
      }
      ;((W && (X = T && T.onVnodeUnmounted)) || D) &&
        be(() => {
          X && ke(X, d, a), D && ut(a, null, d, "unmounted")
        }, g)
    },
    Et = (a) => {
      const { type: d, el: g, anchor: b, transition: v } = a
      if (d === ge) {
        xt(g, b)
        return
      }
      if (d === Zn) {
        k(a)
        return
      }
      const E = () => {
        o(g), v && !v.persisted && v.afterLeave && v.afterLeave()
      }
      if (a.shapeFlag & 1 && v && !v.persisted) {
        const { leave: T, delayLeave: w } = v,
          S = () => T(g, E)
        w ? w(a.el, E, S) : S()
      } else E()
    },
    xt = (a, d) => {
      let g
      for (; a !== d; ) (g = p(a)), o(a), (a = g)
      o(d)
    },
    rn = (a, d, g) => {
      const { bum: b, scope: v, update: E, subTree: T, um: w } = a
      b && qn(b),
        v.stop(),
        E && ((E.active = !1), ye(T, a, d, g)),
        w && be(w, d),
        be(() => {
          a.isUnmounted = !0
        }, d),
        d &&
          d.pendingBranch &&
          !d.isUnmounted &&
          a.asyncDep &&
          !a.asyncResolved &&
          a.suspenseId === d.pendingId &&
          (d.deps--, d.deps === 0 && d.resolve())
    },
    ce = (a, d, g, b = !1, v = !1, E = 0) => {
      for (let T = E; T < a.length; T++) ye(a[T], d, g, b, v)
    },
    y = (a) =>
      a.shapeFlag & 6
        ? y(a.component.subTree)
        : a.shapeFlag & 128
          ? a.suspense.next()
          : p(a.anchor || a.el)
  let $ = !1
  const A = (a, d, g) => {
      a == null
        ? d._vnode && ye(d._vnode, null, null, !0)
        : C(d._vnode || null, a, d, null, null, null, g),
        $ || (($ = !0), io(), Os(), ($ = !1)),
        (d._vnode = a)
    },
    L = {
      p: C,
      um: ye,
      m: Le,
      r: Et,
      mt: jt,
      mc: Z,
      pc: z,
      pbc: Se,
      n: y,
      o: e,
    }
  let Y, ee
  return t && ([Y, ee] = t(L)), { render: A, hydrate: Y, createApp: Hi(A, Y) }
}
function Xn({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") ||
    (n === "mathml" &&
      e === "annotation-xml" &&
      t &&
      t.encoding &&
      t.encoding.includes("html"))
    ? void 0
    : n
}
function ct({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function qi(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function Vs(e, t, n = !1) {
  const r = e.children,
    o = t.children
  if (U(r) && U(o))
    for (let s = 0; s < r.length; s++) {
      const l = r[s]
      let i = o[s]
      i.shapeFlag & 1 &&
        !i.dynamicChildren &&
        ((i.patchFlag <= 0 || i.patchFlag === 32) &&
          ((i = o[s] = et(o[s])), (i.el = l.el)),
        n || Vs(l, i)),
        i.type === kn && (i.el = l.el)
    }
}
function zi(e) {
  const t = e.slice(),
    n = [0]
  let r, o, s, l, i
  const u = e.length
  for (r = 0; r < u; r++) {
    const f = e[r]
    if (f !== 0) {
      if (((o = n[n.length - 1]), e[o] < f)) {
        ;(t[r] = o), n.push(r)
        continue
      }
      for (s = 0, l = n.length - 1; s < l; )
        (i = (s + l) >> 1), e[n[i]] < f ? (s = i + 1) : (l = i)
      f < e[n[s]] && (s > 0 && (t[r] = n[s - 1]), (n[s] = r))
    }
  }
  for (s = n.length, l = n[s - 1]; s-- > 0; ) (n[s] = l), (l = t[l])
  return n
}
function Ws(e) {
  const t = e.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : Ws(t)
}
const Yi = (e) => e.__isTeleport,
  ge = Symbol.for("v-fgt"),
  kn = Symbol.for("v-txt"),
  gt = Symbol.for("v-cmt"),
  Zn = Symbol.for("v-stc"),
  Kt = []
let Me = null
function Pe(e = !1) {
  Kt.push((Me = e ? null : []))
}
function Qi() {
  Kt.pop(), (Me = Kt[Kt.length - 1] || null)
}
let Qt = 1
function _o(e) {
  Qt += e
}
function Gs(e) {
  return (
    (e.dynamicChildren = Qt > 0 ? Me || Ot : null),
    Qi(),
    Qt > 0 && Me && Me.push(e),
    e
  )
}
function St(e, t, n, r, o, s) {
  return Gs(Kr(e, t, n, r, o, s, !0))
}
function ft(e, t, n, r, o) {
  return Gs(me(e, t, n, r, o, !0))
}
function mr(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function Ht(e, t) {
  return e.type === t.type && e.key === t.key
}
const Hn = "__vInternal",
  qs = ({ key: e }) => e ?? null,
  yn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? se(e) || Ee(e) || V(e)
        ? { i: Ie, r: e, k: t, f: !!n }
        : e
      : null
  )
function Kr(
  e,
  t = null,
  n = null,
  r = 0,
  o = null,
  s = e === ge ? 0 : 1,
  l = !1,
  i = !1,
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && qs(t),
    ref: t && yn(t),
    scopeId: Is,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ie,
  }
  return (
    i
      ? (Vr(u, n), s & 128 && e.normalize(u))
      : n && (u.shapeFlag |= se(n) ? 8 : 16),
    Qt > 0 &&
      !l &&
      Me &&
      (u.patchFlag > 0 || s & 6) &&
      u.patchFlag !== 32 &&
      Me.push(u),
    u
  )
}
const me = Ji
function Ji(e, t = null, n = null, r = 0, o = null, s = !1) {
  if (((!e || e === Ms) && (e = gt), mr(e))) {
    const i = mt(e, t, !0)
    return (
      n && Vr(i, n),
      Qt > 0 &&
        !s &&
        Me &&
        (i.shapeFlag & 6 ? (Me[Me.indexOf(e)] = i) : Me.push(i)),
      (i.patchFlag |= -2),
      i
    )
  }
  if ((cu(e) && (e = e.__vccOpts), t)) {
    t = Xi(t)
    let { class: i, style: u } = t
    i && !se(i) && (t.class = Ar(i)),
      re(u) && (bs(u) && !U(u) && (u = ue({}, u)), (t.style = Or(u)))
  }
  const l = se(e) ? 1 : mi(e) ? 128 : Yi(e) ? 64 : re(e) ? 4 : V(e) ? 2 : 0
  return Kr(e, t, n, r, o, l, s, !0)
}
function Xi(e) {
  return e ? (bs(e) || Hn in e ? ue({}, e) : e) : null
}
function mt(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: s, children: l } = e,
    i = t ? eu(r || {}, t) : r
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: i,
    key: i && qs(i),
    ref:
      t && t.ref ? (n && o ? (U(o) ? o.concat(yn(t)) : [o, yn(t)]) : yn(t)) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ge ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && mt(e.ssContent),
    ssFallback: e.ssFallback && mt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  }
}
function zs(e = " ", t = 0) {
  return me(kn, null, e, t)
}
function Zi(e = "", t = !1) {
  return t ? (Pe(), ft(gt, null, e)) : me(gt, null, e)
}
function He(e) {
  return e == null || typeof e == "boolean"
    ? me(gt)
    : U(e)
      ? me(ge, null, e.slice())
      : typeof e == "object"
        ? et(e)
        : me(kn, null, String(e))
}
function et(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : mt(e)
}
function Vr(e, t) {
  let n = 0
  const { shapeFlag: r } = e
  if (t == null) t = null
  else if (U(t)) n = 16
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default
      o && (o._c && (o._d = !1), Vr(e, o()), o._c && (o._d = !0))
      return
    } else {
      n = 32
      const o = t._
      !o && !(Hn in t)
        ? (t._ctx = Ie)
        : o === 3 &&
          Ie &&
          (Ie.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    V(t)
      ? ((t = { default: t, _ctx: Ie }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [zs(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function eu(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const r = e[n]
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = Ar([t.class, r.class]))
      else if (o === "style") t.style = Or([t.style, r.style])
      else if (On(o)) {
        const s = t[o],
          l = r[o]
        l &&
          s !== l &&
          !(U(s) && s.includes(l)) &&
          (t[o] = s ? [].concat(s, l) : l)
      } else o !== "" && (t[o] = r[o])
  }
  return t
}
function ke(e, t, n, r = null) {
  $e(e, t, 7, [n, r])
}
const tu = ks()
let nu = 0
function ru(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || tu,
    s = {
      uid: nu++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Ml(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Bs(r, o),
      emitsOptions: Ts(r, o),
      emit: null,
      emitted: null,
      propsDefaults: ne,
      inheritAttrs: r.inheritAttrs,
      ctx: ne,
      data: ne,
      props: ne,
      attrs: ne,
      slots: ne,
      refs: ne,
      setupState: ne,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (
    (s.ctx = { _: s }),
    (s.root = t ? t.root : s),
    (s.emit = ci.bind(null, s)),
    e.ce && e.ce(s),
    s
  )
}
let de = null,
  Pn,
  vr
{
  const e = ns(),
    t = (n, r) => {
      let o
      return (
        (o = e[n]) || (o = e[n] = []),
        o.push(r),
        (s) => {
          o.length > 1 ? o.forEach((l) => l(s)) : o[0](s)
        }
      )
    }
  ;(Pn = t("__VUE_INSTANCE_SETTERS__", (n) => (de = n))),
    (vr = t("__VUE_SSR_SETTERS__", (n) => (Bn = n)))
}
const tn = (e) => {
    const t = de
    return (
      Pn(e),
      e.scope.on(),
      () => {
        e.scope.off(), Pn(t)
      }
    )
  },
  wo = () => {
    de && de.scope.off(), Pn(null)
  }
function Ys(e) {
  return e.vnode.shapeFlag & 4
}
let Bn = !1
function ou(e, t = !1) {
  t && vr(t)
  const { props: n, children: r } = e.vnode,
    o = Ys(e)
  Bi(e, n, o, t), Ki(e, r)
  const s = o ? su(e, t) : void 0
  return t && vr(!1), s
}
function su(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = _s(new Proxy(e.ctx, Mi)))
  const { setup: r } = n
  if (r) {
    const o = (e.setupContext = r.length > 1 ? iu(e) : null),
      s = tn(e)
    vt()
    const l = st(r, e, 0, [e.props, o])
    if ((yt(), s(), Zo(l))) {
      if ((l.then(wo, wo), t))
        return l
          .then((i) => {
            Eo(e, i, t)
          })
          .catch((i) => {
            $n(i, e, 0)
          })
      e.asyncDep = l
    } else Eo(e, l, t)
  } else Qs(e, t)
}
function Eo(e, t, n) {
  V(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : re(t) && (e.setupState = Ps(t)),
    Qs(e, n)
}
let xo
function Qs(e, t, n) {
  const r = e.type
  if (!e.render) {
    if (!t && xo && !r.render) {
      const o = r.template || Dr(e).template
      if (o) {
        const { isCustomElement: s, compilerOptions: l } = e.appContext.config,
          { delimiters: i, compilerOptions: u } = r,
          f = ue(ue({ isCustomElement: s, delimiters: i }, l), u)
        r.render = xo(o, f)
      }
    }
    e.render = r.render || Re
  }
  {
    const o = tn(e)
    vt()
    try {
      $i(e)
    } finally {
      yt(), o()
    }
  }
}
function lu(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return we(e, "get", "$attrs"), t[n]
      },
    }))
  )
}
function iu(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return {
    get attrs() {
      return lu(e)
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  }
}
function Wr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Ps(_s(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n]
          if (n in Ut) return Ut[n](e)
        },
        has(t, n) {
          return n in t || n in Ut
        },
      }))
    )
}
function uu(e, t = !0) {
  return V(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function cu(e) {
  return V(e) && "__vccOpts" in e
}
const oe = (e, t) => ei(e, t, Bn)
function _e(e, t, n) {
  const r = arguments.length
  return r === 2
    ? re(t) && !U(t)
      ? mr(t)
        ? me(e, null, [t])
        : me(e, t)
      : me(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && mr(n) && (n = [n]),
      me(e, t, n))
}
const au = "3.4.15"
const fu = "http://www.w3.org/2000/svg",
  du = "http://www.w3.org/1998/Math/MathML",
  tt = typeof document < "u" ? document : null,
  Po = tt && tt.createElement("template"),
  hu = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, r) => {
      const o =
        t === "svg"
          ? tt.createElementNS(fu, e)
          : t === "mathml"
            ? tt.createElementNS(du, e)
            : tt.createElement(e, n ? { is: n } : void 0)
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          o.setAttribute("multiple", r.multiple),
        o
      )
    },
    createText: (e) => tt.createTextNode(e),
    createComment: (e) => tt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => tt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, r, o, s) {
      const l = n ? n.previousSibling : t.lastChild
      if (o && (o === s || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === s || !(o = o.nextSibling));

        );
      else {
        Po.innerHTML =
          r === "svg"
            ? `<svg>${e}</svg>`
            : r === "mathml"
              ? `<math>${e}</math>`
              : e
        const i = Po.content
        if (r === "svg" || r === "mathml") {
          const u = i.firstChild
          for (; u.firstChild; ) i.appendChild(u.firstChild)
          i.removeChild(u)
        }
        t.insertBefore(i, n)
      }
      return [
        l ? l.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ]
    },
  },
  pu = Symbol("_vtc")
function gu(e, t, n) {
  const r = e[pu]
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
        ? e.setAttribute("class", t)
        : (e.className = t)
}
const mu = Symbol("_vod"),
  vu = Symbol("")
function yu(e, t, n) {
  const r = e.style,
    o = r.display,
    s = se(n)
  if (n && !s) {
    if (t && !se(t)) for (const l in t) n[l] == null && yr(r, l, "")
    for (const l in n) yr(r, l, n[l])
  } else if (s) {
    if (t !== n) {
      const l = r[vu]
      l && (n += ";" + l), (r.cssText = n)
    }
  } else t && e.removeAttribute("style")
  mu in e && (r.display = o)
}
const So = /\s*!important$/
function yr(e, t, n) {
  if (U(n)) n.forEach((r) => yr(e, t, r))
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n)
  else {
    const r = bu(e, t)
    So.test(n)
      ? e.setProperty(Lt(r), n.replace(So, ""), "important")
      : (e[r] = n)
  }
}
const Ro = ["Webkit", "Moz", "ms"],
  er = {}
function bu(e, t) {
  const n = er[t]
  if (n) return n
  let r = De(t)
  if (r !== "filter" && r in e) return (er[t] = r)
  r = In(r)
  for (let o = 0; o < Ro.length; o++) {
    const s = Ro[o] + r
    if (s in e) return (er[t] = s)
  }
  return t
}
const Co = "http://www.w3.org/1999/xlink"
function _u(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Co, t.slice(6, t.length))
      : e.setAttributeNS(Co, t, n)
  else {
    const s = Il(t)
    n == null || (s && !rs(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, s ? "" : n)
  }
}
function wu(e, t, n, r, o, s, l) {
  if (t === "innerHTML" || t === "textContent") {
    r && l(r, o, s), (e[t] = n ?? "")
    return
  }
  const i = e.tagName
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    e._value = n
    const f = i === "OPTION" ? e.getAttribute("value") : e.value,
      c = n ?? ""
    f !== c && (e.value = c), n == null && e.removeAttribute(t)
    return
  }
  let u = !1
  if (n === "" || n == null) {
    const f = typeof e[t]
    f === "boolean"
      ? (n = rs(n))
      : n == null && f === "string"
        ? ((n = ""), (u = !0))
        : f === "number" && ((n = 0), (u = !0))
  }
  try {
    e[t] = n
  } catch {}
  u && e.removeAttribute(t)
}
function Eu(e, t, n, r) {
  e.addEventListener(t, n, r)
}
function xu(e, t, n, r) {
  e.removeEventListener(t, n, r)
}
const Oo = Symbol("_vei")
function Pu(e, t, n, r, o = null) {
  const s = e[Oo] || (e[Oo] = {}),
    l = s[t]
  if (r && l) l.value = r
  else {
    const [i, u] = Su(t)
    if (r) {
      const f = (s[t] = Ou(r, o))
      Eu(e, i, f, u)
    } else l && (xu(e, i, l, u), (s[t] = void 0))
  }
}
const Ao = /(?:Once|Passive|Capture)$/
function Su(e) {
  let t
  if (Ao.test(e)) {
    t = {}
    let r
    for (; (r = e.match(Ao)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0)
  }
  return [e[2] === ":" ? e.slice(3) : Lt(e.slice(2)), t]
}
let tr = 0
const Ru = Promise.resolve(),
  Cu = () => tr || (Ru.then(() => (tr = 0)), (tr = Date.now()))
function Ou(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now()
    else if (r._vts <= n.attached) return
    $e(Au(r, n.value), t, 5, [r])
  }
  return (n.value = e), (n.attached = Cu()), n
}
function Au(e, t) {
  if (U(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    )
  } else return t
}
const To = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Tu = (e, t, n, r, o, s, l, i, u) => {
    const f = o === "svg"
    t === "class"
      ? gu(e, r, f)
      : t === "style"
        ? yu(e, n, r)
        : On(t)
          ? Sr(t) || Pu(e, t, n, r, l)
          : (
                t[0] === "."
                  ? ((t = t.slice(1)), !0)
                  : t[0] === "^"
                    ? ((t = t.slice(1)), !1)
                    : Iu(e, t, r, f)
              )
            ? wu(e, t, r, s, l, i, u)
            : (t === "true-value"
                ? (e._trueValue = r)
                : t === "false-value" && (e._falseValue = r),
              _u(e, t, r, f))
  }
function Iu(e, t, n, r) {
  if (r)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && To(t) && V(n))
    )
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1
  if (t === "width" || t === "height") {
    const o = e.tagName
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1
  }
  return To(t) && se(n) ? !1 : t in e
}
const Mu = ue({ patchProp: Tu }, hu)
let Io
function $u() {
  return Io || (Io = Wi(Mu))
}
const Nu = (...e) => {
  const t = $u().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (r) => {
      const o = Lu(r)
      if (!o) return
      const s = t._component
      !V(s) && !s.render && !s.template && (s.template = o.innerHTML),
        (o.innerHTML = "")
      const l = n(o, !1, Fu(o))
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        l
      )
    }),
    t
  )
}
function Fu(e) {
  if (e instanceof SVGElement) return "svg"
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml"
}
function Lu(e) {
  return se(e) ? document.querySelector(e) : e
}
const ju = (e, t) => {
    const n = e.__vccOpts || e
    for (const [r, o] of t) n[r] = o
    return n
  },
  ku = {}
function Hu(e, t) {
  const n = pi("router-view")
  return Pe(), ft(n)
}
const Bu = ju(ku, [["render", Hu]])
let Du = 0
function Uu() {
  return ++Du
}
function Vt() {
  return Uu()
}
function B(e) {
  var t
  if (e == null || e.value == null) return null
  let n = (t = e.value.$el) != null ? t : e.value
  return n instanceof Node ? n : null
}
function ze(e, t, ...n) {
  if (e in t) {
    let o = t[e]
    return typeof o == "function" ? o(...n) : o
  }
  let r = new Error(
    `Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(
      t,
    )
      .map((o) => `"${o}"`)
      .join(", ")}.`,
  )
  throw (Error.captureStackTrace && Error.captureStackTrace(r, ze), r)
}
var Ku = Object.defineProperty,
  Vu = (e, t, n) =>
    t in e
      ? Ku(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Mo = (e, t, n) => (Vu(e, typeof t != "symbol" ? t + "" : t, n), n)
let Wu = class {
    constructor() {
      Mo(this, "current", this.detect()), Mo(this, "currentId", 0)
    }
    set(t) {
      this.current !== t && ((this.currentId = 0), (this.current = t))
    }
    reset() {
      this.set(this.detect())
    }
    nextId() {
      return ++this.currentId
    }
    get isServer() {
      return this.current === "server"
    }
    get isClient() {
      return this.current === "client"
    }
    detect() {
      return typeof window > "u" || typeof document > "u" ? "server" : "client"
    }
  },
  Dn = new Wu()
function nn(e) {
  if (Dn.isServer) return null
  if (e instanceof Node) return e.ownerDocument
  if (e != null && e.hasOwnProperty("value")) {
    let t = B(e)
    if (t) return t.ownerDocument
  }
  return document
}
let br = [
  "[contentEditable=true]",
  "[tabindex]",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "iframe",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
]
  .map((e) => `${e}:not([tabindex='-1'])`)
  .join(",")
var We = ((e) => (
    (e[(e.First = 1)] = "First"),
    (e[(e.Previous = 2)] = "Previous"),
    (e[(e.Next = 4)] = "Next"),
    (e[(e.Last = 8)] = "Last"),
    (e[(e.WrapAround = 16)] = "WrapAround"),
    (e[(e.NoScroll = 32)] = "NoScroll"),
    e
  ))(We || {}),
  Sn = ((e) => (
    (e[(e.Error = 0)] = "Error"),
    (e[(e.Overflow = 1)] = "Overflow"),
    (e[(e.Success = 2)] = "Success"),
    (e[(e.Underflow = 3)] = "Underflow"),
    e
  ))(Sn || {}),
  Gu = ((e) => (
    (e[(e.Previous = -1)] = "Previous"), (e[(e.Next = 1)] = "Next"), e
  ))(Gu || {})
function Un(e = document.body) {
  return e == null
    ? []
    : Array.from(e.querySelectorAll(br)).sort((t, n) =>
        Math.sign(
          (t.tabIndex || Number.MAX_SAFE_INTEGER) -
            (n.tabIndex || Number.MAX_SAFE_INTEGER),
        ),
      )
}
var Gr = ((e) => (
  (e[(e.Strict = 0)] = "Strict"), (e[(e.Loose = 1)] = "Loose"), e
))(Gr || {})
function Js(e, t = 0) {
  var n
  return e === ((n = nn(e)) == null ? void 0 : n.body)
    ? !1
    : ze(t, {
        0() {
          return e.matches(br)
        },
        1() {
          let r = e
          for (; r !== null; ) {
            if (r.matches(br)) return !0
            r = r.parentElement
          }
          return !1
        },
      })
}
var qu = ((e) => (
  (e[(e.Keyboard = 0)] = "Keyboard"), (e[(e.Mouse = 1)] = "Mouse"), e
))(qu || {})
typeof window < "u" &&
  typeof document < "u" &&
  (document.addEventListener(
    "keydown",
    (e) => {
      e.metaKey ||
        e.altKey ||
        e.ctrlKey ||
        (document.documentElement.dataset.headlessuiFocusVisible = "")
    },
    !0,
  ),
  document.addEventListener(
    "click",
    (e) => {
      e.detail === 1
        ? delete document.documentElement.dataset.headlessuiFocusVisible
        : e.detail === 0 &&
          (document.documentElement.dataset.headlessuiFocusVisible = "")
    },
    !0,
  ))
let zu = ["textarea", "input"].join(",")
function Yu(e) {
  var t, n
  return (n =
    (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, zu)) !=
    null
    ? n
    : !1
}
function Qu(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let o = t(n),
      s = t(r)
    if (o === null || s === null) return 0
    let l = o.compareDocumentPosition(s)
    return l & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : l & Node.DOCUMENT_POSITION_PRECEDING
        ? 1
        : 0
  })
}
function dt(
  e,
  t,
  { sorted: n = !0, relativeTo: r = null, skipElements: o = [] } = {},
) {
  var s
  let l =
      (s = Array.isArray(e)
        ? e.length > 0
          ? e[0].ownerDocument
          : document
        : e == null
          ? void 0
          : e.ownerDocument) != null
        ? s
        : document,
    i = Array.isArray(e) ? (n ? Qu(e) : e) : Un(e)
  o.length > 0 && i.length > 1 && (i = i.filter((x) => !o.includes(x))),
    (r = r ?? l.activeElement)
  let u = (() => {
      if (t & 5) return 1
      if (t & 10) return -1
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
      )
    })(),
    f = (() => {
      if (t & 1) return 0
      if (t & 2) return Math.max(0, i.indexOf(r)) - 1
      if (t & 4) return Math.max(0, i.indexOf(r)) + 1
      if (t & 8) return i.length - 1
      throw new Error(
        "Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last",
      )
    })(),
    c = t & 32 ? { preventScroll: !0 } : {},
    h = 0,
    p = i.length,
    m
  do {
    if (h >= p || h + p <= 0) return 0
    let x = f + h
    if (t & 16) x = (x + p) % p
    else {
      if (x < 0) return 3
      if (x >= p) return 1
    }
    ;(m = i[x]), m == null || m.focus(c), (h += u)
  } while (m !== l.activeElement)
  return t & 6 && Yu(m) && m.select(), 2
}
function Ju() {
  return (
    /iPhone/gi.test(window.navigator.platform) ||
    (/Mac/gi.test(window.navigator.platform) &&
      window.navigator.maxTouchPoints > 0)
  )
}
function Xu() {
  return /Android/gi.test(window.navigator.userAgent)
}
function Zu() {
  return Ju() || Xu()
}
function fn(e, t, n) {
  Dn.isServer ||
    bt((r) => {
      document.addEventListener(e, t, n),
        r(() => document.removeEventListener(e, t, n))
    })
}
function Xs(e, t, n) {
  Dn.isServer ||
    bt((r) => {
      window.addEventListener(e, t, n),
        r(() => window.removeEventListener(e, t, n))
    })
}
function ec(e, t, n = oe(() => !0)) {
  function r(s, l) {
    if (!n.value || s.defaultPrevented) return
    let i = l(s)
    if (i === null || !i.getRootNode().contains(i)) return
    let u = (function f(c) {
      return typeof c == "function"
        ? f(c())
        : Array.isArray(c) || c instanceof Set
          ? c
          : [c]
    })(e)
    for (let f of u) {
      if (f === null) continue
      let c = f instanceof HTMLElement ? f : B(f)
      if (
        (c != null && c.contains(i)) ||
        (s.composed && s.composedPath().includes(c))
      )
        return
    }
    return !Js(i, Gr.Loose) && i.tabIndex !== -1 && s.preventDefault(), t(s, i)
  }
  let o = ae(null)
  fn(
    "pointerdown",
    (s) => {
      var l, i
      n.value &&
        (o.value =
          ((i = (l = s.composedPath) == null ? void 0 : l.call(s)) == null
            ? void 0
            : i[0]) || s.target)
    },
    !0,
  ),
    fn(
      "mousedown",
      (s) => {
        var l, i
        n.value &&
          (o.value =
            ((i = (l = s.composedPath) == null ? void 0 : l.call(s)) == null
              ? void 0
              : i[0]) || s.target)
      },
      !0,
    ),
    fn(
      "click",
      (s) => {
        Zu() || (o.value && (r(s, () => o.value), (o.value = null)))
      },
      !0,
    ),
    fn(
      "touchend",
      (s) => r(s, () => (s.target instanceof HTMLElement ? s.target : null)),
      !0,
    ),
    Xs(
      "blur",
      (s) =>
        r(s, () =>
          window.document.activeElement instanceof HTMLIFrameElement
            ? window.document.activeElement
            : null,
        ),
      !0,
    )
}
function $o(e, t) {
  if (e) return e
  let n = t ?? "button"
  if (typeof n == "string" && n.toLowerCase() === "button") return "button"
}
function tc(e, t) {
  let n = ae($o(e.value.type, e.value.as))
  return (
    Ln(() => {
      n.value = $o(e.value.type, e.value.as)
    }),
    bt(() => {
      var r
      n.value ||
        (B(t) &&
          B(t) instanceof HTMLButtonElement &&
          !((r = B(t)) != null && r.hasAttribute("type")) &&
          (n.value = "button"))
    }),
    n
  )
}
var _r = ((e) => (
    (e[(e.None = 0)] = "None"),
    (e[(e.RenderStrategy = 1)] = "RenderStrategy"),
    (e[(e.Static = 2)] = "Static"),
    e
  ))(_r || {}),
  nc = ((e) => (
    (e[(e.Unmount = 0)] = "Unmount"), (e[(e.Hidden = 1)] = "Hidden"), e
  ))(nc || {})
function Kn({
  visible: e = !0,
  features: t = 0,
  ourProps: n,
  theirProps: r,
  ...o
}) {
  var s
  let l = el(r, n),
    i = Object.assign(o, { props: l })
  if (e || (t & 2 && l.static)) return nr(i)
  if (t & 1) {
    let u = (s = l.unmount) == null || s ? 0 : 1
    return ze(u, {
      0() {
        return null
      },
      1() {
        return nr({
          ...o,
          props: { ...l, hidden: !0, style: { display: "none" } },
        })
      },
    })
  }
  return nr(i)
}
function nr({ props: e, attrs: t, slots: n, slot: r, name: o }) {
  var s, l
  let { as: i, ...u } = rc(e, ["unmount", "static"]),
    f = (s = n.default) == null ? void 0 : s.call(n, r),
    c = {}
  if (r) {
    let h = !1,
      p = []
    for (let [m, x] of Object.entries(r))
      typeof x == "boolean" && (h = !0), x === !0 && p.push(m)
    h && (c["data-headlessui-state"] = p.join(" "))
  }
  if (i === "template") {
    if (
      ((f = Zs(f ?? [])),
      Object.keys(u).length > 0 || Object.keys(t).length > 0)
    ) {
      let [h, ...p] = f ?? []
      if (!oc(h) || p.length > 0)
        throw new Error(
          [
            'Passing props on "template"!',
            "",
            `The current component <${o} /> is rendering a "template".`,
            "However we need to passthrough the following props:",
            Object.keys(u)
              .concat(Object.keys(t))
              .map((C) => C.trim())
              .filter((C, O, R) => R.indexOf(C) === O)
              .sort((C, O) => C.localeCompare(O))
              .map((C) => `  - ${C}`).join(`
`),
            "",
            "You can apply a few solutions:",
            [
              'Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',
              "Render a single element as the child so that we can forward the props onto that element.",
            ].map((C) => `  - ${C}`).join(`
`),
          ].join(`
`),
        )
      let m = el((l = h.props) != null ? l : {}, u, c),
        x = mt(h, m, !0)
      for (let C in m)
        C.startsWith("on") && (x.props || (x.props = {}), (x.props[C] = m[C]))
      return x
    }
    return Array.isArray(f) && f.length === 1 ? f[0] : f
  }
  return _e(i, Object.assign({}, u, c), { default: () => f })
}
function Zs(e) {
  return e.flatMap((t) => (t.type === ge ? Zs(t.children) : [t]))
}
function el(...e) {
  if (e.length === 0) return {}
  if (e.length === 1) return e[0]
  let t = {},
    n = {}
  for (let r of e)
    for (let o in r)
      o.startsWith("on") && typeof r[o] == "function"
        ? (n[o] != null || (n[o] = []), n[o].push(r[o]))
        : (t[o] = r[o])
  if (t.disabled || t["aria-disabled"])
    return Object.assign(
      t,
      Object.fromEntries(Object.keys(n).map((r) => [r, void 0])),
    )
  for (let r in n)
    Object.assign(t, {
      [r](o, ...s) {
        let l = n[r]
        for (let i of l) {
          if (o instanceof Event && o.defaultPrevented) return
          i(o, ...s)
        }
      },
    })
  return t
}
function rc(e, t = []) {
  let n = Object.assign({}, e)
  for (let r of t) r in n && delete n[r]
  return n
}
function oc(e) {
  return e == null
    ? !1
    : typeof e.type == "string" ||
        typeof e.type == "object" ||
        typeof e.type == "function"
}
var Jt = ((e) => (
  (e[(e.None = 1)] = "None"),
  (e[(e.Focusable = 2)] = "Focusable"),
  (e[(e.Hidden = 4)] = "Hidden"),
  e
))(Jt || {})
let Rn = _t({
    name: "Hidden",
    props: {
      as: { type: [Object, String], default: "div" },
      features: { type: Number, default: 1 },
    },
    setup(e, { slots: t, attrs: n }) {
      return () => {
        var r
        let { features: o, ...s } = e,
          l = {
            "aria-hidden":
              (o & 2) === 2 ? !0 : (r = s["aria-hidden"]) != null ? r : void 0,
            style: {
              position: "fixed",
              top: 1,
              left: 1,
              width: 1,
              height: 0,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              borderWidth: "0",
              ...((o & 4) === 4 && (o & 2) !== 2 && { display: "none" }),
            },
          }
        return Kn({
          ourProps: l,
          theirProps: s,
          slot: {},
          attrs: n,
          slots: t,
          name: "Hidden",
        })
      }
    },
  }),
  tl = Symbol("Context")
var Xt = ((e) => (
  (e[(e.Open = 1)] = "Open"),
  (e[(e.Closed = 2)] = "Closed"),
  (e[(e.Closing = 4)] = "Closing"),
  (e[(e.Opening = 8)] = "Opening"),
  e
))(Xt || {})
function sc() {
  return ve(tl, null)
}
function lc(e) {
  lt(tl, e)
}
var nt = ((e) => (
  (e.Space = " "),
  (e.Enter = "Enter"),
  (e.Escape = "Escape"),
  (e.Backspace = "Backspace"),
  (e.Delete = "Delete"),
  (e.ArrowLeft = "ArrowLeft"),
  (e.ArrowUp = "ArrowUp"),
  (e.ArrowRight = "ArrowRight"),
  (e.ArrowDown = "ArrowDown"),
  (e.Home = "Home"),
  (e.End = "End"),
  (e.PageUp = "PageUp"),
  (e.PageDown = "PageDown"),
  (e.Tab = "Tab"),
  e
))(nt || {})
function ic(e, t, n, r) {
  Dn.isServer ||
    bt((o) => {
      ;(e = e ?? window),
        e.addEventListener(t, n, r),
        o(() => e.removeEventListener(t, n, r))
    })
}
var Ge = ((e) => (
  (e[(e.Forwards = 0)] = "Forwards"), (e[(e.Backwards = 1)] = "Backwards"), e
))(Ge || {})
function nl() {
  let e = ae(0)
  return (
    Xs("keydown", (t) => {
      t.key === "Tab" && (e.value = t.shiftKey ? 1 : 0)
    }),
    e
  )
}
function uc({
  defaultContainers: e = [],
  portals: t,
  mainTreeNodeRef: n,
} = {}) {
  let r = ae(null),
    o = nn(r)
  function s() {
    var l, i, u
    let f = []
    for (let c of e)
      c !== null &&
        (c instanceof HTMLElement
          ? f.push(c)
          : "value" in c && c.value instanceof HTMLElement && f.push(c.value))
    if (t != null && t.value) for (let c of t.value) f.push(c)
    for (let c of (l =
      o == null ? void 0 : o.querySelectorAll("html > *, body > *")) != null
      ? l
      : [])
      c !== document.body &&
        c !== document.head &&
        c instanceof HTMLElement &&
        c.id !== "headlessui-portal-root" &&
        (c.contains(B(r)) ||
          c.contains(
            (u = (i = B(r)) == null ? void 0 : i.getRootNode()) == null
              ? void 0
              : u.host,
          ) ||
          f.some((h) => c.contains(h)) ||
          f.push(c))
    return f
  }
  return {
    resolveContainers: s,
    contains(l) {
      return s().some((i) => i.contains(l))
    },
    mainTreeNodeRef: r,
    MainTreeNode() {
      return n != null ? null : _e(Rn, { features: Jt.Hidden, ref: r })
    },
  }
}
let No = Symbol("PortalParentContext")
function cc() {
  let e = ve(No, null),
    t = ae([])
  function n(s) {
    return t.value.push(s), e && e.register(s), () => r(s)
  }
  function r(s) {
    let l = t.value.indexOf(s)
    l !== -1 && t.value.splice(l, 1), e && e.unregister(s)
  }
  let o = { register: n, unregister: r, portals: t }
  return [
    t,
    _t({
      name: "PortalWrapper",
      setup(s, { slots: l }) {
        return (
          lt(No, o),
          () => {
            var i
            return (i = l.default) == null ? void 0 : i.call(l)
          }
        )
      },
    }),
  ]
}
var ac = ((e) => (
  (e[(e.Open = 0)] = "Open"), (e[(e.Closed = 1)] = "Closed"), e
))(ac || {})
let rl = Symbol("PopoverContext")
function qr(e) {
  let t = ve(rl, null)
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <${ll.name} /> component.`)
    throw (Error.captureStackTrace && Error.captureStackTrace(n, qr), n)
  }
  return t
}
let fc = Symbol("PopoverGroupContext")
function ol() {
  return ve(fc, null)
}
let sl = Symbol("PopoverPanelContext")
function dc() {
  return ve(sl, null)
}
let ll = _t({
    name: "Popover",
    inheritAttrs: !1,
    props: { as: { type: [Object, String], default: "div" } },
    setup(e, { slots: t, attrs: n, expose: r }) {
      var o
      let s = ae(null)
      r({ el: s, $el: s })
      let l = ae(1),
        i = ae(null),
        u = ae(null),
        f = ae(null),
        c = ae(null),
        h = oe(() => nn(s)),
        p = oe(() => {
          var F, I
          if (!B(i) || !B(c)) return !1
          for (let he of document.querySelectorAll("body > *"))
            if (
              Number(he == null ? void 0 : he.contains(B(i))) ^
              Number(he == null ? void 0 : he.contains(B(c)))
            )
              return !0
          let K = Un(),
            Z = K.indexOf(B(i)),
            Ce = (Z + K.length - 1) % K.length,
            Se = (Z + 1) % K.length,
            Fe = K[Ce],
            Ue = K[Se]
          return (
            !((F = B(c)) != null && F.contains(Fe)) &&
            !((I = B(c)) != null && I.contains(Ue))
          )
        }),
        m = {
          popoverState: l,
          buttonId: ae(null),
          panelId: ae(null),
          panel: c,
          button: i,
          isPortalled: p,
          beforePanelSentinel: u,
          afterPanelSentinel: f,
          togglePopover() {
            l.value = ze(l.value, { 0: 1, 1: 0 })
          },
          closePopover() {
            l.value !== 1 && (l.value = 1)
          },
          close(F) {
            m.closePopover()
            let I = F
              ? F instanceof HTMLElement
                ? F
                : F.value instanceof HTMLElement
                  ? B(F)
                  : B(m.button)
              : B(m.button)
            I == null || I.focus()
          },
        }
      lt(rl, m), lc(oe(() => ze(l.value, { 0: Xt.Open, 1: Xt.Closed })))
      let x = {
          buttonId: m.buttonId,
          panelId: m.panelId,
          close() {
            m.closePopover()
          },
        },
        C = ol(),
        O = C == null ? void 0 : C.registerPopover,
        [R, M] = cc(),
        P = uc({
          mainTreeNodeRef: C == null ? void 0 : C.mainTreeNodeRef,
          portals: R,
          defaultContainers: [i, c],
        })
      function k() {
        var F, I, K, Z
        return (Z = C == null ? void 0 : C.isFocusWithinPopoverGroup()) != null
          ? Z
          : ((F = h.value) == null ? void 0 : F.activeElement) &&
              (((I = B(i)) == null
                ? void 0
                : I.contains(h.value.activeElement)) ||
                ((K = B(c)) == null
                  ? void 0
                  : K.contains(h.value.activeElement)))
      }
      return (
        bt(() => (O == null ? void 0 : O(x))),
        ic(
          (o = h.value) == null ? void 0 : o.defaultView,
          "focus",
          (F) => {
            var I, K
            F.target !== window &&
              F.target instanceof HTMLElement &&
              l.value === 0 &&
              (k() ||
                (i &&
                  c &&
                  (P.contains(F.target) ||
                    ((I = B(m.beforePanelSentinel)) != null &&
                      I.contains(F.target)) ||
                    ((K = B(m.afterPanelSentinel)) != null &&
                      K.contains(F.target)) ||
                    m.closePopover())))
          },
          !0,
        ),
        ec(
          P.resolveContainers,
          (F, I) => {
            var K
            m.closePopover(),
              Js(I, Gr.Loose) ||
                (F.preventDefault(), (K = B(i)) == null || K.focus())
          },
          oe(() => l.value === 0),
        ),
        () => {
          let F = { open: l.value === 0, close: m.close }
          return _e(ge, [
            _e(M, {}, () =>
              Kn({
                theirProps: { ...e, ...n },
                ourProps: { ref: s },
                slot: F,
                slots: t,
                attrs: n,
                name: "Popover",
              }),
            ),
            _e(P.MainTreeNode),
          ])
        }
      )
    },
  }),
  hc = _t({
    name: "PopoverButton",
    props: {
      as: { type: [Object, String], default: "button" },
      disabled: { type: [Boolean], default: !1 },
      id: { type: String, default: () => `headlessui-popover-button-${Vt()}` },
    },
    inheritAttrs: !1,
    setup(e, { attrs: t, slots: n, expose: r }) {
      let o = qr("PopoverButton"),
        s = oe(() => nn(o.button))
      r({ el: o.button, $el: o.button }),
        Ln(() => {
          o.buttonId.value = e.id
        }),
        jn(() => {
          o.buttonId.value = null
        })
      let l = ol(),
        i = l == null ? void 0 : l.closeOthers,
        u = dc(),
        f = oe(() => (u === null ? !1 : u.value === o.panelId.value)),
        c = ae(null),
        h = `headlessui-focus-sentinel-${Vt()}`
      f.value ||
        bt(() => {
          o.button.value = B(c)
        })
      let p = tc(
        oe(() => ({ as: e.as, type: t.type })),
        c,
      )
      function m(P) {
        var k, F, I, K, Z
        if (f.value) {
          if (o.popoverState.value === 1) return
          switch (P.key) {
            case nt.Space:
            case nt.Enter:
              P.preventDefault(),
                (F = (k = P.target).click) == null || F.call(k),
                o.closePopover(),
                (I = B(o.button)) == null || I.focus()
              break
          }
        } else
          switch (P.key) {
            case nt.Space:
            case nt.Enter:
              P.preventDefault(),
                P.stopPropagation(),
                o.popoverState.value === 1 &&
                  (i == null || i(o.buttonId.value)),
                o.togglePopover()
              break
            case nt.Escape:
              if (o.popoverState.value !== 0)
                return i == null ? void 0 : i(o.buttonId.value)
              if (
                !B(o.button) ||
                ((K = s.value) != null &&
                  K.activeElement &&
                  !(
                    (Z = B(o.button)) != null &&
                    Z.contains(s.value.activeElement)
                  ))
              )
                return
              P.preventDefault(), P.stopPropagation(), o.closePopover()
              break
          }
      }
      function x(P) {
        f.value || (P.key === nt.Space && P.preventDefault())
      }
      function C(P) {
        var k, F
        e.disabled ||
          (f.value
            ? (o.closePopover(), (k = B(o.button)) == null || k.focus())
            : (P.preventDefault(),
              P.stopPropagation(),
              o.popoverState.value === 1 && (i == null || i(o.buttonId.value)),
              o.togglePopover(),
              (F = B(o.button)) == null || F.focus()))
      }
      function O(P) {
        P.preventDefault(), P.stopPropagation()
      }
      let R = nl()
      function M() {
        let P = B(o.panel)
        if (!P) return
        function k() {
          ze(R.value, {
            [Ge.Forwards]: () => dt(P, We.First),
            [Ge.Backwards]: () => dt(P, We.Last),
          }) === Sn.Error &&
            dt(
              Un().filter((F) => F.dataset.headlessuiFocusGuard !== "true"),
              ze(R.value, {
                [Ge.Forwards]: We.Next,
                [Ge.Backwards]: We.Previous,
              }),
              { relativeTo: B(o.button) },
            )
        }
        k()
      }
      return () => {
        let P = o.popoverState.value === 0,
          k = { open: P },
          { id: F, ...I } = e,
          K = f.value
            ? { ref: c, type: p.value, onKeydown: m, onClick: C }
            : {
                ref: c,
                id: F,
                type: p.value,
                "aria-expanded": o.popoverState.value === 0,
                "aria-controls": B(o.panel) ? o.panelId.value : void 0,
                disabled: e.disabled ? !0 : void 0,
                onKeydown: m,
                onKeyup: x,
                onClick: C,
                onMousedown: O,
              }
        return _e(ge, [
          Kn({
            ourProps: K,
            theirProps: { ...t, ...I },
            slot: k,
            attrs: t,
            slots: n,
            name: "PopoverButton",
          }),
          P &&
            !f.value &&
            o.isPortalled.value &&
            _e(Rn, {
              id: h,
              features: Jt.Focusable,
              "data-headlessui-focus-guard": !0,
              as: "button",
              type: "button",
              onFocus: M,
            }),
        ])
      }
    },
  }),
  pc = _t({
    name: "PopoverPanel",
    props: {
      as: { type: [Object, String], default: "div" },
      static: { type: Boolean, default: !1 },
      unmount: { type: Boolean, default: !0 },
      focus: { type: Boolean, default: !1 },
      id: { type: String, default: () => `headlessui-popover-panel-${Vt()}` },
    },
    inheritAttrs: !1,
    setup(e, { attrs: t, slots: n, expose: r }) {
      let { focus: o } = e,
        s = qr("PopoverPanel"),
        l = oe(() => nn(s.panel)),
        i = `headlessui-focus-sentinel-before-${Vt()}`,
        u = `headlessui-focus-sentinel-after-${Vt()}`
      r({ el: s.panel, $el: s.panel }),
        Ln(() => {
          s.panelId.value = e.id
        }),
        jn(() => {
          s.panelId.value = null
        }),
        lt(sl, s.panelId),
        bt(() => {
          var O, R
          if (!o || s.popoverState.value !== 0 || !s.panel) return
          let M = (O = l.value) == null ? void 0 : O.activeElement
          ;((R = B(s.panel)) != null && R.contains(M)) ||
            dt(B(s.panel), We.First)
        })
      let f = sc(),
        c = oe(() =>
          f !== null
            ? (f.value & Xt.Open) === Xt.Open
            : s.popoverState.value === 0,
        )
      function h(O) {
        var R, M
        switch (O.key) {
          case nt.Escape:
            if (
              s.popoverState.value !== 0 ||
              !B(s.panel) ||
              (l.value &&
                !(
                  (R = B(s.panel)) != null && R.contains(l.value.activeElement)
                ))
            )
              return
            O.preventDefault(),
              O.stopPropagation(),
              s.closePopover(),
              (M = B(s.button)) == null || M.focus()
            break
        }
      }
      function p(O) {
        var R, M, P, k, F
        let I = O.relatedTarget
        I &&
          B(s.panel) &&
          (((R = B(s.panel)) != null && R.contains(I)) ||
            (s.closePopover(),
            (((P =
              (M = B(s.beforePanelSentinel)) == null ? void 0 : M.contains) !=
              null &&
              P.call(M, I)) ||
              ((F =
                (k = B(s.afterPanelSentinel)) == null ? void 0 : k.contains) !=
                null &&
                F.call(k, I))) &&
              I.focus({ preventScroll: !0 })))
      }
      let m = nl()
      function x() {
        let O = B(s.panel)
        if (!O) return
        function R() {
          ze(m.value, {
            [Ge.Forwards]: () => {
              var M
              dt(O, We.First) === Sn.Error &&
                ((M = B(s.afterPanelSentinel)) == null || M.focus())
            },
            [Ge.Backwards]: () => {
              var M
              ;(M = B(s.button)) == null || M.focus({ preventScroll: !0 })
            },
          })
        }
        R()
      }
      function C() {
        let O = B(s.panel)
        if (!O) return
        function R() {
          ze(m.value, {
            [Ge.Forwards]: () => {
              let M = B(s.button),
                P = B(s.panel)
              if (!M) return
              let k = Un(),
                F = k.indexOf(M),
                I = k.slice(0, F + 1),
                K = [...k.slice(F + 1), ...I]
              for (let Z of K.slice())
                if (
                  Z.dataset.headlessuiFocusGuard === "true" ||
                  (P != null && P.contains(Z))
                ) {
                  let Ce = K.indexOf(Z)
                  Ce !== -1 && K.splice(Ce, 1)
                }
              dt(K, We.First, { sorted: !1 })
            },
            [Ge.Backwards]: () => {
              var M
              dt(O, We.Previous) === Sn.Error &&
                ((M = B(s.button)) == null || M.focus())
            },
          })
        }
        R()
      }
      return () => {
        let O = { open: s.popoverState.value === 0, close: s.close },
          { id: R, focus: M, ...P } = e,
          k = {
            ref: s.panel,
            id: R,
            onKeydown: h,
            onFocusout: o && s.popoverState.value === 0 ? p : void 0,
            tabIndex: -1,
          }
        return Kn({
          ourProps: k,
          theirProps: { ...t, ...P },
          attrs: t,
          slot: O,
          slots: {
            ...n,
            default: (...F) => {
              var I
              return [
                _e(ge, [
                  c.value &&
                    s.isPortalled.value &&
                    _e(Rn, {
                      id: i,
                      ref: s.beforePanelSentinel,
                      features: Jt.Focusable,
                      "data-headlessui-focus-guard": !0,
                      as: "button",
                      type: "button",
                      onFocus: x,
                    }),
                  (I = n.default) == null ? void 0 : I.call(n, ...F),
                  c.value &&
                    s.isPortalled.value &&
                    _e(Rn, {
                      id: u,
                      ref: s.afterPanelSentinel,
                      features: Jt.Focusable,
                      "data-headlessui-focus-guard": !0,
                      as: "button",
                      type: "button",
                      onFocus: C,
                    }),
                ]),
              ]
            },
          },
          features: _r.RenderStrategy | _r.Static,
          visible: c.value,
          name: "PopoverPanel",
        })
      }
    },
  })
const Rt = typeof window < "u"
function gc(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const Q = Object.assign
function rr(e, t) {
  const n = {}
  for (const r in t) {
    const o = t[r]
    n[r] = Ne(o) ? o.map(e) : e(o)
  }
  return n
}
const Wt = () => {},
  Ne = Array.isArray,
  mc = /\/$/,
  vc = (e) => e.replace(mc, "")
function or(e, t, n = "/") {
  let r,
    o = {},
    s = "",
    l = ""
  const i = t.indexOf("#")
  let u = t.indexOf("?")
  return (
    i < u && i >= 0 && (u = -1),
    u > -1 &&
      ((r = t.slice(0, u)),
      (s = t.slice(u + 1, i > -1 ? i : t.length)),
      (o = e(s))),
    i > -1 && ((r = r || t.slice(0, i)), (l = t.slice(i, t.length))),
    (r = wc(r ?? t, n)),
    { fullPath: r + (s && "?") + s + l, path: r, query: o, hash: l }
  )
}
function yc(e, t) {
  const n = t.query ? e(t.query) : ""
  return t.path + (n && "?") + n + (t.hash || "")
}
function Fo(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/"
}
function bc(e, t, n) {
  const r = t.matched.length - 1,
    o = n.matched.length - 1
  return (
    r > -1 &&
    r === o &&
    $t(t.matched[r], n.matched[o]) &&
    il(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  )
}
function $t(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function il(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const n in e) if (!_c(e[n], t[n])) return !1
  return !0
}
function _c(e, t) {
  return Ne(e) ? Lo(e, t) : Ne(t) ? Lo(t, e) : e === t
}
function Lo(e, t) {
  return Ne(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t
}
function wc(e, t) {
  if (e.startsWith("/")) return e
  if (!e) return t
  const n = t.split("/"),
    r = e.split("/"),
    o = r[r.length - 1]
  ;(o === ".." || o === ".") && r.push("")
  let s = n.length - 1,
    l,
    i
  for (l = 0; l < r.length; l++)
    if (((i = r[l]), i !== "."))
      if (i === "..") s > 1 && s--
      else break
  return (
    n.slice(0, s).join("/") +
    "/" +
    r.slice(l - (l === r.length ? 1 : 0)).join("/")
  )
}
var Zt
;(function (e) {
  ;(e.pop = "pop"), (e.push = "push")
})(Zt || (Zt = {}))
var Gt
;(function (e) {
  ;(e.back = "back"), (e.forward = "forward"), (e.unknown = "")
})(Gt || (Gt = {}))
function Ec(e) {
  if (!e)
    if (Rt) {
      const t = document.querySelector("base")
      ;(e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""))
    } else e = "/"
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), vc(e)
}
const xc = /^[^#]+#/
function Pc(e, t) {
  return e.replace(xc, "#") + t
}
function Sc(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect()
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  }
}
const Vn = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function Rc(e) {
  let t
  if ("el" in e) {
    const n = e.el,
      r = typeof n == "string" && n.startsWith("#"),
      o =
        typeof n == "string"
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n
    if (!o) return
    t = Sc(o, e)
  } else t = e
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset,
      )
}
function jo(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const wr = new Map()
function Cc(e, t) {
  wr.set(e, t)
}
function Oc(e) {
  const t = wr.get(e)
  return wr.delete(e), t
}
let Ac = () => location.protocol + "//" + location.host
function ul(e, t) {
  const { pathname: n, search: r, hash: o } = t,
    s = e.indexOf("#")
  if (s > -1) {
    let i = o.includes(e.slice(s)) ? e.slice(s).length : 1,
      u = o.slice(i)
    return u[0] !== "/" && (u = "/" + u), Fo(u, "")
  }
  return Fo(n, e) + r + o
}
function Tc(e, t, n, r) {
  let o = [],
    s = [],
    l = null
  const i = ({ state: p }) => {
    const m = ul(e, location),
      x = n.value,
      C = t.value
    let O = 0
    if (p) {
      if (((n.value = m), (t.value = p), l && l === x)) {
        l = null
        return
      }
      O = C ? p.position - C.position : 0
    } else r(m)
    o.forEach((R) => {
      R(n.value, x, {
        delta: O,
        type: Zt.pop,
        direction: O ? (O > 0 ? Gt.forward : Gt.back) : Gt.unknown,
      })
    })
  }
  function u() {
    l = n.value
  }
  function f(p) {
    o.push(p)
    const m = () => {
      const x = o.indexOf(p)
      x > -1 && o.splice(x, 1)
    }
    return s.push(m), m
  }
  function c() {
    const { history: p } = window
    p.state && p.replaceState(Q({}, p.state, { scroll: Vn() }), "")
  }
  function h() {
    for (const p of s) p()
    ;(s = []),
      window.removeEventListener("popstate", i),
      window.removeEventListener("beforeunload", c)
  }
  return (
    window.addEventListener("popstate", i),
    window.addEventListener("beforeunload", c, { passive: !0 }),
    { pauseListeners: u, listen: f, destroy: h }
  )
}
function ko(e, t, n, r = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: o ? Vn() : null,
  }
}
function Ic(e) {
  const { history: t, location: n } = window,
    r = { value: ul(e, n) },
    o = { value: t.state }
  o.value ||
    s(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    )
  function s(u, f, c) {
    const h = e.indexOf("#"),
      p =
        h > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(h)) + u
          : Ac() + e + u
    try {
      t[c ? "replaceState" : "pushState"](f, "", p), (o.value = f)
    } catch (m) {
      console.error(m), n[c ? "replace" : "assign"](p)
    }
  }
  function l(u, f) {
    const c = Q({}, t.state, ko(o.value.back, u, o.value.forward, !0), f, {
      position: o.value.position,
    })
    s(u, c, !0), (r.value = u)
  }
  function i(u, f) {
    const c = Q({}, o.value, t.state, { forward: u, scroll: Vn() })
    s(c.current, c, !0)
    const h = Q({}, ko(r.value, u, null), { position: c.position + 1 }, f)
    s(u, h, !1), (r.value = u)
  }
  return { location: r, state: o, push: i, replace: l }
}
function Mc(e) {
  e = Ec(e)
  const t = Ic(e),
    n = Tc(e, t.state, t.location, t.replace)
  function r(s, l = !0) {
    l || n.pauseListeners(), history.go(s)
  }
  const o = Q(
    { location: "", base: e, go: r, createHref: Pc.bind(null, e) },
    t,
    n,
  )
  return (
    Object.defineProperty(o, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(o, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    o
  )
}
function $c(e) {
  return typeof e == "string" || (e && typeof e == "object")
}
function cl(e) {
  return typeof e == "string" || typeof e == "symbol"
}
const Xe = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  al = Symbol("")
var Ho
;(function (e) {
  ;(e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated")
})(Ho || (Ho = {}))
function Nt(e, t) {
  return Q(new Error(), { type: e, [al]: !0 }, t)
}
function Ve(e, t) {
  return e instanceof Error && al in e && (t == null || !!(e.type & t))
}
const Bo = "[^/]+?",
  Nc = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Fc = /[.+*?^${}()[\]/\\]/g
function Lc(e, t) {
  const n = Q({}, Nc, t),
    r = []
  let o = n.start ? "^" : ""
  const s = []
  for (const f of e) {
    const c = f.length ? [] : [90]
    n.strict && !f.length && (o += "/")
    for (let h = 0; h < f.length; h++) {
      const p = f[h]
      let m = 40 + (n.sensitive ? 0.25 : 0)
      if (p.type === 0)
        h || (o += "/"), (o += p.value.replace(Fc, "\\$&")), (m += 40)
      else if (p.type === 1) {
        const { value: x, repeatable: C, optional: O, regexp: R } = p
        s.push({ name: x, repeatable: C, optional: O })
        const M = R || Bo
        if (M !== Bo) {
          m += 10
          try {
            new RegExp(`(${M})`)
          } catch (k) {
            throw new Error(
              `Invalid custom RegExp for param "${x}" (${M}): ` + k.message,
            )
          }
        }
        let P = C ? `((?:${M})(?:/(?:${M}))*)` : `(${M})`
        h || (P = O && f.length < 2 ? `(?:/${P})` : "/" + P),
          O && (P += "?"),
          (o += P),
          (m += 20),
          O && (m += -8),
          C && (m += -20),
          M === ".*" && (m += -50)
      }
      c.push(m)
    }
    r.push(c)
  }
  if (n.strict && n.end) {
    const f = r.length - 1
    r[f][r[f].length - 1] += 0.7000000000000001
  }
  n.strict || (o += "/?"), n.end ? (o += "$") : n.strict && (o += "(?:/|$)")
  const l = new RegExp(o, n.sensitive ? "" : "i")
  function i(f) {
    const c = f.match(l),
      h = {}
    if (!c) return null
    for (let p = 1; p < c.length; p++) {
      const m = c[p] || "",
        x = s[p - 1]
      h[x.name] = m && x.repeatable ? m.split("/") : m
    }
    return h
  }
  function u(f) {
    let c = "",
      h = !1
    for (const p of e) {
      ;(!h || !c.endsWith("/")) && (c += "/"), (h = !1)
      for (const m of p)
        if (m.type === 0) c += m.value
        else if (m.type === 1) {
          const { value: x, repeatable: C, optional: O } = m,
            R = x in f ? f[x] : ""
          if (Ne(R) && !C)
            throw new Error(
              `Provided param "${x}" is an array but it is not repeatable (* or + modifiers)`,
            )
          const M = Ne(R) ? R.join("/") : R
          if (!M)
            if (O)
              p.length < 2 &&
                (c.endsWith("/") ? (c = c.slice(0, -1)) : (h = !0))
            else throw new Error(`Missing required param "${x}"`)
          c += M
        }
    }
    return c || "/"
  }
  return { re: l, score: r, keys: s, parse: i, stringify: u }
}
function jc(e, t) {
  let n = 0
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n]
    if (r) return r
    n++
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 80
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 80
        ? 1
        : -1
      : 0
}
function kc(e, t) {
  let n = 0
  const r = e.score,
    o = t.score
  for (; n < r.length && n < o.length; ) {
    const s = jc(r[n], o[n])
    if (s) return s
    n++
  }
  if (Math.abs(o.length - r.length) === 1) {
    if (Do(r)) return 1
    if (Do(o)) return -1
  }
  return o.length - r.length
}
function Do(e) {
  const t = e[e.length - 1]
  return e.length > 0 && t[t.length - 1] < 0
}
const Hc = { type: 0, value: "" },
  Bc = /[a-zA-Z0-9_]/
function Dc(e) {
  if (!e) return [[]]
  if (e === "/") return [[Hc]]
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`)
  function t(m) {
    throw new Error(`ERR (${n})/"${f}": ${m}`)
  }
  let n = 0,
    r = n
  const o = []
  let s
  function l() {
    s && o.push(s), (s = [])
  }
  let i = 0,
    u,
    f = "",
    c = ""
  function h() {
    f &&
      (n === 0
        ? s.push({ type: 0, value: f })
        : n === 1 || n === 2 || n === 3
          ? (s.length > 1 &&
              (u === "*" || u === "+") &&
              t(
                `A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`,
              ),
            s.push({
              type: 1,
              value: f,
              regexp: c,
              repeatable: u === "*" || u === "+",
              optional: u === "*" || u === "?",
            }))
          : t("Invalid state to consume buffer"),
      (f = ""))
  }
  function p() {
    f += u
  }
  for (; i < e.length; ) {
    if (((u = e[i++]), u === "\\" && n !== 2)) {
      ;(r = n), (n = 4)
      continue
    }
    switch (n) {
      case 0:
        u === "/" ? (f && h(), l()) : u === ":" ? (h(), (n = 1)) : p()
        break
      case 4:
        p(), (n = r)
        break
      case 1:
        u === "("
          ? (n = 2)
          : Bc.test(u)
            ? p()
            : (h(), (n = 0), u !== "*" && u !== "?" && u !== "+" && i--)
        break
      case 2:
        u === ")"
          ? c[c.length - 1] == "\\"
            ? (c = c.slice(0, -1) + u)
            : (n = 3)
          : (c += u)
        break
      case 3:
        h(), (n = 0), u !== "*" && u !== "?" && u !== "+" && i--, (c = "")
        break
      default:
        t("Unknown state")
        break
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${f}"`), h(), l(), o
}
function Uc(e, t, n) {
  const r = Lc(Dc(e.path), n),
    o = Q(r, { record: e, parent: t, children: [], alias: [] })
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o
}
function Kc(e, t) {
  const n = [],
    r = new Map()
  t = Vo({ strict: !1, end: !0, sensitive: !1 }, t)
  function o(c) {
    return r.get(c)
  }
  function s(c, h, p) {
    const m = !p,
      x = Vc(c)
    x.aliasOf = p && p.record
    const C = Vo(t, c),
      O = [x]
    if ("alias" in c) {
      const P = typeof c.alias == "string" ? [c.alias] : c.alias
      for (const k of P)
        O.push(
          Q({}, x, {
            components: p ? p.record.components : x.components,
            path: k,
            aliasOf: p ? p.record : x,
          }),
        )
    }
    let R, M
    for (const P of O) {
      const { path: k } = P
      if (h && k[0] !== "/") {
        const F = h.record.path,
          I = F[F.length - 1] === "/" ? "" : "/"
        P.path = h.record.path + (k && I + k)
      }
      if (
        ((R = Uc(P, h, C)),
        p
          ? p.alias.push(R)
          : ((M = M || R),
            M !== R && M.alias.push(R),
            m && c.name && !Ko(R) && l(c.name)),
        x.children)
      ) {
        const F = x.children
        for (let I = 0; I < F.length; I++) s(F[I], R, p && p.children[I])
      }
      ;(p = p || R),
        ((R.record.components && Object.keys(R.record.components).length) ||
          R.record.name ||
          R.record.redirect) &&
          u(R)
    }
    return M
      ? () => {
          l(M)
        }
      : Wt
  }
  function l(c) {
    if (cl(c)) {
      const h = r.get(c)
      h &&
        (r.delete(c),
        n.splice(n.indexOf(h), 1),
        h.children.forEach(l),
        h.alias.forEach(l))
    } else {
      const h = n.indexOf(c)
      h > -1 &&
        (n.splice(h, 1),
        c.record.name && r.delete(c.record.name),
        c.children.forEach(l),
        c.alias.forEach(l))
    }
  }
  function i() {
    return n
  }
  function u(c) {
    let h = 0
    for (
      ;
      h < n.length &&
      kc(c, n[h]) >= 0 &&
      (c.record.path !== n[h].record.path || !fl(c, n[h]));

    )
      h++
    n.splice(h, 0, c), c.record.name && !Ko(c) && r.set(c.record.name, c)
  }
  function f(c, h) {
    let p,
      m = {},
      x,
      C
    if ("name" in c && c.name) {
      if (((p = r.get(c.name)), !p)) throw Nt(1, { location: c })
      ;(C = p.record.name),
        (m = Q(
          Uo(
            h.params,
            p.keys.filter((M) => !M.optional).map((M) => M.name),
          ),
          c.params &&
            Uo(
              c.params,
              p.keys.map((M) => M.name),
            ),
        )),
        (x = p.stringify(m))
    } else if ("path" in c)
      (x = c.path),
        (p = n.find((M) => M.re.test(x))),
        p && ((m = p.parse(x)), (C = p.record.name))
    else {
      if (((p = h.name ? r.get(h.name) : n.find((M) => M.re.test(h.path))), !p))
        throw Nt(1, { location: c, currentLocation: h })
      ;(C = p.record.name),
        (m = Q({}, h.params, c.params)),
        (x = p.stringify(m))
    }
    const O = []
    let R = p
    for (; R; ) O.unshift(R.record), (R = R.parent)
    return { name: C, path: x, params: m, matched: O, meta: Gc(O) }
  }
  return (
    e.forEach((c) => s(c)),
    {
      addRoute: s,
      resolve: f,
      removeRoute: l,
      getRoutes: i,
      getRecordMatcher: o,
    }
  )
}
function Uo(e, t) {
  const n = {}
  for (const r of t) r in e && (n[r] = e[r])
  return n
}
function Vc(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Wc(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  }
}
function Wc(e) {
  const t = {},
    n = e.props || !1
  if ("component" in e) t.default = n
  else for (const r in e.components) t[r] = typeof n == "object" ? n[r] : n
  return t
}
function Ko(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function Gc(e) {
  return e.reduce((t, n) => Q(t, n.meta), {})
}
function Vo(e, t) {
  const n = {}
  for (const r in e) n[r] = r in t ? t[r] : e[r]
  return n
}
function fl(e, t) {
  return t.children.some((n) => n === e || fl(e, n))
}
const dl = /#/g,
  qc = /&/g,
  zc = /\//g,
  Yc = /=/g,
  Qc = /\?/g,
  hl = /\+/g,
  Jc = /%5B/g,
  Xc = /%5D/g,
  pl = /%5E/g,
  Zc = /%60/g,
  gl = /%7B/g,
  ea = /%7C/g,
  ml = /%7D/g,
  ta = /%20/g
function zr(e) {
  return encodeURI("" + e)
    .replace(ea, "|")
    .replace(Jc, "[")
    .replace(Xc, "]")
}
function na(e) {
  return zr(e).replace(gl, "{").replace(ml, "}").replace(pl, "^")
}
function Er(e) {
  return zr(e)
    .replace(hl, "%2B")
    .replace(ta, "+")
    .replace(dl, "%23")
    .replace(qc, "%26")
    .replace(Zc, "`")
    .replace(gl, "{")
    .replace(ml, "}")
    .replace(pl, "^")
}
function ra(e) {
  return Er(e).replace(Yc, "%3D")
}
function oa(e) {
  return zr(e).replace(dl, "%23").replace(Qc, "%3F")
}
function sa(e) {
  return e == null ? "" : oa(e).replace(zc, "%2F")
}
function Cn(e) {
  try {
    return decodeURIComponent("" + e)
  } catch {}
  return "" + e
}
function la(e) {
  const t = {}
  if (e === "" || e === "?") return t
  const r = (e[0] === "?" ? e.slice(1) : e).split("&")
  for (let o = 0; o < r.length; ++o) {
    const s = r[o].replace(hl, " "),
      l = s.indexOf("="),
      i = Cn(l < 0 ? s : s.slice(0, l)),
      u = l < 0 ? null : Cn(s.slice(l + 1))
    if (i in t) {
      let f = t[i]
      Ne(f) || (f = t[i] = [f]), f.push(u)
    } else t[i] = u
  }
  return t
}
function Wo(e) {
  let t = ""
  for (let n in e) {
    const r = e[n]
    if (((n = ra(n)), r == null)) {
      r !== void 0 && (t += (t.length ? "&" : "") + n)
      continue
    }
    ;(Ne(r) ? r.map((s) => s && Er(s)) : [r && Er(r)]).forEach((s) => {
      s !== void 0 &&
        ((t += (t.length ? "&" : "") + n), s != null && (t += "=" + s))
    })
  }
  return t
}
function ia(e) {
  const t = {}
  for (const n in e) {
    const r = e[n]
    r !== void 0 &&
      (t[n] = Ne(r)
        ? r.map((o) => (o == null ? null : "" + o))
        : r == null
          ? r
          : "" + r)
  }
  return t
}
const ua = Symbol(""),
  Go = Symbol(""),
  Wn = Symbol(""),
  vl = Symbol(""),
  xr = Symbol("")
function Bt() {
  let e = []
  function t(r) {
    return (
      e.push(r),
      () => {
        const o = e.indexOf(r)
        o > -1 && e.splice(o, 1)
      }
    )
  }
  function n() {
    e = []
  }
  return { add: t, list: () => e.slice(), reset: n }
}
function rt(e, t, n, r, o) {
  const s = r && (r.enterCallbacks[o] = r.enterCallbacks[o] || [])
  return () =>
    new Promise((l, i) => {
      const u = (h) => {
          h === !1
            ? i(Nt(4, { from: n, to: t }))
            : h instanceof Error
              ? i(h)
              : $c(h)
                ? i(Nt(2, { from: t, to: h }))
                : (s &&
                    r.enterCallbacks[o] === s &&
                    typeof h == "function" &&
                    s.push(h),
                  l())
        },
        f = e.call(r && r.instances[o], t, n, u)
      let c = Promise.resolve(f)
      e.length < 3 && (c = c.then(u)), c.catch((h) => i(h))
    })
}
function sr(e, t, n, r) {
  const o = []
  for (const s of e)
    for (const l in s.components) {
      let i = s.components[l]
      if (!(t !== "beforeRouteEnter" && !s.instances[l]))
        if (ca(i)) {
          const f = (i.__vccOpts || i)[t]
          f && o.push(rt(f, n, r, s, l))
        } else {
          let u = i()
          o.push(() =>
            u.then((f) => {
              if (!f)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${l}" at "${s.path}"`),
                )
              const c = gc(f) ? f.default : f
              s.components[l] = c
              const p = (c.__vccOpts || c)[t]
              return p && rt(p, n, r, s, l)()
            }),
          )
        }
    }
  return o
}
function ca(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  )
}
function qo(e) {
  const t = ve(Wn),
    n = ve(vl),
    r = oe(() => t.resolve(Te(e.to))),
    o = oe(() => {
      const { matched: u } = r.value,
        { length: f } = u,
        c = u[f - 1],
        h = n.matched
      if (!c || !h.length) return -1
      const p = h.findIndex($t.bind(null, c))
      if (p > -1) return p
      const m = zo(u[f - 2])
      return f > 1 && zo(c) === m && h[h.length - 1].path !== m
        ? h.findIndex($t.bind(null, u[f - 2]))
        : p
    }),
    s = oe(() => o.value > -1 && ha(n.params, r.value.params)),
    l = oe(
      () =>
        o.value > -1 &&
        o.value === n.matched.length - 1 &&
        il(n.params, r.value.params),
    )
  function i(u = {}) {
    return da(u)
      ? t[Te(e.replace) ? "replace" : "push"](Te(e.to)).catch(Wt)
      : Promise.resolve()
  }
  return {
    route: r,
    href: oe(() => r.value.href),
    isActive: s,
    isExactActive: l,
    navigate: i,
  }
}
const aa = _t({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: qo,
    setup(e, { slots: t }) {
      const n = en(qo(e)),
        { options: r } = ve(Wn),
        o = oe(() => ({
          [Yo(e.activeClass, r.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Yo(
            e.exactActiveClass,
            r.linkExactActiveClass,
            "router-link-exact-active",
          )]: n.isExactActive,
        }))
      return () => {
        const s = t.default && t.default(n)
        return e.custom
          ? s
          : _e(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: o.value,
              },
              s,
            )
      }
    },
  }),
  fa = aa
function da(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target")
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}
function ha(e, t) {
  for (const n in t) {
    const r = t[n],
      o = e[n]
    if (typeof r == "string") {
      if (r !== o) return !1
    } else if (!Ne(o) || o.length !== r.length || r.some((s, l) => s !== o[l]))
      return !1
  }
  return !0
}
function zo(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ""
}
const Yo = (e, t, n) => e ?? t ?? n,
  pa = _t({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = ve(xr),
        o = oe(() => e.route || r.value),
        s = ve(Go, 0),
        l = oe(() => {
          let f = Te(s)
          const { matched: c } = o.value
          let h
          for (; (h = c[f]) && !h.components; ) f++
          return f
        }),
        i = oe(() => o.value.matched[l.value])
      lt(
        Go,
        oe(() => l.value + 1),
      ),
        lt(ua, i),
        lt(xr, o)
      const u = ae()
      return (
        mn(
          () => [u.value, i.value, e.name],
          ([f, c, h], [p, m, x]) => {
            c &&
              ((c.instances[h] = f),
              m &&
                m !== c &&
                f &&
                f === p &&
                (c.leaveGuards.size || (c.leaveGuards = m.leaveGuards),
                c.updateGuards.size || (c.updateGuards = m.updateGuards))),
              f &&
                c &&
                (!m || !$t(c, m) || !p) &&
                (c.enterCallbacks[h] || []).forEach((C) => C(f))
          },
          { flush: "post" },
        ),
        () => {
          const f = o.value,
            c = e.name,
            h = i.value,
            p = h && h.components[c]
          if (!p) return Qo(n.default, { Component: p, route: f })
          const m = h.props[c],
            x = m
              ? m === !0
                ? f.params
                : typeof m == "function"
                  ? m(f)
                  : m
              : null,
            O = _e(
              p,
              Q({}, x, t, {
                onVnodeUnmounted: (R) => {
                  R.component.isUnmounted && (h.instances[c] = null)
                },
                ref: u,
              }),
            )
          return Qo(n.default, { Component: O, route: f }) || O
        }
      )
    },
  })
function Qo(e, t) {
  if (!e) return null
  const n = e(t)
  return n.length === 1 ? n[0] : n
}
const ga = pa
function ma(e) {
  const t = Kc(e.routes, e),
    n = e.parseQuery || la,
    r = e.stringifyQuery || Wo,
    o = e.history,
    s = Bt(),
    l = Bt(),
    i = Bt(),
    u = ti(Xe)
  let f = Xe
  Rt &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual")
  const c = rr.bind(null, (y) => "" + y),
    h = rr.bind(null, sa),
    p = rr.bind(null, Cn)
  function m(y, $) {
    let A, L
    return (
      cl(y) ? ((A = t.getRecordMatcher(y)), (L = $)) : (L = y), t.addRoute(L, A)
    )
  }
  function x(y) {
    const $ = t.getRecordMatcher(y)
    $ && t.removeRoute($)
  }
  function C() {
    return t.getRoutes().map((y) => y.record)
  }
  function O(y) {
    return !!t.getRecordMatcher(y)
  }
  function R(y, $) {
    if ((($ = Q({}, $ || u.value)), typeof y == "string")) {
      const d = or(n, y, $.path),
        g = t.resolve({ path: d.path }, $),
        b = o.createHref(d.fullPath)
      return Q(d, g, {
        params: p(g.params),
        hash: Cn(d.hash),
        redirectedFrom: void 0,
        href: b,
      })
    }
    let A
    if ("path" in y) A = Q({}, y, { path: or(n, y.path, $.path).path })
    else {
      const d = Q({}, y.params)
      for (const g in d) d[g] == null && delete d[g]
      ;(A = Q({}, y, { params: h(d) })), ($.params = h($.params))
    }
    const L = t.resolve(A, $),
      Y = y.hash || ""
    L.params = c(p(L.params))
    const ee = yc(r, Q({}, y, { hash: na(Y), path: L.path })),
      a = o.createHref(ee)
    return Q(
      { fullPath: ee, hash: Y, query: r === Wo ? ia(y.query) : y.query || {} },
      L,
      { redirectedFrom: void 0, href: a },
    )
  }
  function M(y) {
    return typeof y == "string" ? or(n, y, u.value.path) : Q({}, y)
  }
  function P(y, $) {
    if (f !== y) return Nt(8, { from: $, to: y })
  }
  function k(y) {
    return K(y)
  }
  function F(y) {
    return k(Q(M(y), { replace: !0 }))
  }
  function I(y) {
    const $ = y.matched[y.matched.length - 1]
    if ($ && $.redirect) {
      const { redirect: A } = $
      let L = typeof A == "function" ? A(y) : A
      return (
        typeof L == "string" &&
          ((L = L.includes("?") || L.includes("#") ? (L = M(L)) : { path: L }),
          (L.params = {})),
        Q(
          { query: y.query, hash: y.hash, params: "path" in L ? {} : y.params },
          L,
        )
      )
    }
  }
  function K(y, $) {
    const A = (f = R(y)),
      L = u.value,
      Y = y.state,
      ee = y.force,
      a = y.replace === !0,
      d = I(A)
    if (d)
      return K(
        Q(M(d), {
          state: typeof d == "object" ? Q({}, Y, d.state) : Y,
          force: ee,
          replace: a,
        }),
        $ || A,
      )
    const g = A
    g.redirectedFrom = $
    let b
    return (
      !ee &&
        bc(r, L, A) &&
        ((b = Nt(16, { to: g, from: L })), Le(L, L, !0, !1)),
      (b ? Promise.resolve(b) : Se(g, L))
        .catch((v) => (Ve(v) ? (Ve(v, 2) ? v : Qe(v)) : z(v, g, L)))
        .then((v) => {
          if (v) {
            if (Ve(v, 2))
              return K(
                Q({ replace: a }, M(v.to), {
                  state: typeof v.to == "object" ? Q({}, Y, v.to.state) : Y,
                  force: ee,
                }),
                $ || g,
              )
          } else v = Ue(g, L, !0, a, Y)
          return Fe(g, L, v), v
        })
    )
  }
  function Z(y, $) {
    const A = P(y, $)
    return A ? Promise.reject(A) : Promise.resolve()
  }
  function Ce(y) {
    const $ = xt.values().next().value
    return $ && typeof $.runWithContext == "function"
      ? $.runWithContext(y)
      : y()
  }
  function Se(y, $) {
    let A
    const [L, Y, ee] = va(y, $)
    A = sr(L.reverse(), "beforeRouteLeave", y, $)
    for (const d of L)
      d.leaveGuards.forEach((g) => {
        A.push(rt(g, y, $))
      })
    const a = Z.bind(null, y, $)
    return (
      A.push(a),
      ce(A)
        .then(() => {
          A = []
          for (const d of s.list()) A.push(rt(d, y, $))
          return A.push(a), ce(A)
        })
        .then(() => {
          A = sr(Y, "beforeRouteUpdate", y, $)
          for (const d of Y)
            d.updateGuards.forEach((g) => {
              A.push(rt(g, y, $))
            })
          return A.push(a), ce(A)
        })
        .then(() => {
          A = []
          for (const d of ee)
            if (d.beforeEnter)
              if (Ne(d.beforeEnter))
                for (const g of d.beforeEnter) A.push(rt(g, y, $))
              else A.push(rt(d.beforeEnter, y, $))
          return A.push(a), ce(A)
        })
        .then(
          () => (
            y.matched.forEach((d) => (d.enterCallbacks = {})),
            (A = sr(ee, "beforeRouteEnter", y, $)),
            A.push(a),
            ce(A)
          ),
        )
        .then(() => {
          A = []
          for (const d of l.list()) A.push(rt(d, y, $))
          return A.push(a), ce(A)
        })
        .catch((d) => (Ve(d, 8) ? d : Promise.reject(d)))
    )
  }
  function Fe(y, $, A) {
    i.list().forEach((L) => Ce(() => L(y, $, A)))
  }
  function Ue(y, $, A, L, Y) {
    const ee = P(y, $)
    if (ee) return ee
    const a = $ === Xe,
      d = Rt ? history.state : {}
    A &&
      (L || a
        ? o.replace(y.fullPath, Q({ scroll: a && d && d.scroll }, Y))
        : o.push(y.fullPath, Y)),
      (u.value = y),
      Le(y, $, A, a),
      Qe()
  }
  let he
  function jt() {
    he ||
      (he = o.listen((y, $, A) => {
        if (!rn.listening) return
        const L = R(y),
          Y = I(L)
        if (Y) {
          K(Q(Y, { replace: !0 }), L).catch(Wt)
          return
        }
        f = L
        const ee = u.value
        Rt && Cc(jo(ee.fullPath, A.delta), Vn()),
          Se(L, ee)
            .catch((a) =>
              Ve(a, 12)
                ? a
                : Ve(a, 2)
                  ? (K(a.to, L)
                      .then((d) => {
                        Ve(d, 20) &&
                          !A.delta &&
                          A.type === Zt.pop &&
                          o.go(-1, !1)
                      })
                      .catch(Wt),
                    Promise.reject())
                  : (A.delta && o.go(-A.delta, !1), z(a, L, ee)),
            )
            .then((a) => {
              ;(a = a || Ue(L, ee, !1)),
                a &&
                  (A.delta && !Ve(a, 8)
                    ? o.go(-A.delta, !1)
                    : A.type === Zt.pop && Ve(a, 20) && o.go(-1, !1)),
                Fe(L, ee, a)
            })
            .catch(Wt)
      }))
  }
  let wt = Bt(),
    le = Bt(),
    J
  function z(y, $, A) {
    Qe(y)
    const L = le.list()
    return (
      L.length ? L.forEach((Y) => Y(y, $, A)) : console.error(y),
      Promise.reject(y)
    )
  }
  function Ke() {
    return J && u.value !== Xe
      ? Promise.resolve()
      : new Promise((y, $) => {
          wt.add([y, $])
        })
  }
  function Qe(y) {
    return (
      J ||
        ((J = !y),
        jt(),
        wt.list().forEach(([$, A]) => (y ? A(y) : $())),
        wt.reset()),
      y
    )
  }
  function Le(y, $, A, L) {
    const { scrollBehavior: Y } = e
    if (!Rt || !Y) return Promise.resolve()
    const ee =
      (!A && Oc(jo(y.fullPath, 0))) ||
      ((L || !A) && history.state && history.state.scroll) ||
      null
    return Rs()
      .then(() => Y(y, $, ee))
      .then((a) => a && Rc(a))
      .catch((a) => z(a, y, $))
  }
  const ye = (y) => o.go(y)
  let Et
  const xt = new Set(),
    rn = {
      currentRoute: u,
      listening: !0,
      addRoute: m,
      removeRoute: x,
      hasRoute: O,
      getRoutes: C,
      resolve: R,
      options: e,
      push: k,
      replace: F,
      go: ye,
      back: () => ye(-1),
      forward: () => ye(1),
      beforeEach: s.add,
      beforeResolve: l.add,
      afterEach: i.add,
      onError: le.add,
      isReady: Ke,
      install(y) {
        const $ = this
        y.component("RouterLink", fa),
          y.component("RouterView", ga),
          (y.config.globalProperties.$router = $),
          Object.defineProperty(y.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => Te(u),
          }),
          Rt &&
            !Et &&
            u.value === Xe &&
            ((Et = !0), k(o.location).catch((Y) => {}))
        const A = {}
        for (const Y in Xe)
          Object.defineProperty(A, Y, { get: () => u.value[Y], enumerable: !0 })
        y.provide(Wn, $), y.provide(vl, vs(A)), y.provide(xr, u)
        const L = y.unmount
        xt.add(y),
          (y.unmount = function () {
            xt.delete(y),
              xt.size < 1 &&
                ((f = Xe),
                he && he(),
                (he = null),
                (u.value = Xe),
                (Et = !1),
                (J = !1)),
              L()
          })
      },
    }
  function ce(y) {
    return y.reduce(($, A) => $.then(() => Ce(A)), Promise.resolve())
  }
  return rn
}
function va(e, t) {
  const n = [],
    r = [],
    o = [],
    s = Math.max(t.matched.length, e.matched.length)
  for (let l = 0; l < s; l++) {
    const i = t.matched[l]
    i && (e.matched.find((f) => $t(f, i)) ? r.push(i) : n.push(i))
    const u = e.matched[l]
    u && (t.matched.find((f) => $t(f, u)) || o.push(u))
  }
  return [n, r, o]
}
function ya() {
  return ve(Wn)
}
var dn = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
}
const ba = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  yl =
    (e, t) =>
    (
      {
        size: n,
        strokeWidth: r = 2,
        absoluteStrokeWidth: o,
        color: s,
        class: l,
        ...i
      },
      { attrs: u, slots: f },
    ) =>
      _e(
        "svg",
        {
          ...dn,
          width: n || dn.width,
          height: n || dn.height,
          stroke: s || dn.stroke,
          "stroke-width": o ? (Number(r) * 24) / Number(n) : r,
          ...u,
          class: ["lucide", `lucide-${ba(e)}`],
          ...i,
        },
        [...t.map((c) => _e(...c)), ...(f.default ? [f.default()] : [])],
      )
const _a = yl("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }],
])
const wa = yl("ChevronUpIcon", [
    ["path", { d: "m18 15-6-6-6 6", key: "153udz" }],
  ]),
  Ea = {
    items: {
      home: {
        icon: null,
        name: "Home",
        click: "router.push('/')",
        url: "/",
        dropdown: !1,
      },
      about: {
        icon: null,
        name: "About",
        click: "router.push('/about')",
        url: "/about",
        dropdown: !0,
        items: {
          about1: {
            icon: null,
            name: "About 1",
            click: "router.push('/about1')",
            url: "/about1",
            dropdown: !1,
          },
          about2: {
            icon: null,
            name: "About 2",
            click: "router.push('/about2')",
            url: "/about2",
            dropdown: !1,
          },
        },
      },
    },
  },
  Jo = { menu: Ea },
  xa = { class: "flex flex-col items-center justify-center" },
  Pa = ["onClick"],
  Sa = ["onClick"],
  Ra = {
    __name: "mainMenu",
    setup(e) {
      ae(Jo)
      const t = en(
          Object.entries(Jo.menu.items).map(([s, l]) => ({ ...l, id: s })),
        ),
        n = ya(),
        r = (s) => {
          n.push(s)
        },
        o = {}
      return (
        Object.entries(t).forEach(([s, l]) => {
          l.icon &&
            (o[l.icon] = require(`lucide-vue-next/icons/${l.icon}.vue`).default)
        }),
        (s, l) => (
          Pe(),
          St("div", xa, [
            (Pe(!0),
            St(
              ge,
              null,
              ao(
                t,
                (i) => (
                  Pe(),
                  St("div", { key: i.id }, [
                    i.dropdown
                      ? (Pe(),
                        ft(
                          Te(ll),
                          { key: 0, class: "relative" },
                          {
                            default: gn(() => [
                              me(
                                Te(hc),
                                { as: "a", class: "cursor-pointer" },
                                {
                                  default: gn(({ open: u }) => [
                                    zs(zn(i.name) + " ", 1),
                                    i.icon
                                      ? (Pe(),
                                        ft(gi(o[i.icon]), {
                                          key: 0,
                                          class: "w-4 h-4",
                                        }))
                                      : Zi("", !0),
                                    u
                                      ? (Pe(),
                                        ft(Te(wa), {
                                          key: 2,
                                          class: "w-4 h-4",
                                        }))
                                      : (Pe(),
                                        ft(Te(_a), {
                                          key: 1,
                                          class: "w-4 h-4",
                                        })),
                                  ]),
                                  _: 2,
                                },
                                1024,
                              ),
                              me(
                                Te(pc),
                                {
                                  class:
                                    "absolute z-10 w-48 p-4 bg-white rounded-lg shadow-lg",
                                },
                                {
                                  default: gn(() => [
                                    (Pe(!0),
                                    St(
                                      ge,
                                      null,
                                      ao(
                                        i.items,
                                        (u, f) => (
                                          Pe(),
                                          St("div", { key: f }, [
                                            Kr(
                                              "a",
                                              { onClick: (c) => r(u.url) },
                                              zn(u.name),
                                              9,
                                              Pa,
                                            ),
                                          ])
                                        ),
                                      ),
                                      128,
                                    )),
                                  ]),
                                  _: 2,
                                },
                                1024,
                              ),
                            ]),
                            _: 2,
                          },
                          1024,
                        ))
                      : (Pe(),
                        St(
                          "a",
                          { key: 1, onClick: (u) => r(i.url) },
                          zn(i.name),
                          9,
                          Sa,
                        )),
                  ])
                ),
              ),
              128,
            )),
          ])
        )
      )
    },
  },
  Ca = {
    __name: "Main",
    props: { component: String },
    setup(e) {
      return (t, n) => (Pe(), ft(Ra))
    },
  },
  Yr = [{ path: "/", component: null, props: { component: "home" } }]
Yr.map((e) => e.path)
Yr.forEach((e) => {
  e.component = Ca
})
const Oa = ma({ history: Mc(), routes: Yr }),
  bl = Nu(Bu)
bl.use(Oa)
bl.mount("#app")
