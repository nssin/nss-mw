import { useState } from 'react';
import jsPDF from 'jspdf';

export default function QuoteGenerator() {
  const [craneType, setCraneType] = useState('EOT');
  const [capacity, setCapacity] = useState('5');
  const [span, setSpan] = useState('10');

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Naidu Solutions - Instant Quotation', 20, 20);
    doc.setFontSize(14);
    doc.text(`Crane Type: ${craneType}`, 20, 40);
    doc.text(`Capacity: ${capacity} Tons`, 20, 50);
    doc.text(`Span: ${span} Meters`, 20, 60);
    
    // Basic estimator logic
    const basePrice = craneType === 'EOT' ? 500000 : 300000;
    const estimatedPrice = basePrice + (parseInt(capacity) * 50000) + (parseInt(span) * 10000);
    
    doc.setFontSize(16);
    doc.text(`Estimated Base Cost: ₹${estimatedPrice.toLocaleString('en-IN')}`, 20, 80);
    doc.setFontSize(10);
    doc.text('Note: This is an auto-generated rough estimate. Final quote requires site inspection.', 20, 100);
    
    doc.save('Naidu_Quotation.pdf');
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Instant Crane Configurator & Quote</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Select Crane Type</label>
            <select value={craneType} onChange={(e) => setCraneType(e.target.value)} className="w-full p-3 border rounded dark:bg-gray-700">
              <option value="EOT">EOT Crane</option>
              <option value="Gantry">Gantry Crane</option>
              <option value="Jib">Jib Crane</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Capacity (Tons)</label>
            <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full p-3 border rounded dark:bg-gray-700" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Span Length (Meters)</label>
            <input type="number" value={span} onChange={(e) => setSpan(e.target.value)} className="w-full p-3 border rounded dark:bg-gray-700" />
          </div>
          <button onClick={generatePDF} className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-blue-700">
            Download PDF Estimate
          </button>
        </div>
      </div>
    </div>
  );
}