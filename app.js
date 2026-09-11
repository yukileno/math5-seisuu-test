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
// 全て入力枠（マス目）を分けた設計
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
      rows: [
        {
          label: '',
          boxes: [
            { id: 'f1', prefix: '① （ ', unit: ' ）', type: 'term', correct: '偶数', class: 'input-term', placeholder: 'ことば' },
            { id: 'f2', prefix: '② （ ', unit: ' ）', type: 'term', correct: '奇数', class: 'input-term', placeholder: 'ことば' }
          ]
        }
      ],
      correctText: '① 偶数、 ② 奇数',
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
      rows: [
        {
          label: '',
          boxes: [
            { id: 'f1', prefix: '① （ ', unit: ' ）', type: 'term', correct: '公倍数', class: 'input-term', placeholder: 'ことば' },
            { id: 'f2', prefix: '② （ ', unit: ' ）', type: 'term', correct: '最小公倍数', class: 'input-term', placeholder: 'ことば' }
          ]
        }
      ],
      correctText: '① 公倍数、 ② 最小公倍数',
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
      rows: [
        {
          label: '',
          boxes: [
            { id: 'f1', prefix: '① （ ', unit: ' ）', type: 'term', correct: '公約数', class: 'input-term', placeholder: 'ことば' },
            { id: 'f2', prefix: '② （ ', unit: ' ）', type: 'term', correct: '最大公約数', class: 'input-term', placeholder: 'ことば' }
          ]
        }
      ],
      correctText: '① 公約数、 ② 最大公約数',
      explanation: '【考え方】\n・共通する約数を「公約数（こうやくすう）」といいます。\n・その中で一番大きい数を「最大公約数（さいだいこうやくすう）」といいます。'
    };
  },

  // 2. 偶数・奇数の分類（マス目を4つずつ分けて配置）
  p2_classify: () => {
    const evenPool = [14, 28, 52, 76, 84, 102, 138, 216, 304, 90, 68, 42];
    const oddPool = [13, 25, 37, 49, 63, 71, 85, 99, 105, 127, 203, 319];
    
    const evens = shuffle(evenPool).slice(0, 3);
    evens.push(0); // 0は必ず含める
    const odds = shuffle(oddPool).slice(0, 4);

    const allNums = shuffle([...evens, ...odds]);

    return {
      category: 'even_odd',
      categoryName: '偶数・奇数',
      skill: '知識・技能',
      instruction: '次の整数を見て、偶数と奇数に分けて枠に入れましょう。（順不同）',
      chips: allNums,
      rows: [
        {
          label: '・偶数',
          isMultiSet: true,
          correctSet: evens,
          boxes: [
            { id: 'e0', unit: '、', class: 'input-narrow' },
            { id: 'e1', unit: '、', class: 'input-narrow' },
            { id: 'e2', unit: '、', class: 'input-narrow' },
            { id: 'e3', unit: '', class: 'input-narrow' }
          ]
        },
        {
          label: '・奇数',
          isMultiSet: true,
          correctSet: odds,
          boxes: [
            { id: 'o0', unit: '、', class: 'input-narrow' },
            { id: 'o1', unit: '、', class: 'input-narrow' },
            { id: 'o2', unit: '、', class: 'input-narrow' },
            { id: 'o3', unit: '', class: 'input-narrow' }
          ]
        }
      ],
      correctText: `偶数: ${evens.sort((a,b)=>a-b).join('、 ')} / 奇数: ${odds.sort((a,b)=>a-b).join('、 ')}`,
      explanation: `【考え方】\n・一の位が 0, 2, 4, 6, 8 の数は偶数です。※「0」は偶数です！\n　偶数：${evens.sort((a,b)=>a-b).join('、 ')}\n・一の位が 1, 3, 5, 7, 9 の数は奇数です。\n　奇数：${odds.sort((a,b)=>a-b).join('、 ')}`
    };
  },

  // 3-1. 倍数（小さい順に3つ） 枠を3つに分ける
  p3_multiple_3: () => {
    const base = pickRandom([6, 7, 8, 11, 12, 13, 14, 15]);
    const ans = [base * 1, base * 2, base * 3];
    return {
      category: 'multiple',
      categoryName: '倍数・公倍数',
      skill: '知識・技能',
      instruction: `次の数を小さい順に3つかきましょう。`,
      subtext: `【 ${base} の倍数 】（小さい順に3つ）`,
      rows: [
        {
          label: '答え',
          boxes: [
            { id: 'b0', unit: '、', type: 'single_num', correct: ans[0], class: 'input-narrow' },
            { id: 'b1', unit: '、', type: 'single_num', correct: ans[1], class: 'input-narrow' },
            { id: 'b2', unit: '', type: 'single_num', correct: ans[2], class: 'input-narrow' }
          ]
        }
      ],
      correctText: ans.join('、 '),
      explanation: `【考え方】\n${base}の倍数は、${base}に 1, 2, 3… をかけた数です。\n・${base} × 1 ＝ ${ans[0]}\n・${base} × 2 ＝ ${ans[1]}\n・${base} × 3 ＝ ${ans[2]}`
    };
  },

  // 3-2. 2数の公倍数（小さい順に3つ） 枠を3つに分ける
  p3_common_multiple_2: () => {
    const pairs = [[2, 3], [3, 4], [2, 5], [3, 5], [4, 6], [6, 8], [3, 8]];
    const [a, b] = pickRandom(pairs);
    const m = lcm(a, b);
    const ans = [m * 1, m * 2, m * 3];
    return {
      category: 'multiple',
      categoryName: '倍数・公倍数',
      skill: '知識・技能',
      instruction: `次の数を小さい順に3つかきましょう。`,
      subtext: `【 ${a} と ${b} の公倍数 】（小さい順に3つ）`,
      rows: [
        {
          label: '答え',
          boxes: [
            { id: 'b0', unit: '、', type: 'single_num', correct: ans[0], class: 'input-narrow' },
            { id: 'b1', unit: '、', type: 'single_num', correct: ans[1], class: 'input-narrow' },
            { id: 'b2', unit: '', type: 'single_num', correct: ans[2], class: 'input-narrow' }
          ]
        }
      ],
      correctText: ans.join('、 '),
      explanation: `【考え方】\n・${a}と${b}の最小公倍数は ${m} です。\n・公倍数は最小公倍数の倍数になるので、${m} × 1 ＝ ${ans[0]}、${m} × 2 ＝ ${ans[1]}、${m} × 3 ＝ ${ans[2]} となります。`
    };
  },

  // 3-3. 3数の公倍数（小さい順に2つ） 枠を2つに分ける
  p3_common_multiple_3: () => {
    const triples = [[2, 3, 4], [2, 4, 6], [3, 4, 6], [2, 3, 5], [2, 5, 10]];
    const [a, b, c] = pickRandom(triples);
    const m = lcm3(a, b, c);
    const ans = [m * 1, m * 2];
    return {
      category: 'multiple',
      categoryName: '倍数・公倍数',
      skill: '知識・技能',
      instruction: `次の数を小さい順に2つかきましょう。`,
      subtext: `【 ${a} と ${b} と ${c} の公倍数 】（小さい順に2つ）`,
      rows: [
        {
          label: '答え',
          boxes: [
            { id: 'b0', unit: '、', type: 'single_num', correct: ans[0], class: 'input-narrow' },
            { id: 'b1', unit: '', type: 'single_num', correct: ans[1], class: 'input-narrow' }
          ]
        }
      ],
      correctText: ans.join('、 '),
      explanation: `【考え方】\n・一番大きい数 ${c} の倍数の中から、${a}でも${b}でもわり切れる最小の数（最小公倍数）を探すと ${m} です。\n・公倍数は ${m} の倍数なので、${ans[0]}、${ans[1]} となります。`
    };
  },

  // 3-4. 3数の最小公倍数
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
      rows: [
        {
          label: '答え',
          boxes: [
            { id: 'ans', unit: '', type: 'single_num', correct: ans, class: 'input-narrow' }
          ]
        }
      ],
      correctText: String(ans),
      explanation: `【考え方】\n一番大きい数 ${c} の倍数を順に調べて、${a}と${b}でもわり切れるいちばん小さい数を見つけます。\n${a}と${b}と${c}の最小公倍数は 【 ${ans} 】 です。`
    };
  },

  // 3-5. 1つの数の約数（すべて） 個数分の枠に分ける（順不同可）
  p3_divisors_all: () => {
    const pool = [12, 18, 20, 24, 28, 30, 32, 36];
    const n = pickRandom(pool);
    const ans = getDivisors(n);
    const boxes = ans.map((_, i) => ({
      id: `d_${i}`,
      unit: i < ans.length - 1 ? '、' : '',
      class: 'input-narrow'
    }));

    return {
      category: 'divisor',
      categoryName: '約数・公約数',
      skill: '知識・技能',
      instruction: `次の数の約数をすべてかきましょう。（順不同・枠に1つずつ入力）`,
      subtext: `【 ${n} の約数（全部で${ans.length}個） 】`,
      rows: [
        {
          label: '答え',
          isMultiSet: true,
          correctSet: ans,
          boxes: boxes
        }
      ],
      correctText: ans.join('、 '),
      explanation: `【考え方】\nかけ算のペアで見つけると、もれなく探せます。\n` +
        ans.filter(d => d <= Math.sqrt(n)).map(d => `・${d} × ${n/d} ＝ ${n}`).join('\n') +
        `\nよって、約数はすべてで 【 ${ans.join('、 ')} 】 です。`
    };
  },

  // 3-6. 2数の公約数（すべて） 個数分の枠に分ける（順不同可）
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
    const boxes = ans.map((_, i) => ({
      id: `cd_${i}`,
      unit: i < ans.length - 1 ? '、' : '',
      class: 'input-narrow'
    }));

    return {
      category: 'divisor',
      categoryName: '約数・公約数',
      skill: '知識・技能',
      instruction: `次の数の公約数をすべてかきましょう。（順不同・枠に1つずつ入力）`,
      subtext: `【 ${a} と ${b} の公約数（全部で${ans.length}個） 】`,
      rows: [
        {
          label: '答え',
          isMultiSet: true,
          correctSet: ans,
          boxes: boxes
        }
      ],
      correctText: ans.join('、 '),
      explanation: `【考え方】\n・${a}の約数は ${divsA.join('、 ')}\n・${b}の約数は ${divsB.join('、 ')}\n両方に共通する約数（公約数）は 【 ${ans.join('、 ')} 】 です。`
    };
  },

  // 3-7. 2数の最大公約数
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
      rows: [
        {
          label: '答え',
          boxes: [
            { id: 'ans', unit: '', type: 'single_num', correct: ans, class: 'input-narrow' }
          ]
        }
      ],
      correctText: String(ans),
      explanation: `【考え方】\n小さい方の数 ${Math.min(a, b)} の約数のうち、大きい方から順にもう一方の数もわり切れるか調べます。\n最大公約数は 【 ${ans} 】 です。`
    };
  },

  // 3-8. 3数の公約数（すべて） 個数分の枠に分ける（順不同可）
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
    const boxes = ans.map((_, i) => ({
      id: `cd3_${i}`,
      unit: i < ans.length - 1 ? '、' : '',
      class: 'input-narrow'
    }));

    return {
      category: 'divisor',
      categoryName: '約数・公約数',
      skill: '知識・技能',
      instruction: `次の数の公約数をすべてかきましょう。（順不同・枠に1つずつ入力）`,
      subtext: `【 ${a} と ${b} と ${c} の公約数（全部で${ans.length}個） 】`,
      rows: [
        {
          label: '答え',
          isMultiSet: true,
          correctSet: ans,
          boxes: boxes
        }
      ],
      correctText: ans.join('、 '),
      explanation: `【考え方】\n3つの数すべての公約数は、3つの数の最大公約数（${gcd3(a, b, c)}）の約数と同じです。\n公約数はすべてで 【 ${ans.join('、 ')} 】 です。`
    };
  },

  // 4. 文章題: バスの同時発車（何時何分で枠を分ける！）
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
      rows: [
        {
          label: '答え',
          boxes: [
            { id: 'hour', prefix: '午前 ', unit: '時', type: 'single_num', correct: ansH, class: 'input-narrow', placeholder: '' },
            { id: 'min', prefix: '', unit: '分', type: 'single_num', correct: ansM, class: 'input-narrow', placeholder: '' }
          ]
        }
      ],
      correctText: `午前 ${ansH} 時 ${ansM} 分`,
      explanation: `【考え方】\n${c.a}と${c.b}の最小公倍数を求めればよいです。\n・${c.a}の倍数は ${c.a}、${c.a*2}、${c.a*3}…\n・${c.b}の倍数は ${c.b}、${c.b*2}、${c.b*3}…\n・${c.a}と${c.b}の最小公倍数は 【 ${period} 】\n${startStr}の${period}分後は、午前${ansH}時${ansM}分 です。`
    };
  },

  // 5. 文章題: 長方形を余りなく正方形に分ける
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
      rows: [
        {
          label: '① できるだけ大きい正方形をつくるとき、1辺は何cmになりますか。',
          isBlock: true,
          boxes: [
            { id: 'side', prefix: '1辺の長さ: ', unit: 'cm', type: 'single_num', correct: g, class: 'input-narrow' }
          ]
        },
        {
          label: '② ①のとき、正方形は何枚できますか。',
          isBlock: true,
          boxes: [
            { id: 'count', prefix: '正方形の数: ', unit: '枚', type: 'single_num', correct: totalCount, class: 'input-narrow' }
          ]
        }
      ],
      correctText: `① ${g}cm / ② ${totalCount}枚`,
      explanation: `【考え方】\n① ${c.w}と${c.h}の最大公約数を求めればよいです。\n　最大公約数は 【 ${g} 】 なので、1辺は ${g}cm です。\n② たて…${c.w} ÷ ${g} ＝ ${countW}\n　横…${c.h} ÷ ${g} ＝ ${countH}\n　${countW} × ${countH} ＝ 【 ${totalCount} 】 枚できます。`
    };
  },

  // 6. 文章題: 余りなく袋に分ける（アイテムごとに枠を分ける！）
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
      rows: [
        {
          label: `① できるだけ多くの${c.unitBag}に分けるには、${c.unitBag}の数をいくつにすればよいですか。`,
          isBlock: true,
          boxes: [
            { id: 'bag', prefix: `${c.unitBag}の数: `, unit: c.unitBag, type: 'single_num', correct: g, class: 'input-narrow' }
          ]
        },
        {
          label: `② ①のとき、1つの${c.unitBag}に入る${c.itemA}と${c.itemB}は、それぞれいくつですか。`,
          isBlock: true,
          boxes: [
            { id: 'eachA', prefix: `${c.itemA}の数: `, unit: '個、', type: 'single_num', correct: eachA, class: 'input-narrow' },
            { id: 'eachB', prefix: `${c.itemB}の数: `, unit: '個', type: 'single_num', correct: eachB, class: 'input-narrow' }
          ]
        }
      ],
      correctText: `① ${g}${c.unitBag} / ② ${c.itemA}: ${eachA}個、 ${c.itemB}: ${eachB}個`,
      explanation: `【考え方】\n① ${c.countA}と${c.countB}の最大公約数を求めればよいです。\n　最大公約数は 【 ${g} 】 なので、${g}${c.unitBag}です。\n② それぞれの個数を${c.unitBag}の数でわります。\n　・${c.itemA}…${c.countA} ÷ ${g} ＝ 【 ${eachA} 】 個\n　・${c.itemB}…${c.countB} ÷ ${g} ＝ 【 ${eachB} 】 個`
    };
  }
};

// ==========================================
// テトリスゲームエンジン (状態セーブ・復元・2分タイマー)
// ==========================================

const TETRIS_COLS = 10;
const TETRIS_ROWS = 20;
const BLOCK_SIZE = 20;

const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: '#06b6d4' },
  O: { shape: [[1, 1], [1, 1]], color: '#eab308' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a855f7' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#22c55e' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#ef4444' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#3b82f6' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f97316' }
};

class TetrisGame {
  constructor(onFinishCallback) {
    this.onFinish = onFinishCallback;
    this.canvas = document.getElementById('tetrisCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.nextCanvas = document.getElementById('nextCanvas');
    this.nextCtx = this.nextCanvas.getContext('2d');

    this.timerEl = document.getElementById('tetrisTimer');
    this.scoreEl = document.getElementById('tetrisScore');
    this.linesEl = document.getElementById('tetrisLines');
    this.gameOverOverlay = document.getElementById('gameOverOverlay');

    this.modal = document.getElementById('tetrisGameModal');
    this.timeUpModal = document.getElementById('timeUpModal');
    this.finalScoreEl = document.getElementById('finalScore');

    this.grid = this.createGrid();
    this.score = 0;
    this.lines = 0;
    this.timeLeft = 120; // 2分 (120秒)

    this.currentPiece = null;
    this.nextPiece = null;

    this.dropCounter = 0;
    this.dropInterval = 800; // ms
    this.lastTime = 0;
    this.animId = null;
    this.timerId = null;
    this.isPlaying = false;

    this.initEvents();
  }

  createGrid() {
    return Array.from({ length: TETRIS_ROWS }, () => Array(TETRIS_COLS).fill(0));
  }

  initEvents() {
    // キーボード操作
    window.addEventListener('keydown', (e) => {
      if (!this.isPlaying) return;
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft') this.move(-1);
      else if (e.key === 'ArrowRight') this.move(1);
      else if (e.key === 'ArrowDown') this.drop();
      else if (e.key === 'ArrowUp') this.rotate();
      else if (e.key === ' ') this.hardDrop();
    });

    // タッチ操作ボタン
    document.getElementById('btnLeft').addEventListener('click', () => this.isPlaying && this.move(-1));
    document.getElementById('btnRight').addEventListener('click', () => this.isPlaying && this.move(1));
    document.getElementById('btnRotate').addEventListener('click', () => this.isPlaying && this.rotate());
    document.getElementById('btnDown').addEventListener('click', () => this.isPlaying && this.drop());

    // 勉強に戻るボタン
    document.getElementById('quitTetrisBtn').addEventListener('click', () => {
      this.pauseAndSave();
      this.closeGameModal();
    });

    // ゲームオーバー後のリトライ
    document.getElementById('retryTetrisBtn').addEventListener('click', () => {
      this.resetGame();
      this.gameOverOverlay.style.display = 'none';
      this.isPlaying = true;
    });

    // タイムアップ後の算数に戻るボタン
    document.getElementById('backToMathBtn').addEventListener('click', () => {
      this.timeUpModal.style.display = 'none';
      this.closeGameModal();
    });
  }

  // ゲーム開始（状態復元または新規）
  start() {
    this.modal.style.display = 'flex';
    this.gameOverOverlay.style.display = 'none';
    this.timeUpModal.style.display = 'none';

    this.loadSavedState();

    this.timeLeft = 120; // 毎回2分間のプレイ時間
    this.updateTimerDisplay();

    this.isPlaying = true;
    this.lastTime = performance.now();
    this.dropCounter = 0;

    // ゲームループ開始
    cancelAnimationFrame(this.animId);
    this.gameLoop(performance.now());

    // 2分間タイマー開始
    clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.tickTimer();
    }, 1000);
  }

  // 1秒ごとのタイマー処理
  tickTimer() {
    if (!this.isPlaying) return;
    this.timeLeft--;
    this.updateTimerDisplay();

    if (this.timeLeft <= 0) {
      // 2分経過！一時停止してセーブ
      this.pauseAndSave();
      this.showTimeUp();
    }
  }

  updateTimerDisplay() {
    const mins = Math.floor(this.timeLeft / 60);
    const secs = this.timeLeft % 60;
    this.timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  showTimeUp() {
    this.isPlaying = false;
    this.finalScoreEl.textContent = this.score;
    this.timeUpModal.style.display = 'flex';
  }

  closeGameModal() {
    this.isPlaying = false;
    cancelAnimationFrame(this.animId);
    clearInterval(this.timerId);
    this.modal.style.display = 'none';
    if (this.onFinish) this.onFinish();
  }

  // ゲーム状態の保存（LocalStorage）
  pauseAndSave() {
    this.isPlaying = false;
    cancelAnimationFrame(this.animId);
    clearInterval(this.timerId);

    const saveData = {
      grid: this.grid,
      score: this.score,
      lines: this.lines,
      currentPiece: this.currentPiece,
      nextPiece: this.nextPiece
    };
    try {
      localStorage.setItem('saved_tetris_game', JSON.stringify(saveData));
    } catch (e) {}
  }

  // 保存状態の復元
  loadSavedState() {
    try {
      const raw = localStorage.getItem('saved_tetris_game');
      if (raw) {
        const data = JSON.parse(raw);
        if (data.grid && data.grid.length === TETRIS_ROWS) {
          this.grid = data.grid;
          this.score = data.score || 0;
          this.lines = data.lines || 0;
          this.currentPiece = data.currentPiece || this.generatePiece();
          this.nextPiece = data.nextPiece || this.generatePiece();
          this.updateStatsUI();
          this.draw();
          return;
        }
      }
    } catch (e) {}

    // セーブがなければ新規初期化
    this.resetGame();
  }

  resetGame() {
    this.grid = this.createGrid();
    this.score = 0;
    this.lines = 0;
    this.currentPiece = this.generatePiece();
    this.nextPiece = this.generatePiece();
    this.updateStatsUI();
    this.draw();
  }

  generatePiece() {
    const keys = Object.keys(TETROMINOES);
    const key = pickRandom(keys);
    const template = TETROMINOES[key];
    return {
      shape: template.shape.map(r => [...r]),
      color: template.color,
      x: Math.floor(TETRIS_COLS / 2) - Math.ceil(template.shape[0].length / 2),
      y: 0
    };
  }

  gameLoop(time = 0) {
    if (!this.isPlaying) return;

    const delta = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += delta;

    if (this.dropCounter > this.dropInterval) {
      this.drop();
    }

    this.draw();
    this.animId = requestAnimationFrame((t) => this.gameLoop(t));
  }

  move(dir) {
    this.currentPiece.x += dir;
    if (this.collide()) {
      this.currentPiece.x -= dir;
    }
  }

  drop() {
    this.currentPiece.y++;
    if (this.collide()) {
      this.currentPiece.y--;
      this.merge();
      this.clearLines();
      this.spawnNext();
    }
    this.dropCounter = 0;
  }

  hardDrop() {
    while (!this.collide()) {
      this.currentPiece.y++;
    }
    this.currentPiece.y--;
    this.merge();
    this.clearLines();
    this.spawnNext();
    this.dropCounter = 0;
  }

  rotate() {
    const original = this.currentPiece.shape;
    const rotated = original[0].map((_, i) => original.map(row => row[i]).reverse());
    this.currentPiece.shape = rotated;

    if (this.collide()) {
      // 壁キック簡易処理
      if (this.currentPiece.x < 0) this.currentPiece.x = 0;
      else if (this.currentPiece.x + rotated[0].length > TETRIS_COLS) {
        this.currentPiece.x = TETRIS_COLS - rotated[0].length;
      }
      if (this.collide()) {
        this.currentPiece.shape = original;
      }
    }
  }

  collide() {
    const piece = this.currentPiece;
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          const newX = piece.x + c;
          const newY = piece.y + r;
          if (newX < 0 || newX >= TETRIS_COLS || newY >= TETRIS_ROWS) return true;
          if (newY >= 0 && this.grid[newY][newX]) return true;
        }
      }
    }
    return false;
  }

  merge() {
    const piece = this.currentPiece;
    piece.shape.forEach((row, r) => {
      row.forEach((val, c) => {
        if (val) {
          const y = piece.y + r;
          const x = piece.x + c;
          if (y >= 0 && y < TETRIS_ROWS && x >= 0 && x < TETRIS_COLS) {
            this.grid[y][x] = piece.color;
          }
        }
      });
    });
  }

  clearLines() {
    let linesCleared = 0;
    for (let r = TETRIS_ROWS - 1; r >= 0; r--) {
      if (this.grid[r].every(cell => cell !== 0)) {
        this.grid.splice(r, 1);
        this.grid.unshift(Array(TETRIS_COLS).fill(0));
        linesCleared++;
        r++; // 再検査
      }
    }

    if (linesCleared > 0) {
      const scoreTable = [0, 100, 300, 500, 800];
      this.score += scoreTable[linesCleared] || (linesCleared * 200);
      this.lines += linesCleared;
      this.updateStatsUI();
      // 速度アップ
      this.dropInterval = Math.max(200, 800 - this.lines * 15);
    }
  }

  spawnNext() {
    this.currentPiece = this.nextPiece;
    this.nextPiece = this.generatePiece();

    if (this.collide()) {
      // ゲームオーバー
      this.isPlaying = false;
      this.gameOverOverlay.style.display = 'flex';
      try {
        localStorage.removeItem('saved_tetris_game');
      } catch (e) {}
    }
  }

  updateStatsUI() {
    this.scoreEl.textContent = this.score;
    this.linesEl.textContent = this.lines;
  }

  draw() {
    // メイン盤面クリア
    this.ctx.fillStyle = '#090d16';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // グリッド線
    this.ctx.strokeStyle = '#1e293b';
    this.ctx.lineWidth = 0.5;
    for (let c = 0; c <= TETRIS_COLS; c++) {
      this.ctx.beginPath();
      this.ctx.moveTo(c * BLOCK_SIZE, 0);
      this.ctx.lineTo(c * BLOCK_SIZE, TETRIS_ROWS * BLOCK_SIZE);
      this.ctx.stroke();
    }
    for (let r = 0; r <= TETRIS_ROWS; r++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, r * BLOCK_SIZE);
      this.ctx.lineTo(TETRIS_COLS * BLOCK_SIZE, r * BLOCK_SIZE);
      this.ctx.stroke();
    }

    // 配置済みブロック
    for (let r = 0; r < TETRIS_ROWS; r++) {
      for (let c = 0; c < TETRIS_COLS; c++) {
        if (this.grid[r][c]) {
          this.drawBlock(this.ctx, c * BLOCK_SIZE, r * BLOCK_SIZE, this.grid[r][c]);
        }
      }
    }

    // 落下中ピース
    if (this.currentPiece) {
      this.currentPiece.shape.forEach((row, r) => {
        row.forEach((val, c) => {
          if (val) {
            const x = (this.currentPiece.x + c) * BLOCK_SIZE;
            const y = (this.currentPiece.y + r) * BLOCK_SIZE;
            this.drawBlock(this.ctx, x, y, this.currentPiece.color);
          }
        });
      });
    }

    // NEXTミノ描画
    this.nextCtx.fillStyle = '#090d16';
    this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
    if (this.nextPiece) {
      const p = this.nextPiece;
      const bSize = 16;
      const offX = (this.nextCanvas.width - p.shape[0].length * bSize) / 2;
      const offY = (this.nextCanvas.height - p.shape.length * bSize) / 2;
      p.shape.forEach((row, r) => {
        row.forEach((val, c) => {
          if (val) {
            this.drawBlock(this.nextCtx, offX + c * bSize, offY + r * bSize, p.color, bSize);
          }
        });
      });
    }
  }

  drawBlock(context, x, y, color, size = BLOCK_SIZE) {
    context.fillStyle = color;
    context.fillRect(x + 1, y + 1, size - 2, size - 2);

    // ぷっくり立体感ハイライト
    context.fillStyle = 'rgba(255, 255, 255, 0.35)';
    context.fillRect(x + 1, y + 1, size - 2, 3);
    context.fillRect(x + 1, y + 1, 3, size - 2);

    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.fillRect(x + size - 4, y + 1, 3, size - 2);
    context.fillRect(x + 1, y + size - 4, size - 2, 3);
  }
}

// ==========================================
// 算数ドリルアプリケーションコントローラ
// ==========================================

class MathDrillApp {
  constructor() {
    this.currentQuestion = null;
    this.lastQuestionKey = null;
    this.isAnswered = false;

    // 成績データ
    this.combo = 0;
    this.totalSolved = 0;
    this.totalCorrect = 0;

    // DOM要素
    this.comboEl = document.getElementById('comboCount');
    this.tetrisHintEl = document.getElementById('tetrisHint');
    this.solvedEl = document.getElementById('totalSolved');
    this.rateEl = document.getElementById('correctRate');

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

    // テトリスモーダル要素
    this.tetrisUnlockModal = document.getElementById('tetrisUnlockModal');
    this.startTetrisBtn = document.getElementById('startTetrisBtn');
    this.skipTetrisBtn = document.getElementById('skipTetrisBtn');

    // テトリスゲーム初期化（終了時に呼ばれるコールバックを渡す）
    this.tetris = new TetrisGame(() => {
      // テトリス終了後、次の問題へ
      this.loadNextQuestion();
    });

    this.initEvents();
    this.updateStats();
    this.loadNextQuestion();
  }

  initEvents() {
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

    // テトリス開始ボタン
    this.startTetrisBtn.addEventListener('click', () => {
      this.tetrisUnlockModal.style.display = 'none';
      this.combo = 0; // 次の10問に向けてリセット
      this.updateStats();
      this.tetris.start();
    });

    // テトリススキップボタン（今は勉強を続ける）
    this.skipTetrisBtn.addEventListener('click', () => {
      this.tetrisUnlockModal.style.display = 'none';
      this.combo = 0;
      this.updateStats();
      this.loadNextQuestion();
    });

    // テトリス動作確認ボタン（即座にテトリスをテストできる）
    const testBtn = document.getElementById('testTetrisBtn');
    if (testBtn) {
      testBtn.addEventListener('click', () => {
        this.tetris.start();
      });
    }

    // キーボード操作（Enterでこたえあわせ／次へ）
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (this.tetrisUnlockModal.style.display === 'flex') {
          e.preventDefault();
          this.startTetrisBtn.click();
        } else if (this.isAnswered && !this.tetris.isPlaying) {
          e.preventDefault();
          this.loadNextQuestion();
        }
      }
    });
  }

  loadNextQuestion() {
    this.isAnswered = false;
    this.resultContainer.style.display = 'none';
    this.submitBtn.disabled = false;
    this.submitBtn.style.display = 'inline-flex';

    // 常に全問題からランダム出題（同じ問題が連続しないように選択）
    const allKeys = Object.keys(generators);
    let chosenKey = pickRandom(allKeys);
    if (allKeys.length > 1 && chosenKey === this.lastQuestionKey) {
      const otherKeys = allKeys.filter(k => k !== this.lastQuestionKey);
      chosenKey = pickRandom(otherKeys);
    }
    this.lastQuestionKey = chosenKey;
    this.currentQuestion = generators[chosenKey]();

    this.renderQuestion();
  }

  renderQuestion() {
    const q = this.currentQuestion;

    this.instructionEl.textContent = q.instruction;

    if (q.subtext) {
      this.subtextEl.style.display = 'block';
      this.subtextEl.textContent = q.subtext;
    } else {
      this.subtextEl.style.display = 'none';
    }

    this.inputContainer.innerHTML = '';

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

    const allInputs = [];

    q.rows.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.className = row.isBlock ? 'input-row-block' : 'input-row';

      if (row.label) {
        const labelSpan = document.createElement('div');
        labelSpan.className = 'input-label';
        labelSpan.textContent = row.label;
        rowDiv.appendChild(labelSpan);
      }

      const wrapDiv = document.createElement('div');
      wrapDiv.className = 'multi-box-wrap';

      row.boxes.forEach(box => {
        const itemSpan = document.createElement('span');
        itemSpan.className = 'box-item';

        if (box.prefix) {
          const prefixSpan = document.createElement('span');
          prefixSpan.className = 'input-unit';
          prefixSpan.textContent = box.prefix;
          itemSpan.appendChild(prefixSpan);
        }

        const fieldWrap = document.createElement('span');
        fieldWrap.className = 'input-field-wrap';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `box_${box.id}`;
        input.className = `math-input ${box.class || ''}`;
        input.placeholder = box.placeholder || '';
        input.autocomplete = 'off';

        fieldWrap.appendChild(input);
        itemSpan.appendChild(fieldWrap);

        if (box.unit) {
          const unitSpan = document.createElement('span');
          unitSpan.className = 'input-unit';
          unitSpan.textContent = box.unit;
          itemSpan.appendChild(unitSpan);
        }

        wrapDiv.appendChild(itemSpan);
        allInputs.push(input);
      });

      rowDiv.appendChild(wrapDiv);
      this.inputContainer.appendChild(rowDiv);
    });

    allInputs.forEach((inp, idx) => {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          if (idx < allInputs.length - 1) {
            e.preventDefault();
            allInputs[idx + 1].focus();
          }
        }
      });
    });

    setTimeout(() => {
      if (allInputs.length > 0) allInputs[0].focus();
    }, 50);
  }

  checkAnswer() {
    this.isAnswered = true;
    const q = this.currentQuestion;
    let allCorrect = true;

    q.rows.forEach(row => {
      if (row.isMultiSet) {
        const userVals = [];
        row.boxes.forEach(box => {
          const el = document.getElementById(`box_${box.id}`);
          const v = parseInt(normalizeStr(el ? el.value : ''), 10);
          if (!isNaN(v)) userVals.push(v);
        });

        const expected = [...row.correctSet].sort((a, b) => a - b);
        const actual = [...userVals].sort((a, b) => a - b);
        const isMatch = expected.length === actual.length &&
          expected.every((num, i) => actual[i] === num);

        row.boxes.forEach(box => {
          const el = document.getElementById(`box_${box.id}`);
          if (el) {
            const wrap = el.parentElement;
            if (isMatch) {
              wrap.style.borderColor = '#10b981';
              wrap.style.backgroundColor = '#f0fdf4';
            } else {
              wrap.style.borderColor = '#ef4444';
              wrap.style.backgroundColor = '#fef2f2';
            }
          }
        });

        if (!isMatch) allCorrect = false;

      } else {
        row.boxes.forEach(box => {
          const el = document.getElementById(`box_${box.id}`);
          const val = el ? el.value : '';
          let isBoxCorrect = false;

          if (box.type === 'term') {
            isBoxCorrect = checkTermMatch(val, box.correct);
          } else if (box.type === 'single_num') {
            const parsed = parseInt(normalizeStr(val), 10);
            isBoxCorrect = parsed === box.correct;
          }

          if (el) {
            const wrap = el.parentElement;
            if (isBoxCorrect) {
              wrap.style.borderColor = '#10b981';
              wrap.style.backgroundColor = '#f0fdf4';
            } else {
              wrap.style.borderColor = '#ef4444';
              wrap.style.backgroundColor = '#fef2f2';
            }
          }

          if (!isBoxCorrect) allCorrect = false;
        });
      }
    });

    this.totalSolved++;
    if (allCorrect) {
      this.totalCorrect++;
      this.combo++;
    } else {
      this.combo = 0;
    }
    this.updateStats();

    this.showResult(allCorrect, q.correctText, q.explanation);

    // 10問連続正解達成！
    if (this.combo >= 10) {
      setTimeout(() => {
        this.tetrisUnlockModal.style.display = 'flex';
      }, 700);
    }
  }

  showResult(isCorrect, answerStr, explanation) {
    this.resultContainer.style.display = 'flex';
    this.submitBtn.style.display = 'none';

    if (isCorrect) {
      this.resultBanner.className = 'result-banner correct';
      this.resultIcon.textContent = '💮';
      this.resultText.textContent = this.combo >= 10
        ? `🎉 10問連続正解達成！！テトリス解放！！`
        : `せいかい！ ${this.combo}問れんぞく正解！`;
    } else {
      this.resultBanner.className = 'result-banner incorrect';
      this.resultIcon.textContent = '❌';
      this.resultText.textContent = 'おしい！もう一度解き方を確認しよう！';
    }

    this.correctAnswerContent.textContent = answerStr;
    this.explanationContent.textContent = explanation;

    this.nextBtn.focus();
  }

  updateStats() {
    this.comboEl.textContent = this.combo;
    const remaining = 10 - this.combo;
    if (remaining > 0) {
      this.tetrisHintEl.textContent = `あと${remaining}問でテトリス🎮`;
    } else {
      this.tetrisHintEl.textContent = `テトリス解放！🎉`;
    }

    this.solvedEl.textContent = this.totalSolved;
    const rate = this.totalSolved === 0 ? 100 : Math.round((this.totalCorrect / this.totalSolved) * 100);
    this.rateEl.textContent = rate;
  }
}

// 起動
document.addEventListener('DOMContentLoaded', () => {
  new MathDrillApp();
});
