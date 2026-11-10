(() => {
  'use strict';

  /* =========================================================
   *  Tiện ích chung
   * ========================================================= */
  const W = 1600, H = 900, TAU = Math.PI * 2;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const $ = id => document.getElementById(id);
  const f = n => n.toFixed(1);
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // Random có seed để cảnh lần nào cũng giống nhau
  let seed = 1;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const R = (a, b) => a + rnd() * (b - a);
  const pick = arr => arr[Math.floor(rnd() * arr.length)];

  const ell = (cx, cy, rx, ry) =>
    `M${f(cx - rx)},${f(cy)} a${f(rx)},${f(ry)} 0 1,0 ${f(2 * rx)},0 a${f(rx)},${f(ry)} 0 1,0 ${f(-2 * rx)},0 `;

  // Mỗi lớp vẽ 1 "tile" rộng 1600, lặp 3 lần để cuộn liền mạch
  function mountLayer(id, tile) {
    $(id).innerHTML =
      `<svg width="3200" height="900" viewBox="0 0 3200 900">
        <g transform="translate(-1600,0)">${tile}</g><g>${tile}</g><g transform="translate(1600,0)">${tile}</g>
      </svg>`;
  }
  function ridge(fn, bottom = H) {
    let d = `M0,${bottom} `;
    for (let x = 0; x <= W; x += 5) d += `L${x},${f(fn(x))} `;
    return d + `L${W},${bottom} Z`;
  }
  function ridgeLine(fn) {
    let d = '';
    for (let x = 0; x <= W; x += 5) d += (x ? 'L' : 'M') + `${x},${f(fn(x))} `;
    return d;
  }
  // Đỉnh nhọn tuần hoàn (k nguyên => lặp khít trong 1 tile)
  const peak = (x, k, ph, p) => Math.pow(1 - Math.abs(Math.sin(Math.PI * k * x / W + ph)), p);

  /* =========================================================
   *  Bầu trời: sao + tia nắng
   * ========================================================= */
  function buildSky() {
    seed = 3;
    let st = '';
    for (let i = 0; i < 70; i++) {
      const y = Math.pow(rnd(), 1.6) * 300;
      st += `<circle class="star" cx="${f(R(0, W))}" cy="${f(y)}" r="${f(R(.5, 1.6))}" fill="#fff"
               style="animation-delay:${f(R(0, 3))}s;animation-duration:${f(R(2, 4.5))}s"/>`;
    }
    $('stars').innerHTML = st;

    let rays = '';
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * 360 + R(-6, 6), w = R(2, 5);
      rays += `<path d="M1050,430 L1950,${f(430 - w * 9)} L1950,${f(430 + w * 9)} Z" fill="url(#rayG)" transform="rotate(${f(a)} 1050 430)"/>`;
    }
    $('rays').innerHTML = rays;
  }

  /* =========================================================
   *  Mây, núi, đồi
   * ========================================================= */
  function buildClouds() {
    seed = 11;
    let cl = '';
    for (let i = 0; i < 16; i++) {
      const cx = R(0, W), cy = R(90, 400), rx = R(90, 240), ry = R(7, 15);
      let d = ell(cx, cy, rx, ry);
      const bumps = 2 + Math.floor(rnd() * 4);
      for (let b = 0; b < bumps; b++) d += ell(cx + R(-rx * .6, rx * .6), cy - R(2, ry), R(25, 70), R(ry * .8, ry * 1.6));
      cl += `<path d="${d}" fill="url(#${cy < 230 ? 'cloudHi' : 'cloudLo'})" opacity="${f(R(.6, .95))}" filter="url(#soft)"/>`;
    }
    mountLayer('L-clouds', cl);
  }

  function buildMountains() {
    const farFn = x => 610 - 150 * peak(x, 2, .6, 1.8) - 65 * peak(x, 5, 1.3, 2) - 10 * Math.sin(TAU * 11 * x / W);
    mountLayer('L-far',
      `<path d="${ridge(farFn)}" fill="url(#farG)"/>
       <path d="${ridgeLine(farFn)}" fill="none" stroke="#ffd6b8" stroke-width="2" opacity=".55"/>`);

    const midFn = x => 655 - 115 * peak(x, 3, 2.1, 1.6) - 42 * peak(x, 7, .4, 2) - 8 * Math.sin(TAU * 13 * x / W + 1);
    mountLayer('L-mid',
      `<path d="${ridge(midFn)}" fill="url(#midG)"/>
       <path d="${ridgeLine(midFn)}" fill="none" stroke="#ffb89a" stroke-width="1.6" opacity=".4"/>`);

    seed = 23;
    const nearFn = x => 668 - 30 * Math.sin(TAU * 2 * x / W + .5) - 18 * Math.sin(TAU * 5 * x / W + 1) - 7 * Math.sin(TAU * 9 * x / W);
    let nt = `<path d="${ridge(nearFn)}" fill="url(#nearG)"/>`;
    for (let x = 0; x < W; x += R(10, 34)) {
      const y = nearFn(x) + 5, h = R(16, 42);
      nt += rnd() < .55
        ? `<path d="M${f(x)},${f(y - h)} L${f(x + h * .32)},${f(y)} L${f(x - h * .32)},${f(y)} Z" fill="#4a3060"/>`
        : `<circle cx="${f(x)}" cy="${f(y - h * .45)}" r="${f(h * .45)}" fill="#4d3262"/>`;
    }
    nt += `<path d="${ridgeLine(nearFn)}" fill="none" stroke="#ff9f8a" stroke-width="1.2" opacity=".3"/>`;
    mountLayer('L-near', nt);
  }

  /* =========================================================
   *  Phố: cây anh đào, nhà sáng đèn, cột điện
   * ========================================================= */
  function tree(x, G, sakura, sc = 1) {
    const h = R(95, 150) * sc, cy = G - h, r = R(34, 50) * sc;
    const c = sakura
      ? { shade: '#a95684', base: '#e08aab', light: '#ffc6d6' }
      : { shade: '#2b2a42', base: '#423f58', light: '#8a6a6e' };
    let s = `<path d="M${f(x - 6)},${G} L${f(x - 3)},${f(cy + 18)} L${f(x + 3)},${f(cy + 18)} L${f(x + 6)},${G} Z" fill="#2a1b2e"/>`;
    s += `<path d="M${f(x)},${f(cy + 40)} L${f(x - r * .5)},${f(cy + 10)} M${f(x)},${f(cy + 34)} L${f(x + r * .5)},${f(cy + 6)}" stroke="#2a1b2e" stroke-width="3"/>`;
    const blobs = [];
    for (let i = 0; i < 8; i++) blobs.push([x + R(-r, r) * .85, cy + R(-r * .55, r * .45), R(.42, .7) * r]);
    blobs.forEach(([bx, by, br]) => s += `<circle cx="${f(bx - 3)}" cy="${f(by + 6)}" r="${f(br)}" fill="${c.shade}"/>`);
    blobs.forEach(([bx, by, br]) => s += `<circle cx="${f(bx)}" cy="${f(by)}" r="${f(br * .9)}" fill="${c.base}"/>`);
    blobs.forEach(([bx, by, br]) => {
      if (by < cy + 4) s += `<circle cx="${f(bx + br * .3)}" cy="${f(by - br * .3)}" r="${f(br * .42)}" fill="${c.light}" opacity=".75"/>`;
    });
    return s;
  }

  function house(x, w, G) {
    const h = R(72, 120), top = G - h, rh = R(26, 40), ov = 10;
    const wall = pick(['#6e4f6e', '#7b566c', '#5f4c70', '#83606f', '#6a5878']);
    const roof = pick(['#3a2843', '#43294a', '#2f2a48', '#4a2c3c']);
    let s = `<rect x="${f(x)}" y="${f(top)}" width="${f(w)}" height="${f(h)}" fill="${wall}"/>`;
    s += `<rect x="${f(x + w - 4)}" y="${f(top)}" width="4" height="${f(h)}" fill="#ffb48a" opacity=".28"/>`;
    s += `<rect x="${f(x)}" y="${f(top)}" width="${f(w)}" height="9" fill="#000" opacity=".2"/>`;
    s += `<path d="M${f(x - ov)},${f(top)} L${f(x + w + ov)},${f(top)} L${f(x + w - 18)},${f(top - rh)} L${f(x + 18)},${f(top - rh)} Z" fill="${roof}"/>`;
    for (let i = 1; i < 4; i++) {
      const t = i / 4, yy = top - rh * t;
      s += `<line x1="${f(x - ov + (28 - ov) * t)}" y1="${f(yy)}" x2="${f(x + w + ov - (28 - ov) * t)}" y2="${f(yy)}" stroke="#000" stroke-opacity=".18"/>`;
    }
    s += `<path d="M${f(x + 18)},${f(top - rh)} L${f(x + w - 18)},${f(top - rh)} L${f(x + w + ov)},${f(top)}" fill="none" stroke="#ffb88f" stroke-opacity=".6" stroke-width="2"/>`;

    const floors = h > 100 ? 2 : 1, fh = (h - 26) / floors;
    const n = Math.max(1, Math.floor((w - 20) / 42)), gap = w / n;
    for (let fl = 0; fl < floors; fl++) {
      for (let i = 0; i < n; i++) {
        const wx = x + gap * i + gap / 2 - 11, wy = top + 12 + fl * fh + (fh - 30) / 2;
        if (rnd() < .62) {
          s += `<rect x="${f(wx - 8)}" y="${f(wy - 8)}" width="38" height="34" fill="#ffb84d" opacity=".45" filter="url(#blur4)"/>`;
          s += `<rect x="${f(wx)}" y="${f(wy)}" width="22" height="18" fill="${pick(['#ffd27a', '#ffe3a0', '#ffc46a'])}"/>`;
        } else {
          s += `<rect x="${f(wx)}" y="${f(wy)}" width="22" height="18" fill="#2c2242"/>`;
        }
        s += `<path d="M${f(wx + 11)},${f(wy)} v18 M${f(wx)},${f(wy + 9)} h22" stroke="${wall}" stroke-width="1.6"/>`;
      }
    }
    // tường rào gạch
    s += `<rect x="${f(x - 14)}" y="${G - 26}" width="${f(w + 28)}" height="26" fill="#4b3a5b"/>`;
    s += `<rect x="${f(x - 14)}" y="${G - 26}" width="${f(w + 28)}" height="3" fill="#b08aa0" opacity=".55"/>`;
    for (let bx = x - 14 + 20; bx < x + w + 14; bx += 20) s += `<line x1="${f(bx)}" y1="${G - 23}" x2="${f(bx)}" y2="${G}" stroke="#3d2e4c"/>`;
    return s;
  }

  function buildTown() {
    seed = 101;
    const G = 700;
    let town = '';
    for (let x = 30; x < W; x += R(110, 200)) town += tree(x, G - 6, rnd() < .5, R(.9, 1.15));
    let x = 20;
    while (x < W - 50) {
      if (x < W - 200 && rnd() < .72) { const w = R(110, 170); town += house(x, w, G); x += w + R(30, 70); }
      else { town += tree(x + 30, G, rnd() < .5); x += R(80, 130); }
    }
    const poles = [-340, 60, 460, 860, 1260, 1660];
    for (let i = 0; i < poles.length - 1; i++) {
      const a = poles[i], b = poles[i + 1], m = (a + b) / 2;
      town += `<path d="M${a + 26},445 Q${m + 26},485 ${b + 26},445 M${a - 26},445 Q${m - 26},482 ${b - 26},445 M${a + 18},466 Q${m + 18},500 ${b + 18},466"
                 fill="none" stroke="#22172e" stroke-width="1.3"/>`;
    }
    poles.forEach(p => {
      town += `<rect x="${p - 3.5}" y="430" width="7" height="${G - 430}" fill="#2a1d36"/>
               <rect x="${p - 30}" y="442" width="60" height="5" fill="#2a1d36"/>
               <rect x="${p - 22}" y="463" width="44" height="4" fill="#2a1d36"/>
               <rect x="${p + 4}" y="500" width="14" height="22" rx="3" fill="#33253f"/>
               <rect x="${p + 3.5}" y="430" width="1.5" height="${G - 430}" fill="#ffb48a" opacity=".4"/>`;
    });
    mountLayer('L-town', town);
  }

  /* =========================================================
   *  Vỉa hè: đèn đường, bụi cây, máy bán nước
   * ========================================================= */
  function buildSidewalk() {
    seed = 202;
    let s = '';
    for (let x = 0; x < W; x += 48) s += `<line x1="${x}" y1="720" x2="${x - 10}" y2="744" stroke="#5a4262" stroke-width="1.4"/>`;
    for (let bx = 10; bx < W; bx += R(70, 150)) {
      for (let k = 0; k < 4; k++) s += `<circle cx="${f(bx + k * 9 + R(-3, 3))}" cy="${f(712 + R(-4, 3))}" r="${f(R(7, 12))}" fill="#2f2440"/>`;
      s += `<circle cx="${f(bx + 22)}" cy="704" r="4" fill="#7a5266" opacity=".7"/>`;
    }
    s += `<ellipse cx="1012" cy="700" rx="70" ry="60" fill="url(#vendGlow)"/>
          <rect x="992" y="652" width="40" height="72" rx="2" fill="#dfe8f2"/>
          <rect x="996" y="657" width="32" height="30" fill="#bcd6ef"/>
          <rect x="999" y="661" width="5" height="9" fill="#ff7a8a"/><rect x="1006" y="661" width="5" height="9" fill="#7ad0ff"/>
          <rect x="1013" y="661" width="5" height="9" fill="#ffd36a"/><rect x="1020" y="661" width="5" height="9" fill="#9be28a"/>
          <rect x="999" y="674" width="5" height="9" fill="#ff9a5a"/><rect x="1006" y="674" width="5" height="9" fill="#ffd36a"/>
          <rect x="1013" y="674" width="5" height="9" fill="#ff7a8a"/><rect x="1020" y="674" width="5" height="9" fill="#7ad0ff"/>
          <rect x="998" y="704" width="28" height="8" fill="#556070"/>`;
    for (let i = 0; i < 3; i++) {
      const lx = 180 + i * W / 3, base = 738, top = 468, hx = lx + 48, hy = top + 13;
      s += `<path d="M${lx + 38},${top + 12} L${lx + 58},${top + 12} L${lx + 170},862 L${lx - 70},862 Z" fill="url(#coneG)"/>
        <ellipse cx="${lx + 50}" cy="810" rx="160" ry="30" fill="url(#poolG)"/>
        <rect x="${lx - 9}" y="${base - 8}" width="18" height="10" rx="2" fill="#241a30"/>
        <path d="M${lx},${base} L${lx},${top + 40} Q${lx},${top} ${lx + 30},${top} L${lx + 46},${top + 3}" fill="none" stroke="#2b1f38" stroke-width="6" stroke-linecap="round"/>
        <path d="M${lx + 2},${base} L${lx + 2},${top + 40}" stroke="#ffb48a" stroke-width="1.4" opacity=".45"/>
        <path d="M${lx + 34},${top + 2} L${lx + 62},${top + 4} L${lx + 58},${top + 12} L${lx + 38},${top + 12} Z" fill="#3a2c48"/>
        <g class="lglow" style="animation-delay:${i * 1.3}s">
          <circle cx="${hx}" cy="${hy}" r="95" fill="url(#lampGlow)"/>
          <circle cx="${hx}" cy="${hy}" r="26" fill="url(#lampGlow)"/>
        </g>
        <ellipse cx="${hx}" cy="${hy}" rx="9" ry="3" fill="#fff6d8"/>`;
    }
    mountLayer('L-lamps', s);
  }

  /* =========================================================
   *  Mặt đường + cỏ tiền cảnh
   * ========================================================= */
  function buildRoad() {
    seed = 303;
    let road = '';
    for (let x = 0; x < W; x += 200) road += `<rect x="${x}" y="858" width="96" height="6" rx="2" fill="#f2dcc2" opacity=".55"/>`;
    for (let i = 0; i < 90; i++) road += `<circle cx="${f(R(0, W))}" cy="${f(R(758, 882))}" r="${f(R(.6, 1.8))}" fill="${rnd() < .5 ? '#6a5570' : '#241a30'}" opacity=".7"/>`;
    for (let i = 0; i < 5; i++) {
      const cx = R(0, W), cy = R(770, 850);
      road += `<path d="M${f(cx)},${f(cy)} l${f(R(10, 25))},${f(R(-3, 3))} l${f(R(8, 18))},${f(R(-3, 3))}" stroke="#2a1f36" stroke-width="1.2" fill="none"/>`;
    }
    road += `<ellipse cx="1240" cy="845" rx="28" ry="6" fill="#33283f" stroke="#5c4866" stroke-width="1.2"/>`;
    mountLayer('L-road', road);

    seed = 404;
    let fg = '';
    for (let gx = 0; gx < W; gx += R(60, 180)) {
      let d = '';
      for (let k = 0; k < 9; k++) {
        const bx = gx + k * 3 + R(-2, 2), hh = R(14, 42), lean = R(-10, 6);
        d += `M${f(bx - 2)},900 Q${f(bx + lean * .4)},${f(900 - hh * .6)} ${f(bx + lean)},${f(900 - hh)} Q${f(bx + 1)},${f(900 - hh * .5)} ${f(bx + 3)},900 Z `;
      }
      fg += `<path d="${d}" fill="#170f22"/>`;
      if (rnd() < .5) fg += `<circle cx="${f(gx + 14)}" cy="${f(R(866, 878))}" r="3.2" fill="#f4e8f0"/><circle cx="${f(gx + 14)}" cy="${f(R(866, 878))}" r="1.2" fill="#ffd36a"/>`;
    }
    mountLayer('L-fg', fg);
  }

  /* =========================================================
   *  Chim bay
   * ========================================================= */
  function buildBirds() {
    seed = 505;
    let bh = '';
    [[0, 0], [22, 10], [-18, 12], [40, 22], [-34, 26]].forEach(([bx, by]) => {
      bh += `<path fill="none" stroke="#2a1838" stroke-width="2" stroke-linecap="round" transform="translate(${bx},${by})">
        <animate attributeName="d" dur="${f(R(.45, .7))}s" begin="-${f(R(0, 1))}s" repeatCount="indefinite"
          values="M-9,0 Q-4,-6 0,0 Q4,-6 9,0;M-9,2 Q-4,5 0,0 Q4,5 9,2;M-9,0 Q-4,-6 0,0 Q4,-6 9,0"/></path>`;
    });
    $('birds').innerHTML = bh;
  }

  /* =========================================================
   *  Khăn quàng cổ của Shiba bay trong gió
   * ========================================================= */
  const strands = [];

  function addStrand(group, o) {
    const el = document.createElementNS(SVG_NS, 'path');
    el.setAttribute('fill', o.fill);
    if (o.opacity) el.setAttribute('opacity', o.opacity);
    group.appendChild(el);
    strands.push({ el, N: 12, tp: .45, minW: 3, droopK: .12, ...o });
  }

  function buildScarf() {
    const cloth = $('clothBack');
    const D = Math.PI / 180;
    // Hai tà khăn quàng đỏ bay phấp phới ra sau từ nút thắt sau gáy,
    // hướng ngược chiều đi (gió thổi ra sau), lượn phía trên lưng chú chó
    addStrand(cloth, {
      x: 121, y: 72, ang: 194 * D, rest: 135 * D,
      len: 56, w0: 9, minW: 4, lam: 30, amp: 7.5, ph: 0, om: 1.3,
      droopK: .2, fill: '#c93b4b'
    });
    addStrand(cloth, {
      x: 120, y: 75, ang: 182 * D, rest: 125 * D,
      len: 44, w0: 7.5, minW: 3.5, lam: 26, amp: 6, ph: 1.6, om: 1.5,
      droopK: .2, fill: '#9e2836'
    });
  }

  function smooth(pts, close) {
    let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [x, y] = pts[i], [nx, ny] = pts[i + 1];
      d += `Q${f(x)},${f(y)} ${f((x + nx) / 2)},${f((y + ny) / 2)}`;
    }
    const l = pts[pts.length - 1];
    return d + `L${f(l[0])},${f(l[1])}` + (close ? 'Z' : '');
  }

  function updateStrands(t, wind) {
    const w = clamp(wind, 0, 1);
    for (const s of strands) {
      const ang = lerp(s.rest, s.ang, w);
      const dx = Math.cos(ang), dy = Math.sin(ang), nx = -dy, ny = dx;
      const amp = s.amp * (.2 + w * .9), phase = t * s.om * (2 + 6 * w);
      const pts = [];
      for (let i = 0; i <= s.N; i++) {
        const u = i / s.N, d = u * s.len;
        const wave = amp * Math.pow(u, 1.2) * Math.sin(TAU * d / s.lam - phase + s.ph);
        const droop = u * u * s.len * s.droopK * (1.1 - w);
        pts.push([s.x + dx * d + nx * wave, s.y + dy * d + ny * wave + droop]);
      }
      const L = [], Rr = [];
      for (let i = 0; i <= s.N; i++) {
        const a = pts[Math.max(0, i - 1)], b = pts[Math.min(s.N, i + 1)];
        let tx = b[0] - a[0], ty = b[1] - a[1];
        const len = Math.hypot(tx, ty) || 1; tx /= len; ty /= len;
        const u = i / s.N, hw = (s.minW + (s.w0 - s.minW) * Math.pow(1 - u, s.tp)) / 2;
        L.push([pts[i][0] - ty * hw, pts[i][1] + tx * hw]);
        Rr.push([pts[i][0] + ty * hw, pts[i][1] - tx * hw]);
      }
      s.el.setAttribute('d', smooth(L.concat(Rr.reverse()), true));
    }
  }

  /* =========================================================
   *  Bướm phát sáng
   * ========================================================= */
  const RIDER = { x: 555, y: 494, s: 1.4, vx: -50, vy: -40 }; // khớp với CSS #rider
  const toStage = (x, y) => [RIDER.x + (x - RIDER.vx) * RIDER.s, RIDER.y + (y - RIDER.vy) * RIDER.s];

  const FORE = 'M0,-2 C5,-15 20,-21 23,-12 C25,-4 14,1 0,1 Z';
  const HIND = 'M0,1 C10,1 19,7 15,15 C11,21 3,13 0,4 Z';

  function makeButterfly(kind, scale) {
    const g = document.createElementNS(SVG_NS, 'g');
    const wing = `<path d="${FORE}" fill="url(#bfWing${kind})" opacity=".92"/>
                  <path d="${HIND}" fill="url(#bfWing${kind})" opacity=".85"/>
                  <path d="M2,-3 C8,-13 18,-16 20,-11" fill="none" stroke="#fff" stroke-width=".6" opacity=".7"/>`;
    g.innerHTML = `
      <circle r="44" fill="url(#bfGlow${kind})"/>
      <g transform="scale(${scale})">
        <g class="wr">${wing}</g>
        <g class="wl">${wing}</g>
        <ellipse rx="1.3" ry="7" cy="1" fill="#fffbe8"/>
        <path d="M0,-6 Q-3,-12 -6,-14 M0,-6 Q3,-12 6,-14" fill="none" stroke="#fffbe8" stroke-width=".6"/>
      </g>`;
    $('butterflies').appendChild(g);
    return { g, wr: g.querySelector('.wr'), wl: g.querySelector('.wl'), x: 0, y: 0 };
  }

  function setButterfly(b, x, y, rot, open) {
    b.x = x; b.y = y;
    b.g.setAttribute('transform', `translate(${f(x)},${f(y)}) rotate(${f(rot)})`);
    b.wr.setAttribute('transform', `scale(${open.toFixed(3)},1)`);
    b.wl.setAttribute('transform', `scale(${(-open).toFixed(3)},1)`);
  }

  /* =========================================================
   *  Hạt: cánh hoa, đốm sáng, bụi lấp lánh từ bướm
   * ========================================================= */
  function makeSprite(c0, c1, c2) {
    const c = document.createElement('canvas'); c.width = c.height = 32;
    const g = c.getContext('2d'), rg = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    rg.addColorStop(0, c0); rg.addColorStop(.3, c1); rg.addColorStop(1, c2);
    g.fillStyle = rg; g.fillRect(0, 0, 32, 32);
    return c;
  }

  /* =========================================================
   *  Khởi tạo
   * ========================================================= */
  buildSky();
  buildClouds();
  buildMountains();
  buildTown();
  buildSidewalk();
  buildRoad();
  buildBirds();
  buildScarf();

  const bfGreen = makeButterfly('G', 1.05);
  const bfYellow = makeButterfly('Y', .78);
  // Thêm vài chú bướm tự do bay lượn khắp cảnh, mỗi con một quỹ đạo riêng
  const wanderers = [
    { kind: 'P', scale: .7,  cx: 380,  cy: 560, ax: 150, ay: 70, w1: .23, w2: .41, ph: 0,   flap: 11 },
    { kind: 'B', scale: .62, cx: 1230, cy: 470, ax: 170, ay: 85, w1: .19, w2: .37, ph: 2.1, flap: 12.5 },
    { kind: 'O', scale: .55, cx: 980,  cy: 640, ax: 120, ay: 55, w1: .29, w2: .47, ph: 4.2, flap: 14 },
    { kind: 'P', scale: .5,  cx: 640,  cy: 380, ax: 190, ay: 60, w1: .17, w2: .33, ph: 1.3, flap: 13 }
  ].map(o => ({ ...o, bf: makeButterfly(o.kind, o.scale) }));

  const cv = $('particles'), ctx = cv.getContext('2d');
  seed = 606;
  const petals = Array.from({ length: 30 }, () => ({ x: R(0, W), y: R(0, H), vx: R(-170, -70), vy: R(10, 45), r: R(3.5, 6.5), a: R(0, TAU), va: R(-3, 3), ph: R(0, TAU) }));
  const motes = Array.from({ length: 34 }, () => ({ x: R(0, W), y: R(380, 880), vx: R(-40, -8), vy: R(-8, 6), r: R(1.5, 4), ph: R(0, TAU) }));
  const sparks = [];
  const spriteGold = makeSprite('rgba(255,240,190,1)', 'rgba(255,200,120,.55)', 'rgba(255,170,90,0)');
  const spriteGreen = makeSprite('rgba(220,255,240,1)', 'rgba(80,255,180,.6)', 'rgba(30,220,140,0)');
  const spriteYellow = makeSprite('rgba(255,255,220,1)', 'rgba(255,220,80,.6)', 'rgba(255,170,30,0)');
  const spriteOf = {
    P: makeSprite('rgba(255,235,248,1)', 'rgba(255,120,200,.6)', 'rgba(255,80,170,0)'),
    B: makeSprite('rgba(230,245,255,1)', 'rgba(110,190,255,.6)', 'rgba(60,150,255,0)'),
    O: makeSprite('rgba(255,245,230,1)', 'rgba(255,160,90,.6)', 'rgba(255,120,50,0)')
  };

  const layers = [
    ['L-clouds', .02], ['L-far', .035], ['L-mid', .07], ['L-near', .14],
    ['L-town', .285], ['L-lamps', .8], ['L-road', 1], ['L-fg', 1.35]
  ].map(([id, k]) => [$(id), k]);

  const dogParts = ['legFR', 'legFL', 'legBR', 'legBL', 'dogBody', 'dogHead', 'dogTail', 'clothBack']
    .reduce((o, id) => (o[id] = $(id), o), {});

  /* =========================================================
   *  Chế độ sáng (ban ngày) / tối (hoàng hôn)
   *  - Màu hoàng hôn đọc thẳng từ các gradient trong HTML
   *  - Ban ngày giữ tông ấm (hồng đào, kem) để núi không bị xanh lạnh
   * ========================================================= */
  // Màu ban ngày cho từng stop: '#hex' (giữ độ mờ gốc) hoặc ['#hex', độ mờ]
  const DAY = {
    skyG:     ['#7fb3e0', '#9fc6e8', '#c3dbee', '#e4ecef', '#f8eedf', '#ffe9cc', '#fff3dc'],
    sunGlow:  [['#fffcef', .9], ['#fff3c8', .4], ['#ffe6b0', 0]],
    sunDisc:  ['#ffffff', '#fffbe8', '#fff0c0'],
    rayG:     [['#fffbea', .12], ['#fffbea', 0]],
    cloudHi:  [['#ffffff', .85], '#f7f2f4', '#fff0e4'],
    cloudLo:  [['#ffffff', .8], '#fff4ec', '#fff8ea'],
    farG:     ['#efd3cf', '#dcb9bc'],
    midG:     ['#c9a0a3', '#a8808c'],
    coneG:    [['#ffe9b0', 0], ['#ffd38a', 0]],
    poolG:    [['#ffd890', 0], ['#ffc070', 0]],
    lampGlow: [['#fff6d0', .3], ['#ffd98a', .08], ['#ffaa60', 0]],
    vendGlow: [['#e8f4ff', .12], ['#bcd8ff', 0]]
  };
  const hex2rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const themeStops = [];
  for (const [id, list] of Object.entries(DAY)) {
    const stops = $(id).querySelectorAll('stop');
    list.forEach((v, i) => {
      const el = stops[i];
      if (!el) return;
      const [dc, dop] = Array.isArray(v) ? v : [v, null];
      const op = el.hasAttribute('stop-opacity') ? +el.getAttribute('stop-opacity') : 1;
      themeStops.push({ el, a: hex2rgb(el.getAttribute('stop-color')), b: hex2rgb(dc), oa: op, ob: dop == null ? op : dop });
    });
  }
  // Các lớp vẽ bằng màu cố định: làm sáng & ấm lên bằng filter thay vì đổi từng màu
  const litLayers = ['L-near', 'L-town', 'L-lamps', 'L-road', 'L-fg', 'ground'].map($);
  const fogs = document.querySelectorAll('.fog');

  function applyTheme(t) {
    const e = t * t * (3 - 2 * t);
    for (const s of themeStops) {
      s.el.setAttribute('stop-color', `rgb(${s.a.map((v, i) => Math.round(lerp(v, s.b[i], e)))})`);
      s.el.setAttribute('stop-opacity', lerp(s.oa, s.ob, e).toFixed(3));
    }
    const filt = e < .001 ? 'none'
      : `brightness(${(1 + .75 * e).toFixed(3)}) sepia(${(.22 * e).toFixed(3)}) saturate(${(1 - .1 * e).toFixed(3)})`;
    litLayers.forEach(el => el.style.filter = filt);
    $('stars').style.opacity = (1 - e).toFixed(3);
    $('sunGroup').setAttribute('transform', `translate(0,${f(-240 * e)})`);
    fogs.forEach(el => el.style.opacity = (1 - .55 * e).toFixed(3));
    $('grade').style.opacity = (1 - .7 * e).toFixed(3);
  }

  // Chế độ theo giờ trên máy người xem: 6:00 – 16:59 là ban ngày, còn lại là hoàng hôn / tối
  const DAY_START = 6, DAY_END = 17;
  const timeTarget = () => { const h = new Date().getHours(); return h >= DAY_START && h < DAY_END ? 1 : 0; };
  let dayT = 0, dayTarget = timeTarget();
  let autoTarget = dayTarget;   // giá trị theo giờ lần kiểm tra gần nhất
  dayT = dayTarget;
  applyTheme(dayT);

  const themeBtn = $('themeBtn');
  const titleEl = document.querySelector('#title h2');
  // Chữ của cảnh theo ngôn ngữ (ngôn ngữ do about.js đặt vào <html lang>)
  const SCENE_TEXT = {
    vi: { day: 'Ngày nắng ấm', sunset: 'Chiều hoàng hôn', toDay: 'Chuyển sang ban ngày', toSunset: 'Chuyển sang hoàng hôn', pause: 'Tạm dừng', play: 'Tiếp tục' },
    en: { day: 'Sunny day', sunset: 'Golden sunset', toDay: 'Switch to daytime', toSunset: 'Switch to sunset', pause: 'Pause', play: 'Play' }
  };
  const ST = () => SCENE_TEXT[document.documentElement.lang === 'en' ? 'en' : 'vi'];
  let titleTimer = 0;

  function syncThemeBtn() {
    const day = dayTarget === 1;
    themeBtn.textContent = day ? '🌙' : '☀';
    themeBtn.setAttribute('aria-label', day ? ST().toSunset : ST().toDay);
    themeBtn.title = themeBtn.getAttribute('aria-label');
  }
  // Tiêu đề đổi theo thời điểm trong ngày: mờ đi → đổi chữ → hiện lại
  function syncTitle(animate) {
    const day = dayTarget === 1, text = day ? ST().day : ST().sunset;
    document.body.classList.toggle('is-day', day);
    clearTimeout(titleTimer);
    if (!animate) { titleEl.textContent = text; return; }
    titleEl.classList.add('swap');
    titleTimer = setTimeout(() => { titleEl.textContent = text; titleEl.classList.remove('swap'); }, 450);
  }
  function setDay(target) {
    if (target === dayTarget) return;
    dayTarget = target;
    syncThemeBtn();
    syncTitle(true);
    // Báo cho phần giới thiệu (about.js)
    dispatchEvent(new CustomEvent('themechange', { detail: { day: dayTarget === 1 } }));
  }
  // Nút ☀/🌙 vẫn cho đổi tay trong lượt xem này (không lưu lại)
  themeBtn.onclick = () => setDay(1 - dayTarget);
  // Mỗi phút kiểm tra giờ: khi vừa qua mốc 6:00 hoặc 17:00 thì tự chuyển cảnh
  setInterval(() => {
    const auto = timeTarget();
    if (auto !== autoTarget) { autoTarget = auto; setDay(auto); }
  }, 60 * 1000);
  syncThemeBtn();
  syncTitle(false);
  // Đổi ngôn ngữ: cập nhật tiêu đề cảnh và nhãn các nút
  addEventListener('langchange', e => {
    syncThemeBtn();
    syncTitle(!e.detail.init);
    $('playBtn').setAttribute('aria-label', paused ? ST().play : ST().pause);
  });

  /* =========================================================
   *  Hoạt ảnh chú chó Shiba đi bộ 4 chân
   * ========================================================= */
  const BASE_SPEED = 240; // Tốc độ dạo bước vừa phải, thư thái

  function swingLeg(el, px, py, phase, ampDeg, liftPx) {
    const s = Math.sin(phase);
    const lift = Math.max(0, -Math.cos(phase)) * liftPx;
    const ang = s * ampDeg;
    el.setAttribute('transform', `translate(0,${f(-lift)}) rotate(${f(ang)} ${px} ${py})`);
  }

  /* =========================================================
   *  Vòng lặp animation
   * ========================================================= */
  let dist = 0, walkPhase = 0, speed = 0, target = 1, paused = false, birdX = 300, last = 0;

  // Chỉ chạy hoạt ảnh khi cảnh đang hiện trên màn hình (tiết kiệm CPU khi đọc phần giới thiệu)
  let sceneVisible = true;
  new IntersectionObserver(([en]) => { sceneVisible = en.isIntersecting; }).observe($('viewport'));

  function frame(now) {
    if (!sceneVisible) { last = now; requestAnimationFrame(frame); return; }
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const t = now / 1000;
    speed += (target - speed) * Math.min(1, dt * 2.2);
    const v = BASE_SPEED * speed;
    dist += v * dt;
    walkPhase += dt * speed * TAU * 1.65;

    // Chuyển cảnh mượt giữa hoàng hôn và ban ngày (~1.6 giây)
    if (dayT !== dayTarget) {
      dayT = dayTarget > dayT ? Math.min(dayTarget, dayT + dt / 1.6) : Math.max(dayTarget, dayT - dt / 1.6);
      applyTheme(dayT);
    }

    // Parallax
    for (const [el, k] of layers) el.style.transform = `translate3d(${-((dist * k) % W)}px,0,0)`;

    // Chuyển động 4 chân của Shiba Inu (nhịp bước chéo tự nhiên)
    const moveAmt = Math.min(1, speed);
    const amp = 20 * moveAmt, lift = 5.5 * moveAmt;
    swingLeg(dogParts.legFR, 132, 110, walkPhase, amp, lift);
    swingLeg(dogParts.legBL, 55, 108, walkPhase + 0.4, amp * 0.9, lift);
    swingLeg(dogParts.legFL, 126, 110, walkPhase + Math.PI, amp, lift);
    swingLeg(dogParts.legBR, 60, 106, walkPhase + Math.PI + 0.4, amp * 0.9, lift);

    // Thân nhấp nhô, đầu gật nhẹ và đuôi vẫy vui vẻ
    const bob = Math.sin(walkPhase * 2) * 2.2 * moveAmt;
    const pitch = Math.cos(walkPhase * 2) * 1.2 * moveAmt;
    dogParts.dogBody.setAttribute('transform', `translate(0,${f(bob)}) rotate(${f(pitch)} 98 98)`);

    const headNod = Math.sin(walkPhase * 2 - 0.6) * 2.5 * moveAmt + Math.sin(t * 2) * 1.2;
    dogParts.dogHead.setAttribute('transform', `rotate(${f(headNod)} 138 72)`);

    const tailWag = Math.sin(t * 7 + walkPhase) * (6 + 5 * moveAmt);
    dogParts.dogTail.setAttribute('transform', `rotate(${f(tailWag)} 50 92)`);

    // Gió mạnh dần theo tốc độ, kèm những cơn gió giật nhẹ cho tà khăn sống động
    const gust = .08 * Math.sin(t * .9) + .05 * Math.sin(t * 2.3 + 1);
    updateStrands(t, .3 + speed * .6 + gust);

    // Bướm xanh lượn quanh phía trước, bướm vàng đậu trên lưng/đầu chú chó
    const [hx, hy] = toStage(185, 50);
    const gx = hx + 65 * Math.sin(t * .65) + 20 * Math.sin(t * 1.7);
    const gy = hy - 25 + 32 * Math.sin(t * .9 + 1) + 10 * Math.sin(t * 2.3);
    const tilt = clamp((gx - bfGreen.x) * 4, -30, 30);
    setButterfly(bfGreen, gx, gy, tilt, .18 + .82 * Math.abs(Math.sin(t * 13)));

    const [sx, sy] = toStage(158, 35 + bob);
    setButterfly(bfYellow, sx, sy, -15, .35 + .65 * Math.pow(Math.abs(Math.sin(t * 1.6)), 3));

    // Bướm tự do: bay theo đường cong mềm, nghiêng theo hướng bay
    for (const w of wanderers) {
      const x = w.cx + w.ax * Math.sin(t * w.w1 + w.ph) + 18 * Math.sin(t * 1.3 + w.ph * 2);
      const y = w.cy + w.ay * Math.sin(t * w.w2 + w.ph * 1.7) + 12 * Math.sin(t * 2.1 + w.ph);
      const tl = clamp((x - w.bf.x) * 5, -30, 30);
      setButterfly(w.bf, x, y, tl, .2 + .8 * Math.abs(Math.sin(t * w.flap + w.ph)));
    }

    // Chim
    birdX += dt * (28 - 6 * speed);
    if (birdX > W + 120) birdX = -120;
    $('birds').setAttribute('transform', `translate(${f(birdX)},${f(250 + Math.sin(now / 1800) * 14)})`);

    // Hạt
    ctx.clearRect(0, 0, W, H);
    for (const m of motes) {
      m.x += (m.vx - 30 * speed) * dt; m.y += (m.vy + Math.sin(t + m.ph) * 6) * dt;
      if (m.x < -20) { m.x = W + 20; m.y = R(380, 880); }
      ctx.globalAlpha = .35 + .35 * Math.sin(t * 1.7 + m.ph);
      const s = m.r * 6; ctx.drawImage(spriteGold, m.x - s / 2, m.y - s / 2, s, s);
    }
    if (Math.random() < dt * 40) sparks.push({ x: bfGreen.x, y: bfGreen.y, vx: -40 - 90 * speed, vy: R(-15, 25), life: 1, img: spriteGreen });
    if (Math.random() < dt * 12) sparks.push({ x: bfYellow.x, y: bfYellow.y, vx: -30 - 90 * speed, vy: R(-10, 20), life: 1, img: spriteYellow });
    for (const w of wanderers) {
      if (Math.random() < dt * 9) sparks.push({ x: w.bf.x, y: w.bf.y, vx: -25 - 70 * speed, vy: R(-10, 20), life: .8, img: spriteOf[w.kind] });
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const p = sparks[i];
      p.life -= dt * .8; p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = p.life;
      const s = 6 + 10 * p.life; ctx.drawImage(p.img, p.x - s / 2, p.y - s / 2, s, s);
    }
    ctx.globalAlpha = 1;
    for (const p of petals) {
      p.x += p.vx * (.4 + speed * .6) * dt; p.y += (p.vy + Math.sin(t * 2 + p.ph) * 22) * dt; p.a += p.va * dt;
      if (p.x < -20 || p.y > H + 20) { p.x = W + R(10, 200); p.y = R(-40, H * .7); }
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.scale(1, .55 + .45 * Math.sin(t * 3 + p.ph));
      ctx.fillStyle = '#ffc4d4'; ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * .62, 0, 0, TAU); ctx.fill();
      ctx.fillStyle = '#f08aaa'; ctx.beginPath(); ctx.ellipse(p.r * .3, 0, p.r * .45, p.r * .3, 0, 0, TAU); ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(frame);
  }

  /* =========================================================
   *  Co giãn theo màn hình + điều khiển
   * ========================================================= */
  // Scale "cover" theo kích thước khung cảnh (không còn là toàn màn hình)
  const viewportEl = $('viewport');
  function fit() {
    viewportEl.style.setProperty('--s', Math.max(viewportEl.clientWidth / W, viewportEl.clientHeight / H));
  }
  new ResizeObserver(fit).observe(viewportEl);
  fit();

  const btn = $('playBtn'), slider = $('speed');
  btn.onclick = () => {
    paused = !paused;
    target = paused ? 0 : +slider.value;
    btn.textContent = paused ? '▶' : '❚❚';
    btn.setAttribute('aria-label', paused ? ST().play : ST().pause);
  };
  slider.oninput = () => { if (!paused) target = +slider.value; };
  addEventListener('keydown', e => {
    // Phím Space để cuộn trang như bình thường; D để đổi ngày / hoàng hôn
    if (e.code === 'KeyD' && !e.target.closest('input, textarea, [contenteditable]')) themeBtn.click();
  });

  requestAnimationFrame(t => { last = t; requestAnimationFrame(frame); });
})();