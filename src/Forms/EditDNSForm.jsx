import React, { useEffect, useState } from 'react';
import axios  from "axios";
import { useQuery } from "react-query"
import './EditDNSForm.css';


const EditDNSForm = ({record}) => { 

    const Base_URL = "https://dns-manager-backend-ns6s.onrender.com";
    let id = window.location.pathname.split('/').pop();
    //console.log(id); 
    const handleRequest=async()=>{ 
        //console.log("inside handleRequest");
        const data=await axios.get(`${Base_URL}/api/records/${id}`);   
        console.log("handle",data);
        return data;
    } 
    
    
    const {data,isLoading}=useQuery("data",handleRequest); 
    const [formData, setFormData] = useState();

            
    const handleChange = (e)  => {
        setFormData((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        } );
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.patch(`${Base_URL}/api/records/${id}`, formData);
            
            if (response.status === 200) {
                console.log('DNS record updated successfully');
                window.location.href = '/';
                alert("DNS Record updated successfully");

            } else {
                console.error('Failed to Update DNS record');
            }
        } catch (error) {
            console.error('Error updating DNS record:', error.message);
        }

    };
    useEffect(()=>{ 
        
        if(isLoading||!data){  
            //console.log("inside useEffect");
            return;
        } 
        else{
            console.log("inside useEffect else"); 
            setFormData(data?.data);
            // console.log(formData);
        }
    },[isLoading,data])
    return !isLoading?(
        <div  className="edit-dns-form">
            <header>
                <h1 className='app-title'>DNS Manager</h1>
            </header>
            <div className='Edit-DNS-Form-Container'>

            <h2>Edit DNS Record</h2>

            <form onSubmit={handleSubmit}>
                <label name="Address">A Address</label>
                <input type="text" name="aRecord" value={formData?.["aRecord"]} placeholder="A (Address) Record" onChange={handleChange} />
                <br />
                <label name="aaaaRecord">AAAA Address</label>
                <input type="text" name="aaaaRecord" value={formData?.["aaaaRecord"]} placeholder="AAAA (IPv6 Address) Record" onChange={handleChange} />
                <br />
                <label name="CNAME Record">CNAME Record</label>
                <input type="text" name="cnameRecord" value={formData?.["cnameRecord"]} placeholder="CNAME (Canonical Name) Record" onChange={handleChange} />
                <br />
                <label name="mxRecord">MX Record</label>
                <input type="text" name="mxRecord" value={formData?.["mxRecord"]} placeholder="MX (Mail Exchange) Record" onChange={handleChange} />
                <br />
                <label name="nsRecord">NS Record</label>
                <input type="text" name="nsRecord" value={formData?.["nsRecord"]} placeholder="NS (Name Server) Record" onChange={handleChange} />
                <br />
                <label name="ptrRecord">PTR Record</label>
                <input type="text" name="ptrRecord" value={formData?.["ptrRecord"]} placeholder="PTR (Pointer) Record" onChange={handleChange} />
                <br />
                <label name="soaRecord">SOA Record</label>
                <input type="text" name="soaRecord" value={formData?.["soaRecord"]} placeholder="SOA (Start of Authority) Record" onChange={handleChange} />
                <br />
                <label name="srvRecord">SRV Record</label>
                <input type="text" name="srvRecord" value={formData?.["srvRecord"]} placeholder="SRV (Service) Record" onChange={handleChange} />
                <br />
                <label name="txtRecord">TXT Record</label>
                <input type="text" name="txtRecord" value={formData?.["txtRecord"]} placeholder="TXT (Text) Record" onChange={handleChange} />
                <br />
                <label name="dnssecRecord">DNSSEC Record</label>
                <input type="text" name="dnssecRecord" value={formData?.["dnssecRecord"]} placeholder="DNSSEC" onChange={handleChange} />
                <br />
                <button onClick={handleSubmit} type='submit'>Update DNS Record</button>
            </form> 
            </div>
        </div>
    ):(<div>Loading...</div>)
};

export default EditDNSForm;
