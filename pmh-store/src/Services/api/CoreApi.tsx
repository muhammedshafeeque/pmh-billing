import axios from "../../Api/Api";
export const getRackById = async (id:string) => {
    try {
        let rack = await axios.get(`/stock/rack/${id}`);
        return rack.data;
    } catch (error) {
        console.error("Error fetching rack:", error);
        return null;
    }
};