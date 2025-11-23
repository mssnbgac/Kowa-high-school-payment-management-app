import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { feeSchedule } from '../utils/mockData';
import '../styles/Dashboard.css';

function StudentDashboard() {
  const { user, logout, payments, makePayment } = useAuth();
  const [selectedFee, setSelectedFee] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const studentPayments = payments.filter(p => p.studentId === user.id);

  const handlePayment = (fee) => {
    setSelectedFee(fee);
    setShowPaymentForm(true);
  };

  const submitPayment = (e) => {
    e.preventDefault();
    
    const paymentData = {
      feeType: selectedFee.name,
      amount: selectedFee.amount,
      paymentMethod: paymentMethod
    };

    const result = makePayment(paymentData);
    
    if (result.success) {
      setShowPaymentForm(false);
      setSelectedFee(null);
      alert('Payment submitted successfully! Awaiting admin confirmation.');
    }
  };

  const generateReceipt = (payment) => {
    const receiptHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .receipt-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 15px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    .receipt-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    .school-name {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .school-subtitle {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 20px;
    }
    .receipt-title {
      font-size: 20px;
      font-weight: 600;
      margin-top: 20px;
      padding: 10px 20px;
      background: rgba(255,255,255,0.2);
      border-radius: 5px;
      display: inline-block;
    }
    .receipt-body {
      padding: 40px;
    }
    .receipt-number {
      text-align: center;
      font-size: 16px;
      color: #667eea;
      font-weight: bold;
      margin-bottom: 30px;
      padding: 15px;
      background: #f8f9ff;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .info-section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 14px;
      color: #667eea;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #667eea;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
    }
    .info-table td {
      padding: 12px;
      border-bottom: 1px solid #e0e0e0;
    }
    .info-table td:first-child {
      font-weight: 600;
      color: #555;
      width: 40%;
    }
    .info-table td:last-child {
      color: #333;
    }
    .payment-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    .payment-table th {
      background: #667eea;
      color: white;
      padding: 15px;
      text-align: left;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .payment-table td {
      padding: 15px;
      border-bottom: 1px solid #e0e0e0;
    }
    .total-row {
      background: #f8f9ff;
      font-weight: bold;
      font-size: 18px;
      color: #667eea;
    }
    .status-badge {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .status-confirmed {
      background: #d4edda;
      color: #155724;
    }
    .status-pending {
      background: #fff3cd;
      color: #856404;
    }
    .receipt-footer {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 2px dashed #ddd;
      text-align: center;
      color: #666;
      font-size: 13px;
    }
    .footer-note {
      margin-top: 15px;
      font-style: italic;
      color: #999;
    }
    .print-date {
      margin-top: 20px;
      font-size: 12px;
      color: #999;
    }
    @media print {
      body { 
        background: white;
        padding: 0;
      }
      .receipt-container {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="receipt-header">
      <div class="school-name">Kowa High School</div>
      <div class="school-subtitle">Birnin Gwari, Kaduna State</div>
      <div class="receipt-title">Official Payment Receipt</div>
    </div>
    
    <div class="receipt-body">
      <div class="receipt-number">
        Receipt No: ${payment.receiptNumber}
      </div>
      
      <div class="info-section">
        <div class="section-title">Student Information</div>
        <table class="info-table">
          <tr>
            <td>Student Name</td>
            <td>${payment.studentName || user.name}</td>
          </tr>
          <tr>
            <td>Student ID</td>
            <td>${user.studentId}</td>
          </tr>
          <tr>
            <td>Class</td>
            <td>${user.year}</td>
          </tr>
          <tr>
            <td>Program</td>
            <td>${user.program}</td>
          </tr>
        </table>
      </div>
      
      <div class="info-section">
        <div class="section-title">Payment Details</div>
        <table class="payment-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Payment Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${payment.feeType}</td>
              <td>${new Date(payment.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</td>
              <td>₦${payment.amount.toLocaleString()}</td>
            </tr>
            <tr class="total-row">
              <td colspan="2">Total Amount Paid</td>
              <td>₦${payment.amount.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="info-section">
        <div class="section-title">Transaction Information</div>
        <table class="info-table">
          <tr>
            <td>Payment Method</td>
            <td>${payment.paymentMethod ? payment.paymentMethod.replace('-', ' ').toUpperCase() : 'N/A'}</td>
          </tr>
          <tr>
            <td>Transaction Date</td>
            <td>${new Date(payment.date).toLocaleString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <span class="status-badge status-${payment.status}">
                ${payment.status.toUpperCase()}
              </span>
            </td>
          </tr>
          ${payment.confirmedDate ? `
          <tr>
            <td>Confirmed Date</td>
            <td>${new Date(payment.confirmedDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <div class="receipt-footer">
        <p><strong>Thank you for your payment!</strong></p>
        <p class="footer-note">
          This is an official receipt generated by Kowa High School Fee Payment System.<br>
          For any queries, please contact the school administration.
        </p>
        <p class="print-date">
          Generated on: ${new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  </div>
</body>
</html>
    `;
    
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    
    if (newWindow) {
      newWindow.onload = () => {
        setTimeout(() => {
          newWindow.print();
        }, 250);
      };
    }
    
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Student Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="student-info-card">
          <h2>Student Information</h2>
          <div className="info-grid">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Student ID:</strong> {user.studentId}</div>
            <div><strong>Program:</strong> {user.program}</div>
            <div><strong>Class:</strong> {user.year}</div>
          </div>
        </div>

        <div className="fee-schedule-card">
          <h2>Fee Schedule</h2>
          <div className="fee-list">
            {feeSchedule.map(fee => {
              const isPaid = studentPayments.some(p => p.feeType === fee.name && p.status === 'confirmed');
              const isPending = studentPayments.some(p => p.feeType === fee.name && p.status === 'pending');
              
              return (
                <div key={fee.id} className={`fee-item ${isPaid ? 'paid' : isPending ? 'pending' : ''}`}>
                  <div className="fee-info">
                    <h3>{fee.name}</h3>
                    <p>{fee.description}</p>
                    <p><strong>Amount:</strong> ₦{fee.amount.toLocaleString()}</p>
                    <p><strong>Due Date:</strong> {new Date(fee.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="fee-actions">
                    {isPaid ? (
                      <span className="status-badge paid">Paid</span>
                    ) : isPending ? (
                      <span className="status-badge pending">Pending</span>
                    ) : (
                      <button 
                        onClick={() => handlePayment(fee)}
                        className="pay-btn"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="payment-history-card">
          <h2>Payment History</h2>
          <div className="payment-list">
            {studentPayments.length === 0 ? (
              <p>No payments made yet.</p>
            ) : (
              studentPayments.map(payment => (
                <div key={payment.id} className="payment-item">
                  <div className="payment-info">
                    <h4>{payment.feeType}</h4>
                    <p>Amount: ₦{payment.amount.toLocaleString()}</p>
                    <p>Date: {new Date(payment.date).toLocaleDateString()}</p>
                    <p>Status: <span className={`status ${payment.status}`}>{payment.status}</span></p>
                  </div>
                  <div className="payment-actions">
                    <button 
                      onClick={() => generateReceipt(payment)}
                      className="receipt-btn"
                    >
                      Download Receipt
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showPaymentForm && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <h2>Make Payment</h2>
            <div className="payment-details">
              <p><strong>Fee:</strong> {selectedFee.name}</p>
              <p><strong>Amount:</strong> ₦{selectedFee.amount.toLocaleString()}</p>
            </div>
            
            <form onSubmit={submitPayment}>
              <div className="form-group">
                <label>Payment Method</label>
                <select 
                  value={paymentMethod} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="credit-card">Credit Card</option>
                  <option value="debit-card">Debit Card</option>
                  <option value="bank-transfer">Bank Transfer</option>
                </select>
              </div>
              
              <div className="mock-payment-info">
                <p><em>This is a mock payment system. No real transaction will be processed.</em></p>
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setShowPaymentForm(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="confirm-btn">
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;