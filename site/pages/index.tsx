import { useState, useEffect } from 'react';
import Head from 'next/head';

const B = { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' };

function Box({ title, children, accent = 'text-[#7aa2f7]' }: { title?: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className="my-4">
      <div className={accent}>
        {B.tl}{title ? `${B.h}${B.h} ${title} ` : ''}{B.h.repeat(title ? Math.max(0, 52 - title.length) : 56)}{B.tr}
      </div>
      <div>{children}</div>
      <div className={accent}>
        {B.bl}{B.h.repeat(56)}{B.br}
      </div>
    </div>
  );
}

function Line({ prompt, cmd, flag, args, dim }: { prompt?: string; cmd?: string; flag?: string; args?: string; dim?: boolean }) {
  return (
    <div className={dim ? 'text-[#565f89]' : ''}>
      <span className="text-[#7aa2f7]">{B.v}</span>
      {' '}
      {prompt && <span className="text-[#9ece6a]">{prompt}</span>}
      {cmd && <span className="text-[#c0caf5]">{cmd}</span>}
      {flag && <span className="text-[#bb9af7]">{flag}</span>}
      {args && <span className="text-[#e0af68]">{args}</span>}
      <span className="float-right text-[#7aa2f7]">{B.v}</span>
    </div>
  );
}

function EmptyLine() {
  return <div><span className="text-[#7aa2f7]">{B.v}</span><span className="float-right text-[#7aa2f7]">{B.v}</span></div>;
}

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
            <span className="text-[#9ece6a]">$ </span>
            <span className="text-[#c0caf5]">{typed}</span>
            {typed.length < full.length && <span className="text-[#7aa2f7] animate-pulse">█</span>}
          </div>
        </div>

        <Box title="What is this?" accent="text-[#9ece6a]">
          <Line prompt="  " cmd="Atomic CLI for Google Trends data." />
          <Line prompt="  " cmd="One command. Real data. Pure JSON." />
          <EmptyLine />
          <Line prompt="  " cmd="Uses " flag="playwriter" args=" browser automation" />
          <Line prompt="  " cmd="to scrape trends.google.com directly." />
          <Line prompt="  " cmd="No API keys. No auth. No config." />
        </Box>

        <Box title="Install">
          <Line prompt="  $ " cmd="npm install -g " flag="@remorses/playwriter" />
          <Line prompt="  $ " cmd="git clone " args="https://github.com/AnEntrypoint/trends-cli" />
          <Line prompt="  $ " cmd="cd trends-cli && chmod +x trends" />
        </Box>

        <Box title="Usage">
          <Line prompt="  $ " cmd="./trends " args={'"artificial intelligence"'} />
          <Line prompt="  $ " cmd="./trends " args={'"python"'} flag=" --geo " args="US" />
          <Line prompt="  $ " cmd="./trends " args={'"golang"'} flag=" --time " args={'"today 12-m"'} />
          <Line prompt="  $ " cmd="./trends " args={'"rust"'} flag=" --csv" />
          <Line prompt="  $ " cmd="./trends " args={'"python,golang,rust"'} />
        </Box>

        <Box title="Flags" accent="text-[#bb9af7]">
          <Line prompt="  " flag="--geo " cmd="<code>  " args="Region filter (US, GB, DE, ...)" />
          <Line prompt="  " flag="--time " cmd="<range> " args="Time range (today 12-m, ...)" />
          <Line prompt="  " flag="--csv " cmd="        " args="Output CSV instead of JSON" />
          <Line prompt="  " flag="--help" cmd="         " args="Show help" />
        </Box>

        <Box title="Output" accent="text-[#e0af68]">
          <div className="text-[#7aa2f7]">{B.v}</div>
          <pre className="text-[#9ece6a] pl-4 pr-4">{`  {
    "query": "artificial intelligence",
    "success": true,
    "geo": "worldwide",
    "timeSeriesData": [
      { "date": "Apr 13, 2025", "value": 23 },
      { "date": "Apr 20, 2025", "value": 24 }
    ],
    "relatedQueries": [...],
    "risingTopics": [...]
  }`}</pre>
        </Box>

        <Box title="Features">
          <Line prompt="  " cmd="[" flag="x" cmd="] Single command execution" />
          <Line prompt="  " cmd="[" flag="x" cmd="] Structured JSON output" />
          <Line prompt="  " cmd="[" flag="x" cmd="] CSV export with --csv" />
          <Line prompt="  " cmd="[" flag="x" cmd="] Region filtering with --geo" />
          <Line prompt="  " cmd="[" flag="x" cmd="] Time range with --time" />
          <Line prompt="  " cmd="[" flag="x" cmd="] Related queries extraction" />
          <Line prompt="  " cmd="[" flag="x" cmd="] Rising topics extraction" />
          <Line prompt="  " cmd="[" flag="x" cmd="] Exponential backoff retry" />
          <Line prompt="  " cmd="[" flag="x" cmd="] No API keys required" />
        </Box>

        <Box title="Requirements" accent="text-[#f7768e]">
          <Line prompt="  " flag="→ " cmd="Node.js 14+" />
          <Line prompt="  " flag="→ " cmd="@remorses/playwriter CLI" />
          <Line prompt="  " flag="→ " cmd="Chrome/Brave/Edge + playwriter extension" />
          <Line prompt="  " flag="→ " cmd="playwriter serve running" />
        </Box>

        <div className="text-center mt-8 mb-4 space-y-2">
          <div>
            <a href="https://github.com/AnEntrypoint/trends-cli" className="text-[#7aa2f7] hover:text-[#bb9af7] transition-colors">
              {'['} GitHub {']'}
            </a>
            <span className="text-[#565f89] mx-4">{'│'}</span>
            <span className="text-[#565f89]">MIT License</span>
            <span className="text-[#565f89] mx-4">{'│'}</span>
            <span className="text-[#565f89]">AnEntrypoint</span>
          </div>
          <div className="text-[#565f89] text-xs cursor-blink">
            <span className="text-[#9ece6a]">$ </span>_
          </div>
        </div>
      </div>
    </>
  );
}
