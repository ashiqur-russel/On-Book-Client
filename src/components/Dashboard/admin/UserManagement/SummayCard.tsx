interface SummaryCardProps {
  icon: JSX.Element;
  title: string;
  value: string;
}

const SummaryCard = ({ icon, title, value }: SummaryCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-3xl text-blue-500">{icon}</div>
    <div>
      <p className="text-gray-600">{title}</p>
      <h2 className="text-xl font-semibold text-gray-900">{value}</h2>
    </div>
  </div>
);

export default SummaryCard;
