import axios from "axios";

export const fetchPendingTrades = async () => {
    try {

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/v1/limit_trades`)

    } catch (error) {

        console.log(error);

    }
}
