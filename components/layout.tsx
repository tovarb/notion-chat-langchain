interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <header className="w-screen sticky top-0 z-40 bg-black">
        <div className="h-16 border-b border-b-slate-200 py-4">
          <nav className="ml-4 pl-6"></nav>
        </div>
      </header>
      <div className="w-screen">
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
