import { Icon } from "@iconify/react";
import {
  QUESTION_CREATION_MODES,
  type QuestionCreationModeId,
} from "../data/modes.mock";
import { appCopy } from "../../../content/appCopy";

type Props = {
  selected: QuestionCreationModeId;
  onSelect: (id: QuestionCreationModeId) => void;
  onOpenCreatedList: () => void;
};

export function QuestionModeSidebar({
  selected,
  onSelect,
  onOpenCreatedList,
}: Props) {
  return (
    <aside className="flex max-h-[42vh] min-h-0 w-full shrink-0 flex-col border-b border-[#E5E5E5] bg-white md:max-h-none md:h-full md:w-72 md:shrink-0 md:border-b-0 md:border-r md:border-[#E5E5E5] xl:w-80">
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-y-contain px-3 pt-3 sm:px-4 sm:pt-4">
        {QUESTION_CREATION_MODES.map((mode) => {
          const copy = appCopy.questionCreate.modes[mode.id];
          const isOn = selected === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelect(mode.id)}
              className={`group flex w-full items-start gap-3 rounded-xl border border-[#E5E5E5] bg-white p-3 text-left transition sm:p-3.5 ${
                isOn
                  ? "border-sky-300 bg-[#eef6ff] shadow-sm ring-1 ring-sky-100"
                  : "hover:border-[#d0d0d0] hover:bg-[#F4F7FB] cursor-pointer"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isOn ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                <Icon icon={mode.icon} className="text-xl" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-sm font-semibold leading-snug ${isOn ? "text-slate-900" : "text-slate-800"}`}
                  >
                    {copy.title}
                  </span>
                  {mode.id === "ai" ? (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900">
                      {appCopy.questionCreate.modes.ai.badge}
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-slate-600">
                  {copy.description}
                </span>
              </span>
              <Icon
                icon="mdi:chevron-right"
                className={`mt-1 shrink-0 text-2xl transition ${
                  isOn
                    ? "text-sky-600"
                    : "text-slate-300 group-hover:text-slate-400"
                }`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
      <div className="mt-auto shrink-0 px-3 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-3">
        <button
          type="button"
          onClick={onOpenCreatedList}
          className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-dashed border-[#E5E5E5] bg-[#F4F7FB] px-3 py-3 text-left text-sm font-semibold text-slate-800 transition hover:border-[#d0d0d0] hover:bg-[#eaf0f8] sm:py-3.5"
        >
          {appCopy.questionCreate.sidebarCreatedShortcut}
          <Icon
            icon="mdi:chevron-right"
            className="text-xl text-slate-400"
            aria-hidden
          />
        </button>
      </div>
    </aside>
  );
}
