import React, { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import authService from "../../services/authService";
import toast from "react-hot-toast";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await authService.getProfile();
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        toast.error("Failed to fetch profile data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("New Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New Password must be at least 6 characters long.");
      return;
    }

    setPasswordLoading(true);

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      });

      toast.success("Password changed successfully!");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      toast.error(error.message || "Failed to change password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <PageHeader title="Profile Settings" />

      <div className="max-w-5xl mx-auto mt-6 space-y-8">
        {/* Top Profile Card */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/5 to-transparent pointer-events-none" />

          <div className="relative p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                <User className="w-9 h-9 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {username}
                </h2>

                <p className="text-neutral-500 mt-1">{email}</p>

                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">
                    Account Secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Information */}
          <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm p-7">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-neutral-900">
                Personal Information
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                Your account details and information.
              </p>
            </div>

            <div className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Username
                </label>

                <div className="flex items-center gap-3 h-12 px-4 rounded-2xl border border-neutral-200 bg-neutral-50">
                  <User className="w-5 h-5 text-indigo-500" />

                  <p className="text-sm font-medium text-neutral-800">
                    {username}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>

                <div className="flex items-center gap-3 h-12 px-4 rounded-2xl border border-neutral-200 bg-neutral-50">
                  <Mail className="w-5 h-5 text-indigo-500" />

                  <p className="text-sm font-medium text-neutral-800">
                    {email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm p-7">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-neutral-900">
                Change Password
              </h3>

              <p className="text-sm text-neutral-500 mt-1">
                Update your password to keep your account secure.
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-5">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Current Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Enter current password"
                    className="w-full h-12 pl-12 pr-4 rounded-2xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    placeholder="Enter new password"
                    className="w-full h-12 pl-12 pr-4 rounded-2xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirm New Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />

                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                    placeholder="Confirm new password"
                    className="w-full h-12 pl-12 pr-4 rounded-2xl border border-neutral-200 bg-neutral-50 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-all duration-200"
                >
                  {passwordLoading ? "Changing Password..." : "Update Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
