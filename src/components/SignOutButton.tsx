export default function SignOutButton() {
  return (
    <form action="/api/logout" method="get">
      <button
        type="submit"
        className="text-sm text-zinc-500 transition hover:text-zinc-900"
      >
        Sign out
      </button>
    </form>
  );
}
