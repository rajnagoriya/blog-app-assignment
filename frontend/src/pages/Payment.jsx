import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

function PaymentPage() {
  const {selecteCourseByUser,profile} = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });

  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.error("payment feature not available for now !!!");
    // Implement payment API integration or logic here
    console.log('Processing payment...');
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8">Course Payment</h1>

      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left Section: Course Details */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Course Summary</h2>
          <div className="space-y-4">
            <p className="text-lg font-semibold">Course Name: {selecteCourseByUser?.title}</p>
            <p className="text-lg">Instructor: {selecteCourseByUser?.instructor}</p>
            <p className="text-xl font-bold text-green-500">Price: ₹{selecteCourseByUser?.discountPrice}</p>
          </div>
        </div>

        {/* Right Section: Payment Form */}
        <div className="w-full md:w-2/3 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Enter Payment Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700" htmlFor="paymentMethod">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-2 w-full p-3 bg-white border rounded-md"
              >
                <option value="credit-card">Credit / Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="upi">UPI</option> {/* Replaced crypto with UPI */}
              </select>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'credit-card' && (
              <div>
                <label className="block text-lg font-medium text-gray-700" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  className="mt-2 w-full p-3 bg-white border rounded-md"
                  placeholder="1234 5678 9876 5432"
                  required
                />

                <div className="mt-4 flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="cardHolder">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      value={cardDetails.cardHolder}
                      onChange={handleCardDetailsChange}
                      className="mt-2 w-full p-3 bg-white border rounded-md"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="expirationDate">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="expirationDate"
                      name="expirationDate"
                      value={cardDetails.expirationDate}
                      onChange={handleCardDetailsChange}
                      className="mt-2 w-full p-3 bg-white border rounded-md"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-lg font-medium text-gray-700" htmlFor="cvv">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                    className="mt-2 w-full p-3 bg-white border rounded-md"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            )}

            {/* UPI Payment Form (Display if UPI selected) */}
            {paymentMethod === 'upi' && (
              <div>
                <label className="block text-lg font-medium text-gray-700" htmlFor="upiId">
                  UPI ID
                </label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  value={billingInfo.upiId}
                  onChange={handleBillingInfoChange}
                  className="mt-2 w-full p-3 bg-white border rounded-md"
                  placeholder="you@upi"
                  required
                />
              </div>
            )}

            {/* Billing Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Billing Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={billingInfo.name}
                    onChange={handleBillingInfoChange}
                    className="mt-2 w-full p-3 bg-white border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleBillingInfoChange}
                    className="mt-2 w-full p-3 bg-white border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={billingInfo.address}
                    onChange={handleBillingInfoChange}
                    className="mt-2 w-full p-3 bg-white border rounded-md"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="city">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={billingInfo.city}
                      onChange={handleBillingInfoChange}
                      className="mt-2 w-full p-3 bg-white border rounded-md"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="zip">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={billingInfo.zip}
                      onChange={handleBillingInfoChange}
                      className="mt-2 w-full p-3 bg-white border rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700" htmlFor="country">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={billingInfo.country}
                    onChange={handleBillingInfoChange}
                    className="mt-2 w-full p-3 bg-white border rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
