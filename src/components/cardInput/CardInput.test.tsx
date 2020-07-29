import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CardInput from './CardInput';
import Payment from 'payment';

Payment.formatCardNumber = jest.fn();
Payment.formatCardExpiry = jest.fn();
Payment.formatCardCVC = jest.fn();

describe('Card Input', () => {
    it('renders inputs', () => {
        const { getByPlaceholderText } = render(<CardInput />);
        expect(getByPlaceholderText('Card number')).toBeInTheDocument();
        expect(getByPlaceholderText('MM/YY')).toBeInTheDocument();
        expect(getByPlaceholderText('CVC')).toBeInTheDocument();
    });

    it('runs card number formatter on each field update', () => {
        const { getByPlaceholderText } = render(<CardInput />);

        const element = getByPlaceholderText('Card number');
        fireEvent.change(element, { target: { value: '42' } });
        fireEvent.change(element, { target: { value: '424242' } });
        fireEvent.change(element, { target: { value: '4242424242' } });

        expect(Payment.formatCardNumber).toHaveBeenCalledTimes(3);
    });

    it('runs expiration date formatter on each field update', () => {
        const { getByPlaceholderText } = render(<CardInput />);

        const element = getByPlaceholderText('MM/YY');
        fireEvent.change(element, { target: { value: '03' } });
        fireEvent.change(element, { target: { value: '0323' } });

        expect(Payment.formatCardExpiry).toHaveBeenCalledTimes(2);
    });

    it('runs CVC formatter on each field update', () => {
        const { getByPlaceholderText } = render(<CardInput />);

        const element = getByPlaceholderText('CVC');
        fireEvent.change(element, { target: { value: '123' } });

        expect(Payment.formatCardCVC).toHaveBeenCalledTimes(1);
    });
});
