import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Atomic command-line tool for Google Trends lookups. Single command. Pure JSON output. Full platform support." />
        <meta name="keywords" content="google trends, cli, command line, trends lookup, nodejs, playwright" />
        <meta name="author" content="AnEntrypoint" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Trends CLI - Atomic Google Trends Lookups" />
        <meta property="og:description" content="Single-command CLI tool for fetching Google Trends data" />
        <meta property="og:url" content="https://trends-cli.dev" />
        <meta property="og:image" content="https://trends-cli.dev/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trends CLI" />
        <meta name="twitter:description" content="Atomic Google Trends lookup tool" />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%233b82f6'>📈</text></svg>" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Trends CLI",
            "description": "Command-line tool for atomic Google Trends lookups",
            "url": "https://trends-cli.dev",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Linux, macOS, Windows",
            "softwareRequirements": "Node.js, Playwright",
            "author": {
              "@type": "Organization",
              "name": "AnEntrypoint"
            }
          })}
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
