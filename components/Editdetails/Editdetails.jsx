
import {useModal} from '@/hooks/use-modal-store';

const Editdetails = () => {
    const { onOpen } = useModal();

    return (
        <div>
            <button onClick={() => onOpen('editDetails')}>Edit Details</button> 
        </div>
    )
}

export default Editdetails;