const CardInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
      {/* Primary Card */}
      <div className="w-full min-h-[8rem] bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl flex flex-col justify-between">
        <h3 className="text-lg font-bold">VISA</h3>
        <p className="text-lg">**** **** 222 0034</p>
        <p className="text-sm">Craig S.</p>
      </div>

      {/* Secondary Card */}
      <div className="w-full min-h-[8rem] bg-gray-100 p-4 rounded-xl flex flex-col justify-between">
        <h3 className="text-lg font-bold text-gray-700">VISA</h3>
        <p className="text-lg text-gray-700">**** **** 002 0329</p>
        <p className="text-sm text-gray-600">Craig S.</p>
      </div>
    </div>
  );
};

export default CardInfo;
