export function Error404() {
    return (
        <div className="flex flex-col justify-center items-center py-12 px-5 gap-6 bg-gray-100 rounded-lg">
            <img src="/src/assets/images/404.svg" />
            <h1 className="font-bold text-2xl text-gray-600">Link não encontrado</h1>
            <div className="flex flex-col items-center text-center gap-1">
                <p className="font-semibold text-sm text-gray-500">O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.</p>
                <p className="font-semibold text-sm text-gray-500">Saiba mais em 
                    <a href="https://brev.ly" className="text-[#2C46B1] underline">brev.ly</a>
                </p>
            </div>
        </div>
    )
}
