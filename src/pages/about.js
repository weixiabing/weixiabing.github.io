import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './about.module.css';
// import Friends from '@site/src/components/People';
import logo from '@site/static/img/13848491.jpg';

const title = "NikoのBlog";
const describe = "Niko只会实用的技术";

// 下面这个有几条数据就渲染几个卡片
const FriendList = [
    {
        title: 'Jetzihan',
        avatar: 'https://avatars.githubusercontent.com/u/83146544?v=4',
        description: '飞行编码滑翔机',
        link: 'https://jetzihan.netlify.app/'
    },
    {
        title: 'Jetzihan',
        avatar: 'https://avatars.githubusercontent.com/u/83146544?v=4',
        description: '飞行编码滑翔机',
        link: 'https://jetzihan.netlify.app/'
    },
    {
        title: 'legroft\'s blog',
        avatar: 'https://s1.ax1x.com/2020/07/09/Um6MJs.png',
        description: 'legroft的划水日常	',
        link: 'https://jinjis.cn/'
    },

];

// 友链卡片
function FriendCard({ avatar, title, description, link }) {
    return (
        <div className={styles.friends}>
            <div className="text--center">
                {/* <Svg className={styles.FriendCardSvg} role="img" /> */}
                <img className={styles.avatar_img} src={avatar} alt="头像" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className={clsx(styles.linkbutton1)}> <a className={clsx(styles.link)} href={link} target={'_blank'}>访问→</a></div>
            </div>

        </div>
    );
}

// 友链卡片集合
function Friends() {
    return (
        <section className={styles.FriendCards}>
            <div className="container">
                <div className="row">
                    {FriendList.map((props, idx) => (
                        <FriendCard key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// 站点信息
function SiteInfo() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <div className={clsx(styles.max)}>
            <div className={clsx(styles.midbox)}>
                <img className={clsx(styles.heropic)} src="https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20220801173113.png" alt="站长头像" />
                <div className={clsx(styles.headx)}>
                    <h1>{title}</h1>
                    <h3>{describe}</h3>
                    <div className={clsx(styles.linkbutton)}> <a className={clsx(styles.link)} href="https://weixiabing.github.io" target={'_blank'}>主页链接</a></div>
                </div>
            </div>
        </div>
    );
}

// 全局
export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <SiteInfo />
            <main>
                <Friends />
                {/* <People /> */}
            </main>
        </Layout>
    );
}


