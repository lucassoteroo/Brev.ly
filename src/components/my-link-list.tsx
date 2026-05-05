import { LinkIcon } from "@phosphor-icons/react";

export function MyLinkList() {
    return (
        <div className="flex flex-col gap-3 items-center pt-4 pb-6">
            <LinkIcon size={32} className="text-gray-500" />
            <span className="font-normal text-[10px] text-center uppercase text-gray-500">Ainda não existem links cadastrados</span>
        </div>
    )
}
