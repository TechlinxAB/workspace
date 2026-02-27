"use client";

import { useEffect, useState, useTransition } from "react";
import type { Role } from "@/lib/roles";
import { Card } from "@/components/Card";

type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  isActive: boolean;
  createdAt: string;
};

type CreateUserState = {
  email: string;
  name: string;
  role: Role;
  temporaryPassword: string;
};

const emptyCreateUserState: CreateUserState = {
  email: "",
  name: "",
  role: "customer",
  temporaryPassword: ""
};

export function AdminUsersManager() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createState, setCreateState] = useState<CreateUserState>(emptyCreateUserState);
  const [passwordResetState, setPasswordResetState] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  async function loadUsers() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/users", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to load users.");
      }

      const data = (await response.json()) as { users: AdminUser[] };
      setUsers(data.users);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadUsers();
  }, []);

  async function createUser() {
    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createState)
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      throw new Error(data.error ?? "Failed to create user.");
    }

    await loadUsers();
    setCreateState(emptyCreateUserState);
    setIsModalOpen(false);
  }

  async function updateUser(id: string, payload: Record<string, unknown>) {
    const response = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      throw new Error(data.error ?? "Failed to update user.");
    }

    await loadUsers();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-ink">Users</h1>
          <p className="mt-1 text-sm text-muted">Create, disable, and manage workspace access from the admin API.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="focus-ring rounded-full bg-[#1d6b3b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#185b32]"
        >
          Create user
        </button>
      </div>

      {error ? (
        <p className="rounded-[24px] border border-[rgba(205,84,71,0.18)] bg-dangerBg px-4 py-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      <Card className="overflow-hidden">
        {isLoading ? (
          <p className="text-sm text-muted">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-[rgba(18,18,18,0.08)]">
                  {["Name", "Email", "Role", "Status", "Created", "Actions"].map((heading) => (
                    <th key={heading} className="px-2 py-2 text-[12px] font-semibold text-muted">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-[rgba(18,18,18,0.06)] align-top">
                    <td className="px-2 py-3 text-sm font-semibold text-ink">{user.name ?? "Unnamed user"}</td>
                    <td className="px-2 py-3 text-sm text-muted">{user.email}</td>
                    <td className="px-2 py-3 text-sm text-ink">{user.role}</td>
                    <td className="px-2 py-3 text-sm">
                      <span
                        className={[
                          "rounded-full border px-2.5 py-1 text-xs font-semibold",
                          user.isActive
                            ? "border-[rgba(52,168,83,0.18)] bg-successBg text-success"
                            : "border-[rgba(205,84,71,0.18)] bg-dangerBg text-danger"
                        ].join(" ")}
                      >
                        {user.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-sm text-muted">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </td>
                    <td className="px-2 py-3 text-sm">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() =>
                              startTransition(() => {
                                void updateUser(user.id, { isActive: !user.isActive }).catch((updateError) => {
                                  setError(updateError instanceof Error ? updateError.message : "Failed to update user.");
                                });
                              })
                            }
                            className="focus-ring rounded-full border border-[rgba(18,18,18,0.08)] px-3 py-2 text-xs font-semibold text-ink transition hover:bg-[rgba(241,244,242,0.8)] disabled:opacity-60"
                          >
                            {user.isActive ? "Disable" : "Enable"}
                          </button>
                          <select
                            value={user.role}
                            onChange={(event) =>
                              startTransition(() => {
                                void updateUser(user.id, { role: event.target.value }).catch((updateError) => {
                                  setError(updateError instanceof Error ? updateError.message : "Failed to update user.");
                                });
                              })
                            }
                            className="focus-ring rounded-full border border-[rgba(18,18,18,0.08)] bg-white px-3 py-2 text-xs font-semibold text-ink"
                          >
                            <option value="customer">customer</option>
                            <option value="admin">admin</option>
                          </select>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <input
                            type="password"
                            value={passwordResetState[user.id] ?? ""}
                            onChange={(event) =>
                              setPasswordResetState((current) => ({
                                ...current,
                                [user.id]: event.target.value
                              }))
                            }
                            className="focus-ring h-10 min-w-[220px] rounded-full border border-[rgba(18,18,18,0.08)] bg-white px-4 text-xs text-ink"
                            placeholder="Set temporary password"
                          />
                          <button
                            type="button"
                            disabled={isPending || !passwordResetState[user.id]}
                            onClick={() =>
                              startTransition(() => {
                                void updateUser(user.id, { temporaryPassword: passwordResetState[user.id] })
                                  .then(() => {
                                    setPasswordResetState((current) => ({ ...current, [user.id]: "" }));
                                  })
                                  .catch((updateError) => {
                                    setError(updateError instanceof Error ? updateError.message : "Failed to reset password.");
                                  });
                              })
                            }
                            className="focus-ring rounded-full border border-[rgba(18,18,18,0.08)] px-3 py-2 text-xs font-semibold text-ink transition hover:bg-[rgba(241,244,242,0.8)] disabled:opacity-60"
                          >
                            Reset password
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 bg-[rgba(18,18,18,0.26)] px-4 py-8 backdrop-blur-sm">
          <div className="mx-auto max-w-xl">
            <Card className="relative">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[20px] font-bold text-ink">Create workspace user</h2>
                  <p className="mt-1 text-sm text-muted">Add a new admin or customer account with a temporary password.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="focus-ring rounded-full border border-[rgba(18,18,18,0.08)] px-3 py-1.5 text-sm font-semibold text-muted"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1 text-sm">
                  <span className="font-semibold text-ink">Name</span>
                  <input
                    type="text"
                    value={createState.name}
                    onChange={(event) => setCreateState((current) => ({ ...current, name: event.target.value }))}
                    className="focus-ring h-11 w-full rounded-2xl border border-[rgba(18,18,18,0.08)] bg-white px-4 text-sm text-ink"
                    placeholder="User name"
                  />
                </label>

                <label className="space-y-1 text-sm">
                  <span className="font-semibold text-ink">Email</span>
                  <input
                    type="email"
                    value={createState.email}
                    onChange={(event) => setCreateState((current) => ({ ...current, email: event.target.value }))}
                    className="focus-ring h-11 w-full rounded-2xl border border-[rgba(18,18,18,0.08)] bg-white px-4 text-sm text-ink"
                    placeholder="user@company.com"
                  />
                </label>

                <label className="space-y-1 text-sm">
                  <span className="font-semibold text-ink">Role</span>
                  <select
                    value={createState.role}
                    onChange={(event) =>
                      setCreateState((current) => ({ ...current, role: event.target.value as Role }))
                    }
                    className="focus-ring h-11 w-full rounded-2xl border border-[rgba(18,18,18,0.08)] bg-white px-4 text-sm text-ink"
                  >
                    <option value="customer">customer</option>
                    <option value="admin">admin</option>
                  </select>
                </label>

                <label className="space-y-1 text-sm">
                  <span className="font-semibold text-ink">Temporary password</span>
                  <input
                    type="password"
                    value={createState.temporaryPassword}
                    onChange={(event) =>
                      setCreateState((current) => ({ ...current, temporaryPassword: event.target.value }))
                    }
                    className="focus-ring h-11 w-full rounded-2xl border border-[rgba(18,18,18,0.08)] bg-white px-4 text-sm text-ink"
                    placeholder="Temp password"
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="focus-ring rounded-full border border-[rgba(18,18,18,0.08)] px-4 py-2.5 text-sm font-semibold text-muted"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() => {
                      void createUser().catch((createError) => {
                        setError(createError instanceof Error ? createError.message : "Failed to create user.");
                      });
                    })
                  }
                  className="focus-ring rounded-full bg-[#1d6b3b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#185b32] disabled:opacity-60"
                >
                  Create user
                </button>
              </div>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
}
