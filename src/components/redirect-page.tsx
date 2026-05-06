export function RedirectPage() {
    return (
        <div className="flex flex-col justify-center items-center py-12 px-5 gap-6 bg-gray-100 rounded-lg">
            <img src="/src/assets/images/subtract.svg" />
            <h1 className="font-bold text-2xl text-gray-600">Redirecionando...</h1>
            <div className="flex flex-col items-center text-center gap-1">
                <p className="font-semibold text-sm text-gray-500">O link será aberto automaticamente em alguns instantes.</p>
                <p className="font-semibold text-sm text-gray-500">Não foi redirecionado?  
                    <a className="font-semibold text-sm underline text-[#2C46B1] cursor-pointer">Clique Aqui</a>
                </p>
            </div>
        </div>
    )
}
