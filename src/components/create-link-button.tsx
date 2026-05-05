import { Button } from 'primereact/button';

export function CreateLinkButton() {
    return(
        <div className='flex items-center px-5 py-5 gap-3 bg-[#2C46B1] rounded-lg text-white'>
            <Button className='w-full' label="Salvar Link" />
        </div>
    )
}
