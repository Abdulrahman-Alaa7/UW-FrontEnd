import Header from "../../../../components/PrivateComponents/layout/MainHeader";
import Sidebar from "../../../../components/PrivateComponents/layout/Sidebar";
import UserProtected from "../../../../hooks/UserProtected";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserProtected>
        <Header />
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="w-full pt-16">{children}</main>
        </div>
      </UserProtected>
    </>
  );
}
