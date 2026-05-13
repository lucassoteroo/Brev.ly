import { CopyIcon, TrashIcon, LinkIcon } from "@phosphor-icons/react";
import type { LinkData } from "./empty-state";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

interface Props {
    links: LinkData[];
    isLoading: boolean;
    onDelete: (short: string) => void;
    onCopy: (short: string) => void;
    onAccess: (short: string) => void;
}

export function MyLinkList({ links, onDelete, onCopy, onAccess, isLoading }: Props) {
    const navigate = useNavigate();
    if (isLoading) {
        return (
            <div className="flex flex-col gap-3 items-center pt-4 pb-6 w-full">
                <div className="flex flex-row items-center gap-2 mt-3">
                    <span className="spinner border-2 border-t-[#2C46B1] border-gray-300 rounded-full w-4 h-4 animate-spin"></span>
                    <span className="font-normal text-[10px] text-center uppercase text-gray-500">Carregando itens...</span>
                </div>
            </div>
        )
    }

    if (!links || links.length === 0) {
        return (
            <div className="flex flex-col gap-3 items-center pt-4 pb-6">
                <LinkIcon size={32} className="text-gray-500" />
                <span className="font-normal text-[10px] text-center uppercase text-gray-500">Ainda não existem links cadastrados</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 items-center pt-4 pb-6">
            {links.map((link, idx) => (
                <div key={idx} className="w-full flex flex-row items-center justify-between py-0.5 gap-4">
                    <div className="flex flex-col w-70">
                        <Button onClick={() => navigate(`/r/${link.short}`)}>
                            <p className="font-semibold text-sm text-[#2C46B1]">{link.short}</p>
                        </Button>
                        <span className="font-normal text-xs text-[#4D505C]">{link.original}</span>
                    </div>
                    <span className="font-normal text-xs text-right text-gray-500">{link.views} acessos</span>
                    <div className="flex flex-row items-center gap-1">
                        <Button className="p-2 rounded-sm bg-gray-200" onClick={() => onCopy(link.short)}>
                            <CopyIcon size={16} />
                        </Button>
                        <Button className="p-2 rounded-sm bg-gray-200" onClick={() => onDelete(link.short)}>
                            <TrashIcon size={16} />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
