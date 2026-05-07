import { formatCurrency } from "../utils/format";
import type { AmortisationRow } from "../utils/mortgageCalculations";

interface MortgageTableProps {
  yearlyAmortisationSchedule: AmortisationRow[];
}

export function MortgageTable(props: MortgageTableProps) {
    let inflectionFound = false;
    let milestoneFound = false;

    return (
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="border-b border-gray-200 p-3 font-medium text-center whitespace-nowrap">Year</th>
              <th className="border-b border-gray-200 p-3 font-medium text-center whitespace-nowrap">Interest</th>
              <th className="border-b border-gray-200 p-3 font-medium text-center whitespace-nowrap">Capital</th>
              <th className="border-b border-gray-200 p-3 font-medium text-center whitespace-nowrap">Balance</th>
              <th className="border-b border-gray-200 p-3 font-medium text-center whitespace-nowrap">Total Interest</th>
              <th className="border-b border-gray-200 p-3 font-medium text-center whitespace-nowrap">Total Capital</th>
            </tr>
          </thead>
          <tbody>
            {props.yearlyAmortisationSchedule
              .filter((item) => item.year !== 0)
              .map((item) => {
                const isInflection = !inflectionFound && item.capital > item.interest;
                if (isInflection) inflectionFound = true;

                const isMilestone = !milestoneFound && item.cumulativeCapital > item.cumulativeInterest;
                if (isMilestone) milestoneFound = true;

                let rowClassName = "hover:bg-gray-50";
                if (isInflection) rowClassName = "bg-amber-50 font-medium";
                if (isMilestone) rowClassName = "bg-sky-50 font-medium";

                return (
                  <tr key={item.year} className={rowClassName}>
                    <td className="border-b border-gray-100 p-3 text-center">{item.year}</td>
                    <td className="border-b border-gray-100 p-3 text-center text-red-600">{formatCurrency(item.interest)}</td>
                    <td className="border-b border-gray-100 p-3 text-center text-green-600">{formatCurrency(item.capital)}</td>
                    <td className="border-b border-gray-100 p-3 text-center">{formatCurrency(item.balance)}</td>
                    <td className="border-b border-gray-100 p-3 text-center text-red-600">{formatCurrency(item.cumulativeInterest)}</td>
                    <td className="border-b border-gray-100 p-3 text-center text-green-600">{formatCurrency(item.cumulativeCapital)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    )
  }