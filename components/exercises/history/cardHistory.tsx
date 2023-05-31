const cardHistory = () => {
  return (
    <div className="m-auto my-2 max-w-[330px] rounded-md border-[1px] border-neutral-100 p-3 md:w-[400px]">
      <div className="mb-[10px] flex flex-col gap-1">
        <p className="text-xl font-bold text-accent-600">Morning Workout</p>
        <span className="text-neutral-100">Tuesday,May 16, 2023, 10:00 AM</span>
      </div>
      <div>
        <p className="text-xl font-bold text-accent-600">Sets perfomed</p>
        <ul>
          <li className="text-neutral-100">1 (+5lbs) x 20</li>
          <li className="text-neutral-100">2 (+5lbs) x 20</li>
          <li className="text-neutral-100">3 (+5lbs) x 20</li>
          <li className="text-neutral-100">4 (+5lbs) x 20</li>
        </ul>
      </div>
    </div>
  );
};

export default cardHistory;
