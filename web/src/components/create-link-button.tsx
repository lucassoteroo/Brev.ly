import { Button } from 'primereact/button';

interface Props {
    onClick: () => void;
}

export function CreateLinkButton({ onClick }: Props) {
    return(
        <div className='flex items-center px-5 py-5 gap-3 bg-[#2C46B1] rounded-lg text-white'>
            <Button className='w-full' label="Salvar Link" onClick={onClick} />
        </div>
    )
}
