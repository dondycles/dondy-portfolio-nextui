import Footer from "./Footer";

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="rounded-xl h-[calc(100%-72px)] mt-[72px] flex flex-col gap-4 overflow-x-hidden overflow-y-auto pb-4 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 ">
      {children}
      <Footer />
    </main>
  );
}
