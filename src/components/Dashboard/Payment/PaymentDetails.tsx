import { FaEllipsisH } from "react-icons/fa";

interface Payment {
  id: number;
  name: string;
  type: string;
  date: string;
  amount: string;
  statusColor: string;
}

interface PaymentDetailsProps {
  payments: Payment[];
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ payments }) => {
  return (
    <>
      <h3 className="text-lg font-semibold mt-6">Recent Payment</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden bg-white shadow-md">
          <thead className="bg-gray-200 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-2">Transaction</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2 text-right">Amount</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="px-4 py-3 text-gray-700">{payment.name}</td>
                <td className="px-4 py-3 text-gray-500">{payment.type}</td>
                <td className="px-4 py-3 text-gray-500">{payment.date}</td>
                <td
                  className={`px-4 py-3 font-medium text-right ${payment.statusColor}`}
                >
                  {payment.amount}
                </td>
                <td className="px-4 py-3 text-right">
                  <FaEllipsisH className="text-gray-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentDetails;
