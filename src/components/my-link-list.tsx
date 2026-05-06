import { CopyIcon, TrashIcon, LinkIcon } from "@phosphor-icons/react";
import type { LinkData } from "./empty-state";
import { Button } from "primereact/button";

interface Props {
    links: LinkData[];
}

export function MyLinkList({ links }: Props) {
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
                    <div className="w-70">
                        <p className="font-semibold text-sm text-[#2C46B1]">{link.short}</p>
                        <span className="font-normal text-xs text-[#4D505C]">{link.original}</span>
                    </div>
                    <span className="font-normal text-xs text-right text-gray-500">{link.views} acessos</span>
                    <div className="flex flex-row items-center gap-1">
                        <Button className="p-2 rounded-sm bg-gray-200">
                            <CopyIcon size={16} />
                        </Button>
                        <Button className="p-2 rounded-sm bg-gray-200">
                            <TrashIcon size={16} />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
