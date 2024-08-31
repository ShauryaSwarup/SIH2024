import Calendar from "./calendar";
import { auth } from "@/auth";

export default async function page() {
  const session = await auth();

  return (
    <div>
      <Calendar session={session} />
    </div>
  );
}
