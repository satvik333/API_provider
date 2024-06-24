import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_HANDLER_URL;

async function getTablesData() {
    try {
        const response = await axios.get(`${apiBaseUrl}/db/get-tables`);
        return response.data.result;  
    } catch (error) {
        console.error('Error fetching table data', error);
        throw error; 
    }
}

async function executeQuery(query) {
    try {
        const response = await axios.post(`${apiBaseUrl}/db/execute-query`, {query: query});
        return response.data;  
    } catch (error) {
        console.error('Error fetching table data', error);
        throw error; 
    }
}

export { getTablesData, executeQuery }; 
