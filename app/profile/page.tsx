import Dashboard from "@/components/profile/dashboard";

export default function Profile() {
  return (
    <div className="z-10 h-full w-full p-6 text-neutral-100">
      <div className="flex flex-row gap-3 py-3">
        <div className="w-[50px] rounded-full">
          <img
            className="h-full w-full"
            src="https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789.png"
            alt="Image Profile"
          />
        </div>
        <div>
          <p className="text-accent-600">Username</p>
          <span>1 workout</span>
        </div>
      </div>
      <div>
        <h3>DASHBOARD</h3>
        <Dashboard/>
      </div>
    </div>
  );
}
