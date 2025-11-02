import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 mt-20">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}