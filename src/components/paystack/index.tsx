// src/components/PaystackPayment.tsx
import React from "react";
import { PaystackButton } from "react-paystack";

const PaystackPayment: React.FC = () => {
  const publicKey = "pk_test_692d5fc143ecc47fdaa80d91ee61d807f5b8e8c9"; // Replace with your Paystack public key
  const amount = 10000; // Amount in kobo
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const componentProps = {
    email,
    amount,
    publicKey,
    text: "Pay Now",
    onSuccess: (reference: any) => {
      console.log(reference);
      alert("Payment Successful!");
    },
    onClose: () => {
      console.log("Payment closed");
      alert("Payment closed");
    },
  };

  return (
    <div className="flex gap-6 items-center flex-col ">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-black rounded-3xl p-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-black rounded-3xl p-2"
      />
      <PaystackButton {...componentProps} />
    </div>
  );
};

export default PaystackPayment;
