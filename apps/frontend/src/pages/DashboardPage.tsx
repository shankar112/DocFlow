import { Link } from 'react-router'
import { PageHeader } from '../components/ui/PageHeader'

const workflowLinks = [
  {
    to: '/editor',
    title: 'Document editor',
    description: 'Draft and prepare document content.',
  },
  {
    to: '/upload',
    title: 'File upload',
    description: 'Collect source documents and attachments.',
  },
  {
    to: '/share',
    title: 'Sharing',
    description: 'Invite collaborators with simple access levels.',
  },
]

export function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Assessment starter"
        description="A small, production-minded React setup for building the DocFlow workflow without extra framework weight."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {workflowLinks.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </>
  )
}
