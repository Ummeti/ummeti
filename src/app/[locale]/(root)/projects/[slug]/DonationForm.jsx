'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AppleIcon from '@/components/icons/AppleIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';

export default function DonationForm() {
  const t = useTranslations('DonationForm');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  return (
    <form
      action="/process-payment"
      method="POST"
      className="bg-white p-4 sm:p-6 md:p-12"
    >
      <div className="mb-6 space-y-4">
        <button
          type="button"
          className="w-full bg-black text-white flex items-center justify-center rounded-lg p-4 mb-4 hover:bg-gray-800 transition duration-300"
        >
          <AppleIcon className="h-5 w-5 mr-3" />
          Apple Pay
        </button>
        <button
          type="button"
          className="w-full bg-white border border-gray-300 text-gray-800 flex items-center justify-center rounded-lg p-4 mb-4 hover:bg-gray-200 transition duration-300"
        >
          <GoogleIcon className="h-5 w-5 mr-3" />
          Google Pay
        </button>
      </div>

      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-sm md:text-base font-semibold text-gray-900 mb-2"
        >
          {t('fullName')}
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 p-4 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-main transition duration-300"
          placeholder={t('fullName')}
          type="text"
          id="name"
          name="name"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm md:text-base font-semibold text-gray-900 mb-2"
        >
          {t('email')}
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 p-4 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-main transition duration-300"
          placeholder={t('email')}
          type="email"
          id="email"
          name="email"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm md:text-base font-semibold text-gray-900 mb-2">
          {t('amount')}
        </label>
        <div className="grid grid-cols-2 gap-4">
          {[50, 250, 500].map((amount) => (
            <button
              key={amount}
              type="button"
              className={`${
                selectedAmount === amount
                  ? 'bg-main-dark text-white'
                  : 'bg-main-lightest text-gray-900'
              }
              flex items-center justify-center rounded-lg p-4 text-sm font-semibold transition duration-300 hover:bg-main-dark hover:text-white`}
              onClick={() => handleSelectAmount(amount)}
            >
              <span className="text-sm">${amount}</span>
            </button>
          ))}
          <div className="flex items-center border border-gray-300 rounded-lg p-4 focus-within:ring-2 focus-within:ring-main">
            <span className="text-gray-600 mr-2">$</span>
            <input
              className="w-full focus:outline-none text-sm font-medium text-gray-800"
              id="custom"
              type="text"
              name="custom"
              placeholder={t('amount')}
              value={customAmount}
              onChange={handleCustomAmountChange}
              onFocus={() => setSelectedAmount(null)}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="card-details"
          className="block text-sm md:text-base font-semibold text-gray-900 mb-2"
        >
          {t('cardNumber')}
        </label>
        <input
          className="w-full rounded-lg border border-gray-300 p-4 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-main transition duration-300"
          placeholder={t('cardNumber')}
          type="text"
          id="card-details"
          name="card_details"
          required
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full rounded-lg bg-main text-white px-6 py-4 font-medium text-base hover:bg-main-dark transition duration-300 focus:outline-none focus:ring-2 focus:ring-main"
        >
          {t('donateNow')}
        </button>
      </div>
    </form>
  );
}
