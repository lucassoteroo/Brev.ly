import { InputText } from "primereact/inputtext";

export function CreateShortLink() {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-normal text-[10px] text-gray-500">LINK ENCURTADO</h3>

            <InputText keyfilter="alpha" placeholder="brev.ly/" className="w-full flex items-center px-4 py-4 border border-gray-300 rounded-lg gap-2 outline-none"/>
        </div>
    )
}

