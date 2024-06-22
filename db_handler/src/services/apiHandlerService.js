import axios from 'axios';

const apiBaseUrl = 'http://localhost:8080';

async function getTablesData() {
    try {
        console.log(apiBaseUrl,'bbbbbbbbbbbbbbbbb')
        const response = await axios.get(`${apiBaseUrl}/get-tables`);
        return response.data;  
    } catch (error) {
        console.error('Error fetching table data', error);
        throw error; 
    }
}

export { getTablesData }; 
