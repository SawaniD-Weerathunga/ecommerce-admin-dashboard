import React, {useState, useEffect} from 'react';
import {ApiClient} from 'adminjs';

const api = new ApiClient();

const Dashboard = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        api.getDashboard().then(response => {
            setData(response.data);
        });
    }, []);

    if (!data) {
      return <div style={{ padding: '20px' }}>Loading...</div>;
    }

    if (data.role === 'admin') {
    return (
      <div style={{padding: '30px', fontFamily: 'Arial, sans-serif'}}>
        <h2>Welcome to eCommerce Admin Panel</h2>
        <p>You are logged in as an <b>Administrator</b>. Here is the system summary:</p>
        
        <div style={{display: 'flex', gap: '20px', marginTop: '20px'}}>
          <div style={{padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '200px', textAlign: 'center'}}>
            <h1>{data.usersCount}</h1>
            <p>Total Users</p>
          </div>
          <div style={{padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '200px', textAlign: 'center'}}>
            <h1>{data.productsCount}</h1>
            <p>Total Products</p>
          </div>
          <div style={{padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '200px', textAlign: 'center'}}>
            <h1>{data.ordersCount}</h1>
            <p>Total Orders</p>
          </div>
        </div>
      </div>
    );
  }

  if (data.role === 'user') {
    return (
      <div style={{padding: '30px', fontFamily: 'Arial, sans-serif'}}>
        <h2>Welcome back, {data.email}!</h2>
        <p>Here is the summary of your recent orders:</p>

        {data.orders && data.orders.length > 0 ? (
          <table style={{width: '100%', marginTop: '20px', borderCollapse: 'collapse', textAlign: 'left'}}>
            <thead>
              <tr style={{backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd'}}>
                <th style={{padding: '12px'}}>Order ID</th>
                <th style={{padding: '12px'}}>Date</th>
                <th style={{padding: '12px'}}>Total Amount</th>
                <th style={{padding: '12px'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order.id} style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '12px'}}>#{order.id}</td>
                  <td style={{padding: '12px'}}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{padding: '12px'}}>{order.totalAmount}</td>
                  <td style={{padding: '12px'}}>
                    <span style={{ 
                      padding: '5px 10px', 
                      borderRadius: '5px', 
                      backgroundColor: order.status === 'Completed' ? '#d4edda' : '#fff3cd',
                      color: order.status === 'Completed' ? '#155724' : '#856404'
                    }}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{marginTop: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px'}}>
            You have no recent orders.
          </div>
        )}
      </div>
    );
  }

  return <div>Unknown access level</div>;
};

export default Dashboard;
