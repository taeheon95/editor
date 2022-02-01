interface markDownRule {
  reg: RegExp;
  replaceStr: string | ((str: string, ...args: string[]) => string);
}

const markDownRules: Array<markDownRule> = [
  {
    reg: /(#{1,6})\s([^\n]+)/g,
    replaceStr: (str: string, p1: string, p2: string) => {
      return `<h${p1.length}>${p2}</h${p1.length}>`;
    },
  },
  {
    reg: /(\*|_){2}([^*\n]+)(\*|_){2}/g,
    replaceStr: `<span style='font-weight:bold'>$1</span>`,
  },
  {
    reg: /(\*|_)([^*\n]+)(\*|_)/g,
    replaceStr: `<span style='font-style:italic'>$1</spna>`,
  },
  {
    reg: /^>\s(.+)/g,
    replaceStr: `<blockquote>$1</blockquote>`,
  },
];

export { markDownRules };
