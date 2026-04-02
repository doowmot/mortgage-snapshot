import { formatCurrency } from "../utils/format";

export function MortgageTable(props) {
    let inflectionFound = false;
    let milestoneFound = false;

    return (
      <div className="p-8">
        <table className="w-full table-fixed border-2 border-black">
          <tbody>
            <tr className="bg-blue-500 text-white">
              <th className="border-2 border-black p-3 font-semibold text-center w-1/6">Year</th>
              <th className="border-2 border-black p-3 font-semibold text-center w-1/6">Interest</th>
              <th className="border-2 border-black p-3 font-semibold text-center w-1/6">Capital</th>
              <th className="border-2 border-black p-3 font-semibold text-center w-1/6">Balance</th>
              <th className="border-2 border-black border-l-4 border-l-white p-3 font-semibold text-center w-1/6">Total Interest</th>
              <th className="border-2 border-black p-3 font-semibold text-center w-1/6">Total Capital</th>
            </tr>
            {props.yearlyAmortisationSchedule
              .filter((item) => item.year !== 0)
              .map((item) => {
                const isInflection = !inflectionFound && item.capital > item.interest;
                if (isInflection) inflectionFound = true;

                const isMilestone = !milestoneFound && item.cumulativeCapital > item.cumulativeInterest;
                if (isMilestone) milestoneFound = true;

                let rowClassName = "hover:bg-gray-50";
                if (isInflection) rowClassName = "bg-yellow-200";
                if (isMilestone) rowClassName = "bg-blue-200";

                const yearLabel = isInflection
                  ? `${item.year} (Inflection)`
                  : isMilestone
                  ? `${item.year} (Milestone)`
                  : item.year;

                return (
                  <tr key={item.year} className={rowClassName}>
                    <td className="border-2 border-black p-3 text-center font-medium">{yearLabel}</td>
                    <td className="border-2 border-black p-3 text-center text-red-600">{formatCurrency(item.interest)}</td>
                    <td className="border-2 border-black p-3 text-center text-green-600">{formatCurrency(item.capital)}</td>
                    <td className="border-2 border-black p-3 text-center">{formatCurrency(item.balance)}</td>
                    <td className="border-2 border-black border-l-4 border-l-gray-400 p-3 text-center text-red-600">{formatCurrency(item.cumulativeInterest)}</td>
                    <td className="border-2 border-black p-3 text-center text-green-600">{formatCurrency(item.cumulativeCapital)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    )
  }