import React, {useState, useEffect} from 'react';
import {ApiClient} from 'adminjs';
import {Box, H2, Text, Illustration, Button} from '@adminjs/design-system';

const api = new ApiClient();

const Dashboard = () => {
    const [data, setData] = useState({});
    const [role, setRole] = useState('user');

    useEffect(() => {
        api.getDashboard().then(response => {
            setData(response.data);
            setRole(response.data.role);
        });
    }, []);

    return (
    <Box variant="grey">
      <Box variant="white" padding="xl" margin="xl" style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <H2>Welcome to eCommerce Admin Panel</H2>
        
        {role === 'admin' ? (
          <div>
            <Text mb="lg">You are logged in as an <b>Administrator</b>. Here is the system summary:</Text>
            <Box flex flexDirection="row" flexWrap="wrap">
              <Box p="lg" m="sm" style={{ border: '1px solid #ddd', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
                <H2>{data.usersCount || 0}</H2>
                <Text>Total Users</Text>
              </Box>
              <Box p="lg" m="sm" style={{ border: '1px solid #ddd', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
                <H2>{data.productsCount || 0}</H2>
                <Text>Total Products</Text>
              </Box>
              <Box p="lg" m="sm" style={{ border: '1px solid #ddd', borderRadius: '5px', width: '200px', textAlign: 'center' }}>
                <H2>{data.ordersCount || 0}</H2>
                <Text>Total Orders</Text>
              </Box>
            </Box>
          </div>
        ) : (
          <div>
            <Text mb="lg">Hello! You are logged in as a <b>Regular User</b>.</Text>
            <Box p="lg" style={{ backgroundColor: '#f4f5f7', borderRadius: '8px' }}>
              <Text>Your email: <b>{data.email}</b></Text>
              <Text mt="md">Use the sidebar menu to view products and your orders.</Text>
            </Box>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;


