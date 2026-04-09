import React from 'react';
import { Link } from 'react-router-dom';

export default function AMC() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-primary dark:text-white">Annual Maintenance Contracts (AMC)</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          This is the dedicated platform module for Annual Maintenance Contracts (AMC). Developed as part of the complete Naidu Solutions ecosystem.
        </p>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link to="/quote" className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700">Get Quote</Link>
            <Link to="/contact" className="border border-primary text-primary dark:text-white px-6 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}