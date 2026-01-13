import { useState } from "react";
import Popup from "../popup/popup";

function LogoButton() {
  const [open, setOpen] = useState(false);
  
  
  const botIconUrl = chrome.runtime.getURL('assets/bot.png');

  return (
    <>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="
          fixed bottom-6 right-6 z-[999999]
          w-14 h-14 rounded-full
          bg-blue-600 hover:bg-blue-700
          shadow-lg flex items-center justify-center
          transition-all duration-200 hover:scale-110
        "
      >
        <img
          src={botIconUrl}
          alt="Leety AI"
          className="w-8 h-8"
        />
      </button>

      {open && <Popup />}
    </>
  );
}

export default LogoButton;