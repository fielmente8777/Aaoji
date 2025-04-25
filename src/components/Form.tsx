"use client";

import axios from "axios";
import React, { useState } from "react";
// import { useRouter } from "next/navigation";
import { countries } from "@/data/countryCode";
import MainHeading from "./Heading/MainHeading";

const Form = () => {
  // const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userMessage: "",
    userPhone: "",
    countryCode: "+91",
  });
  const [formRes, setFormRes] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "userPhone" ? value.replace(/\D/g, "") : value,
    }));

    if (name === "userPhone" && value.replace(/\D/g, "").length < 10) {
      setErrorMessage("Please enter a valid number");
    } else {
      setErrorMessage("");
    }

    if (name === "userEmail") {
      setEmailErrorMessage(
        !emailRegex.test(value) ? "Please enter a valid email address" : ""
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormRes(true);

    if (formData.userPhone.length !== 10) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      setFormRes(false);
      return;
    }

    if (!emailRegex.test(formData.userEmail)) {
      setEmailErrorMessage("Please enter a valid email address.");
      setFormRes(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "https://nexon.eazotel.com/eazotel/addcontacts",
        {
          Domain: "sumit",
          email: formData.userEmail,
          Name: formData.userName,
          Contact: `${formData.userPhone}`,
          Description: formData.userMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.Status) {
        setFormData({
          userName: "",
          userEmail: "",
          userMessage: "",
          userPhone: "",
          countryCode: "+91",
        });
        setFormRes(false);
        // router.push("/thank-you/");
        alert("Form submitted successfully!");
      } else {
        setFormRes(false);
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      setFormRes(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex p-6 flex-col gap-4 text-base w-full h-full  rounded-lg text-secondary bg-white"
      id="contact"

    >
      <div className="flex flex-col gap-2">
        <MainHeading
          h2
          title="Fill in details to book a private party!"
          className="description1  uppercase text-primary mendl"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-white rounded-lg overflow-hidden">
          <input
            id="Name"
            type="text"
            name="userName"
            placeholder="Your full name*"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full h-max px-4 py-3 outline-none bg-transparent border border-[#C3C3C3] overflow-hidden rounded-lg"
          />
        </div>
        <div className="flex items-center gap-3 bg-white border border-[#C3C3C3] overflow-hidden rounded-lg">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            required
            className="text-sm text-[#222] outline-none px-[8px] py-3 "
            style={{ width: `${formData.countryCode.length + 9}ch` }}
          >
            {countries.map((country, i) => (
              <option key={i} value={country.code} className="text-sm">
                {country.code} {country.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="userPhone"
            placeholder="Mobile number*"
            value={formData.userPhone}
            onChange={handleChange}
            required
            maxLength={10}
            className="w-full px-4 py-3 outline-none border-l border-[#C3C3C3] "
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="flex items-center gap-3 bg-white rounded-lg overflow-hidden">
          <input
            type="text"
            name="userEmail"
            placeholder="Email ID*"
            value={formData.userEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 outline-none border border-[#C3C3C3] overflow-hidden rounded-lg"
          />
        </div>
        {emailErrorMessage && (
          <p className="text-red-500">{emailErrorMessage}</p>
        )}

        <div className="flex gap-3 bg-white rounded-lg overflow-hidden">
          <textarea
            name="userMessage"
            placeholder="Tell us something about your enquiry!"
            value={formData.userMessage}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-[#C3C3C3] overflow-hidden rounded-lg resize-none outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary text-sm text-white px-5 py-4 avenir font-normal capitalize hover:bg-primary/80 duration-500 rounded-lg border"
      >
        {formRes ? "Loading...." : "Submit"}
      </button>
    </form>
  );
};

export default Form;
