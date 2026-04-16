import { useState, useEffect } from 'react';
import Head from 'next/head';

const B = { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' };
const W = 56;

function Box({ title, children, accent = 'text-[#7aa2f7]' }: { title?: string; children: React.ReactNode; accent?: string }) {
  const fill = title ? Math.max(0, W - title.length - 3) : W;
  return (
    <div className="my-4">
      <div className={accent}>{B.tl}{title ? `${B.h} ${title} ` : ''}{B.h.repeat(fill)}{B.tr}</div>
      <div>{children}</div>
      <div className={accent}>{B.bl}{B.h.repeat(W)}{B.br}</div>
    </div>
  );
}

function R({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <span className="text-[#7aa2f7]">{B.v}</span>
      {' '}{children}
      <span className="float-right text-[#7aa2f7]">{B.v}</span>
    </div>
  );
}

const G = ({ children }: { children: React.ReactNode }) => <span className="text-[#9ece6a]">{children}</span>;
const P = ({ children }: { children: React.ReactNode }) => <span className="text-[#bb9af7]">{children}</span>;
const A = ({ children }: { children: React.ReactNode }) => <span className="text-[#e0af68]">{children}</span>;
const D = ({ children }: { children: React.ReactNode }) => <span className="text-[#565f89]">{children}</span>;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [typed, setTyped] = useState('');
  const full = './trends "artificial intelligence"';

  useEffect(() => {
    setMounted(true);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(iv);
    }, 50);
    return () => clearInterval(iv);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>trends-cli</title>
        <meta name="description" content="Atomic CLI for Google Trends lookups" />
      </Head>

      <div className="min-h-screen bg-[#1a1b26] text-[#c0caf5] font-mono text-sm p-4 max-w-3xl mx-auto">

        <div className="text-center my-8">
          <pre className="text-[#7aa2f7] text-xs sm:text-sm leading-tight inline-block text-left">{`
  ╔╦╗╦═╗╔═╗╔╗╔╔╦╗╔═╗  ╔═╗╦  ╦
   ║ ╠╦╝║╣ ║║║ ║║╚═╗  ║  ║  ║
   ╩ ╩╚═╚═╝╝╚╝═╩╝╚═╝  ╚═╝╩═╝╩`}</pre>
          <p className="text-[#565f89] mt-2">v1.0.0</p>
        </div>

        <div className="border border-[#33467c] rounded p-4 mb-6 bg-[#1a1b26]">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-[#f7768e] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#e0af68] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#9ece6a] inline-block" />
            <span className="text-[#565f89] ml-2">~/trends-cli</span>
          </div>
          <div>
            <G>$ </G>
            <span>{typed}</span>
            {typed.length < full.length && <span className="text-[#7aa2f7] animate-pulse">█</span>}
          </div>
        </div>

        <Box title="What is this?" accent="text-[#9ece6a]">
          <R><span>Atomic CLI for Google Trends data.</span></R>
          <R><span>One command. Real data. Pure JSON.</span></R>
          <R><span>&nbsp;</span></R>
          <R><span>Uses <P>playwriter</P> <A>browser automation</A></span></R>
          <R><span>to scrape trends.google.com directly.</span></R>
          <R><span>No API keys. No auth. No config.</span></R>
        </Box>

        <Box title="Install">
          <R><G>$ </G>npm install -g <P>@remorses/playwriter</P></R>
          <R><G>$ </G>git clone <A>https://github.com/AnEntrypoint/trends-cli</A></R>
          <R><G>$ </G>cd trends-cli && chmod +x trends</R>
        </Box>

        <Box title="Usage">
          <R><G>$ </G>./trends <A>{'"artificial intelligence"'}</A></R>
          <R><G>$ </G>./trends <A>{'"python"'}</A> <P>--geo</P> <A>US</A></R>
          <R><G>$ </G>./trends <A>{'"golang"'}</A> <P>--time</P> <A>{'"today 12-m"'}</A></R>
          <R><G>$ </G>./trends <A>{'"rust"'}</A> <P>--csv</P></R>
          <R><G>$ </G>./trends <A>{'"python,golang,rust"'}</A></R>
        </Box>

        <Box title="Flags" accent="text-[#bb9af7]">
          <R><P>--geo </P>{'<code>   '}<A>Region filter (US, GB, DE, ...)</A></R>
          <R><P>--time </P>{'<range>  '}<A>Time range (today 12-m, ...)</A></R>
          <R><P>--csv </P>{'         '}<A>Output CSV instead of JSON</A></R>
          <R><P>--help</P>{'         '}<A>Show help</A></R>
        </Box>

        <Box title="Output" accent="text-[#e0af68]">
          <pre className="text-[#9ece6a] px-2">{`│  {
│    "query": "artificial intelligence",
│    "success": true,
│    "geo": "worldwide",
│    "timeSeriesData": [
│      { "date": "Apr 13, 2025", "value": 23 },
│      { "date": "Apr 20, 2025", "value": 24 }
│    ],
│    "relatedQueries": [...],
│    "risingTopics": [...]
│  }`}</pre>
        </Box>

        <Box title="Features">
          <R><span> [<P>x</P>] Single command execution</span></R>
          <R><span> [<P>x</P>] Structured JSON output</span></R>
          <R><span> [<P>x</P>] CSV export with --csv</span></R>
          <R><span> [<P>x</P>] Region filtering with --geo</span></R>
          <R><span> [<P>x</P>] Time range with --time</span></R>
          <R><span> [<P>x</P>] Related queries extraction</span></R>
          <R><span> [<P>x</P>] Rising topics extraction</span></R>
          <R><span> [<P>x</P>] Exponential backoff retry</span></R>
          <R><span> [<P>x</P>] No API keys required</span></R>
        </Box>

        <Box title="Requirements" accent="text-[#f7768e]">
          <R><P>→ </P>Node.js 14+</R>
          <R><P>→ </P>@remorses/playwriter CLI</R>
          <R><P>→ </P>Chrome/Brave/Edge + playwriter extension</R>
          <R><P>→ </P>playwriter serve running</R>
        </Box>

        <div className="text-center mt-8 mb-4 space-y-2">
          <div>
            <a href="https://github.com/AnEntrypoint/trends-cli" className="text-[#7aa2f7] hover:text-[#bb9af7] transition-colors">
              {'['} GitHub {']'}
            </a>
            <span className="text-[#565f89] mx-4">│</span>
            <D>MIT License</D>
            <span className="text-[#565f89] mx-4">│</span>
            <D>AnEntrypoint</D>
          </div>
          <div className="text-[#565f89] text-xs cursor-blink">
            <G>$ </G>_
          </div>
        </div>
      </div>
    </>
  );
}
