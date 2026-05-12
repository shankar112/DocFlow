import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, ListOrdered, Heading1, Heading2 } from 'lucide-react'

interface DocumentEditorProps {
  content: string;
  onChange: (content: string) => void;
}

interface MenuButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const MenuButton = ({ onClick, isActive, children }: MenuButtonProps) => (
  <button
    onClick={onClick}
    className={`rounded p-1.5 transition ${
      isActive ? 'bg-sky-100 text-sky-700' : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    {children}
  </button>
);

export function DocumentEditor({ content, onChange }: DocumentEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 p-2">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        >
          <Bold size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        >
          <Italic size={18} />
        </MenuButton>
        <div className="mx-1 h-6 w-px bg-slate-200" />
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 size={18} />
        </MenuButton>
        <div className="mx-1 h-6 w-px bg-slate-200" />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        >
          <List size={18} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        >
          <ListOrdered size={18} />
        </MenuButton>
      </div>

      <div className="prose prose-slate max-w-none p-6 focus:outline-none min-h-[400px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
