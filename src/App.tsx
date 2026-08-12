import type React from 'react'

export const App: React.FC = () => (
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
    </section>
  </main>
)
