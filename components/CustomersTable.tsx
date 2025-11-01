
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { updateCustomer } from '../store/customersSlice';
import { syncCustomerNameInInvoices } from '../store/invoicesSlice';
import type { Customer } from '../types';

const CustomersTable: React.FC = () => {
    const { customers } = useSelector((state: RootState) => state.customers);
    const dispatch = useDispatch<AppDispatch>();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Customer | null>(null);
    const [originalName, setOriginalName] = useState<string>('');

    useEffect(() => {
        if (editingId) {
            const customerToEdit = customers.find(c => c.id === editingId);
            if (customerToEdit) {
                setEditFormData(customerToEdit);
                setOriginalName(customerToEdit.customerName);
            }
        } else {
            setEditFormData(null);
            setOriginalName('');
        }
    }, [editingId, customers]);

    const handleEditClick = (customer: Customer) => {
        setEditingId(customer.id);
    };

    const handleCancelClick = () => {
        setEditingId(null);
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (editFormData) {
            setEditFormData({ ...editFormData, [name]: name === 'totalPurchaseAmount' ? Number(value) : value });
        }
    };
    
    const handleSaveClick = () => {
        if (editFormData) {
            dispatch(updateCustomer(editFormData));
            if (originalName !== editFormData.customerName) {
                dispatch(syncCustomerNameInInvoices({ originalName, newName: editFormData.customerName }));
            }
            setEditingId(null);
        }
    };
    
    const Cell: React.FC<{ value: string | number }> = ({ value }) => {
        const isEmpty = value === null || value === undefined || value === '' || value === 0;
        return (
            <td className={`px-4 py-2 ${isEmpty ? 'bg-red-50 text-red-600' : ''}`}>
                {isEmpty ? 'N/A' : value}
            </td>
        );
    };

    if (customers.length === 0) {
        return <p className="text-center text-gray-500 mt-8">No customer data extracted yet.</p>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3">Customer Name</th>
                        <th scope="col" className="px-4 py-3">Phone Number</th>
                        <th scope="col" className="px-4 py-3">Total Purchase Amount</th>
                        <th scope="col" className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50">
                             {editingId === customer.id && editFormData ? (
                                <>
                                    <td className="px-4 py-2"><input type="text" name="customerName" value={editFormData.customerName} onChange={handleFormChange} className="bg-white border border-gray-300 p-1 rounded w-full text-gray-900" /></td>
                                    <td className="px-4 py-2"><input type="text" name="phoneNumber" value={editFormData.phoneNumber} onChange={handleFormChange} className="bg-white border border-gray-300 p-1 rounded w-32 text-gray-900" /></td>
                                    <td className="px-4 py-2"><input type="number" name="totalPurchaseAmount" value={editFormData.totalPurchaseAmount} onChange={handleFormChange} className="bg-gray-100 border border-gray-300 p-1 rounded w-32 text-gray-900" disabled title="This field is auto-calculated"/></td>
                                    <td className="px-4 py-2 flex items-center space-x-2">
                                        <button onClick={handleSaveClick} className="text-green-600 hover:text-green-500">Save</button>
                                        <button onClick={handleCancelClick} className="text-red-600 hover:text-red-500">Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <Cell value={customer.customerName} />
                                    <Cell value={customer.phoneNumber} />
                                    <Cell value={customer.totalPurchaseAmount.toFixed(2)} />
                                    <td className="px-4 py-2">
                                        <button onClick={() => handleEditClick(customer)} className="font-medium text-blue-600 hover:underline">Edit</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomersTable;