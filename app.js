// 小学5年算数「整数」類題特化ドリル

// ユーティリティ: 最大公約数 (GCD)
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// ユーティリティ: 3数のGCD
function gcd3(a, b, c) {
  return gcd(gcd(a, b), c);
}

// ユーティリティ: 最小公倍数 (LCM)
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return (a * b) / gcd(a, b);
}

// ユーティリティ: 3数のLCM
function lcm3(a, b, c) {
  return lcm(lcm(a, b), c);
}

// ユーティリティ: ある数の約数を配列で取得（昇順）
function getDivisors(n) {
  const divs = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) divs.push(i);
  }
  return divs;
}

// ユーティリティ: 2数の公約数をすべて取得
function getCommonDivisors(a, b) {
  const g = gcd(a, b);
  return getDivisors(g);
}

// ユーティリティ: 3数の公約数をすべて取得
function getCommonDivisors3(a, b, c) {
  const g = gcd3(a, b, c);
  return getDivisors(g);
}

// ランダム整数（min以上max以下）
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 配列からランダムに1つ選択
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 配列をシャッフル
function shuffle(arr) {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

// 入力の正規化（全角英数・スペース・読点を半角へ、余分な空白削除）
function normalizeStr(str) {
  if (!str) return '';
  return str
    .trim()
    .replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[Ａ-Ｚａ-ｚ]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[、，]/g, ',')
    .replace(/[　\s]+/g, ' ')
    .toLowerCase();
}

// 数値リスト入力（例: "2, 4, 6" や "2 4 6" や "2、4、6"）を整数の配列としてパース
function parseNumberList(input) {
  const norm = normalizeStr(input);
  if (!norm) return [];
  // カンマまたはスペースで分割
  const parts = norm.split(/[, ]+/);
  return parts.map(p => parseInt(p, 10)).filter(n => !isNaN(n));
}

// 用語の同一視判定（ひらがな、漢字など）
const termAliases = {
  '偶数': ['偶数', 'ぐうすう', 'グウスウ'],
  '奇数': ['奇数', 'きすう', 'キスウ'],
  '公倍数': ['公倍数', 'こうばいすう', 'コウバイスウ'],
  '最小公倍数': ['最小公倍数', 'さいしょうこうばいすう', 'サイショウコウバイスウ'],
  '公約数': ['公約数', 'こうやくすう', 'コウヤクスウ'],
  '最大公約数': ['最大公約数', 'さいだいこうやくすう', 'サイダイコウヤクスウ'],
  '倍数': ['倍数', 'ばいすう', 'バイスウ'],
  '約数': ['約数', 'やくすう', 'ヤクスウ']
};

function checkTermMatch(userVal, correctTerm) {
  const norm = normalizeStr(userVal).replace(/\s+/g, '');
  const aliases = termAliases[correctTerm] || [correctTerm];
  return aliases.some(a => normalizeStr(a).replace(/\s+/g, '') === norm);
}

// ==========================================
// 類題生成ジェネレータ群（原本の数値は出題しない）
// ==========================================

const generators = {
  // 1. 用語（偶数・奇数）
  p1_even_odd: () => {
    return {
      category: 'even_odd',
      categoryName: '偶数・奇数',
      skill: '知識・技能',
      instruction: '次の（　）にあてはまることばをかきましょう。',
      subtext: '2でわり切れる整数を（ ① ）、2でわり切れない整数を（ ② ）といいます。',
      fields: [
        { id: 'f1', label: '①', type: 'term', correct: '偶数', placeholder: 'ことばを入力' },
        { id: 'f2', label: '②', type: 'term', correct: '奇数', placeholder: 'ことばを入力' }
      ],
      explanation: '【考え方】\n・2でわり切れる整数（一の位が 0, 2, 4, 6, 8）を「偶数（ぐうすう）」といいます。\n・2でわり切れない整数（一の位が 1, 3, 5, 7, 9）を「奇数（きすう）」といいます。\n※0は2でわり切れるので「偶数」です。'
    };
  },

  // 1. 用語（公倍数・最小公倍数）
  p1_multiple: () => {
    const pairs = [[2, 5], [4, 6], [3, 7], [5, 6], [3, 8], [6, 9]];
    const [a, b] = pickRandom(pairs);
    return {
      category: 'multiple',
      categoryName: '倍数・公倍数',
      skill: '知識・技能',
      instruction: '次の（　）にあてはまることばをかきましょう。',
      subtext: `${a}の倍数にも、${b}の倍数にもなっている数を、${a}と${b}の（ ① ）といいます。\n公倍数のうち、いちばん小さい数を（ ② ）といいます。`,
      fields: [
        { id: 'f1', label: '①', type: 'term', correct: '公倍数', placeholder: 'ことばを入力' },
        { id: 'f2', label: '②', type: 'term', correct: '最小公倍数', placeholder: 'ことばを入力' }
      ],
      explanation: '【考え方】\n・共通する倍数を「公倍数（こうばいすう）」といいます。\n・その中で一番小さい数を「最小公倍数（さいしょうこうばいすう）」といいます。'
    };
  },

  // 1. 用語（公約数・最大公約数）
  p1_divisor: () => {
    const pairs = [[18, 24], [12, 16], [20, 30], [28, 42], [16, 20]];
    const [a, b] = pickRandom(pairs);
    return {
      category: 'divisor',
      categoryName: '約数・公約数',
      skill: '知識・技能',
      instruction: '次の（　）にあてはまることばをかきましょう。',
      subtext: `${a}の約数にも、${b}の約数にもなっている数を、${a}と${b}の（ ① ）といいます。\n公約数のうち、いちばん大きい数を（ ② ）といいます。`,
      fields: [
        { id: 'f1', label: '①', type: 'term', correct: '公約数', placeholder: 'ことばを入力' },
        { id: 'f2', label: '②', type: 'term', correct: '最大公約数', placeholder: 'ことばを入力' }
      ],
      explanation: '【考え方】\n・共通する約数を「公約数（こうやくすう）」といいます。\n・その中で一番大きい数を「最大公約数（さいだいこうやくすう）」といいます。'
    };
  },

  // 2. 偶数・奇数の分類（原本: 222, 57, 43, 96, 0, 11, 27, 100 以外）
  p2_classify: () => {
    // 0を含める。偶数3つ、奇数4つ
    const evenPool = [14, 28, 52, 76, 84, 102, 138, 216, 304, 90, 68, 42];
    const oddPool = [13, 25, 37, 49, 63, 71, 85, 99, 105, 127, 203, 319];
    
    const evens = shuffle(evenPool).slice(0, 3);
    evens.push(0); // 0を必ず入れる（テストの超重要ポイント）
    const odds = shuffle(oddPool).slice(0, 4);

    const allNums = shuffle([...evens, ...odds]);

    return {
      category: 'even_odd',
      categoryName: '偶数・奇数',
      skill: '知識・技能',
      instruction: '次の整数を見て、偶数と奇数に分けてかきましょう。（順不同・カンマやスペースで区切って入力）',
      chips: allNums,
      fields: [
        { id: 'even', label: '・偶数', type: 'num_set', correct: evens, placeholder: '例: 0, 14, 52, 76' },
        { id: 'odd', label: '・奇数', type: 'num_set', correct: odds, placeholder: '例: 13, 25, 37, 49' }
      ],
      explanation: `【考え方】\n・一の位が 0, 2, 4, 6, 8 の数は偶数です。※「0」は2でわり切れるので偶数です！\n　偶数：${evens.sort((a,b)=>a-b).join('、 ')}\n・一の位が 1, 3, 5, 7, 9 の数は奇数です。\n　奇数：${odds.sort((a,b)=>a-b).join('、 ')}`
    };
  },

  // 3-1. 倍数（小さい順に3つ） 原本の9以外
  p3_multiple_3: () => {
    const base = pickRandom([6, 7, 8, 11, 12, 13, 14, 15]);
    const ans = [base * 1, base * 2, base * 3];
    return {
      category: 'multiple',
      categoryName: '倍数・公倍数',
      skill: '知識・技能',
      instruction: `次の数を小さい順に3つかきましょう。（カンマやスペースで区切って入力）`,
      subtext: `【 ${base} の倍数 】（小さい順に3つ）`,
      fields: [
        { id: 'f1', label: '答え', type: 'num_seq', correct: ans, placeholder: `例: ${ans[0]}, ${ans[1]}, ${ans[2]}` }
      ],
      explanation: `【考え方】\n${base}の倍数は、${base}に 1, 2, 3… をかけた数です。\n・${base} × 1 ＝ ${ans[0]}\n・${base} × 2 ＝ ${ans[1]}\n・${base} × 3 ＝ ${ans[2]}`
    };
  },

  // 3-2. 2数の公倍数（小さい順に3つ） 原本の4と5以外
  p3_common_multiple_2: () => {
    const pairs = [[2, 3], [3, 4], [2, 5], [3, 5], [4, 6], [6, 8], [3, 8]];
    const [a, b] = pickRandom(pairs);
    const m = lcm(a, b);
    const ans = [m * 1, m * 2, m * 3];
    return {
      category: 'multiple',
      categoryName: '倍数・公倍数',
      skill: '知識・技能',
      instruction: `次の数を小さい順に3つかきましょう。（カンマやスペースで区切って入力）`,
      subtext: `【 ${a} と ${b} の公倍数 】（小さい順に3つ）`,
      fields: [
        { id: 'f1', label: '答え', type: 'num_seq', correct: ans, placeholder: `例: ${ans[0]}, ${ans[1]}, ${ans[2]}` }
      ],
      explanation: `【考え方】\n・${a}と${b}の最小公倍数は ${m} です。\n・公倍数は最小公倍数の倍数になるので、${m} × 1 ＝ ${ans[0]}、${m} × 2 ＝ ${ans[1]}、${m} × 3 ＝ ${ans[2]} となります。`
    };
  },

  // 3-3. 3数の公倍数（小さい順に2つ） 原本の2,6,8以外
  p3_common_multiple_3: () => {
    const triples = [[2, 3, 4], [2, 4, 6], [3, 4, 6], [2, 3, 5], [2, 5, 10]];
    const [a, b, c] = pickRandom(triples);
    const m = lcm3(a, b, c);
    const ans = [m * 1, m * 2];
    return {
      category: 'multiple',
      categoryName: '倍数・公倍数',
      skill: '知識・技能',
      instruction: `次の数を小さい順に2つかきましょう。（カンマやスペースで区切って入力）`,
      subtext: `【 ${a} と ${b} と ${c} の公倍数 】（小さい順に2つ）`,
      fields: [
        { id: 'f1', label: '答え', type: 'num_seq', correct: ans, placeholder: `例: ${ans[0]}, ${ans[1]}` }
      ],
      explanation: `【考え方】\n・一番大きい数 ${c} の倍数の中から、${a}でも${b}でもわり切れる最小の数（最小公倍数）を探すと ${m} です。\n・公倍数は ${m} の倍数なので、${ans[0]}、${ans[1]} となります。`
    };
  },

  // 3-4. 3数の最小公倍数 原本の2,3,7以外
  p3_lcm_3: () => {
    const triples = [
      [2, 3, 5], // 30
      [3, 4, 5], // 60
      [2, 5, 7], // 70
      [3, 4, 7], // 84
      [2, 3, 9], // 18
      [2, 4, 5]  // 20
    ];
    const [a, b, c] = pickRandom(triples);
    const ans = lcm3(a, b, c);
    return {
      category: 'multiple',
      categoryName: '倍数・公倍数',
      skill: '知識・技能',
      instruction: `次の数の最小公倍数をかきましょう。`,
      subtext: `【 ${a} と ${b} と ${c} の最小公倍数 】`,
      fields: [
        { id: 'f1', label: '答え', type: 'single_num', correct: ans, placeholder: '数字を入力' }
      ],
      explanation: `【考え方】\n一番大きい数 ${c} の倍数を順に調べて、${a}と${b}でもわり切れるいちばん小さい数を見つけます。\n${a}と${b}と${c}の最小公倍数は ${ans} です。`
    };
  },

  // 3-5. 1つの数の約数（すべて） 原本の16以外
  p3_divisors_all: () => {
    const pool = [12, 18, 20, 24, 28, 30, 32, 36];
    const n = pickRandom(pool);
    const ans = getDivisors(n);
    return {
      category: 'divisor',
      categoryName: '約数・公約数',
      skill: '知識・技能',
      instruction: `次の数の約数をすべてかきましょう。（カンマやスペースで区切って入力・順不同可）`,
      subtext: `【 ${n} の約数（すべて） 】`,
      fields: [
        { id: 'f1', label: '答え', type: 'num_set', correct: ans, placeholder: `例: ${ans.join(', ')}` }
      ],
      explanation: `【考え方】\nかけ算のペアで見つけると、もれなく探せます。\n` +
        ans.filter(d => d <= Math.sqrt(n)).map(d => `・${d} × ${n/d} ＝ ${n}`).join('\n') +
        `\nよって、約数はすべてで 【 ${ans.join('、 ')} 】 です。`
    };
  },

  // 3-6. 2数の公約数（すべて） 原本の18と30以外
  p3_common_divisors_2: () => {
    const pairs = [
      [12, 18], // 1, 2, 3, 6
      [16, 24], // 1, 2, 4, 8
      [20, 30], // 1, 2, 5, 10
      [24, 36], // 1, 2, 3, 4, 6, 12
      [18, 27], // 1, 3, 9
      [12, 20]  // 1, 2, 4
    ];
    const [a, b] = pickRandom(pairs);
    const divsA = getDivisors(a);
    const divsB = getDivisors(b);
    const ans = getCommonDivisors(a, b);
    return {
      category: 'divisor',
      categoryName: '約数・公約数',
      skill: '知識・技能',
      instruction: `次の数の公約数をすべてかきましょう。（カンマやスペースで区切って入力・順不同可）`,
      subtext: `【 ${a} と ${b} の公約数（すべて） 】`,
      fields: [
        { id: 'f1', label: '答え', type: 'num_set', correct: ans, placeholder: `例: ${ans.join(', ')}` }
      ],
      explanation: `【考え方】\n・${a}の約数は ${divsA.join('、 ')}\n・${b}の約数は ${divsB.join('、 ')}\n両方に共通する約数（公約数）は 【 ${ans.join('、 ')} 】 です。`
    };
  },

  // 3-7. 2数の最大公約数 原本の36と48以外
  p3_gcd_2: () => {
    const pairs = [
      [24, 32], // 8
      [28, 42], // 14
      [36, 54], // 18
      [40, 60], // 20
      [18, 24], // 6
      [15, 25], // 5
      [32, 48]  // 16
    ];
    const [a, b] = pickRandom(pairs);
    const ans = gcd(a, b);
    return {
      category: 'divisor',
      categoryName: '約数・公約数',
      skill: '知識・技能',
      instruction: `次の数の最大公約数をかきましょう。`,
      subtext: `【 ${a} と ${b} の最大公約数 】`,
      fields: [
        { id: 'f1', label: '答え', type: 'single_num', correct: ans, placeholder: '数字を入力' }
      ],
      explanation: `【考え方】\n小さい方の数 ${Math.min(a, b)} の約数のうち、大きい方から順にもう一方の数もわり切れるか調べます。\n最大公約数は 【 ${ans} 】 です。`
    };
  },

  // 3-8. 3数の公約数（すべて） 原本の12,18,27以外
  p3_common_divisors_3: () => {
    const triples = [
      [12, 20, 32], // 1, 2, 4
      [18, 24, 36], // 1, 2, 3, 6
      [16, 24, 40], // 1, 2, 4, 8
      [15, 30, 45], // 1, 3, 5, 15
      [12, 16, 28]  // 1, 2, 4
    ];
    const [a, b, c] = pickRandom(triples);
    const ans = getCommonDivisors3(a, b, c);
    return {
      category: 'divisor',
      categoryName: '約数・公約数',
      skill: '知識・技能',
      instruction: `次の数の公約数をすべてかきましょう。（カンマやスペースで区切って入力・順不同可）`,
      subtext: `【 ${a} と ${b} と ${c} の公約数（すべて） 】`,
      fields: [
        { id: 'f1', label: '答え', type: 'num_set', correct: ans, placeholder: `例: ${ans.join(', ')}` }
      ],
      explanation: `【考え方】\n3つの数すべての公約数は、3つの数の最大公約数（${gcd3(a, b, c)}）の約数と同じです。\n公約数はすべてで 【 ${ans.join('、 ')} 】 です。`
    };
  },

  // 4. 文章題: バスの同時発車（最小公倍数） 原本の12分・16分・午前11時以外
  p4_word_bus: () => {
    const cases = [
      { a: 10, b: 15, h: 9, m: 0, destA: '温泉', destB: '運動公園' }, // LCM=30 -> 9:30
      { a: 15, b: 20, h: 10, m: 0, destA: '空港', destB: '駅前' }, // LCM=60 -> 11:00
      { a: 8, b: 12, h: 8, m: 0, destA: '北口', destB: '南口' }, // LCM=24 -> 8:24
      { a: 14, b: 21, h: 9, m: 0, destA: '水族館', destB: '動物園' }, // LCM=42 -> 9:42
      { a: 6, b: 9, h: 7, m: 30, destA: '市役所', destB: '病院' } // LCM=18 -> 7:48
    ];
    const c = pickRandom(cases);
    const period = lcm(c.a, c.b);
    const totalMinutes = c.m + period;
    const ansH = c.h + Math.floor(totalMinutes / 60);
    const ansM = totalMinutes % 60;

    const startStr = `午前${c.h}時${c.m > 0 ? c.m + '分' : ''}`;

    return {
      category: 'word',
      categoryName: '文章題（思考・判断・表現）',
      skill: '思考・判断・表現',
      instruction: `駅前からバスが、${c.destA}行きは${c.a}分ごとに、${c.destB}行きは${c.b}分ごとに出発しています。\n${startStr}に同時に出発した後、次に同時に発車するのは、午前何時何分ですか。`,
      fields: [
        { id: 'hour', label: '午前', unit: '時', type: 'single_num', correct: ansH, inputClass: 'input-narrow', placeholder: '何' },
        { id: 'min', label: '', unit: '分', type: 'single_num', correct: ansM, inputClass: 'input-narrow', placeholder: '何' }
      ],
      explanation: `【考え方】\n${c.a}と${c.b}の最小公倍数を求めればよいです。\n・${c.a}の倍数は ${c.a}、${c.a*2}、${c.a*3}…\n・${c.b}の倍数は ${c.b}、${c.b*2}、${c.b*3}…\n・${c.a}と${c.b}の最小公倍数は 【 ${period} 】\n${startStr}の${period}分後は、午前${ansH}時${ansM}分 です。`
    };
  },

  // 5. 文章題: 長方形を余りなく正方形に分ける（最大公約数） 原本の24cm・18cm以外
  p5_word_paper: () => {
    const cases = [
      { w: 30, h: 20 }, // GCD=10, 3*2=6枚
      { w: 28, h: 20 }, // GCD=4, 7*5=35枚
      { w: 36, h: 24 }, // GCD=12, 3*2=6枚
      { w: 45, h: 30 }, // GCD=15, 3*2=6枚
      { w: 32, h: 24 }, // GCD=8, 4*3=12枚
      { w: 40, h: 24 }  // GCD=8, 5*3=15枚
    ];
    const c = pickRandom(cases);
    const g = gcd(c.w, c.h);
    const countW = c.w / g;
    const countH = c.h / g;
    const totalCount = countW * countH;

    return {
      category: 'word',
      categoryName: '文章題（思考・判断・表現）',
      skill: '思考・判断・表現',
      instruction: `たて${c.w}cm、横${c.h}cmの方眼紙があります。これを目もりの線にそって切り、紙の余りが出ないように同じ大きさの正方形に分けたいと思います。`,
      fields: [
        { id: 'f1', label: '① できるだけ大きい正方形をつくるとき、1辺は何cmになりますか。', unit: 'cm', type: 'single_num', correct: g, placeholder: '数字' },
        { id: 'f2', label: '② ①のとき、正方形は何枚できますか。', unit: '枚', type: 'single_num', correct: totalCount, placeholder: '数字' }
      ],
      explanation: `【考え方】\n① ${c.w}と${c.h}の最大公約数を求めればよいです。\n　最大公約数は 【 ${g} 】 なので、1辺は ${g}cm です。\n② たて…${c.w} ÷ ${g} ＝ ${countW}\n　横…${c.h} ÷ ${g} ＝ ${countH}\n　${countW} × ${countH} ＝ 【 ${totalCount} 】 枚できます。`
    };
  },

  // 6. 文章題: 余りなく袋に分ける（最大公約数） 原本のチョコ32個・あめ72個以外
  p6_word_bags: () => {
    const cases = [
      { itemA: 'クッキー', countA: 40, itemB: 'あめ', countB: 56, unitBag: '枚' }, // GCD=8, 5個, 7個
      { itemA: 'りんご', countA: 24, itemB: 'みかん', countB: 36, unitBag: '箱' }, // GCD=12, 2個, 3個
      { itemA: '鉛筆', countA: 30, itemB: '消しゴム', countB: 45, unitBag: 'セット' }, // GCD=15, 2個, 3個
      { itemA: 'ノート', countA: 28, itemB: 'シール', countB: 42, unitBag: '袋' }, // GCD=14, 2個, 3個
      { itemA: 'マフィン', countA: 36, itemB: 'プリン', countB: 48, unitBag: '箱' } // GCD=12, 3個, 4個
    ];
    const c = pickRandom(cases);
    const g = gcd(c.countA, c.countB);
    const eachA = c.countA / g;
    const eachB = c.countB / g;

    return {
      category: 'word',
      categoryName: '文章題（思考・判断・表現）',
      skill: '思考・判断・表現',
      instruction: `${c.itemA}${c.countA}個と${c.itemB}${c.countB}個を余りが出ないように、それぞれ同じ数ずつ${c.unitBag}に分けます。`,
      fields: [
        { id: 'f1', label: `① できるだけ多くの${c.unitBag}に分けるには、${c.unitBag}の数をいくつにすればよいですか。`, unit: c.unitBag, type: 'single_num', correct: g, placeholder: '数字' },
        { id: 'f2_a', label: `② ①のとき、1つの${c.unitBag}に入る${c.itemA}は`, unit: '個', type: 'single_num', correct: eachA, inputClass: 'input-narrow', placeholder: '数' },
        { id: 'f2_b', label: `、${c.itemB}は`, unit: '個です。', type: 'single_num', correct: eachB, inputClass: 'input-narrow', placeholder: '数' }
      ],
      explanation: `【考え方】\n① ${c.countA}と${c.countB}の最大公約数を求めればよいです。\n　最大公約数は 【 ${g} 】 なので、${g}${c.unitBag}です。\n② それぞれの個数を${c.unitBag}の数でわります。\n　・${c.itemA}…${c.countA} ÷ ${g} ＝ 【 ${eachA} 】 個\n　・${c.itemB}…${c.countB} ÷ ${g} ＝ 【 ${eachB} 】 個`
    };
  }
};

// ==========================================
// アプリケーション状態とコントローラ
// ==========================================

class MathDrillApp {
  constructor() {
    this.currentCategory = 'all';
    this.currentQuestion = null;
    this.isAnswered = false;

    // 成績データ
    this.combo = 0;
    this.totalSolved = 0;
    this.totalCorrect = 0;

    // DOM要素
    this.comboEl = document.getElementById('comboCount');
    this.solvedEl = document.getElementById('totalSolved');
    this.rateEl = document.getElementById('correctRate');

    this.categoryBadge = document.getElementById('categoryBadge');
    this.skillBadge = document.getElementById('skillBadge');
    this.instructionEl = document.getElementById('questionInstruction');
    this.subtextEl = document.getElementById('questionSubtext');
    this.inputContainer = document.getElementById('inputContainer');
    this.submitBtn = document.getElementById('submitBtn');

    this.resultContainer = document.getElementById('resultContainer');
    this.resultBanner = document.getElementById('resultBanner');
    this.resultIcon = document.getElementById('resultIcon');
    this.resultText = document.getElementById('resultText');
    this.correctAnswerContent = document.getElementById('correctAnswerContent');
    this.explanationContent = document.getElementById('explanationContent');
    this.nextBtn = document.getElementById('nextBtn');

    this.initEvents();
    this.loadNextQuestion();
  }

  initEvents() {
    // カテゴリー切り替え
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCategory = btn.dataset.category;
        this.loadNextQuestion();
      });
    });

    // フォーム送信（こたえあわせ）
    document.getElementById('answerForm').addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.isAnswered) {
        this.checkAnswer();
      }
    });

    // 次へボタン
    this.nextBtn.addEventListener('click', () => {
      this.loadNextQuestion();
    });

    // キーボード操作（Enterでこたえあわせ／次へ）
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (this.isAnswered) {
          e.preventDefault();
          this.loadNextQuestion();
        }
      }
    });
  }

  // カテゴリに応じたジェネレータリストを取得
  getGeneratorsForCurrentCategory() {
    const keys = Object.keys(generators);
    if (this.currentCategory === 'all') {
      return keys;
    }
    return keys.filter(k => {
      const q = generators[k]();
      return q.category === this.currentCategory;
    });
  }

  // 次の問題を読み込み
  loadNextQuestion() {
    this.isAnswered = false;

    // 前回の結果表示をリセット
    this.resultContainer.style.display = 'none';
    this.submitBtn.disabled = false;
    this.submitBtn.style.display = 'inline-flex';

    // カテゴリからランダムに問題生成
    const availableKeys = this.getGeneratorsForCurrentCategory();
    const chosenKey = pickRandom(availableKeys);
    this.currentQuestion = generators[chosenKey]();

    this.renderQuestion();
  }

  // 問題を画面に描画
  renderQuestion() {
    const q = this.currentQuestion;

    this.categoryBadge.textContent = q.categoryName;
    this.skillBadge.textContent = q.skill;
    this.instructionEl.textContent = q.instruction;

    // サブテキストまたは数字チップ
    if (q.subtext) {
      this.subtextEl.style.display = 'block';
      this.subtextEl.textContent = q.subtext;
    } else {
      this.subtextEl.style.display = 'none';
    }

    // 入力フォーム作成
    this.inputContainer.innerHTML = '';

    // チップがある場合（偶数・奇数の分類など）
    if (q.chips) {
      const chipBox = document.createElement('div');
      chipBox.className = 'number-chip-container';
      q.chips.forEach(n => {
        const chip = document.createElement('span');
        chip.className = 'number-chip';
        chip.textContent = n;
        chipBox.appendChild(chip);
      });
      this.inputContainer.appendChild(chipBox);
    }

    // 入力欄
    q.fields.forEach((field, index) => {
      const row = document.createElement('div');
      row.className = 'input-row';

      if (field.label) {
        const label = document.createElement('span');
        label.className = 'input-label';
        label.textContent = field.label;
        row.appendChild(label);
      }

      const wrap = document.createElement('div');
      wrap.className = 'input-field-wrap';

      const input = document.createElement('input');
      input.type = 'text';
      input.id = `input_${field.id}`;
      input.className = `math-input ${field.inputClass || (field.type === 'num_set' || field.type === 'num_seq' ? 'input-wide' : '')}`;
      input.placeholder = field.placeholder || '';
      input.autocomplete = 'off';

      wrap.appendChild(input);

      if (field.unit) {
        const unit = document.createElement('span');
        unit.className = 'input-unit';
        unit.textContent = field.unit;
        wrap.appendChild(unit);
      }

      row.appendChild(wrap);
      this.inputContainer.appendChild(row);
    });

    // 最初の入力欄にフォーカス
    setTimeout(() => {
      const firstInput = this.inputContainer.querySelector('input');
      if (firstInput) firstInput.focus();
    }, 50);
  }

  // 解答チェック
  checkAnswer() {
    this.isAnswered = true;
    const q = this.currentQuestion;
    let allCorrect = true;
    const correctStrings = [];

    q.fields.forEach(field => {
      const inputEl = document.getElementById(`input_${field.id}`);
      const val = inputEl ? inputEl.value : '';
      let isFieldCorrect = false;

      if (field.type === 'term') {
        isFieldCorrect = checkTermMatch(val, field.correct);
        correctStrings.push(`${field.label}: ${field.correct}`);
      } else if (field.type === 'single_num') {
        const parsed = parseInt(normalizeStr(val), 10);
        isFieldCorrect = parsed === field.correct;
        correctStrings.push(`${field.label ? field.label + ': ' : ''}${field.correct}${field.unit || ''}`);
      } else if (field.type === 'num_seq') {
        // 小さい順に指定された通りの並び
        const parsedList = parseNumberList(val);
        isFieldCorrect = parsedList.length === field.correct.length &&
          field.correct.every((num, i) => parsedList[i] === num);
        correctStrings.push(`${field.correct.join('、 ')}`);
      } else if (field.type === 'num_set') {
        // 順不同のセット一致
        const parsedList = parseNumberList(val);
        const sortedExpected = [...field.correct].sort((a, b) => a - b);
        const sortedActual = [...parsedList].sort((a, b) => a - b);
        isFieldCorrect = sortedExpected.length === sortedActual.length &&
          sortedExpected.every((num, i) => sortedActual[i] === num);
        correctStrings.push(`${field.label ? field.label + ': ' : ''}${field.correct.sort((a,b)=>a-b).join('、 ')}`);
      }

      if (!isFieldCorrect) {
        allCorrect = false;
        if (inputEl) {
          inputEl.parentElement.style.borderColor = '#ef4444';
          inputEl.parentElement.style.backgroundColor = '#fef2f2';
        }
      } else {
        if (inputEl) {
          inputEl.parentElement.style.borderColor = '#10b981';
          inputEl.parentElement.style.backgroundColor = '#f0fdf4';
        }
      }
    });

    // スコア・統計の更新
    this.totalSolved++;
    if (allCorrect) {
      this.totalCorrect++;
      this.combo++;
    } else {
      this.combo = 0;
    }
    this.updateStats();

    // 結果表示の更新
    this.showResult(allCorrect, correctStrings.join(' / '), q.explanation);
  }

  showResult(isCorrect, answerStr, explanation) {
    this.resultContainer.style.display = 'flex';
    this.submitBtn.style.display = 'none';

    if (isCorrect) {
      this.resultBanner.className = 'result-banner correct';
      this.resultIcon.textContent = '💮';
      this.resultText.textContent = this.combo >= 3 
        ? `大正解！すごい！ ${this.combo}問連続正解中🔥` 
        : 'せいかい！たいへんよくできました！';
    } else {
      this.resultBanner.className = 'result-banner incorrect';
      this.resultIcon.textContent = '❌';
      this.resultText.textContent = 'おしい！もう一度解き方を確認しよう！';
    }

    this.correctAnswerContent.textContent = answerStr;
    this.explanationContent.textContent = explanation;

    // 次へボタンにフォーカス
    this.nextBtn.focus();
  }

  updateStats() {
    this.comboEl.textContent = this.combo;
    this.solvedEl.textContent = this.totalSolved;
    const rate = this.totalSolved === 0 ? 100 : Math.round((this.totalCorrect / this.totalSolved) * 100);
    this.rateEl.textContent = rate;
  }
}

// 起動
document.addEventListener('DOMContentLoaded', () => {
  new MathDrillApp();
});
