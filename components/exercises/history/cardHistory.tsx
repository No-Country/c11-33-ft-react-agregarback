const cardHistory = () => {
    return (
      <div className="border-[1px] border-neutral-100 rounded-md max-w-[330px] m-auto p-3 my-2">
        <div className="flex flex-col gap-1 mb-[10px]">
            <p className="font-bold text-xl text-accent-600">Morning Workout</p>
            <span className="text-neutral-100">Tuesday,May 16, 2023, 10:00 AM</span>
        </div>
        <div>
            <p className="font-bold text-xl text-accent-600">Sets perfomed</p>
            <ul>
                <li className="text-neutral-100">1 (+5lbs) x 20</li>
                <li className="text-neutral-100">2 (+5lbs) x 20</li>
                <li className="text-neutral-100">3 (+5lbs) x 20</li>
                <li className="text-neutral-100">4 (+5lbs) x 20</li>
            </ul>
        </div>
      </div>
    )
  };

export default cardHistory;
