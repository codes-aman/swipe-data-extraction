
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import type { Invoice } from '../types';

const Cell: React.FC<{ value: string | number }> = ({ value }) => {
    const isEmpty = value === null || value === undefined || value === '' || value === 0;
    return (
        <td className={`px-4 py-2 ${isEmpty ? 'bg-red-50 text-red-600' : ''}`}>
            {isEmpty ? 'N/A' : value}
        </td>
    );
};

const InvoicesTable: React.FC = () => {
    const { invoices } = useSelector((state: RootState) => state.invoices);

    if (invoices.length === 0) {
        return <p className="text-center text-gray-500 mt-8">No invoice data extracted yet.</p>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3">Serial #</th>
                        <th scope="col" className="px-4 py-3">Customer Name</th>
                        <th scope="col" className="px-4 py-3">Product Name(s)</th>
                        <th scope="col" className="px-4 py-3">Quantity</th>
                        <th scope="col" className="px-4 py-3">Tax Amount</th>
                        <th scope="col" className="px-4 py-3">Total Amount</th>
                        <th scope="col" className="px-4 py-3">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, index) => (
                        <tr key={invoice.serialNumber + index} className="border-b border-gray-200 hover:bg-gray-50">
                            <Cell value={invoice.serialNumber} />
                            <Cell value={invoice.customerName} />
                            <td className={`px-4 py-2 max-w-xs truncate ${!invoice.productName ? 'bg-red-50 text-red-600' : ''}`}>
                                {!invoice.productName ? 'N/A' : invoice.productName}
                            </td>
                            <Cell value={invoice.quantity} />
                            <Cell value={invoice.taxAmount.toFixed(2)} />
                            <Cell value={invoice.totalAmount.toFixed(2)} />
                            <Cell value={invoice.invoiceDate} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoicesTable;
