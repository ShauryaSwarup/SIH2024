import { auth } from "@/auth";

export default async function UserAvatar() {
  const session = await auth();
  return (
    <div>
      <img src={session.user.image} alt="User Avatar" />
    </div>
  );
}
