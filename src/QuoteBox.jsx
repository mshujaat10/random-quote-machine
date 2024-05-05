import React, { useMemo, useState } from "react";
import { FaQuoteLeft, FaTwitter } from "react-icons/fa";

const QuoteBox = () => {
    const [quote, setQuote] = useState({ text: "", author: "" });

    const getQuote = async () => {
        try {
            const response = await fetch("https://type.fit/api/quotes", {
                method: "GET",
            });
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex];
            setQuote(randomQuote);
        } catch (err) {
            console.log("Error occurred: ", err);
            throw err;
        }
    }

    useMemo(() => {
        getQuote();
    }, []);

    return (
        <div id="wrapper">
            <div id="quote-box" className="bg-white px-[50px] py-[40px] rounded-[15px]">
                <div className="w-[450px] text-center mb-4">
                    <i className="text-[#e74c3c] inline-block text-2xl me-[10px]"><FaQuoteLeft /></i>
                    <span id="text" className="text-[28px] leading-8 text-[#e74c3c]">{quote.text}</span>
                </div>
                <p className="text-end text-[#e74c3c] text-xl mb-5" id="author">- {quote.author}</p>
                <div className="flex items-center justify-between mt-2">
                    <a className="bg-[#e74c3c] text-white rounded-sm p-3" href="twitter.com/intent/tweet" id="tweet-quote" target="_blank" title="Tweet this Quote!"><FaTwitter /></a>
                    <button onClick={getQuote} id="new-quote" className="bg-[#e74c3c] text-white py-2 px-5 rounded-md">New quote</button>
                </div>
            </div>
            <p className="text-white text-center pt-5 text-[15px]">By Muhammad Shujaat</p>
        </div>
    )
}

export default QuoteBox;
