"use client";

import axios from "axios";
import React, { useState } from "react";
import { countries } from "@/data/countryCode";
import MainHeading from "./Heading/MainHeading";

const Form = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(
        "https://nexon.eazotel.com/eazotel/addcontacts",
        {
          Domain: "aaoji",
          email: formData?.email,
          Name: formData?.name,
          Contact: formData?.phone,
          Description: formData?.message,
          created_from: "website",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.Status) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
        // if (setOpen) {
        //   setOpen(false);
        // }
        window.open("/thank-you", "_blank");
      } else {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  type FormField = "name" | "email" | "phone" | "message";
  const formInputs: {
    label: string;
    name: FormField;
    type: string;
    placeholder?: string;
  }[] = [
    { label: "Name", name: "name", type: "text", placeholder: "Your full name*" },

    { label: "Phone", name: "phone", type: "tel" },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email ID*",
    },
    {
      label: "Message",
      name: "message",
      type: "textarea",
      placeholder: "Tell us something about your enquiry!",
    },
  ];
  return (
    <div
      className="flex p-6 flex-col gap-4 text-base w-full h-full rounded-lg text-[#222] bg-white"
      id="contact"
    >
      <div className="flex flex-col gap-2">
        <MainHeading
          h2
          title="Fill in details to book a private party!"
          className="description1 uppercase text-primary mendl"
        />
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {formInputs.map((input) => (
          <div key={input.name} className="flex flex-col gap-2">
            {input.label === "Phone" ? (
              <div className="flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
                <div className="">
                  <select
                    aria-label="Country Code"
                    id="countryCode"
                    name="countryCode"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="text-dark placeholder:text-light focus:outline-none w-full bg-white ps-2 py-4"
                    style={{ width: `${countryCode.length * 3.8}ch` }}
                  >
                    {countries.map((country, index) => (
                      <option
                        key={index + 101}
                        value={country.code}
                        aria-label={country.name}
                        className="bg-gray-100"
                      >
                        {country.code} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  type="tel"
                  name="phone"
                  aria-label="Phone Number*"
                  placeholder="Mobile Number*"
                  onChange={handleInputChange}
                  value={formData.phone}
                  className="ps-1 py-4 outline-none border-none w-full text-base text-dark placeholder:text-light bg-white"
                />
              </div>
            ) : input.type === "textarea" ? (
              <textarea
                name={input.name}
                aria-label="Message"
                value={formData[input.name]}
                onChange={handleInputChange}
                placeholder={input.placeholder}
                rows={3}
                className="p-4 text-dark rounded-lg border  border-gray-300 resize-none placeholder:text-light bg-white outline-none"
              />
            ) : (
              <input
                type={input.type}
                name={input.name}
                aria-label={input.label}
                value={formData[input.name]}
                onChange={handleInputChange}
                placeholder={input.placeholder}
                className="p-4 text-dark placeholder:text-light border border-gray-300 rounded-lg bg-white outline-none"
              />
            )}

            {error[input.name] && (
              <p className="text-red-500">{error[input.name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          aria-label="Book Now"
          className="text-center mt-2 py-3 bg-primary w-full h-full border border-primary text-white hover:text-primary rounded-lg hover:bg-secondary duration-300 transition-all ease-in-out uppercase"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="border-t-2 border-white w-6 h-6 rounded-full animate-spin mx-auto block" />
          ) : submitSuccess ? (
            "Thank You!"
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;
