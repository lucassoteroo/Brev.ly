import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { linkService } from "../service/api";

export function RedirectPage() {
    const { short } = useParams();
    const navigate = useNavigate();
    const [original, setOriginal] = useState<string | null>(null);
    const [error, setError] = useState(false);
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (hasRedirected.current) return;
        hasRedirected.current = true;
        async function fetchAndRedirect() {
            try {
                const links = await linkService.getAll();
                const found = links.find((l: any) => (l.shortLink || l.short_link) === short);
                if (!found) {
                    setError(true);
                    setTimeout(() => navigate("/not-found", { replace: true }), 1500);
                    return;
                }
                const url = found.originalLink || found.original_link;
                setOriginal(url);
                setTimeout(() => {
                    window.open(url.startsWith("http") ? url : `https://${url}`,'_blank','noopener,noreferrer');
                    navigate('/', { replace: true });
                }, 1500);
            } catch {
                setError(true);
                setTimeout(() => navigate("/not-found", { replace: true }), 1500);
            }
        }
        fetchAndRedirect();
    }, [short, navigate]);

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center py-12 px-5 gap-6 bg-gray-100 rounded-lg">
                <h1 className="font-bold text-2xl text-gray-600">Link não encontrado</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center py-12 px-5 gap-6 bg-gray-100 rounded-lg">
            <img src="/src/assets/images/subtract.svg" />
            <h1 className="font-bold text-2xl text-gray-600">Redirecionando...</h1>
            <div className="flex flex-col items-center text-center gap-1">
                <p className="font-semibold text-sm text-gray-500">O link será aberto automaticamente em alguns instantes.</p>
                {original && (
                    <p className="font-semibold text-sm text-gray-500">Não foi redirecionado?  
                        <a className="font-semibold text-sm underline text-[#2C46B1] cursor-pointer" href={original.startsWith("http") ? original : `https://${original}`}>Clique Aqui</a>
                    </p>
                )}
            </div>
        </div>
    );
}

