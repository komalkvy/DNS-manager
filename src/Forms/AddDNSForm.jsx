import React, { useState } from 'react';
import axios  from "axios";
import './AddDNSForm.css';

const AddDNSForm = ({record}) => {

    const Base_URL = "https://dns-manager-backend-ns6s.onrender.com";
    const [formData, setFormData] = useState(record);


    const handleChange = (e)  => {
        setFormData((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        } );
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post(`${Base_URL}/newDNS`, formData);
            
            if (response.status === 200) {
                console.log('DNS record added successfully');
                window.location.href = '/';
                alert("DNS Record added successfully");

            } else {
                console.error('Failed to add DNS record');
            }
        } catch (error) {
            console.error('Error adding DNS record:', error.message);
        }

    };

    return (
        <div  className="add-dns-form">
            <header>
                <h1 className='app-title'>DNS Manager</h1>
            </header>
            <div className='Add-DNS-Form-Container'>

            <h2>Add New DNS Record</h2>

            <form onSubmit={handleSubmit}>
                <label name="Address">A Address</label>
                <input type="text" name="aRecord" placeholder="A (Address) Record" onChange={handleChange} />
                <br />
                <label name="aaaaRecord">AAAA Address</label>
                <input type="text" name="aaaaRecord" placeholder="AAAA (IPv6 Address) Record" onChange={handleChange} />
                <br />
                <label name="CNAME Record">CNAME Record</label>
                <input type="text" name="cnameRecord" placeholder="CNAME (Canonical Name) Record" onChange={handleChange} />
                <br />
                <label name="mxRecord">MX Record</label>
                <input type="text" name="mxRecord" placeholder="MX (Mail Exchange) Record" onChange={handleChange} />
                <br />
                <label name="nsRecord">NS Record</label>
                <input type="text" name="nsRecord" placeholder="NS (Name Server) Record" onChange={handleChange} />
                <br />
                <label name="ptrRecord">PTR Record</label>
                <input type="text" name="ptrRecord" placeholder="PTR (Pointer) Record" onChange={handleChange} />
                <br />
                <label name="soaRecord">SOA Record</label>
                <input type="text" name="soaRecord" placeholder="SOA (Start of Authority) Record" onChange={handleChange} />
                <br />
                <label name="srvRecord">SRV Record</label>
                <input type="text" name="srvRecord" placeholder="SRV (Service) Record" onChange={handleChange} />
                <br />
                <label name="txtRecord">TXT Record</label>
                <input type="text" name="txtRecord" placeholder="TXT (Text) Record" onChange={handleChange} />
                <br />
                <label name="dnssecRecord">DNSSEC Record</label>
                <input type="text" name="dnssecRecord" placeholder="DNSSEC" onChange={handleChange} />
                <br />
                <button type='submit'>Add DNS Record</button>
            </form>
            </div>
        </div>
    );
};

export default AddDNSForm;
