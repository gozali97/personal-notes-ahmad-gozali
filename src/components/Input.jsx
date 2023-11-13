function Input({ type = 'text', ...props }) {
    return (
        <input
            {...props}
            type={type}
            className='bg-gray-50 w-full focus:outline-none focus:ring-blue-200 focus:border-blue-600 duration-300 rounded-lg shadow-sm'
        />
    );
}

export default Input;
