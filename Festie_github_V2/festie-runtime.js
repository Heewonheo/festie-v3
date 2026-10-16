/* Festie prototype runtime: renders the {{hole}} / sc-for / sc-if template with the
   Component class and patches the page with morphdom so focus and scroll survive. */
(function () {
  window.DCLogic = class {
    constructor(props) { this.props = props || {}; this.state = {}; }
    setState(u) {
      var p = typeof u === 'function' ? u(this.state) : u;
      Object.assign(this.state, p);
      schedule();
    }
  };

  var tpl, inst, stage, queued = false;

  function evalExpr(expr, scope) {
    var keys = Object.keys(scope);
    try {
      return new Function(keys.join(','), 'return (' + expr + ');').apply(null, keys.map(function (k) { return scope[k]; }));
    } catch (e) { return ''; }
  }

  function render(node, scope) {
    Array.from(node.childNodes).forEach(function (ch) {
      if (ch.nodeType === 1) {
        var tag = ch.tagName.toLowerCase();
        if (tag === 'sc-for') {
          var m = ch.getAttribute('list').match(/\{\{(.*)\}\}/);
          var list = evalExpr(m[1], scope) || [];
          var as = ch.getAttribute('as');
          var frag = document.createDocumentFragment();
          list.forEach(function (item, idx) {
            var s = Object.assign({}, scope); s[as] = item; s.$index = idx;
            var c = ch.cloneNode(true);
            render(c, s);
            Array.from(c.childNodes).forEach(function (n) { frag.appendChild(n); });
          });
          ch.replaceWith(frag);
          return;
        }
        if (tag === 'sc-if') {
          var mv = ch.getAttribute('value').match(/\{\{(.*)\}\}/);
          if (evalExpr(mv[1], scope)) {
            render(ch, scope);
            var f2 = document.createDocumentFragment();
            Array.from(ch.childNodes).forEach(function (n) { f2.appendChild(n); });
            ch.replaceWith(f2);
          } else {
            ch.remove();
          }
          return;
        }
        Array.from(ch.attributes).forEach(function (a) {
          if (a.value.indexOf('{{') < 0) return;
          if (/^on/i.test(a.name)) {
            var mm = a.value.match(/^\{\{(.*)\}\}$/);
            ch.removeAttribute(a.name);
            if (mm) {
              var fn = evalExpr(mm[1], scope);
              var ev = a.name.slice(2).toLowerCase();
              if (ev === 'change') ev = 'input';
              if (typeof fn === 'function') { ch.__h = ch.__h || {}; ch.__h[ev] = fn; }
            }
            return;
          }
          ch.setAttribute(a.name, a.value.replace(/\{\{(.*?)\}\}/g, function (_, e) { var r = evalExpr(e, scope); return r == null ? '' : r; }));
        });
        if (tag === 'textarea' && ch.hasAttribute('value')) { ch.textContent = ch.getAttribute('value'); }
        render(ch, scope);
      } else if (ch.nodeType === 3 && ch.nodeValue.indexOf('{{') >= 0) {
        ch.nodeValue = ch.nodeValue.replace(/\{\{(.*?)\}\}/g, function (_, e) { var r = evalExpr(e, scope); return r == null ? '' : r; });
      }
    });
  }

  function paint() {
    queued = false;
    var vals = inst.renderVals ? inst.renderVals() : {};
    var next = document.createElement('div');
    next.innerHTML = tpl;
    render(next, vals);
    window.morphdom(stage, next, {
      childrenOnly: true,
      onBeforeElUpdated: function (fromEl, toEl) {
        fromEl.__h = toEl.__h;
        if (fromEl === document.activeElement && (fromEl.tagName === 'INPUT' || fromEl.tagName === 'TEXTAREA')) {
          toEl.value = fromEl.value;
        }
        return true;
      }
    });
    if (window.__festieFit) window.__festieFit();
  }

  function schedule() {
    if (queued) return;
    queued = true;
    (window.requestAnimationFrame || setTimeout)(paint);
  }

  function dispatch(type) {
    document.addEventListener(type, function (e) {
      var el = e.target;
      while (el && el !== document) {
        if (el.__h && el.__h[type]) { el.__h[type](e); return; }
        el = el.parentElement;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    tpl = document.getElementById('app-template').innerHTML;
    stage = document.getElementById('festie-stage');
    var Comp = new Function(document.getElementById('app-logic').textContent + '\nreturn Component;')();
    inst = new Comp({}); window.__festie = inst;
    ['click', 'input', 'keydown'].forEach(dispatch);
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute && e.target.getAttribute('role') === 'button' && e.target.tagName === 'A') {
        e.preventDefault(); e.target.click();
      }
    });
    paint();
    window.__ready = true;
  });
})();
