import { FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import { useId } from 'react'
import { getDirectories } from './directory'
import type { Directory } from './directory'
import { cn } from '@/lib/utils'

/** The FileTree from "FileTree Component with interactions using
 * TailwindCSS": folders open with a hidden checkbox and `:has()`, no JS
 * state. Recoloured for the site. */
export function FileTree() {
  return (
    <div className="not-prose my-8 divide-y border">
      <div className="px-4 py-3 text-sm font-medium">File Tree</div>
      <div className="h-80 max-h-[500px] overflow-y-auto p-3">
        <FileList fileList={getDirectories()} root />
      </div>
    </div>
  )
}

function FileList({
  fileList,
  root,
}: {
  fileList: Array<Directory>
  root?: boolean
}) {
  return (
    <ul
      className={cn(
        'overflow-hidden pl-6 text-sm transition-all select-none',
        root ? 'pl-0' : 'hidden peer-has-[:checked]:block',
      )}
    >
      {fileList.map((d) => (
        <FileNode key={d.path} directory={d} />
      ))}
    </ul>
  )
}

function FileNode({ directory }: { directory: Directory }) {
  const keyId = useId()
  if (directory.subfolders) {
    const nodeId = [directory.path, directory.name, keyId].join('-')
    return (
      <li className="before:bg-border relative before:absolute before:top-9 before:bottom-3 before:left-5 before:w-px">
        <label
          htmlFor={nodeId}
          className="peer group hover:bg-accent flex cursor-pointer items-center gap-2 px-3 py-2 has-focus-visible:outline-2 has-focus-visible:outline-brand"
        >
          <FolderIcon
            className="text-brand size-4 group-has-[:checked]:hidden"
            aria-hidden="true"
          />
          <FolderOpenIcon
            className="text-brand hidden size-4 group-has-[:checked]:inline-block"
            aria-hidden="true"
          />
          <span>{directory.name}</span>
          <input
            type="checkbox"
            id={nodeId}
            className="sr-only"
            aria-label={`Open ${directory.name}`}
          />
        </label>
        <FileList fileList={directory.subfolders} />
      </li>
    )
  }
  return (
    <li>
      <div className="flex items-center gap-3 px-3 py-2">
        <FileIcon className="text-muted-foreground size-4" aria-hidden="true" />
        <span>{directory.name}</span>
      </div>
    </li>
  )
}
