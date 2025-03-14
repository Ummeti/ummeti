export default function Toggle({ isChecked, onChange, isPending }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="sr-only peer"
        disabled={isPending}
      />
      <div
        className={`w-11 h-6 rounded-full peer transition-colors duration-200 ease-in-out ${
          isChecked ? 'bg-main' : 'bg-gray-300'
        }`}
      ></div>
      <span
        className={`absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${
          isChecked ? 'translate-x-5' : 'translate-x-0'
        }`}
      ></span>
    </label>
  );
}
