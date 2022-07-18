// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NikoのBlog',
  tagline: 'Niko只会实用的技术',
  url: 'https://weixiabing.github.io',
  baseUrl: '/', 
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/13848491.jpg',
  organizationName: 'weixiabing', // Usually your GitHub org/user name.
  projectName: 'weixiabing.github.io', // Usually your repo name.
  deploymentBranch: 'main',
  plugins: ['@docusaurus/theme-live-codeblock'],
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/docs/',
         
          // Please change this to your repo.
          editUrl: 'https://github.com/weixiabing/weixiabing.github.io/tree/source-main/',
        },
        blog: {
          showReadingTime: true,
          
          // Please change this to your repo.
          editUrl:
            'https://github.com/weixiabing/weixiabing.github.io/tree/source-main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      
      announcementBar: {
        id: 'support_us',
        content: '⭐️ 如果这个网站能帮助到你，欢迎给一个star支持作者  <a target="_blank" rel="noopener noreferrer" href="https://github.com/weixiabing/weixiabing.github.io">GitHub</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      }, 
      navbar: {
        title: 'NikoのBlog',
        hideOnScroll: true,
        items: [
          {type: 'doc',
          docId: 'intro',
          position: 'left',
          label: '文档',},

          {to: 'blog/', label: 'blog', position: 'left'},
          
          {
            type: 'search',
            position: 'right',
          },
          
          
          {
            href: 'https://github.com/weixiabing/weixiabing.github.io',
            label: 'GitHub',
            position: 'right',
          },
          
        ],
      }, 
      prism: { 
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'javascript',
      }, 
      colorMode: {
        respectPrefersColorScheme: true
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'BQF79IKDX0',
    
        // Public API key: it is safe to commit it
        apiKey: 'db7f369812901b92c61ec17c44233bc9',
    
        indexName: 'dev_NAME',
      }
    }),
};

module.exports = config;
