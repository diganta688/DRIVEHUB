import React from 'react';
import Button from '@mui/material/Button';

const StylishButton = ({ handleSearch }) => {
  return (
    <Button 
      onClick={handleSearch} 
      variant="contained"
      color="primary"
      sx={{
        borderRadius: '8px',
        padding: '10px 30px',
        textTransform: 'capitalize',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        fontSize: '15px',
        fontWeight: '500',
        backgroundColor: '#1976d2',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          backgroundColor: '#1565C0',
          boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.15)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        }
      }}
    >
      Search
    </Button>
  );
};

export default StylishButton;
