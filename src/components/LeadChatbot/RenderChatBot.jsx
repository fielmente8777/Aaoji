"use client";
import React, { useEffect, useState } from "react";
import ChatbotWidget from "./ChatbotWidget";
import axios from "axios";
import { usePathname } from "next/navigation";

const RenderChatBot = () => {
  const [eazbotConfig, setEazbotConfig] = useState({
    hid: "",
    ndid: "",
    interval: 2000,
  });

  const [chatbotData, setChatbotData] = useState({
    domain: "aaoji",
    welcomeMessage: "Welcome to Aaoji! How may we help you today?",
    thankYouMessage:
      "Thank you so much for filling up the details, one of our representative will speak to you as soon as possible!",
    messagesFlow: [
      {
        key: "name",
        question: "Please assist us with your name",
        type: "text",
      },
      { key: "email", question: "What's your Email ?", type: "email" },
      {
        key: "phone",
        question: "What's your Phone Number?",
        type: "number",
      },
      // { key: "check-in", question: "Check-in date!", type: "date" },
      // { key: "check-out", question: "Check-out date!", type: "date" },
      // {
      //   key: "number of guest",
      //   question: "Number of guest!",
      //   type: "text",
      // },
    ],
    title: "Aaoji",
    theme: "#473C30",
    logo: {
      url: "/logo.png",
    },
    interval: 40000,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleSumbit = async (formData) => {
    const { name, email, phone, ...otherFields } = formData;
    const description = Object.entries(otherFields)
      .map(([key, value]) => `${key}: ${value}`)
      .join(",");

    const checkInDate = formData["check-in"];
    const checkOutDate = formData["check-out"];
    const guest = formData["number of guest"];

    try {
      const { data } = await axios.post(
        "https://nexon.eazotel.com/eazotel/addcontacts",
        {
          Domain: chatbotData.domain,
          Contact: `${phone}`,
          email: `${email}`,
          Description: description,
          Name: `${name}`,
          Remark: "",
          Subject: null,
          check_in: `${checkInDate}`,
          check_out: `${checkOutDate}`,
          numbers_of_guest: `${guest}`,
          created_from: "Eazobot",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBaseData = async () => {
    try {
      const { ndid, hid } = eazbotConfig;
      const { data } = await axios.get(
        `https://nexon.eazotel.com/booking/getenginedetails/${ndid}/${hid}`
      );

      setChatbotData((prev) => ({
        ...prev,
        title: data?.Details?.HotelName,
        theme: data?.Details?.Colors?.BackgroundColor,
        domain: data?.Profile?.domain,
        welcomeMessage: `Welcome to ${data?.Details?.HotelName}! How may we help you today?`,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (eazbotConfig.hid && eazbotConfig.ndid) {
      fetchBaseData();
    }
  }, [eazbotConfig]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "CHATBOT_INIT") {
        setEazbotConfig(event.data.payload);
      }
    };
    window.parent.postMessage(
      {
        type: "CHATBOT_READY",
        payload: {
          chatbotOpen: isOpen,
        },
      },
      "*"
    );
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isOpen]);

  const pathName = usePathname();
  if (pathName === "/thank-you" || pathName === "/thank-you/") {
    return null;
  }

  return (
    <ChatbotWidget
      onSubmit={handleSumbit}
      messages={chatbotData?.welcomeMessage || ""}
      finalMessage={chatbotData?.thankYouMessage || ""}
      messageFlows={chatbotData?.messagesFlow}
      title={chatbotData?.title}
      theme={"#d1867f"}
      openInterval={eazbotConfig?.interval}
      logo={chatbotData?.logo?.url}
      setIsOpenChatbot={setIsOpen}
    />
  );
};

export default RenderChatBot;
