
import React, { useState } from 'react';
import FileUploader from './FileUploader';
import InvoicesTable from './InvoicesTable';
import ProductsTable from './ProductsTable';
import CustomersTable from './CustomersTable';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

type Tab = 'Invoices' | 'Products' | 'Customers';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Invoices');
  
  const { invoices } = useSelector((state: RootState) => state.invoices);
  const { products } = useSelector((state: RootState) => state.products);
  const { customers } = useSelector((state: RootState) => state.customers);

  const hasData = invoices.length > 0 || products.length > 0 || customers.length > 0;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Invoices':
        return <InvoicesTable />;
      case 'Products':
        return <ProductsTable />;
      case 'Customers':
        return <CustomersTable />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Swipe AI Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Upload a document to get started.</p>
        </header>

        <FileUploader />

        {hasData && (
          <div className="mt-8">
            <div className="flex border-b border-gray-200">
              {(['Invoices', 'Products', 'Customers'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 -mb-px text-sm font-medium transition-colors duration-200 ease-in
                    ${activeTab === tab 
                      ? 'border-b-2 border-blue-500 text-blue-600' 
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-4">{renderTabContent()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainApp;
