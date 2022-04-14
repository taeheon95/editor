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
    reg: /([^\n]+)\n(={3,})/g,
    replaceStr: `<h1>$1</h1>`,
  },
  {
    reg: /([^\n]+)\n(-{3,})/g,
    replaceStr: `<h2>$1</h2>`,
  },
  {
    reg: /\*\*([^*\n]+)\*\*/g,
    replaceStr: `<span style='font-weight:bold'>$1</span>`,
  },
  {
    reg: /__([^*\n]+)\*\*/g,
    replaceStr: `<span style='font-weight:bold'>$1</span>`,
  },
  {
    reg: /\*([^*\n]+)\*/g,
    replaceStr: `<span style='font-style:italic'>$1</spna>`,
  },
  {
    reg: /_([^*\n]+)_/g,
    replaceStr: `<span style='font-style:italic'>$1</span>`,
  },
  {
    reg: /~~(.+)~~/g,
    replaceStr: `<span style='text-decoration:line-through'>$1</span>`,
  },
  {
    reg: /\*{3,}/g,
    replaceStr: `<hr/>`,
  },
  {
    reg: /_{3,}/g,
    replaceStr: `<hr/>`,
  },
  {
    reg: /"(?!(http|https):\/\/(.+))/g,
    replaceStr: `<a href="$&">$&</a>`,
  },
  {
    reg: /!\[(.*)\]\((.*)\)/g,
    replaceStr: `<img src='$2' alt='$1'/>`,
  },
  {
    reg: /\[(.*)\]\((.*)\)/g,
    replaceStr: `<a href='$2'>$1</a>`,
  },
  {
    reg: /^>(.+)/g,
    replaceStr: `<blockquote>$1</blockquote>`,
  },
];

export { markDownRules };
