export type MatchCandidate = {
  id: string;
  prompt: string;
  aliases: string[];
  answers: { variant: string; body: string }[];
};

export type MatchResult = {
  id: string;
  prompt: string;
  answer: string;
  confidence: number;
};

const STOP = new Set([
  "the", "a", "an", "is", "are", "am", "do", "does", "did", "you", "your", "yours",
  "can", "could", "would", "will", "what", "which", "who", "whom", "how", "when",
  "where", "why", "with", "for", "and", "or", "of", "to", "in", "on", "at", "my",
  "me", "i", "we", "our", "about", "please", "just", "any", "some", "this", "that",
]);

const SYNONYMS: Record<string, string> = {
  nextjs: "next",
  "next.js": "next",
  reactjs: "react",
  "react.js": "react",
  nodejs: "node",
  "node.js": "node",
  postgresql: "postgres",
  psql: "postgres",
  website: "web",
  websites: "web",
  app: "application",
  apps: "application",
  cost: "price",
  pricing: "price",
  rates: "price",
  rate: "price",
  quote: "price",
  budget: "price",
  charge: "price",
  available: "availability",
  freelance: "availability",
  hire: "availability",
  hiring: "availability",
  timeline: "timeline",
  deadline: "timeline",
  duration: "timeline",
  eta: "timeline",
  maintain: "maintenance",
  support: "maintenance",
  warranty: "maintenance",
  team: "collaboration",
  collaborate: "collaboration",
  nda: "confidential",
  secret: "confidential",
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string) {
  return normalize(text)
    .split(" ")
    .map((word) => SYNONYMS[word] || word)
    .filter((word) => word.length > 1 && !STOP.has(word));
}

function levenshtein(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cur = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = cur;
    }
  }
  return row[b.length];
}

export function scorePhrase(query: string, candidate: string) {
  const qn = normalize(query);
  const cn = normalize(candidate);
  if (!qn || !cn) return 0;
  if (qn === cn) return 1;
  if (qn.length > 6 && cn.includes(qn)) return 0.92;
  if (cn.length > 6 && qn.includes(cn)) return 0.88;

  const qt = tokens(query);
  const ct = tokens(candidate);
  if (!qt.length || !ct.length) return 0;

  const qset = new Set(qt);
  const cset = new Set(ct);
  let inter = 0;
  for (const token of qset) {
    if (cset.has(token)) inter += 1;
  }
  const union = qset.size + cset.size - inter;
  const jaccard = union ? inter / union : 0;
  const coverage = inter / qset.size;

  let lev = 0;
  if (qn.length < 56 && cn.length < 90) {
    lev = 1 - levenshtein(qn, cn) / Math.max(qn.length, cn.length);
  }

  return jaccard * 0.34 + coverage * 0.48 + Math.max(0, lev) * 0.18;
}

export const MATCH_THRESHOLD = 0.42;

export function matchQuestion(query: string, candidates: MatchCandidate[]): MatchResult | null {
  let best: MatchResult | null = null;
  for (const item of candidates) {
    let score = scorePhrase(query, item.prompt);
    for (const alias of item.aliases) {
      score = Math.max(score, scorePhrase(query, alias) * 0.98);
    }
    if (!best || score > best.confidence) {
      const pick =
        item.answers.find((entry) => entry.variant === "default") || item.answers[0];
      if (!pick) continue;
      best = {
        id: item.id,
        prompt: item.prompt,
        answer: pick.body,
        confidence: score,
      };
    }
  }
  if (!best || best.confidence < MATCH_THRESHOLD) return null;
  return best;
}
