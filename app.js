// Supabase: publishable key is safe to expose — RLS allows INSERT only, plus an aggregate-stats RPC.
const SUPABASE_URL = 'https://nrlrpanqzbdcbgjyqjua.supabase.co';
const SUPABASE_KEY = 'sb_publishable_A7D7rGPcA6UzUEhCgaXaQA_jQ_BneG_';

const DOMAINS = {
  self: { name: '자기조절능력', color: 'var(--c1)', max: 35, min: 7,
    desc: '스트레스 속에서도 감정과 충동을 다스리고, 문제의 원인을 정확히 파악하는 힘' },
  social: { name: '대인관계능력', color: 'var(--c2)', max: 35, min: 7,
    desc: '타인과 마음을 주고받으며, 어려울 때 기댈 수 있는 관계를 만드는 힘' },
  positive: { name: '긍정성', color: 'var(--c3)', max: 30, min: 6,
    desc: '자신과 미래를 낙관하고, 삶에 만족하며 감사할 줄 아는 힘' },
};

// r: reverse-scored item
const ITEMS = [
  { d: 'self', s: '감정조절력', q: '스트레스를 받는 상황에서도 마음을 가라앉히고 차분해질 수 있다.' },
  { d: 'self', s: '감정조절력', q: '기분 나쁜 일이 생기면 그 감정에 하루 종일 휘둘린다.', r: true },
  { d: 'self', s: '감정조절력', q: '힘든 일을 겪은 뒤에도 비교적 빨리 평소의 컨디션을 되찾는다.' },
  { d: 'self', s: '충동통제력', q: '당장 하고 싶은 일이 있어도 해야 할 일을 먼저 마무리한다.' },
  { d: 'self', s: '충동통제력', q: '화가 나면 생각보다 말이나 행동이 먼저 튀어나온다.', r: true },
  { d: 'self', s: '원인분석력', q: '문제가 생기면 감정적으로 반응하기보다 원인을 차근차근 따져 본다.' },
  { d: 'self', s: '원인분석력', q: '일이 잘못되면 상황을 살피기보다 ‘나는 원래 안 돼’라고 단정 짓는다.', r: true },

  { d: 'social', s: '소통능력', q: '내 생각과 감정을 상대가 오해하지 않도록 분명하게 전달할 수 있다.' },
  { d: 'social', s: '소통능력', q: '대화할 때 상대방의 말을 끝까지 집중해서 듣는다.' },
  { d: 'social', s: '소통능력', q: '의견이 다른 사람과도 감정 상하지 않게 대화를 이어 갈 수 있다.' },
  { d: 'social', s: '공감능력', q: '표정이나 말투만으로도 상대의 기분을 어느 정도 알아챈다.' },
  { d: 'social', s: '공감능력', q: '다른 사람이 왜 힘들어하는지 잘 이해되지 않을 때가 많다.', r: true },
  { d: 'social', s: '자아확장력', q: '어려울 때 진심으로 도움을 청할 수 있는 사람이 주변에 있다.' },
  { d: 'social', s: '자아확장력', q: '내가 속한 모임이나 조직에서 나도 소중한 구성원이라고 느낀다.' },

  { d: 'positive', s: '자아낙관성', q: '지금은 힘들어도 결국 일이 잘 풀릴 것이라고 믿는다.' },
  { d: 'positive', s: '자아낙관성', q: '새로운 도전 앞에서 ‘나는 해낼 수 있다’는 자신감이 있다.' },
  { d: 'positive', s: '생활만족도', q: '전반적으로 지금의 내 삶에 만족한다.' },
  { d: 'positive', s: '생활만족도', q: '내 삶이 내가 원하는 모습과는 거리가 멀다고 느낀다.', r: true },
  { d: 'positive', s: '감사하기', q: '일상 속에서 고마움을 느끼는 순간이 자주 있다.' },
  { d: 'positive', s: '감사하기', q: '나를 도와준 사람에게 고마운 마음을 표현하는 편이다.' },
];

const OPTIONS = ['전혀 그렇지 않다', '그렇지 않다', '보통이다', '그렇다', '매우 그렇다'];

const TIPS = {
  self: [
    '감정 이름 붙이기: 마음이 요동칠 때 “지금 나는 ○○을 느끼고 있다”라고 말로 적어 보세요. 감정을 언어화하면 강도가 줄어듭니다.',
    '6초 멈춤과 복식호흡: 충동이 올라오면 4초 들이쉬고 6초 내쉬기를 세 번. 반응하기 전에 선택할 틈이 생깁니다.',
    'ABC 일기: 사건(A)–떠오른 생각(B)–결과 감정(C)을 나눠 적으면 “원래 안 돼” 같은 자동적 생각을 점검할 수 있어요.',
  ],
  social: [
    '“나 전달법”으로 말하기: “너는 왜…” 대신 “나는 ~해서 ~하게 느꼈어”로 시작해 보세요.',
    '요약하며 듣기: 상대의 말을 “그러니까 ~라는 거지?”로 되짚으면 공감과 소통이 함께 자랍니다.',
    '지지망 점검: 힘들 때 연락할 수 있는 3명의 이름을 적고, 이번 주 한 명에게 먼저 안부를 건네 보세요.',
  ],
  positive: [
    '감사 일기 3줄: 잠들기 전 오늘 고마웠던 일 세 가지를 구체적으로 적어 보세요. 2주만 지속해도 효과가 보고됩니다.',
    '강점 찾기: 내가 잘하는 것 다섯 가지를 적고, 이번 주에 그중 하나를 새로운 방식으로 써 보세요.',
    '작은 성공 기록: 해낸 일을 매일 하나씩 기록하면 ‘나는 할 수 있다’는 자기효능감이 쌓입니다.',
  ],
};

const LEVELS = [
  { min: 80, name: '매우 높음', title: '단단한 고무공 같은 마음',
    text: '어려움이 와도 금세 튀어 오르는 탄탄한 회복력을 지니고 있어요. 지금의 강점을 주변 사람과 나누면 더 큰 힘이 됩니다.' },
  { min: 72, name: '높음', title: '잘 단련된 마음 근육',
    text: '대부분의 스트레스를 건강하게 다룰 수 있는 상태예요. 상대적으로 낮은 영역을 조금만 보완하면 더 단단해질 수 있어요.' },
  { min: 64, name: '보통', title: '성장 중인 마음 근육',
    text: '평균적인 회복탄력성을 지니고 있어요. 회복탄력성은 근육처럼 훈련으로 키울 수 있으니 아래 처방을 하나씩 시도해 보세요.' },
  { min: 0, name: '낮음', title: '돌봄이 필요한 마음',
    text: '요즘 마음이 많이 지쳐 있을 수 있어요. 작은 습관부터 시작해 보고, 힘든 상태가 오래간다면 전문가와 이야기 나눠 보는 것을 권해요.' },
];

// ---------------------------------------------------------------------------
const $ = (s) => document.querySelector(s);
let profile = null;
let answers = new Array(ITEMS.length).fill(null);
let idx = 0;

function show(id) {
  document.querySelectorAll('.screen').forEach((el) => el.classList.toggle('active', el.id === id));
  window.scrollTo({ top: 0 });
}

$('#profile').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  profile = {
    nickname: (f.get('nickname') || '').trim() || null,
    age_group: f.get('age_group'),
    gender: f.get('gender'),
  };
  answers.fill(null);
  idx = 0;
  renderQuestion();
  show('quiz');
});

function renderQuestion() {
  const it = ITEMS[idx];
  const dom = DOMAINS[it.d];
  $('#bar').style.width = `${(idx / ITEMS.length) * 100}%`;
  $('#counter').textContent = `QUESTION ${idx + 1} / ${ITEMS.length}`;
  const tag = $('#domain');
  tag.textContent = `${dom.name} · ${it.s}`;
  tag.style.color = dom.color;
  tag.style.background = `color-mix(in srgb, ${dom.color} 14%, transparent)`;
  $('#question').textContent = it.q;
  $('#scale').innerHTML = OPTIONS.map((o, i) => `
    <button type="button" class="opt${answers[idx] === i + 1 ? ' sel' : ''}" role="radio"
      aria-checked="${answers[idx] === i + 1}" data-v="${i + 1}">
      <span class="n">${i + 1}</span>${o}
    </button>`).join('');
  $('#prev').disabled = idx === 0;
}

let locked = false;
function choose(v) {
  if (locked) return;
  answers[idx] = v;
  locked = true;
  renderQuestion();
  setTimeout(() => {
    locked = false;
    if (idx < ITEMS.length - 1) { idx++; renderQuestion(); }
    else finish();
  }, 220);
}

$('#scale').addEventListener('click', (e) => {
  const b = e.target.closest('.opt');
  if (b) choose(Number(b.dataset.v));
});
$('#prev').addEventListener('click', () => { if (idx > 0) { idx--; renderQuestion(); } });
document.addEventListener('keydown', (e) => {
  if (!$('#quiz').classList.contains('active')) return;
  if (e.key >= '1' && e.key <= '5') choose(Number(e.key));
  if (e.key === 'Backspace' || e.key === 'ArrowLeft') $('#prev').click();
});

function score() {
  const scored = answers.map((a, i) => (ITEMS[i].r ? 6 - a : a));
  const dom = { self: 0, social: 0, positive: 0 };
  const sub = {};
  ITEMS.forEach((it, i) => {
    dom[it.d] += scored[i];
    sub[it.s] ??= { d: it.d, sum: 0, n: 0 };
    sub[it.s].sum += scored[i];
    sub[it.s].n++;
  });
  const total = dom.self + dom.social + dom.positive;
  const level = LEVELS.find((l) => total >= l.min);
  return { dom, sub, total, level };
}

async function api(path, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      'Content-Type': 'application/json',
      ...(path.startsWith('rpc/') ? {} : { Prefer: 'return=minimal' }),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const t = await res.text();
  return t ? JSON.parse(t) : null;
}

async function finish() {
  $('#bar').style.width = '100%';
  const r = score();
  renderResult(r);
  show('result');

  const save = $('#r-save');
  save.textContent = '결과를 저장하는 중…';
  try {
    await api('resilience_responses', {
      ...profile,
      answers,
      self_regulation: r.dom.self,
      interpersonal: r.dom.social,
      positivity: r.dom.positive,
      total_score: r.total,
      level: r.level.name,
    });
    save.textContent = '✓ 응답이 익명으로 저장되었습니다.';
  } catch (err) {
    console.error(err);
    save.textContent = '응답 저장에 실패했어요. 결과는 그대로 확인할 수 있습니다.';
  }

  try {
    const [stats] = await api('rpc/resilience_stats', {});
    if (stats && stats.respondents > 1) {
      const diff = r.total - Number(stats.avg_total);
      $('#r-compare').textContent =
        `지금까지 ${stats.respondents.toLocaleString()}명의 평균은 ${stats.avg_total}점이에요. ` +
        (diff >= 0 ? `평균보다 ${diff.toFixed(1)}점 높습니다.` : `평균보다 ${Math.abs(diff).toFixed(1)}점 낮습니다.`);
      const avgs = { self: stats.avg_self_regulation, social: stats.avg_interpersonal, positive: stats.avg_positivity };
      Object.entries(avgs).forEach(([k, v]) => {
        const m = document.querySelector(`.dom[data-k="${k}"] .meter`);
        const d = DOMAINS[k];
        if (m && v != null) m.insertAdjacentHTML('beforeend',
          `<span class="avg" title="전체 평균 ${v}점" style="left:${((v - d.min) / (d.max - d.min)) * 100}%"></span>`);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

function pct(v, min, max) { return Math.round(((v - min) / (max - min)) * 100); }

function renderResult(r) {
  const name = profile.nickname ? `${profile.nickname}님은 ` : '';
  $('#r-title').textContent = `${name}${r.level.title}`;
  $('#r-total').textContent = r.total;
  $('#r-level').textContent = `회복탄력성 ${r.level.name}`;
  $('#r-summary').textContent = r.level.text;
  $('#r-compare').textContent = '';
  const fill = $('#gauge-fill');
  fill.style.strokeDashoffset = 326.7;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    fill.style.strokeDashoffset = 326.7 * (1 - pct(r.total, 20, 100) / 100);
  }));

  $('#r-domains').innerHTML = Object.entries(DOMAINS).map(([k, d]) => `
    <div class="dom" data-k="${k}">
      <div class="dom-head"><b style="color:${d.color}">${d.name}</b><span>${r.dom[k]} / ${d.max}점</span></div>
      <div class="meter"><i style="background:${d.color}" data-w="${pct(r.dom[k], d.min, d.max)}"></i></div>
      <p>${d.desc}</p>
    </div>`).join('');

  $('#r-subs').innerHTML = Object.entries(r.sub).map(([s, v]) => {
    const avg = v.sum / v.n;
    const color = DOMAINS[v.d].color;
    return `<div class="sub"><small><span>${s}</span><b>${avg.toFixed(1)}</b></small>
      <div class="meter"><i style="background:${color}" data-w="${pct(avg, 1, 5)}"></i></div></div>`;
  }).join('');

  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('#result .meter i').forEach((el) => { el.style.width = `${el.dataset.w}%`; });
  }));

  // 상대적으로 가장 낮은 영역부터 처방
  const order = Object.keys(DOMAINS).sort(
    (a, b) => pct(r.dom[a], DOMAINS[a].min, DOMAINS[a].max) - pct(r.dom[b], DOMAINS[b].min, DOMAINS[b].max));
  const weakest = order[0];
  $('#r-tips').innerHTML = [
    ...TIPS[weakest].map((t) => [weakest, t]),
    [order[1], TIPS[order[1]][0]],
  ].map(([k, t]) => {
    const [head, body] = t.split(': ');
    return `<div class="tip" style="border-color:${DOMAINS[k].color}"><b>${head}</b><p>${body}</p></div>`;
  }).join('');
}

$('#retry').addEventListener('click', () => show('intro'));
$('#share').addEventListener('click', async () => {
  const url = location.origin + location.pathname;
  try {
    if (navigator.share) await navigator.share({ title: '회복탄력성 자가진단', url });
    else { await navigator.clipboard.writeText(url); $('#share').textContent = '링크 복사됨 ✓'; }
  } catch { /* user cancelled */ }
});
