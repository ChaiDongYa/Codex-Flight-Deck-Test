import { useMemo, useState, type FormEvent } from 'react'
import type React from 'react'

type Gender = '男' | '女'

type TaskMember = {
  id: number
  name: string
  gender: Gender
  age: number
}

const PAGE_SIZE = 5

const taskMembers: TaskMember[] = [
  { id: 1, name: '张晨', gender: '男', age: 28 },
  { id: 2, name: '李雨桐', gender: '女', age: 25 },
  { id: 3, name: '王浩然', gender: '男', age: 31 },
  { id: 4, name: '陈思涵', gender: '女', age: 27 },
  { id: 5, name: '刘宇航', gender: '男', age: 29 },
  { id: 6, name: '赵子萱', gender: '女', age: 24 },
  { id: 7, name: '周明远', gender: '男', age: 33 },
  { id: 8, name: '吴佳怡', gender: '女', age: 26 },
  { id: 9, name: '徐嘉乐', gender: '男', age: 30 },
  { id: 10, name: '孙婉清', gender: '女', age: 32 },
  { id: 11, name: '马致远', gender: '男', age: 35 },
  { id: 12, name: '朱欣悦', gender: '女', age: 23 },
]

const AboutPage: React.FC = () => (
  <main className="about-page">
    <section className="about-card" aria-labelledby="about-title">
      <p className="eyebrow">FLIGHT DECK</p>
      <h1 id="about-title">关于我</h1>
      <p>我是前端开发工程师，使用 Codex 开发了这个项目。</p>
      <a className="text-link" href="/">返回任务列表</a>
    </section>
  </main>
)

const TaskListPage: React.FC = () => {
  const [nameInput, setNameInput] = useState('')
  const [genderInput, setGenderInput] = useState<Gender | ''>('')
  const [query, setQuery] = useState({ name: '', gender: '' as Gender | '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [members, setMembers] = useState(taskMembers)
  const [selectedMember, setSelectedMember] = useState<TaskMember | null>(null)

  const filteredMembers = useMemo(() => {
    const normalizedName = query.name.trim()

    return members.filter(
      (member) =>
        (!normalizedName || member.name.includes(normalizedName)) &&
        (!query.gender || member.gender === query.gender),
    )
  }, [members, query])

  const pageCount = Math.max(1, Math.ceil(filteredMembers.length / PAGE_SIZE))
  const visibleMembers = filteredMembers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setQuery({ name: nameInput, gender: genderInput })
    setCurrentPage(1)
  }

  const handleReset = () => {
    setNameInput('')
    setGenderInput('')
    setQuery({ name: '', gender: '' })
    setCurrentPage(1)
  }

  const handleDelete = (memberId: number) => {
    const remainingMembers = members.filter((member) => member.id !== memberId)
    const normalizedName = query.name.trim()
    const remainingFilteredMembers = remainingMembers.filter(
      (member) =>
        (!normalizedName || member.name.includes(normalizedName)) &&
        (!query.gender || member.gender === query.gender),
    )
    const remainingCurrentPageMembers = remainingFilteredMembers.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    )

    setMembers(remainingMembers)
    setSelectedMember((member) => (member?.id === memberId ? null : member))

    if (remainingCurrentPageMembers.length === 0 && currentPage > 1) {
      setCurrentPage((page) => page - 1)
    }
  }

  return (
    <main className="task-page">
      <section className="task-panel" aria-labelledby="task-list-title">
        <header className="task-header">
          <div>
            <p className="eyebrow">FLIGHT DECK / FD-2200</p>
            <h1 id="task-list-title">任务列表</h1>
            <p className="task-description">浏览并筛选当前任务成员信息</p>
          </div>
          <a className="text-link" href="/about">关于我</a>
        </header>

        <form className="search-form" onSubmit={handleSearch}>
          <label>
            姓名
            <input
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="请输入姓名"
            />
          </label>
          <label>
            性别
            <select
              value={genderInput}
              onChange={(event) => setGenderInput(event.target.value as Gender | '')}
            >
              <option value="">全部</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </label>
          <div className="form-actions">
            <button type="submit">搜索</button>
            <button className="secondary-button" type="button" onClick={handleReset}>
              重置
            </button>
          </div>
        </form>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">姓名</th>
                <th scope="col">性别</th>
                <th scope="col">年龄</th>
                <th scope="col">操作</th>
              </tr>
            </thead>
            <tbody>
              {visibleMembers.length > 0 ? (
                visibleMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.name}</td>
                    <td>{member.gender}</td>
                    <td>{member.age}</td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="text-button"
                          onClick={() => setSelectedMember(member)}
                          type="button"
                        >
                          查看详情
                        </button>
                        <button
                          className="text-button danger-button"
                          onClick={() => handleDelete(member.id)}
                          type="button"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="empty-state" colSpan={4}>暂无匹配的数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="pagination" aria-label="列表分页">
          <span>共 {filteredMembers.length} 条</span>
          <div className="page-controls">
            <button
              aria-label="上一页"
              className="page-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              type="button"
            >
              ‹
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
              <button
                aria-current={page === currentPage ? 'page' : undefined}
                aria-label={`第 ${page} 页`}
                className="page-button"
                key={page}
                onClick={() => setCurrentPage(page)}
                type="button"
              >
                {page}
              </button>
            ))}
            <button
              aria-label="下一页"
              className="page-button"
              disabled={currentPage === pageCount}
              onClick={() => setCurrentPage((page) => page + 1)}
              type="button"
            >
              ›
            </button>
          </div>
        </footer>
      </section>

      {selectedMember && (
        <div className="dialog-backdrop" role="presentation">
          <section
            aria-labelledby="member-detail-title"
            aria-modal="true"
            className="detail-dialog"
            role="dialog"
          >
            <div className="dialog-header">
              <h2 id="member-detail-title">成员详情</h2>
              <button
                aria-label="关闭详情"
                className="close-button"
                onClick={() => setSelectedMember(null)}
                type="button"
              >
                ×
              </button>
            </div>
            <dl className="member-details">
              <div>
                <dt>姓名</dt>
                <dd>{selectedMember.name}</dd>
              </div>
              <div>
                <dt>性别</dt>
                <dd>{selectedMember.gender}</dd>
              </div>
              <div>
                <dt>年龄</dt>
                <dd>{selectedMember.age}</dd>
              </div>
            </dl>
            <div className="dialog-actions">
              <button onClick={() => setSelectedMember(null)} type="button">关闭</button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export const App: React.FC = () =>
  window.location.pathname === '/about' ? <AboutPage /> : <TaskListPage />
