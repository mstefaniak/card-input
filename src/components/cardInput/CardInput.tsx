import React, { ChangeEvent, useState, useRef } from 'react';
import Payment from 'payment';
import styled from '@emotion/styled';

const Wrapper = styled.div({
    display: 'flex',
    margin: 30,
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: '5px 10px',
    width: 300,
});

const Input = styled.input({
    border: 'none',
    outline: 'none',
    height: 35,
    fontSize: 16,
});

const CardInput = (): JSX.Element => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const expiryRef = useRef<HTMLInputElement>(null);

    const onCardNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newValue = event.target.value;
        const cardNumber = newValue.replace(/[^0-9]/g, '');
        const isValid = Payment.fns.validateCardNumber(cardNumber);

        setCardNumber(Payment.fns.formatCardNumber(cardNumber));

        if (isValid) {
            console.log('valid');
            expiryRef.current?.focus();
        }
    };

    const onExpiryChange = (event: ChangeEvent<HTMLInputElement>):void => {
        const newExpiry = event.target.value;
        const expiryMonthYear = Payment.fns.cardExpiryVal(newExpiry.replace(/[^0-9]/g, ''));
        setExpiry(`${expiryMonthYear.month}/${expiryMonthYear.year}`);
    };

    return <Wrapper>
        <Input type="text" onChange={onCardNumberChange} value={cardNumber} />
        <Input type="text" ref={expiryRef} onChange={onExpiryChange} value={expiry} />
    </Wrapper>
};

export default CardInput;
