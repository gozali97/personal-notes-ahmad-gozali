function Card({ children }) {
    return <div className='shadow rounded-lg overflow-hidden bg-white h-fit mb-4'>{children}</div>;
}

function Title({ children }) {
    return (
        <div className='p-4 border-b text-slate-800'>
            <h1 className='text-2xl font-bold '>{children}</h1>
        </div>
    );
}

function Body({ children }) {
    return <div className='leading-relax p-4 text-gray-700'>{children}</div>;
}

function Footer({ children }) {
    return <div className='bg-slate-50 p-4 text-gray-800 flex justify-between gap-2'>{children}</div>;
}

Card.Title = Title;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
