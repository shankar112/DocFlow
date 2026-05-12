import { PageHeader } from '../components/ui/PageHeader'
import { SharingPanel } from '../features/sharing/components/SharingPanel'

export function SharingPage() {
  return (
    <>
      <PageHeader
        title="Sharing"
        description="Prepare document sharing flows with recipient and permission inputs."
      />
      <SharingPanel />
    </>
  )
}
