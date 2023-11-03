
import {useModal} from '@/hooks/use-modal-store';

const DeleteParking = () => {
    const { onOpen } = useModal();

    return (
        <div className='text-danger'>
            <button onClick={() => onOpen('deleteparking')}>delete Parking</button> 
        </div>
    )
}

export default DeleteParking;