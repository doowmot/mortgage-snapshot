import { formatCurrency } from "../utils/format";

export function MortgageTable(props) {
    return (
        <div>
        <table>
        <tbody>
        <tr>
            <th>Year</th>
            <th>Interest</th>
            <th>Capital</th>
            <th>Balance Remaining</th>
        </tr>
        {props.amortisationSchedule.map((item) => (
            <tr key={item.year}>
            <td>{item.year}</td>
            <td>{formatCurrency(item.interest)}</td>
            <td>{formatCurrency(item.capital)}</td>
            <td>{formatCurrency(item.balance)}</td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    )
}