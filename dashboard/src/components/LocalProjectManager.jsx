import React from 'react';
import { FolderOpen, Loader2, Trash2 } from 'lucide-react';

export default function LocalProjectManager({ projects, currentJobId, onOpen, onDelete, busyJobId }) {
  if (!projects.length) return null;

  return (
    <section className="w-full max-w-3xl mx-auto mb-8 rounded-card border border-rule bg-paper2 p-4 sm:p-5 text-left">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <p className="eyebrow">YOUR PROJECTS</p>
          <p className="text-xs text-muted mt-1">Reopen a project or delete it and its local video files.</p>
        </div>
        <span className="readout">{projects.length} saved</span>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
        {projects.map((project) => {
          const isCurrent = project.jobId === currentJobId;
          const isBusy = busyJobId === project.jobId;
          return (
            <div key={project.jobId} className="flex items-center gap-2 rounded-input border border-rule bg-paper px-3 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink truncate" title={project.name}>{project.name || 'Video project'}</p>
                <p className="readout mt-0.5">
                  {new Date(project.createdAt || Date.now()).toLocaleDateString()} · {project.status || 'saved'}{isCurrent ? ' · open' : ''}
                </p>
              </div>
              <button
                onClick={() => onOpen(project.jobId)}
                disabled={isCurrent || !!busyJobId}
                className="btn-quiet px-2.5 py-2 text-xs disabled:opacity-50"
                title={isCurrent ? 'This project is open' : 'Open project'}
              >
                <FolderOpen size={14} /> Open
              </button>
              <button
                onClick={() => onDelete(project)}
                disabled={isBusy}
                className="btn-quiet px-2.5 py-2 text-xs text-danger disabled:opacity-40"
                title="Delete project and local files"
              >
                {isBusy ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
