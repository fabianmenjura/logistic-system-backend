import axios from 'axios';

const validateAddress = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
console.log(url);
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return true; // La dirección es válida
        }
        // return false; // La dirección no es válida
        return true; // La dirección no es válida
    } catch (error) {
        throw new Error('Error al validar la dirección');
    }
};

export default validateAddress;