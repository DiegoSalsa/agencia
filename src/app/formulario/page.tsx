import { redirect } from "next/navigation";

export default function FormularioPage() {
  // Project selection lives on Planes after the approved Home redesign.
  redirect("/planes#planes");
}
