import { formatCurrency } from "../utils/format";

export function MortgageTable(props) {
    return (
      <div className="p-8">
        <table className="w-full table-fixed border-2 border-black">
          <tbody>
            <tr className="bg-blue-500 text-white">
              <th className="border-2 border-black p-3 font-semibold text-center w-1/4">Year</th>
              <th className="border-2 border-black p-3 font-semibold text-center w-1/4">Interest</th>
              <th className="border-2 border-black p-3 font-semibold text-center w-1/4">Capital</th>
              <th className="border-2 border-black p-3 font-semibold text-center w-1/4">Balance Remaining</th>
            </tr>
            {props.amortisationSchedule.map((item) => (
              <tr key={item.year} className="hover:bg-gray-50">
                <td className="border-2 border-black p-3 text-center">{item.year}</td>
                <td className="border-2 border-black p-3 text-center">{formatCurrency(item.interest)}</td>
                <td className="border-2 border-black p-3 text-center">{formatCurrency(item.capital)}</td>
                <td className="border-2 border-black p-3 text-center">{formatCurrency(item.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }