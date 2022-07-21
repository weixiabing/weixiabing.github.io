import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import logo from '@site/static/img/13848491.jpg';
import { css } from '@emotion/css';
import Script from 'react-load-script'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header >

      <div className={clsx(styles.heroBanner)}>
        <div className={clsx(styles.mask)}></div>

        <div className="container" >
          <img src={logo} style={{ width: 280, borderRadius: '50%' }}
            className={styles.heroLogo}
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/blog">
              blog →
            </Link>
          </div>
        </div>
      </div>

    </header>

  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}


var script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.src = 'https://cdn.jsdelivr.net/gh/Fuukei/Public_Repository@latest/static/js/sakura-less.js';
document.head.appendChild(script);   