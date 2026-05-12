type PageHeaderProps = {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
    </div>
  )
}
