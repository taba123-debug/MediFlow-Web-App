type StepperProps = {
  steps: string[];
  activeStep: number;
};

export function Stepper({ steps, activeStep }: StepperProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {steps.map((step, index) => {
        const state =
          index < activeStep ? "done" : index === activeStep ? "active" : "idle";
        return (
          <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                state === "done" && "bg-emerald-100 text-emerald-700",
                state === "active" && "bg-sky-600 text-white",
                state === "idle" && "bg-slate-100 text-slate-500",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {index + 1}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Step</p>
              <p className="text-sm font-medium text-slate-800">{step}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
