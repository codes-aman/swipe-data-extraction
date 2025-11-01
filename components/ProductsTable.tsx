
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { updateProduct } from '../store/productsSlice';
import { syncProductNameInInvoices } from '../store/invoicesSlice';
import type { Product } from '../types';

const ProductsTable: React.FC = () => {
    const { products } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch<AppDispatch>();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Product | null>(null);
    const [originalName, setOriginalName] = useState<string>('');

    useEffect(() => {
        if (editingId) {
            const productToEdit = products.find(p => p.id === editingId);
            if (productToEdit) {
                setEditFormData(productToEdit);
                setOriginalName(productToEdit.name);
            }
        } else {
            setEditFormData(null);
            setOriginalName('');
        }
    }, [editingId, products]);

    const handleEditClick = (product: Product) => {
        setEditingId(product.id);
    };

    const handleCancelClick = () => {
        setEditingId(null);
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (editFormData) {
            setEditFormData({ ...editFormData, [name]: name === 'name' ? value : Number(value) });
        }
    };
    
    const handleSaveClick = () => {
        if (editFormData) {
            dispatch(updateProduct(editFormData));
            if (originalName !== editFormData.name) {
                dispatch(syncProductNameInInvoices({ originalName, newName: editFormData.name }));
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

    if (products.length === 0) {
        return <p className="text-center text-gray-500 mt-8">No product data extracted yet.</p>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Quantity</th>
                        <th scope="col" className="px-4 py-3">Unit Price</th>
                        <th scope="col" className="px-4 py-3">Tax</th>
                        <th scope="col" className="px-4 py-3">Price with Tax</th>
                        <th scope="col" className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                            {editingId === product.id && editFormData ? (
                                <>
                                    <td className="px-4 py-2"><input type="text" name="name" value={editFormData.name} onChange={handleFormChange} className="bg-white border border-gray-300 p-1 rounded w-full text-gray-900" /></td>
                                    <td className="px-4 py-2"><input type="number" name="quantity" value={editFormData.quantity} onChange={handleFormChange} className="bg-white border border-gray-300 p-1 rounded w-20 text-gray-900" /></td>
                                    <td className="px-4 py-2"><input type="number" name="unitPrice" value={editFormData.unitPrice} onChange={handleFormChange} className="bg-white border border-gray-300 p-1 rounded w-24 text-gray-900" /></td>
                                    <td className="px-4 py-2"><input type="number" name="tax" value={editFormData.tax} onChange={handleFormChange} className="bg-white border border-gray-300 p-1 rounded w-24 text-gray-900" /></td>
                                    <td className="px-4 py-2"><input type="number" name="priceWithTax" value={editFormData.priceWithTax} onChange={handleFormChange} className="bg-white border border-gray-300 p-1 rounded w-24 text-gray-900" /></td>
                                    <td className="px-4 py-2 flex items-center space-x-2">
                                        <button onClick={handleSaveClick} className="text-green-600 hover:text-green-500">Save</button>
                                        <button onClick={handleCancelClick} className="text-red-600 hover:text-red-500">Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <Cell value={product.name} />
                                    <Cell value={product.quantity} />
                                    <Cell value={product.unitPrice.toFixed(2)} />
                                    <Cell value={product.tax.toFixed(2)} />
                                    <Cell value={product.priceWithTax.toFixed(2)} />
                                    <td className="px-4 py-2">
                                        <button onClick={() => handleEditClick(product)} className="font-medium text-blue-600 hover:underline">Edit</button>
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

export default ProductsTable;
