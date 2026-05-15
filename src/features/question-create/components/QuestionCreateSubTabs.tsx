import { appCopy } from "../../../content/appCopy";

export type QuestionCreateSubTabId = "create" | "list" | "draft2" | "draft4";

type Props = {
  active: QuestionCreateSubTabId;
  onChange: (tab: QuestionCreateSubTabId) => void;
};

const ORDER: QuestionCreateSubTabId[] = ["create", "list", "draft2", "draft4"];

export function QuestionCreateSubTabs({ active, onChange }: Props) {
  const m = appCopy.questionCreate.tabs;
  const labels: Record<QuestionCreateSubTabId, string> = {
    create: m.create,
    list: m.list,
    draft2: m.draft2,
    draft4: m.draft4,
  };

  return (
    <div
      className="qc-nav-track flex min-w-0 flex-nowrap items-end gap-0 overflow-x-auto border-b border-[#E5E5E5] px-2 pb-0 pl-4 pt-1 [-ms-overflow-style:none] scrollbar-none sm:px-3 sm:pl-5 sm:pt-1.5 [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Alt menü"
    >
      {ORDER.map((id, index) => {
        const enabled = id === "create" || id === "list";
        const isOn = active === id;
        const showSep = index > 0;

        return (
          <div key={id} className="flex shrink-0 items-end">
            {showSep ? (
              <span
                className="mb-2.5 select-none px-1.5 text-sm font-light text-zinc-400/90 sm:mb-3 sm:px-2"
                aria-hidden
              >
                |
              </span>
            ) : null}
            <button
              type="button"
              role="tab"
              aria-selected={isOn}
              disabled={!enabled}
              onClick={() => enabled && onChange(id)}
              title={!enabled ? appCopy.comingSoon : undefined}
              className={
                !enabled
                  ? "relative z-1 -mb-px shrink-0 cursor-not-allowed px-3 py-2 text-left text-xs font-medium text-zinc-400 sm:px-4 sm:py-2.5 sm:text-sm"
                  : isOn
                    ? "qc-folder-tab qc-folder-tab--sm -mb-px shrink-0 px-3 py-2 text-left text-xs font-bold text-zinc-900 shadow-[0_1px_3px_rgba(15,23,42,0.06)] sm:px-4 sm:py-2.5 sm:text-sm"
                    : "relative z-1 -mb-px shrink-0 px-3 py-2 text-left text-xs font-medium text-zinc-500 transition hover:text-zinc-800 sm:px-4 sm:py-2.5 sm:text-sm cursor-pointer"
              }
            >
              {labels[id]}
            </button>
          </div>
        );
      })}
    </div>
  );
}
