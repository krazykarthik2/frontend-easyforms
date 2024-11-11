import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sitemap from "../../json/sitemap.json";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import "./Menu.css";
function AccordionItemPlain({ __key, value, isLast ,index,isSomeActive }) {
  return (
    <Link to={value} accessKey={isSomeActive ? "" : index} className={"px-5 py-2 text-xl font-bold unlink d-center justify-between" +( isLast ? "" : " border-0 border-b-2 border-gray-300 border-solid ")}>
      <span>{__key}</span>
      <span>{isSomeActive? "":<span className="underline">{index}</span>}</span>
    </Link>
  );
}
function AccordionMenuItem({ __key, value,setActiveKey__, isActive ,isLast,index ,isSomeActive}) {
  const [activeKey, setActiveKey] = useState("");
  useEffect(()=>{
    setActiveKey__(isActive ? __key : "")
  },[isActive])

  return typeof value === "string" ? (
    <AccordionItemPlain __key={__key} value={value} isLast={isLast} index={index} />
  ) : (
    <div className={"px-5 py-2 accordion-menu-item " + (isLast ? "" : "border-0 border-b-2 border-gray-300 border-solid ")}>
      <button
        className="flex items-center justify-between w-full accordion-menu-item-button unbtn"
        onClick={() => setActiveKey__(isActive ? "" : __key)}
        accessKey={isSomeActive ?( isActive ? index:"") : index}
      >
        <h2>{__key}
          {isSomeActive? isActive ? <span className="underline">{index}</span> : "" : <span className="underline">{index}</span>}
          </h2>
        { isActive ? <FaChevronUp size={15} /> : <FaChevronDown size={15} />}
      </button>
      {isActive && (
        <div className="accordion-menu-item-links ms-5 stack ">
          { Object.keys(value).map((subkey, __index) => (
            <AccordionMenuItem
              key={index}
              __key={subkey}
              value={value[subkey]}
              setActiveKey__={setActiveKey}
              isActive={activeKey === subkey}
              isSomeActive={ activeKey !==""}
              isLast={__index === Object.keys(value).length - 1}
              index={index+1+__index}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Menu({ isActive,state }) {
  const [activeKey, setActiveKey] = useState("");
  const json = sitemap[state];
  return (
    isActive && (
      <div className="h-full overflow-y-auto border-0 border-r-2 border-gray-300 border-solid menu">
        <div className="h-full gap-2 menu-links stack justify-evenly">
          {activeKey}
          {Object.keys(json).map(
            (key, index) =>
              (typeof json[key] === "string" && (
                <AccordionItemPlain
                  key={index}
                  isSomeActive={activeKey !==""}
                  __key={key}
                  value={json[key]}
                  index={index}
                />
              )) ||
              (typeof json[key] === "object" && (
                <AccordionMenuItem
                  key={index}
                  __key={key}
                  value={json[key]}
                  setActiveKey__={setActiveKey}
                  isActive={activeKey === key}
                  isSomeActive={isActive && activeKey !==""}
                  isLast={index === Object.keys(json).length - 1}
                  index={index}
                />
              ))
          )}
        </div>
      </div>
    )
  );
}

export default Menu;
