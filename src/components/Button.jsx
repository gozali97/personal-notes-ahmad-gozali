import clsx from 'clsx';

export default function Button(props) {
    const { className = 'bg-blue-600', children, text, type = 'submit' } = props;
    return (
        <button
            {...props}
            type={type}
            className={clsx(
                className,
                '[&>svg]:w-5 [&>svg]:h-5 [&>svg]:stroke-1 inline-flex items-center whitespace-nowrap gap-x-2 text-white px-4 h-10 rounded-lg'
            )}>
            {text || children}
        </button>
    );
}
