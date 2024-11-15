import type { Metadata } from "next";
import "@/app/styles/globals.css";


export const metadata: Metadata = {
  title: "ToDo",
  description: "ToDo list",
};

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <div className={'main_container'}>
          {children}
        </div>
      </body>
    </html>
  );
}
