import { Icon } from "@iconify/react";
import {
  QUESTION_CREATION_MODES,
  type QuestionCreationModeId,
} from "../data/modes.mock";
import { appCopy } from "../../../content/appCopy";

type Props = {
  selected: QuestionCreationModeId;
  onSelect: (id: QuestionCreationModeId) => void;
};

export function QuestionModeCards({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
      {QUESTION_CREATION_MODES.map((mode) => {
        const copy = appCopy.questionCreate.modes[mode.id];
        const isOn = selected === mode.id;
        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => onSelect(mode.id)}
            className={`flex flex-col overflow-hidden rounded-2xl border text-left transition ${
              isOn
                ? "border-transparent bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md ring-2 ring-sky-200/60"
                : "border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 hover:shadow"
            }`}
          >
            <div
              className={`app-question-mode-card-pattern h-20 w-full shrink-0 sm:h-24 ${isOn ? "opacity-90" : ""}`}
            />
            <div className="flex flex-col gap-2 px-4 pb-4 pt-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  isOn
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                <Icon icon={mode.icon} className="text-xl" aria-hidden />
              </span>
              <span
                className={`text-sm font-semibold ${isOn ? "text-white" : "text-slate-900"}`}
              >
                {copy.title}
              </span>
              <span
                className={`text-xs leading-relaxed ${isOn ? "text-white/90" : "text-slate-600"}`}
              >
                {copy.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
