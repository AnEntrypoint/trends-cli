import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dark = localStorage.getItem('theme') === 'dark' ||
                 (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(dark);
    updateTheme(dark);
  }, []);

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    updateTheme(newDark);
  };

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>Trends CLI - Atomic Google Trends Lookups</title>
        <meta name="description" content="Single-command CLI tool for fetching Google Trends data atomically" />
      </Head>

      <div className={isDark ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
          {/* Navigation */}
          <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur z-50 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📈</span>
                <span className="font-bold text-xl">Trends CLI</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Features</a>
                <a href="#usage" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Usage</a>
                <a href="https://github.com/AnEntrypoint/trends-cli" className="hover:text-blue-600 dark:hover:text-blue-400 transition">GitHub</a>
                <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
                  {isDark ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </nav>

          {/* Hero */}
          <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Trends CLI
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8">
                Atomic command-line tool for Google Trends lookups
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-500 mb-12">
                One command. Pure JSON. Full platform support.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition" onClick={() => document.getElementById('usage')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Started
                </button>
                <a href="https://github.com/AnEntrypoint/trends-cli" className="px-8 py-4 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                  View on GitHub
                </a>
              </div>

              {/* Feature Chips */}
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">⚡ Atomic</span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">📊 Real Data</span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">🔧 JSON Output</span>
                <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">🚀 Fast</span>
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16">Features</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2">Single Command</h3>
                  <p className="text-gray-600 dark:text-gray-400">One executable. Zero configuration. Pure simplicity.</p>
                </div>

                <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl mb-4">📈</div>
                  <h3 className="text-xl font-bold mb-2">Real Trends Data</h3>
                  <p className="text-gray-600 dark:text-gray-400">Fetches directly from trends.google.com atomically.</p>
                </div>

                <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl mb-4">📦</div>
                  <h3 className="text-xl font-bold mb-2">JSON Output</h3>
                  <p className="text-gray-600 dark:text-gray-400">Structured data: query, success, url, timestamp, data.</p>
                </div>

                <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl mb-4">📱</div>
                  <h3 className="text-xl font-bold mb-2">Platform Support</h3>
                  <p className="text-gray-600 dark:text-gray-400">Linux, macOS, Windows. Node.js + Playwright.</p>
                </div>

                <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold mb-2">Fast Execution</h3>
                  <p className="text-gray-600 dark:text-gray-400">Launches browser, fetches, extracts, returns. ~10s.</p>
                </div>

                <div className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-3xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold mb-2">No Auth Required</h3>
                  <p className="text-gray-600 dark:text-gray-400">Uses public trends.google.com. No API keys.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Usage */}
          <section id="usage" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12">Usage</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Installation</h3>
                  <div className="bg-gray-900 dark:bg-gray-950 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <p>$ npm install playwright</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Basic Usage</h3>
                  <div className="bg-gray-900 dark:bg-gray-950 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <p>$ node trends "artificial intelligence"</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Output</h3>
                  <div className="bg-gray-900 dark:bg-gray-950 text-blue-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "query": "artificial intelligence",
  "success": true,
  "url": "https://trends.google.com/trends/explore?q=...",
  "timestamp": "2026-04-15T...",
  "data": [
    { "date": "Apr 13, 2025", "value": 23 },
    { "date": "Apr 20, 2025", "value": 24 }
  ]
}`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Examples</h3>
                  <div className="bg-gray-900 dark:bg-gray-950 text-green-400 p-6 rounded-lg font-mono text-sm space-y-2">
                    <p>$ node trends "python"</p>
                    <p>$ node trends "machine learning" | jq '.data'</p>
                    <p>$ for q in python golang rust; do node trends "$q" > $q.json; done</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12">Requirements</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Software</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>✓ Node.js 14+</li>
                    <li>✓ npm or yarn</li>
                    <li>✓ Playwright</li>
                  </ul>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">System</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>✓ Linux, macOS, or Windows</li>
                    <li>✓ 500MB+ disk space</li>
                    <li>✓ Internet connection</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">© 2026 AnEntrypoint. MIT License.</p>
              <div className="flex gap-6 mt-4 sm:mt-0">
                <a href="https://github.com/AnEntrypoint/trends-cli" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">GitHub</a>
                <a href="https://npmjs.com/package/trends-cli" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">npm</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
