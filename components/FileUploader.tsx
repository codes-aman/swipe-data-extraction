
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { extractDataFromFile } from '../services/geminiService';
import { setInvoices } from '../store/invoicesSlice';
import { setProducts } from '../store/productsSlice';
import { setCustomers } from '../store/customersSlice';
import { UploadCloudIcon, FileIcon, LoaderIcon, CheckCircleIcon, XCircleIcon } from './icons';

type UploadStatus = 'idle' | 'loading' | 'success' | 'error';

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setStatus('loading');
    setError(null);
    try {
      const extractedData = await extractDataFromFile(selectedFile);

      // Add unique IDs to products and customers for editing purposes
      const productsWithIds = extractedData.products.map(p => ({...p, id: `${p.name}-${Math.random()}`}));
      const customersWithIds = extractedData.customers.map(c => ({...c, id: `${c.customerName}-${Math.random()}`}));

      dispatch(setInvoices(extractedData.invoices));
      dispatch(setProducts(productsWithIds));
      dispatch(setCustomers(customersWithIds));
      setStatus('success');
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      setStatus('error');
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  const renderStatus = () => {
    switch (status) {
      case 'loading':
        return <div className="flex items-center text-blue-600"><LoaderIcon className="mr-2" />Processing...</div>;
      case 'success':
        return <div className="flex items-center text-green-600"><CheckCircleIcon className="mr-2" />Extraction Complete!</div>;
      case 'error':
        return <div className="flex flex-col items-center text-red-600"><div className="flex items-center"><XCircleIcon className="mr-2" />Error</div><p className="text-xs mt-1 text-center">{error}</p></div>;
      default:
        return (
          <>
            <UploadCloudIcon className="w-10 h-10 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600"><span className="font-semibold text-blue-600">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PDF, PNG, JPG, or XLSX</p>
          </>
        );
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label 
        htmlFor="file-upload" 
        className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {renderStatus()}
        </div>
        <input 
          id="file-upload" 
          type="file" 
          className="hidden" 
          onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
          accept=".pdf,.png,.jpeg,.jpg,.xlsx"
        />
      </label>
      {file && (
        <div className="mt-4 flex items-center justify-between text-sm p-2 bg-gray-100 rounded-md border border-gray-200">
            <div className="flex items-center">
                <FileIcon className="w-5 h-5 mr-2 text-gray-600" />
                <span className="truncate max-w-xs text-gray-900">{file.name}</span>
            </div>
             <button onClick={() => { setFile(null); setStatus('idle'); }} className="text-red-600 hover:text-red-500">Clear</button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
