export function SharingPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <form className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Recipient email</span>
          <input
            type="email"
            placeholder="name@example.com"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Access level</span>
          <select className="rounded-md border border-slate-300 px-3 py-2 text-slate-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100">
            <option>Can view</option>
            <option>Can comment</option>
            <option>Can edit</option>
          </select>
        </label>

        <button
          type="button"
          className="w-fit rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          Create share invite
        </button>
      </form>
    </section>
  )
}
