import { NavLink, Outlet } from 'react-router'

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/editor', label: 'Editor' },
  { to: '/upload', label: 'Upload' },
  { to: '/share', label: 'Share' },
]

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-sky-700">DocFlow</p>
            <h1 className="text-2xl font-semibold text-slate-950">
              Document workflow workspace
            </h1>
          </div>

          <nav className="flex flex-wrap gap-2" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  [
                    'rounded-md px-3 py-2 text-sm font-medium transition',
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
