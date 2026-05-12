import { PageHeader } from '../components/ui/PageHeader'
import { DocumentEditor } from '../features/document-editor/components/DocumentEditor'

export function DocumentEditorPage() {
  return (
    <>
      <PageHeader
        title="Document editor"
        description="A focused starting point for document creation and editing workflows."
      />
      <DocumentEditor />
    </>
  )
}
