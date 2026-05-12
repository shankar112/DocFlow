import { Link } from 'react-router'
import { PageHeader } from '../components/ui/PageHeader'

export function NotFoundPage() {
  return (
    <>
      <PageHeader
        title="Page not found"
        description="The requested DocFlow page does not exist."
      />
      <Link
        to="/"
        className="inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Back to overview
      </Link>
    </>
  )
}
