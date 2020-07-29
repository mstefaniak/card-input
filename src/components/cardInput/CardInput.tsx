import React, { ChangeEvent, useState, useRef } from 'react';
import Payment from 'payment';
import styled from '@emotion/styled';

import cardLogos from './logos';

const Wrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 30,
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: '5px 10px',
    width: 360,
});

const Input = styled.input(({ width = 180, isError = false }: { width?: number, isError?: boolean }) => ({
    border: isError ? '1px solid #ff0033' : '1px solid #fff',
    outline: 'none',
    height: 35,
    fontSize: 16,
    width,
    padding: '0 5px',
}));

const CardLogo = styled.img({
    width: 35,
    height: 23,
    marginRight: 8,
});

type HandledCardTypes = 'placeholder' | 'visa' | 'mastercard' | 'amex';

const CardInput = (): JSX.Element => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardLogo, setCardLogo] = useState(cardLogos.placeholder);
    const [expiry, setExpiry] = useState('');
    const [expiryValid, setExpiryValid] = useState(true);
    const [cvc, setCvc] = useState('');
    const expiryRef = useRef<HTMLInputElement>(null);
    const cvcRef = useRef<HTMLInputElement>(null);

    const onCardNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const element = event.target;
        const newValue = element.value;
        const cardNumber = newValue.replace(/[^0-9]/g, '');
        const isValid = Payment.fns.validateCardNumber(cardNumber);
        const cardType = Payment.fns.cardType(cardNumber) as HandledCardTypes;

        if (cardType && Object.keys(cardLogos).includes(cardType)) {
            setCardLogo(cardLogos[cardType]);
        } else {
            setCardLogo(cardLogos.placeholder);
        }

        Payment.formatCardNumber(element);
        setCardNumber(newValue);

        if (isValid) {
            expiryRef.current?.focus();
        }
    };

    const onExpiryChange = (event: ChangeEvent<HTMLInputElement>):void => {
        const element = event.target;
        const newExpiry = element.value;
        const expiryMonthYear = Payment.fns.cardExpiryVal(newExpiry.replace(/[^0-9/]/g, ''));

        Payment.formatCardExpiry(element);

        if (newExpiry.length === 7) {
            const isValid = Payment.fns.validateCardExpiry(String(expiryMonthYear.month), String(expiryMonthYear.year));
            setExpiryValid(isValid);

            if (isValid) {
                cvcRef.current?.focus();
            }
        }

        setExpiry(newExpiry);
    };

    const onCvcChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const element = event.target;
        const newCvc = element.value;
        Payment.formatCardCVC(element);
        setCvc(newCvc);
    };

    return <Wrapper>
        <CardLogo src={cardLogo} />
        <Input
            type="text"
            onChange={onCardNumberChange}
            value={cardNumber}
            placeholder="Card number"
        />
        <Input
            type="text"
            ref={expiryRef}
            onChange={onExpiryChange}
            value={expiry}
            width={52}
            placeholder="MM/YY"
            maxLength={7}
            isError={!expiryValid}
        />
        <Input
            type="text"
            ref={cvcRef}
            onChange={onCvcChange}
            value={cvc}
            width={40}
            placeholder="CVC"
            maxLength={4}
        />
    </Wrapper>
};

export default CardInput;
