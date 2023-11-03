// import useColorMode from "@/hooks/useColorMode";
import useOnlineMode from "@/hooks/useOnlineMode";
import { useModal } from "@/hooks/use-modal-store";
import toast from "react-hot-toast";

const OnlineSwitcher = () => {
  // const [colorMode, setColorMode] = useColorMode();
  const [isOnline,setIsOnline] = useOnlineMode();
  

  const { onOpen } = useModal();

  function onChangeHandler(){
  
    if(isOnline === true){
        if (typeof setIsOnline === 'function') {
          onOpen('set-offline',{isOnline,setIsOnline});
      }
    }
    else {
      if (typeof setIsOnline === 'function') {
        setIsOnline((isOnline: boolean) => !isOnline);
        toast.success('You are online now');
      }
    }
  }

  return (
    <li>
      <label
        className={`relative m-0 block h-7.5 w-14 rounded-full ${
          isOnline === true ? 'bg-success' : 'bg-stroke'
        }`}
      >
        <input
          type="checkbox"
          onChange={onChangeHandler}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            isOnline === true && '!right-[3px] !translate-x-full'
          }`}
        >
          <span className={isOnline ?'block':'hidden'}>
            <img src="online.png" alt="img" />

          </span>
          <span className={isOnline ?'hidden':'block'}>
            <img src="no-wifi.png" alt="img"/>
          </span>

        </span>
      </label>
    </li>
  );
};

export default OnlineSwitcher;


