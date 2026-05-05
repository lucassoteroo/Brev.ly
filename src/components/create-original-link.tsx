import { InputText } from "primereact/inputtext";

export function CreateOriginalLink() {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-normal text-[10px] text-gray-500">LINK ORIGINAL</h3>

            <InputText keyfilter="alpha" placeholder="www.exemplo.com.br" className="w-full flex items-center px-4 py-4 border border-gray-300 rounded-lg gap-2 outline-none"/>
        </div>
    )
}

