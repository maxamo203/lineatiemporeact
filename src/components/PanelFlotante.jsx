export function PanelFlotante({children, className, onSubmit}){
    return (
        <form className={`fixed -top-60 left-1/2 z-40 w-80 h-56 bg-yellow-500 flex flex-col p-2 rounded-md items-center panel ${className}`} onSubmit={onSubmit}>
            {children}
        </form>
    )
}