import type { Metadata } from "next";
import "@/app/styles/globals.css";


export const metadata: Metadata = {
  title: "AddToDo",
  description: "Add ToDo to list",
};

export function AddToDoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={'main_container'}>
        {children}
      </div>
  );
}
