import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sitemap from "../../json/sitemap.json";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import "./Menu.css";
function AccordionItemPlain({ __key, value, isLast, axkey, blur }) {
  return (
    <Link
      to={value}
      accessKey={blur ? "" : axkey}
      tabIndex={blur ? -1 : 0}
      className={
        (blur ? "blur-sm pointer-events-none" : "") +  
        " px-5 py-2 text-xl font-bold unlink d-center gap-3 justify-between w-full" +
        (isLast ? "" : " border-0 border-b-2 border-gray-300 border-solid ")
      }
    >
      <span>
        {blur ? "" : <span className="w-5 h-10 text-white rounded-sm d-center bg-slate-600">{axkey}</span>}
      </span>
      <span>{__key}</span>
      <span className="w-10 d-center">
        <div className="w-5 h-5 bg-white rounded-full dot !text-black d-center">
          <FaArrowRight size={10}/>
        </div>
      </span>
    </Link>
  );
}

function AccordionMenuItem({
  __key,
  value,
  setActiveKey__,
  isActive,
  isLast,
  axkey,
  isSomeActive,
}) {
  const [activeKey, setActiveKey] = useState("");
  useEffect(() => {
    setActiveKey__(isActive ? __key : "");
  }, [isActive]);

  return typeof value === "string" ? (
    <AccordionItemPlain
      key={__key}
      __key={__key}
      value={value}
      isLast={isLast}
      axkey={axkey}
      blur={isSomeActive}
    />
  ) : (
    <div
      className={
        (isSomeActive&&!isActive ? "blur-sm pointer-events-none" : "") +  
        " px-5 py-2 accordion-menu-item " +
        (isLast ? "" : "border-0 border-b-2 border-gray-300 border-solid ")
      }
    >
      <button
        className="justify-between w-full gap-4 text-xl font-bold d-center accordion-menu-item-button unbtn"
        onClick={() => setActiveKey__(isActive ? "" : __key)}
        accessKey={isSomeActive ? (isActive ? axkey : "") : axkey}
        tabIndex={isSomeActive&&!isActive ? 1: 0}
      >
        <span>
          {isSomeActive ? (
            isActive ? ( <span className="w-5 h-10 text-white rounded-sm d-center bg-slate-600">{axkey}</span>
            ) : (
              ""
            )
          ) : ( <span className="w-5 h-10 text-white rounded-sm d-center bg-slate-600">{axkey}</span>
          )}
        </span>
        <span>{__key}</span>
        <span className="w-10">
          {isActive ? <FaChevronUp size={15} /> : <FaChevronDown size={15} />}
        </span>
      </button>
      {isActive && (
        <div className="accordion-menu-item-links ms-5 stack ">
          {Object.keys(value).map((subkey, __index) => (
            <AccordionMenuItem
              key={subkey}
              __key={subkey}
              value={value[subkey]}
              setActiveKey__={setActiveKey}
              isActive={activeKey === subkey}
              isSomeActive={activeKey !== ""}
              isLast={__index === Object.keys(value).length - 1}
              axkey={activeKey===subkey ? axkey+1 : axkey + 1 + __index} //now it's current level+1 , i.e.,axkey =currentlevel, axkey+1
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Menu({ isActive, state }) {
  const [activeKey, setActiveKey] = useState("");
  const json = sitemap[state];
  useEffect(() => {
    setActiveKey("");//clean up data
  },[isActive]);
  return (
    isActive && (
      <div className="h-full overflow-hidden overflow-y-auto border-0 border-r-2 border-gray-300 border-solid menu">
        <div className="h-full gap-2 menu-links stack justify-evenly">
          {Object.keys(json).map(
            (key, index) =>
              (typeof json[key] === "string" && (
                <AccordionItemPlain
                  key={key}
                  blur={activeKey !== ""}
                  __key={key}
                  value={json[key]}
                  axkey={activeKey !== "" ? 0 : index}//level at which is at It's currently 0
                  isLast={index === Object.keys(json).length - 1}
                />
              )) ||
              (typeof json[key] === "object" && (
                <AccordionMenuItem
                  key={key}
                  __key={key}
                  value={json[key]}
                  setActiveKey__={setActiveKey}
                  isActive={activeKey === key}
                  isSomeActive={isActive && activeKey !== ""}
                  isLast={index === Object.keys(json).length - 1}
                  axkey={activeKey ===key ? 0 : index}//level at which is at It's currently 0
                  
                />
              ))
          )}
        </div>
      </div>
    )
  );
}

export default Menu;
