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
        const response = await axios.post(
            `${apiBaseUrl}/db/execute-query`, 
            { query: query },
            { headers: { 'authorization': 'QmVhcmVyIHNvbWVBdXRob3JpemF0aW9uVG9rZW4=', 'Content-Type': 'application/json' } }
        );
        return response.data;  
    } catch (error) {
        console.error('Error executing query', error);
        throw error; 
    }
}

export { getTablesData, executeQuery }; 
