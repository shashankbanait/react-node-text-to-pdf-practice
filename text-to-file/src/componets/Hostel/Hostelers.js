import React, { useEffect, useState } from 'react';
import { fetchHostelers } from "../../api";
import "./Hostelers.css";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Hostelers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filter, setFilter] = useState('');


    useEffect(() => {
        const getHostelers = async () => {
            try {
                const response = await fetchHostelers();
                setUsers(response.data);
            }
            catch (error) {
                setError("Error fetching hostelers");
                console.log("getting this error: ", error);
            }
            finally {
                setLoading(false);
            }
        }

        getHostelers();
    }, []);

    useEffect(()=>{
        const lowercasedFilter = filter.toLowerCase();
        const filtered = users.filter(user=>
            user.name.toLowerCase().includes(lowercasedFilter) ||
            user.profession.toLowerCase().includes(lowercasedFilter) ||
            user.email.toLowerCase().includes(lowercasedFilter) ||
            user.contact.includes(lowercasedFilter)
        );
        setFilteredUsers(filtered);
    }, [filter, users]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);  
    }

    const downloadPDF = () => {
        const input = document.getElementById('hostelers-table');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210; // Adjusted to fit A4 page width
            const pageHeight = 295; // A4 page height
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('users.pdf');
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="Hostelers">
            <button className="my-button" onClick={downloadPDF}>Download this table pdf</button>
            <label>Filter karo:</label>
            <input type="text" id="name" value={filter} onChange={handleFilterChange} className='filter-input'/>
            <div id="hostelers-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Contact</th>
                            <th>Profession</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.contact}</td>
                                <td>{user.profession}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Hostelers;