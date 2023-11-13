export default function PlaceContentCenter({ children }) {
    return (
        <div className='bg-black'>
            <div className='bg-violet-900/20n min-h-screen text-violet-50 flex items-center justify-center antialiased tracking-tight'>
                {children}
            </div>
        </div>
    );
}
