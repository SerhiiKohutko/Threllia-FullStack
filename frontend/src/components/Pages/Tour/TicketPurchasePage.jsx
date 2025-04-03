import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getFormattedDate} from "@/components/Utils/DateParser.js";
import {Button} from "@/components/ui/button.jsx";
import {getShowDetails, ticketPurchase} from "@/redux/tour/Action.js";
import {BackgroundEffects} from "@/components/Pages/Auth/AuthPage.jsx"; // Предполагаю, что у вас есть компонент Button

export const TicketPurchasePage = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [email, setEmail] = useState('');

    const tour = useSelector(store => store.tours.tourDetails);
    const dispatch = useDispatch();

    const basePrice = 50;
    const totalPrice = basePrice * quantity;

    useEffect(() => {
        dispatch(getShowDetails(id))
    },[])

    const handlePayment =  () => {
            const ticketData = {
               clientEmail : email,
                 city : tour.city,
                country : tour.country,
                date : tour.date,
                place : tour.place,
                quantity : quantity,
                amount : totalPrice
            };

       dispatch(ticketPurchase(ticketData));
    };

    if (!tour) {
        return <div className="text-center text-white text-2xl font-tradeWinds py-12">Concert not found.</div>;
    }

    return (
        <div className={"min-h-screen"}>
            <BackgroundEffects/>
            <div className={"h-[8rem]"}></div>
    <div className=" max-w-2xl mx-auto p-6 bg-black text-white border border-orange-500/30 shadow-lg backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 font-rubikPaint">Ticket purchasement</h2>

            <div className="mb-6 p-4 border border-orange-500/20 bg-black/50">
                <h3 className="text-2xl font-bold mb-2">{tour.city}, {tour.country}</h3>
                <p className="text-lg mb-1">{getFormattedDate(tour.date)}</p>
                <p className="text-gray-400">{tour.place}</p>
            </div>

            <div className="mb-6">
                <label className="block mb-2 text-lg">Qunatity:</label>
                <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-2 bg-black border border-orange-500/50 text-white"
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <label className="block mb-2 text-lg">Email for sending tickets on:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 bg-black border border-orange-500/50 text-white"
                    placeholder="your@email.com"
                    required
                />
            </div>

            <div className="mb-8 p-4 border border-orange-500/30 bg-black/60">
                <div className="flex justify-between mb-2">
                    <span>Cost of the ticket:</span>
                    <span>${basePrice}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>Quantity:</span>
                    <span>{quantity}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-orange-500/30 pt-2 mt-2">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                </div>
            </div>

            <Button
                onClick={handlePayment}
                variant="ghost"
                className="w-full  border border-orange-500 text-white font-bold hover:bg-orange-800/50 hover:border-orange-500 hover:text-orange-500  transition-colors text-lg"
                disabled={!email}>
                Pay
            </Button>

            <p className="mt-4 text-sm text-gray-400">
                After successfull payment your ticket will be sent on the email you specified.
            </p>
        </div>
            </div>)
}
