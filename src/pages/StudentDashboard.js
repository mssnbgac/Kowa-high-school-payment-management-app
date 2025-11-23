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
    const receiptContent = `
STUDENT FEE PAYMENT RECEIPT
==========================
Receipt #: ${payment.receiptNumber}
Date: ${new Date(payment.date).toLocaleDateString()}
Student: ${payment.studentName}
Fee Type: ${payment.feeType}
Amount: ₦${payment.amount}
Status: ${payment.status.toUpperCase()}
${payment.confirmedDate ? `Confirmed: ${new Date(payment.confirmedDate).toLocaleDateString()}` : ''}
==========================
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${payment.receiptNumber}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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