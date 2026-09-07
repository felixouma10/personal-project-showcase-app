import { useUserContext } from "../context/useUserContext";

function UserAvatar() {
  const { user } = useUserContext();

  if (!user) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
    );
  }

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-10 w-10 rounded-full object-cover"
      />

      <div className="hidden sm:block">
        <p className="font-semibold text-gray-900">
          {user.name}
        </p>

        <p className="text-sm text-gray-500">
          {user.title}
        </p>
      </div>
    </div>
  );
}

export default UserAvatar;