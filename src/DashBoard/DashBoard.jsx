import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashBoard.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

function DashBoard() {
  const [dnsRecords, setDNSRecords] = useState([]);

  const Base_URL = "https://dns-manager-backend-ns6s.onrender.com";

  useEffect(() => {
    // Get the records from the API and set the state to those records
    console.log("haisa",Base_URL);
    axios
      .get(`${Base_URL}/api/records`)
      .then((response) => {
        console.log('Got response from server');
        console.log(response.data);
        setDNSRecords(response.data);
      })
      .catch((error) => {
        console.log('Error getting data from server');
        console.log(error);
      });
  }, []);

  const onClickHandler = () => {
    console.log('button clicked');
    window.location.href = '/newDNS';
  };

  const onEditHandler = (id) => {
    console.log(`edit button for id ${id} clicked`);
    window.location.href = `/editDNS/${id}`;
  };

  const onDeleteHandler = (id) => {
    let url = `${Base_URL}/api/records/${id}`;
    console.log(`delete button for id ${id} clicked`);
    axios
      .delete(url)
      .then((res) => {
        console.log(res);
        alert('Record deleted successfully!');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        {/* Header */}
        <header>
          <h1 className="app-title">DNS Manager</h1>
          <button type="button" className="add-button" onClick={onClickHandler}>
            Add DNS Record
          </button>
        </header>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="table-header">
                <TableCell>Index</TableCell>
                <TableCell>A Record</TableCell>
                <TableCell>AAAA Record</TableCell>
                <TableCell>CNAME Record</TableCell>
                <TableCell>DNSSEC Record</TableCell>
                <TableCell>MX Record</TableCell>
                <TableCell>NS Record</TableCell>
                <TableCell>PTR Record</TableCell>
                <TableCell>SOA Record</TableCell>
                <TableCell>SRV Record</TableCell>
                <TableCell>TXT Record</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dnsRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{record.aRecord}</TableCell>
                  <TableCell>{record.aaaaRecord}</TableCell>
                  <TableCell>{record.cnameRecord}</TableCell>
                  <TableCell>{record.dnssecRecord}</TableCell>
                  <TableCell>{record.mxRecord}</TableCell>
                  <TableCell>{record.nsRecord}</TableCell>
                  <TableCell>{record.ptrRecord}</TableCell>
                  <TableCell>{record.soaRecord}</TableCell>
                  <TableCell>{record.srvRecord}</TableCell>
                  <TableCell>{record.txtRecord}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onEditHandler(record._id)}
                      variant="outlined"
                      color="primary"
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onDeleteHandler(record._id)}
                      variant="outlined"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default DashBoard;
