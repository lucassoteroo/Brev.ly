import { useCallback, useEffect, useState } from "react";
import { CreateLink } from "./create-link";
import { LogoApp } from "./logo-app";
import { MyLink } from "./my-link";
import { linkService } from "../service/api";
export interface LinkData {
    short: string;
    original: string;
    views: number;
}

export function EmptyState() {
    const [links, setLinks] = useState<LinkData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // FUNÇÕES QUE ENVOLVEM O CREATE
    const addLink = async (link: Omit<LinkData, "views">) => {
        try {
            setIsLoading(true);
            
            await linkService.create(link.original, link.short)

            const data = await linkService.getAll()

            const formattedLinks = data.map((item: any) => ({
                short: item.shortLink || item.short_link,
                original: item.originalLink || item.original_link,
                views: item.hits || 0
            }));

            setLinks(formattedLinks)

        } catch(error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    };

    // FUNÇÕES QUE ENVOLVEM O LIST
    const loadLinks = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = await linkService.getAll()

            const formattedLinks = data.map((item: any) => ({
                short: item.shortLink || item.short_link,
                original: item.originalLink || item.original_link,
                views: item.hits || 0
            }));

            setLinks(formattedLinks)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => { loadLinks() }, [loadLinks])

    const handleAccess = async (short: string) => {
        const linkToOpen = links.find(l => l.short === short);

        if (!linkToOpen) {
            console.error("Link não encontrado localmente");
            return;
        }

        const url = linkToOpen.original.startsWith('http') 
            ? linkToOpen.original 
            : `https://${linkToOpen.original}`;

        window.open(url, "_blank", "noopener,noreferrer");

        try {
            setIsLoading(true)
            await linkService.update(short)
            await loadLinks();
        } catch(error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (short: string) => {
        try {
            setIsLoading(true)
            await linkService.delete(short)
            await loadLinks();
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    };

    const handleCopy = async (short: string) => {
        try {
            const linkToCopy = links.find(l => l.short === short);
            
            if (!linkToCopy) {
                console.error("Link não encontrado localmente");
                return;
            }
            
            await navigator.clipboard.writeText(linkToCopy.original);

            // Opcional: feedback visual
            alert(`Link ${short} copiado!`);
        } catch (error) {
            console.error(error)
        }
    };

    const handleExport = async () => {
        try {
            const reportUrl = await linkService.export()

            const link = document.createElement('a');
            link.href = reportUrl;
            link.setAttribute('download', 'relatorio-links.csv'); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className="self-center lg:self-start">
                <LogoApp />
            </div>
            <div className="lg:w-dvh flex flex-col lg:flex-row gap-5">
                <CreateLink onCreate={addLink} />
                <MyLink links={links} onDelete={handleDelete} onCopy={handleCopy} onAccess={handleAccess} onExport={handleExport} isLoading={isLoading} />
            </div>
        </div>
    );
}