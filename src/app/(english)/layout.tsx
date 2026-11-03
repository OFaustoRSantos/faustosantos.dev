import type { ReactNode } from "react";
import { Document } from "../../components/document";

export default function Layout({ children }: { children: ReactNode }) {
  return <Document locale="en">{children}</Document>;
}
