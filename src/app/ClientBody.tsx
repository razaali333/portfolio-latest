"use client";

import { usePathname } from "next/navigation";
import FloatActions from "@/components/FloatActions";
import WorldCursor from "@/components/WorldCursor";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideCursor = pathname === "/career";

  return (
    <>
      {hideCursor ? null : <WorldCursor />}
      {children}
      <FloatActions />
    </>
  );
}
