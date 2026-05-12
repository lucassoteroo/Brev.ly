import { WarningIcon } from "@phosphor-icons/react";
import { InputText } from "primereact/inputtext";

interface Props {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    disabled?: boolean;
}

export function CreateOriginalLink({ value, onChange, error, disabled }: Props) {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-normal text-[10px] text-gray-500">LINK ORIGINAL</h3>
            <InputText
                keyfilter="email"
                placeholder="www.exemplo.com.br"
                className="w-full flex items-center px-4 py-4 border border-gray-300 rounded-lg gap-2 outline-none"
                value={value}
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
            />
            {error && 
                <div className="flex flex-row items-center gap-1">
                    <WarningIcon size={12} className="text-red-500" />
                    <span className="text-red-500 text-xs mt-1">{error}</span>
                </div>
            }
        </div>
    );
}

