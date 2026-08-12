import type React from 'react'

const AboutPage: React.FC = () => (
  <main className="welcome-page">
    <section className="welcome-card" aria-labelledby="about-title">
      <p className="eyebrow">FLIGHT DECK</p>
      <h1 id="about-title">关于我</h1>
      <p className="welcome-copy">
        我是前端开发工程师，使用 Codex 开发了这个项目。
      </p>
      <a className="page-link" href="/">返回首页</a>
    </section>
  </main>
)

const WelcomePage: React.FC = () => (
  <main className="welcome-page">
    <section className="welcome-card" aria-labelledby="welcome-title">
      <p className="eyebrow">FLIGHT DECK</p>
      <h1 id="welcome-title">欢迎登机</h1>
      <p className="welcome-copy">
        Flight Deck 已准备就绪。请从这里开始管理你的下一段旅程。
      </p>
      <span className="status" role="status">
        <span className="status-dot" aria-hidden="true" />
        系统运行正常
      </span>
      <a className="page-link" href="/about">关于我</a>
    </section>
  </main>
)

export const App: React.FC = () => (
  window.location.pathname === '/about' ? <AboutPage /> : <WelcomePage />
)
