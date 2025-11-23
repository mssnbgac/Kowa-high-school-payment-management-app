import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

function AdminDashboard() {
  const { user, logout, payments, users, confirmPayment } = useAuth();
  const [activeTab, setActiveTab] = useState('payments');
  const [filterStatus, setFilterStatus] = useState('all');

  const students = users.filter(u => u.role === 'student');
  
  const filteredPayments = payments.filter(payment => {
    if (filterStatus === 'all') return true;
    return payment.status === filterStatus;
  });

  const handleConfirmPayment = (paymentId) => {
    if (window.confirm('Are you sure you want to confirm this payment?')) {
      confirmPayment(paymentId);
    }
  };

  const getTotalRevenue = () => {
    return payments
      .filter(p => p.status === 'confirmed')
      .reduce((total, p) => total + p.amount, 0);
  };

  const getPendingCount = () => {
    return payments.filter(p => p.status === 'pending').length;
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <div className="stat-number">{students.length}</div>
          </div>
          <div className="stat-card">
            <h3>Pending Payments</h3>
            <div className="stat-number">{getPendingCount()}</div>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <div className="stat-number">₦{getTotalRevenue().toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <h3>Total Payments</h3>
            <div className="stat-number">{payments.length}</div>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            Payment Management
          </button>
          <button 
            className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Student Records
          </button>
        </div>

        {activeTab === 'payments' && (
          <div className="payments-section">
            <div className="section-header">
              <h2>Payment Management</h2>
              <div className="filter-controls">
                <label>Filter by Status:</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Payments</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                </select>
              </div>
            </div>

            <div className="payments-table">
              <div className="table-header">
                <div>Receipt #</div>
                <div>Student</div>
                <div>Fee Type</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              
              {filteredPayments.map(payment => (
                <div key={payment.id} className="table-row">
                  <div>{payment.receiptNumber}</div>
                  <div>{payment.studentName}</div>
                  <div>{payment.feeType}</div>
                  <div>₦{payment.amount.toLocaleString()}</div>
                  <div>{new Date(payment.date).toLocaleDateString()}</div>
                  <div>
                    <span className={`status-badge ${payment.status}`}>
                      {payment.status}
                    </span>
                  </div>
                  <div>
                    {payment.status === 'pending' && (
                      <button 
                        onClick={() => handleConfirmPayment(payment.id)}
                        className="confirm-btn small"
                      >
                        Confirm
                      </button>
                    )}
                    {payment.status === 'confirmed' && (
                      <span className="confirmed-text">
                        ✓ Confirmed on {new Date(payment.confirmedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredPayments.length === 0 && (
                <div className="no-data">
                  No payments found for the selected filter.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="students-section">
            <h2>Student Records</h2>
            
            <div className="students-table">
              <div className="table-header">
                <div>Student ID</div>
                <div>Name</div>
                <div>Email</div>
                <div>Program</div>
                <div>Class</div>
                <div>Payments Made</div>
              </div>
              
              {students.map(student => {
                const studentPayments = payments.filter(p => p.studentId === student.id);
                const confirmedPayments = studentPayments.filter(p => p.status === 'confirmed');
                
                return (
                  <div key={student.id} className="table-row">
                    <div>{student.studentId}</div>
                    <div>{student.name}</div>
                    <div>{student.email}</div>
                    <div>{student.program}</div>
                    <div>{student.year}</div>
                    <div>
                      {confirmedPayments.length} confirmed, {studentPayments.length - confirmedPayments.length} pending
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;