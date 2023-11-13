import React from 'react';

export default function Textarea({ ...props }) {
    return (
        <textarea
            rows='3'
            className='bg-gray-50 w-full focus:outline-none focus:ring-blue-200 focus:border-blue-600 rounded-lg shadow-smtransition duration-200'
            {...props}
        />
    );
}
