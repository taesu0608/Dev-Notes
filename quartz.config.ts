import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */


/**
 * Quartz 4 Configuration
 */

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Dev Notes",
    pageTitleSuffix: " | Backend & Infra",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "ko-KR",
    baseUrl: "taesu0608.github.io/Dev-Notes",
    ignorePatterns: [
      "private",
      "templates",
      ".obsidian",
      ".trash",
      "1. Daily",
      "2. Weekly",
      "3. Monthly",
      "4. Yearly",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "IBM Plex Sans KR",
        body: "IBM Plex Sans KR",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#f8fafc",
          lightgray: "#e2e8f0",
          gray: "#94a3b8",
          darkgray: "#475569",
          dark: "#0f172a",
          secondary: "#2563eb",
          tertiary: "#0ea5e9",
          highlight: "rgba(37, 99, 235, 0.12)",
          textHighlight: "#93c5fd66",
        },
        darkMode: {
          light: "#0b1220",
          lightgray: "#172033",
          gray: "#7c8aa0",
          darkgray: "#d6deeb",
          dark: "#f8fbff",
          secondary: "#3182f6",
          tertiary: "#38bdf8",
          highlight: "rgba(49, 130, 246, 0.15)",
          textHighlight: "#60a5fa55",
        },
      },
    },
  },

  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: false,
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
      }),
      Plugin.Description(),
      Plugin.Latex({
        renderEngine: "katex",
      }),
    ],

    filters: [
      Plugin.RemoveDrafts(),
    ],

    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config