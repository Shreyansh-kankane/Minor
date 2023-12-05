
import {useModal} from '@/hooks/use-modal-store';

const EditParkDetails = () => {
    const { onOpen } = useModal();

    return (
        <div className='text-white'>
            <button onClick={() => onOpen('editDetails')}>Edit details</button> 
        </div>
    )
}

export default EditParkDetails;