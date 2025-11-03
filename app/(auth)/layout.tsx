import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-stretch gap-8 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl border border-border bg-background/80">
          <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center">
            {children}
          </div>

          <div className="flex-1 relative hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="text-center space-y-6 p-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-2xl font-bold text-white">N</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  Nazarto Surveys
                </h2>
                <p className="text-text-secondary max-w-xs mx-auto">
                  Professional survey platform for meaningful insights
                </p>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-multiply pointer-events-none" />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
