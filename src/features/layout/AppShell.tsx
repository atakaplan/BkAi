import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppGlobalLoading } from "../components/AppGlobalLoading";
import { AppHeader } from "./AppHeader";

export function AppShell() {
  return (
    <div className="relative flex h-svh min-h-0 flex-col overflow-hidden bg-white">
      <AppHeader />
      <main className="app-shell-main-padding flex min-h-0 flex-1 flex-col overflow-hidden px-3 sm:px-4 lg:px-6">
        <div className="app-shell-content flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-3xl">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain">
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <Suspense fallback={<AppGlobalLoading />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
