import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConfirmationModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Confirmation</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-950/30 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-white p-6 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <Dialog.Close asChild>
              <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Title className="text-xl font-semibold text-slate-950">
            Confirm action
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-slate-500">
            This is a UI placeholder for future confirmation flows like appointment
            cancellation or doctor approval.
          </Dialog.Description>
          <div className="mt-6 flex gap-3">
            <Dialog.Close asChild>
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            </Dialog.Close>
            <Button className="flex-1">Confirm</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
