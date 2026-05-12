import { WarningIcon } from "@phosphor-icons/react";
import { InputText } from "primereact/inputtext";

interface Props {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    disabled?: boolean;
}

export function CreateShortLink({ value, onChange, error, disabled }: Props) {
    const prefix = "brev.ly/";
    // Mostra o valor sempre com o prefixo
    const displayValue = prefix + (value.startsWith(prefix) ? value.slice(prefix.length) : value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        // Garante que o prefixo não seja removido
        if (!inputValue.startsWith(prefix)) {
            inputValue = prefix;
        }
        // Passa para o estado apenas o que vem depois do prefixo
        onChange(inputValue.slice(prefix.length));
    };

    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-normal text-[10px] text-gray-500">LINK ENCURTADO</h3>
            <InputText
                keyfilter="alpha"
                className="w-full flex items-center px-4 py-4 border border-gray-300 rounded-lg gap-2 outline-none"
                value={displayValue}
                onChange={handleChange}
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

