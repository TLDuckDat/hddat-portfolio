(() => {
  'use strict';

  /* =========================================================
   *  THÔNG TIN CÁ NHÂN — sửa nội dung trang tại đây
   *  Chuỗi song ngữ viết dạng { vi: '...', en: '...' };
   *  chuỗi giống nhau ở cả hai ngôn ngữ thì viết thẳng '...'
   * ========================================================= */
  const START_WORK = new Date(2025, 5, 1); // bắt đầu đi làm: 06/2025

  const PROFILE = {
    name: 'Huỳnh Đức Đạt',
    brand: 'Huỳnh Đức Đạt',              // chữ hiện cạnh logo ở header & footer
    role: '.NET Developer',
    bio: {
      vi: 'Mình thích biến những ý tưởng trên giấy thành sản phẩm thực tế: chạy ổn định, dễ dùng và thật sự có ích. '
        + 'Từ tháng 6/2025, mình làm .NET Developer và đã hoàn thành hơn 5 dự án, song song với việc học năm 3 tại UTC2.',
      en: 'I love turning ideas into real products that are stable, easy to use and genuinely useful. '
        + 'I have been working as a .NET Developer since June 2025 and have completed 5+ projects, while studying as a third-year student at UTC2.'
    },
    tagline: {
      vi: 'Biến ý tưởng thành sản phẩm, từng dòng code một.',
      en: 'Turning ideas into products, one line of code at a time.'
    },
    contactNote: {
      vi: 'Bạn có dự án cần hợp tác, cơ hội việc làm hay chỉ muốn chào hỏi? Cứ nhắn cho mình qua các kênh dưới đây nhé.',
      en: 'Have a project in mind, a job opportunity, or just want to say hi? Feel free to reach me through any of the channels below.'
    },
    avatar: '',                           // đường dẫn ảnh, ví dụ 'avatar.jpg'; để trống sẽ hiện chữ cái đầu

    stats: [
      'experience',                       // tự tính từ START_WORK
      { value: '5+', label: { vi: 'Dự án hoàn thành', en: 'Projects completed' } },
      { value: { vi: 'Năm 3', en: '3rd year' }, label: { vi: 'Sinh viên UTC2', en: 'Student at UTC2' } },
      { value: '∞', label: { vi: 'Cốc cà phê', en: 'Cups of coffee' } }
    ],

    info: [
      { icon: 'calendar', label: { vi: 'Ngày sinh', en: 'Date of birth' }, value: { vi: '15/10/2006', en: 'October 15, 2006' } },
      { icon: 'pin', label: { vi: 'Nơi ở', en: 'Location' }, value: { vi: 'Thành phố Huế, Việt Nam', en: 'Hue City, Vietnam' } },
      { icon: 'email', label: 'Email', value: 'HDDat1510@gmail.com', href: 'mailto:HDDat1510@gmail.com' },
      { icon: 'phone', label: { vi: 'Điện thoại', en: 'Phone' }, value: '0352 830 976', href: 'tel:+84352830976' },
      { icon: 'globe', label: { vi: 'Ngôn ngữ', en: 'Languages' }, value: { vi: 'Tiếng Việt, Tiếng Anh', en: 'Vietnamese, English' } },
      { icon: 'briefcase', label: { vi: 'Trạng thái', en: 'Status' }, value: { vi: 'Sẵn sàng nhận dự án mới', en: 'Open to new projects' } }
    ],

    // Kỹ năng: chỉ liệt kê công nghệ mình đã dùng thật trong dự án (github.com/TLDuckDat)
    skills: [
      // nhãn tự giãn đều theo hàng (3 nhãn/hàng; hàng cuối thiếu thì giãn ra cho đầy)
      { icon: 'code', group: { vi: 'Ngôn ngữ hiện dùng', en: 'Current languages' },
        items: ['C#', 'TypeScript', 'Python'] },
      { icon: 'layers', group: { vi: 'Framework & thư viện', en: 'Frameworks & libraries' },
        items: ['ASP.NET Core', 'EF Core', 'SignalR', 'WPF', 'Angular'] },
      { icon: 'database', group: { vi: 'Dữ liệu & công cụ', en: 'Data & tools' },
        items: ['SQL', 'SQL Server', 'PostgreSQL', 'Redis', 'Git', 'Postman', 'Swagger', 'xUnit', 'Serilog'] },
      { icon: 'server', group: { vi: 'Hạ tầng', en: 'Infrastructure' },
        items: ['Docker', 'Docker Compose', 'Nginx', 'Cloudflare Tunnel'] }
    ],

    experience: [
      {
        time: { vi: '06/2025 — Nay', en: '06/2025 — Present' },
        title: '.NET Developer',
        place: 'Aureole Construction Software Development (ACSD)',
        desc: {
          vi: 'Phát triển và bảo trì các ứng dụng .NET cho phần mềm xây dựng (CAD/BIM) phục vụ khách hàng Nhật Bản, đồng thời xây dựng website và các công cụ nội bộ cho chính công ty. Tham gia nhiều dự án với quy mô khác nhau, từ những tính năng nhỏ đến các hệ thống lớn.',
          en: 'Develop and maintain .NET applications for construction software (CAD/BIM) serving Japanese clients, while also building websites and internal tools for the company itself. Involved in projects of every size, from small features to large-scale systems.'
        },
      }
    ],

    education: [
      {
        time: { vi: '2024 — 2028 (dự kiến)', en: '2024 — 2028 (expected)' },
        title: { vi: 'Ngành Công nghệ Thông tin', en: 'Information Technology' },
        place: {
          vi: 'Trường Đại học Giao thông Vận tải – Phân hiệu tại TP. Hồ Chí Minh (UTC2)',
          en: 'University of Transport and Communications – Campus in Ho Chi Minh City (UTC2)'
        },
        note: { vi: 'Sinh viên năm 3', en: 'Third-year student' }
      }
    ],

    // Dự án tiêu biểu lấy từ github.com/TLDuckDat
    projects: [
      {
        cover: 'thesis', title: { vi: 'Quản lý Đồ án tốt nghiệp', en: 'Thesis Management System' },
        desc: {
          vi: 'Quản lý quy trình đồ án tốt nghiệp cho UTC và UTC2.',
          en: 'Manages the graduation thesis workflow for UTC and UTC2.'
        },
        tags: ['ASP.NET Core', 'Angular', 'SQL Server'],
        link: 'https://github.com/TLDuckDat/UniProject', linkText: { vi: 'Xem mã nguồn', en: 'View source' }
      },
      {
        cover: 'parking', title: { vi: 'SmartPS – Bãi đỗ xe thông minh', en: 'SmartPS – Smart Parking' },
        desc: {
          vi: 'Phần mềm quản lý bãi xe, nhận diện biển số tự động.',
          en: 'Parking management app with automatic plate recognition.'
        },
        tags: ['WPF', 'MVVM', 'EF Core'],
        link: 'https://github.com/TLDuckDat/SmartPS', linkText: { vi: 'Xem mã nguồn', en: 'View source' }
      },
      {
        cover: 'review', title: 'Confession UTC2',
        desc: {
          vi: 'Nền tảng confession ẩn danh cho sinh viên UTC2, xây dựng phục vụ đề tài NCKH sinh viên.',
          en: 'Anonymous confession platform for UTC2 students, built for a student research project.'
        },
        tags: ['ASP.NET Core', 'Angular', 'PostgreSQL', 'Redis'],
        link: 'https://cfs.nlp-hate.io.vn/', linkText: { vi: 'Xem trang web', en: 'Visit site' }
      }
    ],

    // icon: 'email' | 'zalo' | 'github' | 'linkedin' | 'facebook' | 'phone'
    contacts: [
      { icon: 'email', label: 'Email', value: 'HDDat1510@gmail.com', href: 'mailto:HDDat1510@gmail.com', action: { vi: 'Gửi email', en: 'Send an email' } },
      { icon: 'zalo', label: 'Zalo', value: '0352 830 976', href: 'https://zalo.me/0352830976', action: { vi: 'Nhắn tin Zalo', en: 'Chat on Zalo' } },
      { icon: 'github', label: 'GitHub', value: 'github.com/TLDuckDat', href: 'https://github.com/TLDuckDat', action: { vi: 'Xem dự án', en: 'See my code' } },
      { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/hddat1510', href: 'https://www.linkedin.com/in/hddat1510/', action: { vi: 'Kết nối', en: 'Connect' } }
    ]
  };

  /* =========================================================
   *  Chữ giao diện (i18n) — khoá dùng trong data-i18n ở HTML
   * ========================================================= */
  const UI = {
    vi: {
      'nav.about': 'Giới thiệu', 'nav.info': 'Thông tin', 'nav.skills': 'Kỹ năng', 'nav.experience': 'Kinh nghiệm',
      'nav.education': 'Học vấn', 'nav.projects': 'Dự án', 'nav.contact': 'Liên hệ', 'nav.main': 'Điều hướng chính',
      'menu.open': 'Mở menu', 'menu.close': 'Đóng menu', 'toTop': 'Về đầu trang', 'lang.switch': 'Switch to English',
      'greet.morning': 'Chào buổi sáng, mình là', 'greet.afternoon': 'Chào buổi chiều, mình là', 'greet.evening': 'Chào buổi tối, mình là',
      'cta.contact': 'Liên hệ với mình', 'cta.experience': 'Xem kinh nghiệm',
      'sec.info': 'Thông tin cá nhân', 'sec.skills': 'Kỹ năng', 'sec.experience': 'Kinh nghiệm làm việc',
      'sec.education': 'Học vấn', 'sec.projects': 'Dự án nổi bật', 'sec.contact': 'Cùng trò chuyện nhé!', 'contact.cta': 'Gửi email cho mình', 'contact.status': 'Sẵn sàng nhận dự án mới',
      'stat.years': 'Năm kinh nghiệm', 'stat.months': 'Tháng kinh nghiệm', 'more': 'Xem thêm',
      'scene.label': 'Cảnh chú chó Shiba dạo chơi', 'scene.speed': 'Tốc độ',
      'footer.nav': 'Liên kết cuối trang', 'footer.scene': 'Dạo chơi cùng Shiba',
      'footer.made': 'Làm với ☕ và một chú Shiba.', 'footer.top': 'Lên đầu trang ↑'
    },
    en: {
      'nav.about': 'About', 'nav.info': 'Info', 'nav.skills': 'Skills', 'nav.experience': 'Experience',
      'nav.education': 'Education', 'nav.projects': 'Projects', 'nav.contact': 'Contact', 'nav.main': 'Main navigation',
      'menu.open': 'Open menu', 'menu.close': 'Close menu', 'toTop': 'Back to top', 'lang.switch': 'Chuyển sang tiếng Việt',
      'greet.morning': 'Good morning, I am', 'greet.afternoon': 'Good afternoon, I am', 'greet.evening': 'Good evening, I am',
      'cta.contact': 'Get in touch', 'cta.experience': 'See my experience',
      'sec.info': 'Personal info', 'sec.skills': 'Skills', 'sec.experience': 'Work experience',
      'sec.education': 'Education', 'sec.projects': 'Featured projects', 'sec.contact': "Let's talk!", 'contact.cta': 'Email me', 'contact.status': 'Open to new projects',
      'stat.years': 'Years of experience', 'stat.months': 'Months of experience', 'more': 'Learn more',
      'scene.label': 'A Shiba Inu out for a walk', 'scene.speed': 'Speed',
      'footer.nav': 'Footer links', 'footer.scene': 'Walk with the Shiba',
      'footer.made': 'Made with ☕ and a Shiba Inu.', 'footer.top': 'Back to top ↑'
    }
  };

  /* =========================================================
   *  Tiện ích
   * ========================================================= */
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const linkAttrs = href => /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '';
  const LANG_KEY = 'portfolio-lang';

  let lang = 'vi';
  try { if (localStorage.getItem(LANG_KEY) === 'en') lang = 'en'; } catch (_) {}

  // Lấy chuỗi đúng ngôn ngữ: chấp nhận cả chuỗi thường lẫn { vi, en }
  const L = v => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] ?? v.vi) : v;
  const T = key => UI[lang][key] ?? UI.vi[key] ?? key;
  const tx = v => esc(L(v));
  const tags = list => list.map(t => `<li>${tx(t)}</li>`).join('');

  /* =========================================================
   *  Logo mạng xã hội (SVG chuẩn, tự đổi màu theo chế độ sáng/tối)
   * ========================================================= */
  const ICONS = {
    github: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.128 2.062 2.062 0 0 1 0 4.128zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path fill="#fff" d="M15.6 15.47 16.13 12H12.8V9.75c0-.95.47-1.87 1.96-1.87h1.51V4.92s-1.37-.23-2.68-.23c-2.74 0-4.53 1.66-4.53 4.66V12H6.02v3.47h3.04V24a12.1 12.1 0 0 0 3.74 0v-8.53h2.8z"/></svg>',
    zalo: '<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#0068FF"/><text x="12" y="15.3" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="7.6" font-weight="700" fill="#fff">Zalo</text></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>',
    // Biểu tượng nét mảnh cho thông tin cá nhân & kỹ năng (cùng phong cách với email/phone)
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4m8-4v4"/><path d="M8 14h2m4 0h2m-8 3h2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5z"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M3 12.5h18"/><path d="M10.5 12.5v1.5h3v-1.5"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 7-5 5 5 5m8-10 5 5-5 5"/><path d="m13.5 4.5-3 15"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3.5 9 4.5-9 4.5-9-4.5z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16 9 4.5 9-4.5"/></svg>',
    server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4" width="17" height="7" rx="2"/><rect x="3.5" y="13" width="17" height="7" rx="2"/><path d="M7.5 7.5h.01M7.5 16.5h.01M11 7.5h5.5M11 16.5h5.5"/></svg>',
    database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="7.5" ry="2.8"/><path d="M4.5 6v12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6"/><path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/></svg>',
    // Hình minh hoạ trên thẻ dự án (nét trắng, cùng một phong cách)
    thesis: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 24 32 12l28 12-28 12z"/><path d="M16 29v13c0 4 7.2 8 16 8s16-4 16-8V29"/><path d="M60 24v14"/><circle cx="60" cy="41" r="2.2" fill="currentColor"/></svg>',
    parking: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="22" height="22" rx="5"/><path d="M14 22V12h5a4 4 0 0 1 0 8h-5"/><path d="M14 52V41l5-9h26l5 9v11"/><path d="M14 41h36"/><path d="M14 52h6m24 0h6"/><circle cx="21" cy="46" r="2" fill="currentColor"/><circle cx="43" cy="46" r="2" fill="currentColor"/><path d="M36 14h22m-22 8h14"/></svg>',
    review: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12h34a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5H24l-10 8v-8H8a5 5 0 0 1-5-5V17a5 5 0 0 1 5-5z"/><path d="M12 22h26m-26 8h16"/><path d="M48 34l12 5v8c0 7-5.4 11.6-12 13-6.6-1.4-12-6-12-13v-8z"/><path d="m43 47 4 4 7-8"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>'
  };
  const iconHtml = name => ICONS[name] || `<span>${name}</span>`;

  // Số năm / tháng kinh nghiệm tính tự động từ START_WORK
  function experienceStat() {
    const now = new Date();
    const months = Math.max(1, (now.getFullYear() - START_WORK.getFullYear()) * 12 + now.getMonth() - START_WORK.getMonth());
    return months >= 12
      ? { value: `${Math.floor(months / 12)}+`, label: T('stat.years') }
      : { value: String(months), label: T('stat.months') };
  }

  /* =========================================================
   *  Phần không đổi theo ngôn ngữ
   * ========================================================= */
  $('year').textContent = new Date().getFullYear();

  const words = PROFILE.name.trim().split(/\s+/);
  const initials = (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
  $('avatar').innerHTML = PROFILE.avatar
    ? `<img src="${esc(PROFILE.avatar)}" alt="">`
    : `<span>${esc(initials)}</span>`;
  ['logoMark', 'logoMarkFooter'].forEach(id => { const el = $(id); if (el) el.textContent = initials; });

  // Lời chào đổi theo chế độ ngày / hoàng hôn (nút ☀/🌙 do script.js điều khiển)
  // Lời chào theo giờ trên máy người xem: sáng (5–11h), chiều (11–18h), tối (18–5h)
  function setGreeting() {
    const h = new Date().getHours();
    $('greeting').textContent = T(h >= 5 && h < 11 ? 'greet.morning' : h >= 11 && h < 18 ? 'greet.afternoon' : 'greet.evening');
  }
  setInterval(setGreeting, 60 * 1000);

  /* =========================================================
   *  Menu trên điện thoại
   * ========================================================= */
  const nav = $('nav'), menuBtn = $('menuBtn');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', T(open ? 'menu.close' : 'menu.open'));
    menuBtn.textContent = open ? '✕' : '☰';
  };
  menuBtn.onclick = () => setMenu(!nav.classList.contains('open'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

  /* =========================================================
   *  Hiện dần nội dung khi cuộn tới
   * ========================================================= */
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); reveal.unobserve(en.target); }
    });
  }, { threshold: .15 });

  /* =========================================================
   *  Dựng nội dung (gọi lại mỗi khi đổi ngôn ngữ)
   * ========================================================= */
  let firstRender = true;

  function render() {
    const R = firstRender ? 'reveal' : 'reveal in'; // lần đầu có hiệu ứng hiện dần, sau đó hiện ngay

    document.documentElement.lang = lang;
    document.title = `${PROFILE.name} | ${PROFILE.role}`;

    // Chữ tĩnh trong HTML
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = T(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', T(el.dataset.i18nAria)));
    document.querySelectorAll('[data-field]').forEach(el => {
      const v = PROFILE[el.dataset.field];
      if (v != null) el.textContent = L(v);
    });

    const langBtn = $('langBtn');
    langBtn.textContent = lang === 'vi' ? 'EN' : 'VI';
    langBtn.setAttribute('aria-label', T('lang.switch'));
    langBtn.title = T('lang.switch');
    menuBtn.setAttribute('aria-label', T(nav.classList.contains('open') ? 'menu.close' : 'menu.open'));
    setGreeting();

    $('stats').innerHTML = PROFILE.stats.map(s => {
      const st = s === 'experience' ? experienceStat() : s;
      return `<li class="${R}"><strong>${tx(st.value)}</strong><span>${tx(st.label)}</span></li>`;
    }).join('');

    $('infoGrid').innerHTML = PROFILE.info.map(i => {
      const val = i.href ? `<a href="${esc(i.href)}">${tx(i.value)}</a>` : tx(i.value);
      return `<div class="card info-item ${R}"><span class="ico">${iconHtml(i.icon)}</span>
                <div><p class="label">${tx(i.label)}</p><p class="value">${val}</p></div></div>`;
    }).join('');

    $('skillGroups').innerHTML = PROFILE.skills.map(g => `
      <div class="card skill-card ${R}">
        <div class="skill-top"><span class="ico" aria-hidden="true">${iconHtml(g.icon)}</span><h3>${tx(g.group)}</h3></div>
        ${g.desc ? `<p class="muted skill-desc">${tx(g.desc)}</p>` : ''}
        <ul class="tags skill-tags">${tags(g.items)}</ul>
      </div>`).join('');

    $('timeline').innerHTML = PROFILE.experience.map(e => `
      <li class="${R}">
        <span class="dot" aria-hidden="true"></span>
        <div class="card">
          <p class="time">${tx(e.time)}</p>
          <h3>${tx(e.title)} <span class="at">@ ${tx(e.place)}</span></h3>
          <p>${tx(e.desc)}</p>
          ${e.tags && e.tags.length ? `<ul class="tags small">${tags(e.tags)}</ul>` : ''}
        </div>
      </li>`).join('');

    $('eduGrid').innerHTML = PROFILE.education.map(e => `
      <div class="card ${R}">
        <p class="time">${tx(e.time)}</p>
        <h3>${tx(e.title)}</h3>
        <p class="at">${tx(e.place)}</p>
        <p class="muted">${tx(e.note)}</p>
      </div>`).join('');

    $('projectGrid').innerHTML = PROFILE.projects.map(p => `
      <article class="card project ${R}">
        <div class="project-cover" aria-hidden="true"><span class="cover-badge">${ICONS[p.cover] || ''}</span></div>
        <h3>${tx(p.title)}</h3>
        <p>${tx(p.desc)}</p>
        <ul class="tags small">${tags(p.tags)}</ul>
        ${p.link ? `<a class="more" href="${esc(p.link)}"${linkAttrs(p.link)}>${esc(L(p.linkText) || T('more'))} →</a>` : ''}
      </article>`).join('');

    // Liên hệ: mỗi kênh là một ô gồm logo + tên kênh + việc sẽ làm khi bấm (soạn mail, mở Zalo, GitHub, LinkedIn)
    $('contactList').innerHTML = PROFILE.contacts.filter(c => c.href).map(c => `
      <a class="contact-tile" href="${esc(c.href)}"${linkAttrs(c.href)} aria-label="${tx(c.label)} – ${tx(c.action || c.label)}">
        <span class="tile-ico">${iconHtml(c.icon)}</span>
        <span class="tile-text"><strong>${tx(c.label)}</strong><small>${tx(c.action || '')}</small></span>
        <span class="tile-arrow" aria-hidden="true">↗</span>
      </a>`).join('');
    const mail = PROFILE.contacts.find(c => c.icon === 'email');
    if (mail) $('mailCta').href = mail.href;
    $('socials').innerHTML = PROFILE.contacts.filter(c => c.href).map(c =>
      `<a href="${esc(c.href)}"${linkAttrs(c.href)} aria-label="${tx(c.label)}" title="${tx(c.label)}">${iconHtml(c.icon)}</a>`).join('');

    if (firstRender) document.querySelectorAll('.reveal:not(.in)').forEach(el => reveal.observe(el));
    firstRender = false;
  }

  /* =========================================================
   *  Đổi ngôn ngữ VI / EN
   * ========================================================= */
  function setLang(next, init) {
    lang = next;
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
    render();
    // Báo cho cảnh (script.js) đổi chữ tiêu đề / nút theo ngôn ngữ mới
    dispatchEvent(new CustomEvent('langchange', { detail: { lang, init: !!init } }));
  }
  $('langBtn').onclick = () => setLang(lang === 'vi' ? 'en' : 'vi');
  setLang(lang, true);
  requestAnimationFrame(() => document.body.classList.add('ready')); // bật transition sau lần vẽ đầu

  /* =========================================================
   *  Header đổi nền khi cuộn + tô sáng mục đang xem
   * ========================================================= */
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 10);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const links = [...nav.querySelectorAll('a')];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

  /* =========================================================
   *  Bấm logo / "Lên đầu trang" → cuộn mượt về đầu trang
   *  (header là sticky nên link #top mặc định không cuộn được)
   * ========================================================= */
  document.querySelectorAll('a[href="#top"]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    setMenu(false);
    scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    history.replaceState(null, '', location.pathname + location.search);
  }));
})();
