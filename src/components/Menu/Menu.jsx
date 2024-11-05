import React, { useState } from "react";
import { Link } from "react-router-dom";
import sitemap from "../../json/sitemap.json";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import "./Menu.css";
function AccordionItemPlain({ __key, value, isLast }) {
  return (
    <Link to={value} className={"px-5 py-2 text-xl font-bold unlink " +( isLast ? "" : " border-0 border-b-2 border-gray-300 border-solid ")}>
      {__key}
    </Link>
  );
}
function AccordionMenuItem({ __key, value,setActiveKey__, isActive ,isLast }) {
  const [activeKey, setActiveKey] = useState("");

  return typeof value === "string" ? (
    <AccordionItemPlain __key={__key} value={value} isLast={isLast} />
  ) : (
    <div className={"px-5 py-2 accordion-menu-item " + (isLast ? "" : "border-0 border-b-2 border-gray-300 border-solid ")}>
      <button
        className="flex items-center justify-between w-full accordion-menu-item-button unbtn"
        onClick={() => setActiveKey__(isActive ? "" : __key)}
      >
        <h2>{__key}</h2>
        { isActive ? <FaChevronUp size={15} /> : <FaChevronDown size={15} />}
      </button>
      {isActive && (
        <div className="accordion-menu-item-links ms-5 stack ">
          { Object.keys(value).map((subkey, index) => (
            
            <AccordionMenuItem
              key={index}
              __key={subkey}
              value={value[subkey]}
              setActiveKey__={setActiveKey}
              isActive={activeKey === subkey}
              isLast={index === Object.keys(value).length - 1}
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
          {Object.keys(json).map(
            (key, index) =>
              (typeof json[key] === "string" && (
                <AccordionItemPlain
                  key={index}
                  __key={key}
                  value={json[key]}
                />
              )) ||
              (typeof json[key] === "object" && (
                <AccordionMenuItem
                  key={index}
                  __key={key}
                  value={json[key]}
                  setActiveKey__={setActiveKey}
                  isActive={activeKey === key}
                  isLast={index === Object.keys(json).length - 1}
                />
              ))
          )}
        </div>
      </div>
    )
  );
}

export default Menu;
